const falsy = {
    /**
     * Returns a random falsy string-like value.
     * @returns {string|null|undefined} A falsy string variant.
     */
    string() {
        return [null, undefined, ''][getRandom(2)];
    },
    /**
     * Returns a random falsy numeric value.
     * @returns {number|null|undefined} A falsy numeric variant.
     */
    number() {
        return [null, undefined, 0][getRandom(2)];
    },
    /**
     * Returns a random falsy boolean-like value.
     * @returns {boolean|null|undefined} A falsy boolean variant.
     */
    boolean() {
        return [null, undefined, false][getRandom(2)];
    },
    /**
     * Returns a random falsy value from mixed primitive types.
     * @returns {string|number|boolean|null|undefined} A falsy primitive.
     */
    any() {
        return [0, false, null, undefined, ''][getRandom(4)];
    },
};

const random = {
    /**
     * Returns a random string value.
     * @param {number} [length=6] - The length of the resulting string.
     * @returns {string} A random string of the specified length.
     * @example
     * // returns a 10-character string
     * text(10);
     * @example
     * // returns a 6-character string
     * text();
     */
    text(length = 6) {
        return getRandomText(length);
    },

    /**
     * Returns a random primitive value.
     * @param {number} [max=100] - If `max` is not provided, it defaults to 100.
     * @returns {number} - A random integer between 0 and `max`.
     * @example
     * // returns an integer between 0 and 100
     * integer();
     * @example
     * // returns an integer between 0 and 50
     * integer(50);
     */
    integer(max = 100) {
        return getRandom(max);
    },

    /**
     * Generates a string of random digits.
     * @param {number} [length=1] - The length of the resulting string.
     * @returns {string} A string of random digits of the specified length.
     * @example
     * // returns a string of 1 random digit
     * number();
     * @example
     * // returns a string of 5 random digits
     * number(5);
     * */
    number(length = 1) {
        return Array.from({ length }, () => this.integer(9)).join('');
    },

    /**
     * Returns a random Date instance within a fixed year range.
     * @returns {Date} A randomly generated date.
     */
    date() {
        const yearRange = 100;
        const startingYear = 1970;
        const monthRange = 11;
        const dayRange = 27;
        const startingDay = 1;

        const day = this.integer(dayRange) + startingDay;
        const month = this.integer(monthRange);
        const year = this.integer(yearRange) + startingYear;

        return new Date(year, month, day);
    },

    /**
     * Returns a random boolean value.
     * @returns {boolean} Either true or false.
     */
    bool() {
        return [true, false][getRandom(1)];
    },
};

/**
 * Generates a random uppercase text string using the configured character set.
 * @param {number} [len=6] - The desired string length.
 * @returns {string} A random string.
 */
function getRandomText(len = 6) {
    const chars = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
    const maxIndex = chars.length - 1;
    const result = [];

    for (let i = 0; i < len; i++) {
        result.push(chars[getRandom(maxIndex)]);
    }

    return result.join('');
}

/**
 * Returns a random integer between 0 and the provided maximum.
 * @param {number} max - The inclusive upper bound.
 * @returns {number} A random integer.
 */
function getRandom(max) {
    return Math.floor(Math.random() * (max + 1));
}

export { falsy };
export default fake;
