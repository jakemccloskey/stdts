// Typescript currently doesn't allow for this pattern because you can't manually set the prototype of a class contructor.
function Empty() {}
Empty.prototype = null;

module.exports = {
    default: Empty
};
