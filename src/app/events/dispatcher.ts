import { EventEmitter } from 'events'
import { newProductListener } from '@/app/events/listeners/product.listerner'
const eventEmitter = new EventEmitter()

export function newProductEvent(data: string): void {
  eventEmitter.once('NEW_PRODUCT_CREATED', newProductListener)
  eventEmitter.emit('NEW_PRODUCT_CREATED', data)
}
