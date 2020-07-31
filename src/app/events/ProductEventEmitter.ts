import {EventEmitter} from 'events'

class ProductEventEmitter extends EventEmitter {
  private static instance?: ProductEventEmitter

  static getInstance(): ProductEventEmitter {
    if (!ProductEventEmitter.instance) ProductEventEmitter.instance = new ProductEventEmitter()
    return ProductEventEmitter.instance
  }

  // Viết function xử lý listener vào đây để dễ kiểm soát
  listenerTest (data: any) {
    console.log('test listener ', data)
  }
}

export const ProductEmitter = ProductEventEmitter.getInstance()
