export const S = document.querySelectorAll; // Select alias
export const C = document.createElement; // Create alias

const helpers = {
  addClass(...cls) {
    this.classList.add(...cls);
    return this; // keep it chainable
  },
  attr(key, val) {
    if (val !== undefined) {
      this.setAttribute(key, val);
      return this; // keep it chainable
    }

    return this.getAttribute(key);
  }
};

// Bind helpers to prototype
for (const [name, fn] of Object.entries(helpers)) {
  if (!(name in HTMLElement.prototype)) {
    Object.defineProperty(HTMLElement.prototype, name, {
      value: fn,
      writable: false,
      configurable: true,
      enumerable: false     // not to show in for-in loops
    });
  }
}
