/**
 * Selects an index from a probability list using roulette-wheel selection.
 * @param {number[]} probs - The probability weights.
 * @returns {number} The selected index.
 */
function rulet(probs) {
    let total = sum(probs);
    let r = Math.random() * total;

    let i = 0;

    for (; probs[i] < r; i++) {
        probs[i + 1] = probs[i + 1] + probs[i];
    }

    return i;
}

/**
 * Rolls a die multiple times.
 * @param {number} num - The number of dice to roll.
 * @returns {number[]} An array containing the roll results.
 */
function dices(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push(dice());
    }

    return arr;
}

/**
 * Rolls a six-sided die once.
 * @returns {number} A value between 1 and 6.
 */
function dice() {
    return rulet([1, 1, 1, 1, 1, 1]) + 1;
}

/**
 * Sums all numeric values in an array.
 * @param {number[]} arr - The values to sum.
 * @returns {number} The total sum.
 */
function sum(arr) {
    let total = 0;

    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }

    return total;
}

/**
 * Creates a div element extended with helper methods.
 * @returns {HTMLDivElement} The created div element.
 */
function div() {
    return addElementExtensions(document.createElement('DIV'));
}

/**
 * Attaches helper methods directly to an element prototype.
 * @param {Element} el - The element to extend.
 * @returns {Element} The same extended element.
 */
function addElementExtensions(el) {
    //https://jaketrent.com/post/addremove-classes-raw-javascript/
    el.__proto__.addClass = function (className) {
        if (this.classList) {
            this.classList.add(className);
        } else if (!hasClass(this, className)) {
            this.className += ' ' + className;
        }

        return this;
    };

    el.__proto__.removeClass = function (className) {
        if (this.classList) {
            this.classList.remove(className);
        } else if (hasClass(el, className)) {
            let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            this.className = this.className.replace(reg, ' ');
        }

        return this;
    };

    return el;
}

/**
 * Checks whether an element has the specified CSS class.
 * @param {Element} el - The element to inspect.
 * @param {string} className - The class name to find.
 * @returns {boolean} True when the class exists.
 */
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

/**
 * Applies inline style rules to every element with the given class name.
 * @param {string} className - The class name to query.
 * @param {string} rules - Inline CSS rules to assign.
 * @returns {void}
 */
function addStyleByClass(className, rules) {
    let elements = document.getElementsByClassName(className);

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.setAttribute('style', rules);
    }
}
