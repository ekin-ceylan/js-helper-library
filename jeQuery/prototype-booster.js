/**
 * Alias for document.querySelectorAll.
 * @type {typeof document.querySelectorAll}
 */
export const S = document.querySelectorAll; // Select alias

/**
 * Alias for document.createElement.
 * @type {typeof document.createElement}
 */
export const C = document.createElement;

/**
 * Helper methods to extend HTMLElement prototype.
 * @namespace helpers
 */
const helpers = {
    /**
     * Adds one or more class names to the element.
     * Chainable.
     * @function
     * @name HTMLElement#addClass
     * @param {...string} cls - One or more class names to add.
     * @returns {this} The element itself for chaining.
     */
    addClass(...classes) {
        this.classList.add(...classes);
        return this; // keep it chainable
    },
    /**
     * Gets or sets an attribute on the element.
     * Chainable when setting.
     * @function
     * @name HTMLElement#attr
     * @param {string} key - The attribute name.
     * @param {string} [val] - The value to set. If omitted, gets the attribute value.
     * @returns {this|string|null} The element itself for chaining when setting, or the attribute value when getting.
     */
    attr(key, val) {
        if (val !== undefined) {
            this.setAttribute(key, val);
            return this; // keep it chainable
        }

        return this.getAttribute(key);
    },
};

/**
 * Initializes and attaches helper functions to the HTMLElement prototype.
 * Iterates over all entries in the `helpers` object and defines each helper
 * as a non-enumerable property on HTMLElement.prototype, unless a property
 * with the same name already exists.
 *
 * @function
 * @returns {void}
 */
export function initPrototypeHelpers() {
    for (const [name, fn] of Object.entries(helpers)) {
        if (name in HTMLElement.prototype) {
            return; // Skip if already exists
        }

        Object.defineProperty(HTMLElement.prototype, name, {
            value: fn,
            writable: false,
            configurable: true,
            enumerable: false, // not to show in for-in loops
        });
    }
}
