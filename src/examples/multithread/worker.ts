import { appendFileSync } from 'fs'
import { workerData, parentPort } from 'worker_threads'
import { getRandomIndex } from './utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const firstName = require('./data/first-name.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const middleName = require('./data/middle-names.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const lastName = require('./data/last-name.json')

const { namesPerThread, outputFile } = workerData

for (let i = 0; i < namesPerThread; i++) {
  const data = [firstName, middleName, lastName].map(getRandomIndex).concat('\n').join(' ')
  appendFileSync(outputFile, data)
  parentPort && parentPort.postMessage(data)
}
