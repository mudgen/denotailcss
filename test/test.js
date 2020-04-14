/*
console.log("test1");
let value = 0;
async function func1() {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("async1");
      resolve();
      value = 10;
    }, 1000);
  });
  return 11;
}
function func2() {
  return func1();
}

let myval = func2();

await Promise.resolve(myval).then((v) => console.log(v));

export default value;

console.log("test2");

let v = [3, 4, 5, 6, 3];

console.log(await v.reduce(async function (result, val, index) {
  result = await result;
  return result + val;
}, Promise.resolve(0)));

console.log("test3");
async function bb() {
  return "interesting";
}

console.log(await bb());
*/

console.log("test1");
/*
async function fun() {
  console.log("test2");
}
*/
let fun = new Promise((resolve, reject) => {
  console.log("coolman");
  resolve(3);
}).then((v) => console.log(v));
//await fun;
console.log("test3");
