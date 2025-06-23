const falsy = {
    string() {
        return [null, undefined, ''][getRandom(2)];
    },
    number() {
        return [null, undefined, 0][getRandom(2)];
    },
    boolean() {
        return [null, undefined, false][getRandom(2)];
    },
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

    bool() {
        return [true, false][getRandom(1)];
    }
};

function getRandomText(len = 6) {
    const chars = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
    const maxIndex = chars.length - 1;
    const result = [];

    for (let i = 0; i < len; i++) {
        result.push(chars[getRandom(maxIndex)]);
    }

    return result.join('');
}

function getRandom(max) {
    return Math.floor(Math.random() * (max + 1))
}

export { falsy };
export default fake;
