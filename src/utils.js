

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


}

module.exports =  new Utils();