/**
 * Mini DOM wrapper class for simplified element selection and manipulation.
 */
class Q {
    /**
     * @type {Node[]}
     * @private
     */
    #nodes = [];

    /**
     * Creates an instance of Q.
     * @param {string|Node|NodeList|HTMLCollection|Array<Node>} sel - CSS selector string, single Node, or a collection of Nodes.
     */
    constructor(sel) {
        if (typeof sel === 'string') {
            this.#nodes = [...document.querySelectorAll(sel)];
        } else if (sel instanceof Node) {
            this.#nodes = [sel];
        } else if (sel && typeof sel[Symbol.iterator] === 'function') {
            this.#nodes = [...sel]; // assume NodeList, HTMLCollection or Array
        }
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
