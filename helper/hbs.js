//import de module 

module.exports = {
    // On définit notre fonction
    limitArray: function(arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    },
    limitArrayReverse: function(arr, limitArrayReverse) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.reverse().slice(0, limitArrayReverse);
    },
    arrayReverse: function(arr, arrayReverse) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.reverse();
    },
    ifCond: (v1, v2, options) => {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    // Incrémentation 
    inc: (value, option) => {
        return parseInt(value) + 1
    },
}