import { EventEmitter } from 'events';
import { createProductListener } from '@/app/events/listeners/product.listerner';

const eventEmitter = new EventEmitter();

export function createProductEvent(data: string): void {
  eventEmitter.once('CREATE_PRODUCT_CREATED', createProductListener);
  eventEmitter.emit('CREATE_PRODUCT_CREATED', data);
}
