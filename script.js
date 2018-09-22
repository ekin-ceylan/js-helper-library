function rulet(probs) {
    let total = sum(probs);
    let r = Math.random() * total;

    let i = 0

    for (; probs[i] < r; i++) {
        probs[i + 1] = probs[i + 1] + probs[i];
    }

    return i
}

function dices(num){
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push(dice());        
    }

    return arr;
}

function dice(){
    return rulet([1, 1, 1, 1, 1, 1]) + 1;
}

function sum(arr){
    let total = 0;

    for (let i = 0; i < arr.length; i++) {
        total += arr[i];        
    }
    
    return total;
}

function div() {
    return addElementExtensions(document.createElement('DIV'));
}

function addElementExtensions(el) {
    //https://jaketrent.com/post/addremove-classes-raw-javascript/
    el.__proto__.addClass = function (className) {
        if (this.classList) {
            this.classList.add(className);
        } else if (!hasClass(this, className)) {
            this.className += " " + className;
        }

        return this;
    };

    el.__proto__.removeClass = function (className) {
        if (this.classList) {
            this.classList.remove(className);
        } else if (hasClass(el, className)) {
            let reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            this.className = this.className.replace(reg, ' ');
        }

        return this;
    };

    return el;
}

function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className)
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}