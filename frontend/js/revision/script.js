// var arr = [2, 5, 4, 7];
// var arr2 = arr;
// arr2.push(99);
// console.log(arr2); //[ 2, 5, 4, 7, 99 ]
// console.log(arr); //[ 2, 5, 4, 7, 99 ] same yes,

// // Because arrays are reference types in JavaScript. Assigning arr2 = arr copies the reference, not the actual array. So both variables point to the same memory location

// let obj = {
//   name: "Basak",
//   age: 21,
// };

// let obj2 = obj;
// console.log(obj2); //{ name: 'Basak', age: 21 }

// destructuring

// Array
var arr=[10,12,4,54,]
var arr2=[...arr] // =>[[arr[0],arr[1]arr[2]]; spread
arr2.push("basak")
console.log("arr: ",arr);
console.log("arr2: ",arr2);

var arr3=[1,2,4,5];
// var [a,b,...c]=arr3
var [a,b,c,d]=arr3
console.log(c);


// Objects

let obj = {
  user: "Basak",
  age: 21,
  city:"Bhubaneswar"
};

// var {user,...obj2}=obj;
// let obj2 ={...obj};
// or
let {...obj2} =obj;
obj2.city="Jamshedpur"
console.log('obj: ',obj)
console.log('obj2: ',obj2)
// console.log("obj2: ",user);


var std={
    user:'Anubhav',
    age:23,
    city:"jamshedpur",
    skills:['js',"react",'next']
}

var {skills}=std;

var [first,...restSkills]=skills

console.log(restSkills)



// import and export

// import King from './app.js' //default exp
import EXPskill from './test.js' // default exp
// import {Queen } from "./app.js"; // named export

// at a time both default and named 
import king,{Queen} from "./app.js";
console.log(king,Queen);
// console.log(EXPskill);
// console.log(Queen)



