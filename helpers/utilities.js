/**
 * Combines class names conditionally.
 * Accepts any number of arguments, which can be strings or objects.
 * - Strings are always included.
 * - Objects include keys with truthy values.
 *
 * @param {...(string|Object<string, boolean>)} args - Class names as strings or objects.
 * @returns {string} A space-separated string of class names.
 *
 * @example
 * classMap('foo', { bar: true, baz: false }) // "foo bar"
 */
export function classMap(...args) {
    return args
        .flatMap(arg =>
            typeof arg === 'string'
                ? [arg]
                : Object.entries(arg)
                      .filter(([_, val]) => val)
                      .map(([key]) => key)
        )
        .join(' ');
}

export function injectStyles(styleId, styleText) {
    if (!styleId || !styleText || document.getElementById(styleId)) {
        return
    }

    const clean = styleText
        .replace(/(^\s+)|\n|(\s+$)/gm, '') // Remove newlines and leading/trailing spaces
        .replace(/\s*;?\s*}\s*/g, '}') // Remove any unnecessary spaces around '}' and the last ';'
        .replace(/\s*{\s*/g, '{') // Remove unnecessary spaces around '{'
        .replace(/\s*:\s*/g, ':') // Remove unnecessary spaces around ':'
        .trim();

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = clean;
    document.head.appendChild(style);
}

export function checkTcNo(value) {
    const valueStr = value.toString();
    const valueArr = Array.from(valueStr.split(''), x => Number(x));

    // sıfırla başlayamaz
    if (valueArr[0] === 0) {
        return false;
    }

    // 11 basamaklı olmalı, rakamlardan oluşmalı
    if (!/^\d{11}$/.test(valueStr)) {
        return false;
    }

    const totalOdd = valueArr.slice(0, 9).reduce((acc, item, i) => (i % 2 === 0 ? acc + item : acc), 0); // 1, 3, 5, 7 ve 9. rakamın toplamı
    const totalEven = valueArr.slice(1, 8).reduce((acc, item, i) => (i % 2 === 0 ? acc + item : acc), 0); // 2, 4, 6 ve 8. rakamın toplamı

    // 1, 3, 5, 7 ve 9. rakamın toplamının 7 katı ile 2, 4, 6 ve 8. rakamın toplamının 9 katının toplamının birler basamağı 10. rakamı vermeli
    if ((totalOdd * 7 + totalEven * 9) % 10 !== valueArr[9]) {
        return false;
    }

    // 1, 3, 5, 7 ve 9. rakamın toplamının 8 katının birler basamağı 11. rakamı vermektedir.
    return (totalOdd * 8) % 10 === valueArr[10];
}

export function checkTaxNo(no) {
    const check = false;
    const taxNo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const taxPow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let x = 0;
    let total = 0;
    let checkDigit = 0;

    if (!no || no.length !== 10) {
        return check;
    }

    for (let i = 0; i < 9; i++) {
        taxNo[i] = parseInt(no.substr(i, 1)) - i + 9;

        if (taxNo[i] > 9) {
            taxNo[i] = taxNo[i] - 10;
        }
    }

    for (let i = 0; i < 9; i++) {
        taxPow[i] = taxNo[i] * Math.pow(2, 9 - i);
        let y = 0;

        if (taxPow[i] !== 0) {
            x = Math.floor(taxPow[i] / 9);
            y = taxPow[i] - 9 * x;

            if (y === 0) {
                y = 9;
            }
        }

        total = total + y;
    }

    x = Math.floor(total / 10) * 10;

    if (x !== total) {
        checkDigit = x + 10 - total;
    }

    return parseInt(no.substr(9, 1)) === checkDigit;
}

export function checkTaxTc(no) {
    const len = no?.length;

    if (len !== 10 && len !== 11) {
        return false;
    }

    return len === 10 ? that.checkTaxNo(no) : that.checkTcNo(no);
}

export function checkPlateNo(plateNo) {
    const regex = /^\d{2}[A-PR-VYZa-hj-pr-vyzı]{1,3}\d{2,5}$/;

    return regex.test(plateNo);
}
