
module.exports = {

    shallowCopy(data) {
        return JSON.parse(JSON.stringify(data));
    },

    getUniqueElements(arr, key) {
        return new Set(arr.map(a => a[`${key}`]));
    },

    getRandomNumberHash() {
        return Math.floor(Math.random() * 10000000000);
    },

    filterNonNull(arr) {
        return arr.filter(e => e !== null && e !== undefined);
    },

    customPaginate(array, page_size, page_number) {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    },
    
    checkArrayLength(arr) {
        if(arr && arr.length){
            return true;
        }
        return false;
    },
   
}
