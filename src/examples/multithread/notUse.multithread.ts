import { appendFileSync } from 'fs'
import { getRandomIndex } from './utils'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const firstName = require('./data/first-name.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const middleName = require('./data/middle-names.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const lastName = require('./data/last-name.json')

const limit = 1000000
const outputFile = `${__dirname}/output/data.txt`

console.time('start')

for (let i = 0; i < limit; i++) {
  const data = [firstName, middleName, lastName].map(getRandomIndex).concat('\n').join(' ')
  appendFileSync(outputFile, data)
}

console.timeLog('start')
