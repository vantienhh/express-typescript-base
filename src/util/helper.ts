import { AnyClass } from '@/types'

/**
 * bind all prototype (except constructor) of class
 * (when use ProductController.index => reference to function 'ProductController.index')
 *
 * @param {AnyClass} controller. Is class
 * @param {any} self. Is 'this' of 'class'
 */
export function bindAll(controller: AnyClass, self: any): void {
  Object.getOwnPropertyNames(controller.prototype)
    .filter(propertyName => propertyName !== 'constructor')
    .forEach(method => (self[method] = self[method].bind(self)))
}
