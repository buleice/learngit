function deepClone(obj, hash = new WeakMap()) { //递归拷贝
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    if(obj === null || typeof obj !== 'object') {
        //如果不是复杂数据类型，直接返回
        return obj;
    }
    if (hash.has(obj)) {
        return hash.get(obj);
    }
    /**
     * 如果obj是数组，那么 obj.constructor 是 [Function: Array]
     * 如果obj是对象，那么 obj.constructor 是 [Function: Object]
     */
    let t = new obj.constructor();
    hash.set(obj, t);
    for(let key in obj) {
        //如果 obj[key] 是复杂数据类型，递归
        if(obj.hasOwnProperty(key)){//是否是自身的属性
            if(obj[key] && typeof obj[key] === 'object') {
                t[key] = deepClone(obj[key], hash);
            }else{
                t[key] = obj[key];
            }
            
        }
    }
    return t;
}
