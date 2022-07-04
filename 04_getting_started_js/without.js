var without = function (exclude, arr) {
    return arr.filter(function (el) {
        return !exclude.includes(el);
    });
};

var arrayEquals = function (a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every(function (val, index) {
            return val === b[index];
        });
};

var expectedResult = [1, 2, 3, 4];
console.assert(arrayEquals(without([5, 6], [1, 2, 3, 4, 5, 6]), expectedResult));