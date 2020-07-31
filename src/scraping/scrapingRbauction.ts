import fs from 'fs'
import axios, {AxiosResponse} from 'axios'
import {Product} from '@/app/models/Product'
import puppeteer, {ElementHandle, Page, Browser, EvaluateFnReturnType, EvaluateFn} from 'puppeteer'
import mongoose from 'mongoose'
import {ProductSchema} from '@/types/Models'

const DOMAIN_RBAUCTION = 'https://www.rbauction.com'
const URL_API_SEARCH   = `${DOMAIN_RBAUCTION}/rba-msapi/search`

class ScrapingRbauction {
  public maxPerPage: number = 300 // Số bản ghi tối đa trong 1 trang
  public nofPages: number   = 1   // Tổng số trang

  /**
   * Lấy tổng số trang và số bản ghi tối đa 1 trang của api search RBAUCTION
   * @param {number} maxCount
   * @returns {Promise<void>}
   */
  setNofPageAndMaxPerPage = async (maxCount: number = 300): Promise<void> => {
    let response: AxiosResponse = await axios.request({
      baseURL: URL_API_SEARCH,
      method: 'GET',
      params: {
        maxCount,
      },
    })

    this.maxPerPage = response.data.response.Pagination.MaxPerPage
    this.nofPages   = response.data.response.Pagination.NofPages
  }

  /**
   * Scraping url product vào file
   * - bắn cùng lúc 20 request (không nên mở quá nhiều request cùng 1 lúc)
   * @returns {Promise<void>}
   */
  scrapingProductsURLIntoFile = async (): Promise<void> => {
    await this.setNofPageAndMaxPerPage()
    let promiseRequests: Array<Promise<AxiosResponse>> = []
    let urls: Array<string>                            = []
    let amountRequestSameTime: number                  = 20
    let file                                           = fs.createWriteStream('urlRbauction.txt')

    // chỉ gửi 20 request 1 lúc
    for (let page = 1; page <= this.nofPages; page += amountRequestSameTime) {
      let endPage: number = this.nofPages < (page + amountRequestSameTime) ? this.nofPages : (page + amountRequestSameTime)

      for (let subPage = page; subPage <= endPage; subPage++) {
        let request = axios.request({
          baseURL: URL_API_SEARCH,
          method: 'GET',
          params: {
            maxCount: this.maxPerPage,
            page: subPage,
            withResults: true,
          },
        })

        promiseRequests.push(request)
      }

      const data = await Promise.all(promiseRequests)
      data.forEach(response => {
        response.data.response.results.forEach((product: any) => {
          urls.indexOf(product.url) === -1 && urls.push(product.url) && file.write(product.url + '\n')
        })
      })
    }

    file.end()
  }

  /**
   * Lấy mảng các url của product từ file
   * VD: /1996-western-star-3800-dump-truck-ta?invId=12132186&id=ci&auction=st-johns-nl-2020289
   * @returns {Array<string>}
   */
  getListUrlProducts = (): Array<string> => {
    let content = fs.readFileSync('urlRbauction.txt', {encoding: 'utf8'})
    return content.split('\n')
  }

  /**
   * thực thi việc scraping để lấy thông tin sản phẩm
   *  - chạy 10 page cùng 1 lúc (thêm page => tăng ram)
   * TODO:  Khi không có dữ liệu có thể do load lỗi => cho vào 1 mảng r load lại
   * @returns {Promise<void>}
   */
  scrapingInfoProduct = async () => {
    let amountPage: number = 10
    let listURLProducts    = this.getListUrlProducts()

    const browser: Browser   = await puppeteer.launch({headless: true})
    const pages: Array<Page> = await this.getListBrowserPage(browser, amountPage)

    for (let indexUrl = 0; indexUrl < listURLProducts.length; indexUrl += amountPage) {
      let requests: Promise<EvaluateFnReturnType<EvaluateFn>>[] = []

      for (let indexPage = 0; indexPage < amountPage; indexPage++) {
        let indexCurrentUrl: number = indexPage + indexUrl
        let request                 = this.getProductInfo(pages[indexPage], `${DOMAIN_RBAUCTION}${listURLProducts[indexCurrentUrl]}`)
        requests.push(request)
      }

      let dataProducts = await Promise.all(requests)
      dataProducts     = dataProducts.filter(product => product.name)
      await this.insertToDataBase(dataProducts)
    }

    await browser.close()
  }

  getListBrowserPage = async (browser: Browser, amountPage: number = 5): Promise<Array<Page>> => {
    let promisePages: Promise<Page>[] = []

    for (let i = 0; i < amountPage; i++) {
      promisePages.push(browser.newPage())
    }

    return await Promise.all(promisePages)
  }

  /**
   * @param {Page} page
   * @param {string} urlTest
   * @returns {Promise<EvaluateFnReturnType<EvaluateFn>>}
   */
  getProductInfo = async (page: Page, urlTest: string): Promise<EvaluateFnReturnType<EvaluateFn>> => {
    try {
      await page.goto(urlTest)
      let bodyHandle: ElementHandle | null = await page.waitForSelector('#body-column', {timeout: 15000})

      if (!bodyHandle) {
        return false
      }

      const name = await page.evaluate((body) => {
        return body.querySelector('#itemTitle') && body.querySelector('#itemTitle').innerHTML
      }, bodyHandle)

      await bodyHandle.dispose()
      return {
        name: name,
      }
    } catch (e) {
      return false
    }
  }

  insertToDataBase = async (dataProducts: Array<ProductSchema>) => {
    await Product.create(dataProducts)
  }

}

let dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test_nodejs'
mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const scrapingRbauction = new ScrapingRbauction

scrapingRbauction.scrapingProductsURLIntoFile()
// scrapingRbauction.scrapingInfoProduct()
// console.log('12345', scrapingRbauction.getListUrlProducts())
