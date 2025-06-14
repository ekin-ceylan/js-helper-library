export function S(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(addExtensions);

    return elements.length > 1 ? elements : elements[0];
}

export function C(tag) {
    const element = document.createElement(tag);

    return addExtensions(element);
}

export function div(...classes) {
    return C('div').addClass(...classes);
}

export function p(...classes) {
    return C('p').addClass(...classes);
}

function addExtensions(el) {
    el.addClass = addClass.bind(el);
    el.removeClass = removeClass.bind(el);
    el.hasClass = hasClass.bind(el);

    el.attr = attr.bind(el);

    el.html = html.bind(el);
    el.text = text.bind(el);

    el.append = append.bind(el);

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

function text(content) {
    if (content !== undefined) {
        this.textContent = content;
        return this;
    }

    return this.textContent;
}

function html(content) {
    if (content !== undefined) {
        this.innerHTML = content;
        return this;
    }

    return this.innerHTML;
}

function append(child) {
    const node = child instanceof Node ? child : document.createTextNode(child);
    this.appendChild(node);

    return this;
}
