Array.prototype.first = function () {
  return this[0];
};

Array.prototype.last = function () {
  return this[this.length - 1];
};

Array.prototype.unique = function () {
  return [...new Set(this)];
};
