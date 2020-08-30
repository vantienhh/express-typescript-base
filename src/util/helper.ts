import { AnyClass } from '@/types'

/**
 * bind all prototype (except constructor) of class
 *
 * VD: when use ProductController.index => reference to function 'ProductController.index'
 *
 * @param {AnyClass} controller
 * @param {any} self. Is 'this' of 'controller'
 */
export function bindAll(controller: AnyClass, self: any): void {
  Object.getOwnPropertyNames(controller.prototype)
    .filter(propertyName => propertyName !== 'constructor')
    // @ts-ignore
    .forEach(method => (self[method] = self[method].bind(self)))
}
