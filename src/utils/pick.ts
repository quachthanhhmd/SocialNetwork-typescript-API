
export default (object: any, keys: Array<string>) => {

    return keys.reduce((obj: any, key : string) => {

        if (object && Object.prototype.hasOwnProperty.call(object, key)){
            
            obj[key] = object[key];
        }
        return obj;
    },{})
}