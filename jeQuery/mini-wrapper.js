/**
 * Mini DOM wrapper class for simplified element selection and manipulation.
 * Designed as a small, tolerant wrapper around DOM collections rather than a full jQuery clone.
 * Getter methods read from the first available item, mutating methods stay chainable,
 * and unsupported input resolves to an empty selection when possible.
 */
class Q {
    /**
     * @type {Node[]}
     * @private
     */
    #nodes = [];

    /**
     * Returns the number of nodes in the current Q instance.
     * @returns {number} The number of nodes.
     */
    get length() {
        return this.#nodes.length;
    }

    /**
     * Creates an instance of Q.
     * Accepts selector strings, single DOM nodes, document/window references,
     * and iterable DOM-like collections.
     * Unsupported input falls back to an empty selection.
     * @param {string|Node|NodeList|HTMLCollection|Array<Node>} sel - CSS selector string, single Node, or a collection of Nodes.
     */
    constructor(sel) {
        if (typeof sel === 'string') {
            this.#nodes = [...document.querySelectorAll(sel)];
        } else if (sel == globalThis || sel === document) {
            this.#nodes = [sel];
        } else if (sel instanceof Node) {
            this.#nodes = [sel];
        } else if (sel && typeof sel[Symbol.iterator] === 'function') {
            this.#nodes = [...sel]; // assume NodeList, HTMLCollection or Array
        } else {
            this.#nodes = []; // unsupported -> empty set
        }
    }

    /**
     * Checks if any of the selected elements have the specified class.
     * @param {string} className - The class name to check.
     * @returns {boolean} True if any element has the class, false otherwise.
     */
    hasClass(className) {
        return this.#nodes.some(node => node.classList.contains(className));
    }

    /**
     * Adds one or more class names to all selected elements.
     * @param {...string} classes - One or more class names to add.
     * @returns {Q} The current Q instance for chaining.
     */
    addClass(...classes) {
        this.#nodes.forEach(n => n.classList.add(...classes));
        return this;
    }

    /**
     * Removes one or more CSS classes from all selected elements.
     * @param {...string} classNames - One or more class names to remove.
     * @returns {Q} The current Q instance for chaining.
     */
    removeClass(...classNames) {
        this.#nodes.forEach(node => node.classList.remove(...classNames));
        return this;
    }

    /**
     * Gets or sets an attribute on the selected elements.
     * @param {string} key - The attribute name.
     * @param {string} [val] - The attribute value to set. If omitted, gets the attribute value from the first element.
     * @returns {Q|string|undefined} The current Q instance for chaining when setting, or the attribute value when getting.
     */
    attr(key, val) {
        if (val !== undefined) {
            this.#nodes.forEach(n => n.setAttribute(key, val));
            return this;
        }

        return this.#nodes[0]?.getAttribute(key);
    }

    /**
     * Gets or sets the text content of the selected elements.
     * @param {string} [value] - The text content to set. If omitted, gets the text content of the first element.
     * @returns {string|Q} - The text content of the first element when getting, or the current Q instance for chaining when setting.
     */
    text(value) {
        if (arguments.length === 0) return this.#nodes[0]?.textContent ?? ''; // Getter: returns the text content of the first element
        this.#nodes.forEach(node => (node.textContent = value));
        return this;
    }

    /**
     * Finds descendant elements that match the given selector within the current selection.
     * @param {string} selector - CSS selector to match descendant elements.
     * @returns {Q} A new Q instance containing the matched elements.
     */
    find(selector) {
        const foundNodes = this.#nodes.flatMap(node => [...node.querySelectorAll(selector)]);
        return new Q(foundNodes);
    }

    /**
     * Attaches an event listener to all selected elements.
     * @param {string} event - The event type (e.g., 'click', 'change', 'keyup').
     * @param {Function} handler - The event handler function.
     * @param {boolean|object} [options] - Optional event listener options.
     * @returns {Q} The current Q instance for chaining.
     */
    on(event, handler, options) {
        this.#nodes.forEach(n => n.addEventListener(event, handler, options));
        return this;
    }

    /**
     * Returns the vertical scroll position of the first wrapped node.
     * @returns {number} The scroll offset in pixels.
     */
    scrollTop() {
        if (!this.#nodes.length) return 0;

        const n = this.#nodes[0];

        if (n == globalThis || n === document) {
            return window.scrollY || document.documentElement.scrollTop || 0;
        }

        if (n instanceof Element) return n.scrollTop;

        return 0;
    }

    /**
     * Shows or hides all wrapped elements by toggling their inline display style.
     * @param {boolean} show - Whether the wrapped elements should be shown.
     * @returns {Q} The current Q instance for chaining.
     */
    toggle(show) {
        this.#nodes.forEach(n => {
            if (n instanceof Element) {
                n.style.display = show ? '' : 'none';
            }
        });

        return this;
    }

    /**
     * Returns the Node at the specified index.
     * @param {number} [idx=0] - The index of the Node to retrieve.
     * @returns {Node|undefined} The Node at the specified index, or undefined if out of bounds.
     */
    get(idx = 0) {
        return this.#nodes[idx];
    }

    /**
     * Returns all selected Nodes as an array.
     * @returns {Node[]} Array of selected Nodes.
     */
    all() {
        return this.#nodes;
    }
}

/**
 * Shorthand function to create a new Q instance.
 * @param {string|Node|NodeList|HTMLCollection|Array<Node>} sel - Selector or Node(s) to wrap.
 * @returns {Q} A new Q instance.
 */
const $ = sel => new Q(sel);
export default $;
