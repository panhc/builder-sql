

class Utils {
    constructor(){
        return this;
    }

    isJson(obj){
        let isjson = typeof(obj) == "object"
            && Object.prototype.toString.call(obj).toLowerCase() == "[object object]"
            && !obj.length;

        return isjson;
    }

    isFunction(fn){
        return typeof fn === 'function';
    }

    isString(str){
        return str && typeof str === 'string';
    }

    isArray(arr){
        return Array.isArray(arr);
    }

    isEmpty(obj){
        return Object.keys(obj).length === 0;
    }


}

module.exports =  new Utils();