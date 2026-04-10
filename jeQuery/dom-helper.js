/**
 * Selects DOM elements matching the given CSS selector and adds extensions to each element.
 *
 * @param {string} selector - The CSS selector to match elements against.
 * @returns {Element|NodeListOf<Element>} The first matched element if only one is found,
 * or a NodeList of matched elements if more than one is found.
 */
function S(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(addExtensions);

    return elements.length > 1 ? elements : elements[0];
}

/**
 * Creates a new DOM element of the specified tag and applies additional extensions to it.
 *
 * @param {string} tag - The tag name of the element to create (e.g., 'div', 'span').
 * @returns {Element} The newly created and extended DOM element.
 */
function C(tag) {
    const element = document.createElement(tag);

    return addExtensions(element);
}

/**
 * Creates a div element and applies the provided CSS classes.
 * @param {...string} classes - CSS classes to add to the created element.
 * @returns {Element} The created div element.
 */
function div(...classes) {
    return C('div').addClass(...classes);
}

/**
 * Creates a paragraph element and applies the provided CSS classes.
 * @param {...string} classes - CSS classes to add to the created element.
 * @returns {Element} The created paragraph element.
 */
function p(...classes) {
    return C('p').addClass(...classes);
}

export { S, C, div, p };

/**
 * Attaches helper methods to a DOM element instance.
 * @param {Element} el - The element to extend.
 * @returns {Element} The same element with helper methods attached.
 */
function addExtensions(el) {
    el.addClass = addClass.bind(el);
    el.removeClass = removeClass.bind(el);
    el.hasClass = hasClass.bind(el);

    el.attr = attr.bind(el);

    el.html = html.bind(el);
    el.text = text.bind(el);

    el.append = append.bind(el);
    el.appendTo = appendTo.bind(el);

    return el;
}

/**
 * Adds one or more class names to the current element.
 * @param {...string} classNames - CSS classes to add.
 * @returns {this} The current element for chaining.
 */
function addClass(...classNames) {
    this.classList.add(...classNames);
    return this;
}

/**
 * Removes one or more class names from the current element.
 * @param {...string} classNames - CSS classes to remove.
 * @returns {this} The current element for chaining.
 */
function removeClass(...classNames) {
    this.classList.remove(...classNames);
    return this;
}

/**
 * Checks whether the current element contains a CSS class.
 * @param {string} className - The class name to test.
 * @returns {boolean} True when the class exists on the element.
 */
function hasClass(className) {
    return this.classList.contains(className);
}

/**
 * Gets or sets an attribute on the current element.
 * @param {string} key - The attribute name.
 * @param {string} [value] - The value to set. If omitted, the attribute is read.
 * @returns {string|this|null} The attribute value when reading, or the element for chaining when writing.
 */
function attr(key, value) {
    if (value !== undefined) {
        this.setAttribute(key, value);
        return this;
    }

    return this.getAttribute(key);
}

/**
 * Gets or sets the text content of the current element.
 *
 * @param {string} [content] - The text content to set. If omitted, the current text content is returned.
 * @returns {string|this} Returns the current text content if no argument is provided, otherwise returns the element itself for chaining.
 */
function text(content) {
    if (content !== undefined) {
        this.textContent = content;
        return this;
    }

    return this.textContent;
}

/**
 * Gets or sets the HTML content of the current element.
 *
 * @param {string} [content] - The HTML string to set as the element's content. If omitted, returns the current HTML content.
 * @returns {string|this} Returns the current HTML content if no argument is provided, otherwise returns the element for chaining.
 */
function html(content) {
    if (content !== undefined) {
        this.innerHTML = content;
        return this;
    }

    return this.innerHTML;
}

/**
 * Appends one or more child nodes to the current element.
 * @param {...Node|string} childNodes - Child nodes or strings to append.
 * @returns {this} The current element for chaining.
 */
function append(...childNodes) {
    this.append(...childNodes);
    return this;
}

/**
 * Appends the current element to a parent element.
 * @param {string|HTMLElement} parent - Selector or target element that will receive the current element.
 * @returns {this} The current element for chaining.
 */
function appendTo(parent) {
    if (typeof target === 'string') {
        target = document.querySelector(target);
    }
    if (target instanceof HTMLElement) {
        target.appendChild(this);
    }
    return this;
}
