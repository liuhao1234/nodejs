const { add,mul } = require("./a");
const _ = require("lodash");

const addResult = add(10,20);
const mulResult = mul(10,20);
const arrResult = _.concat([1,2,3],4);

console.log("求和結果：",addResult);
console.log("相乘結果：",mulResult);
console.log("数组连接：",arrResult);