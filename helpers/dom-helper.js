export const S = selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(addExtensions);

    return elements.length > 1 ? elements : elements[0];
};

export const C = tag => {
    const element = document.createElement(tag);

    return addExtensions(element);
};

export function div(...classes) {
    return createElement('div').addClass(...classes);
}

function addExtensions(el) {
    el.addClass = function (...className) {
        this.classList.add(...className);
        return this;
    };

    el.attr = function (key, value) {
        if (value) {
            this.setAttribute(key, value);
            return this;
        }

        return this.getAttribute(key);
    };

    return el;
}
