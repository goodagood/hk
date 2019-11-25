
/*
 * Might be good to use Lodash again.
 */

function sliceObj(obj) {
    var o = {}
    , keys = [].slice.call(arguments, 1);
    for (var i=0; i<keys.length; i++) {
        if (keys[i] in obj) o[keys[i]] = obj[keys[i]];
    }
    return o;
}


module.exports.sliceObj = sliceObj;
