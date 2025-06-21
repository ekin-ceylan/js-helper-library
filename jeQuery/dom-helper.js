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

function div(...classes) {
    return C('div').addClass(...classes);
}

function p(...classes) {
    return C('p').addClass(...classes);
}

export { S, C, div, p };

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

function addClass(...classNames) {
    this.classList.add(...classNames);
    return this;
}

function removeClass(...classNames) {
    this.classList.remove(...classNames);
    return this;
}

function hasClass(className) {
    return this.classList.contains(className);
}

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

function append(...childNodes) {
    this.append(...childNodes);
    return this;
}

function appendTo(parent) {
    if (typeof target === 'string') {
        target = document.querySelector(target);
    }
    if (target instanceof HTMLElement) {
        target.appendChild(this);
    }
    return this;
}
