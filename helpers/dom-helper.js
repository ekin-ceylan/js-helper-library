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
