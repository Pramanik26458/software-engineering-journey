// write a function that prints "Hello, JavaScript!"

function sayHello() {
  console.log("Hello, JavaScript!");
}
sayHello();

// create a function that takes two numbers as arguments and returns their sum.
function add(a, b) {
  return a + b;
}
console.log(add(5, 10));

// Write a function with  a default parameter that greets a user. If no name is provided, it should greet "Guest".
function greeting(guest = "Guest") {
  console.log(`hi ${guest}, welcome to the party!`);
}
greeting();
// greeting('Striver');

// use rest parameter to create a function that make a function that adds unlimited numbers
function addUnlimited(...numbers) {
  let sum = 0;
  // numbers.forEach((num)=>{
  //     sum+=num;
  // });
  // console.log(sum);

  /*****************  or ***********************/

  // for(let i=0;i<numbers.length;i++){
  //     sum+=numbers[i];
  // }
  // console.log(sum);

  /*****************  or ***********************/

  let ans = numbers.reduce((acc, val) => {
    return acc + val;
  }, 0);
  console.log(ans);
}
addUnlimited(1, 2, 3, 4, 10);



// IIFE - Immediately Invoked Function Expression
(function () {
  console.log("This is an IIFE function");
})();

//craeting a  nested function and accessing parent function variable in child function
function parent(){

    let a=12;
    function child(){
        console.log("value of a is " + a);
    }   
    child();
}
parent();



// array methods - push , unshift,etc
let arr=['apple','banana','grapes'];

arr.push('mango');
console.log(arr);  

arr.unshift('orange');
console.log(arr);



// /use a for loop to print all  elements in an array
let fruits=['apple','banana','grapes','mango','orange'];  
for(let i=0;i<fruits.length;i++){
    console.log(fruits[i]);
} 

console.log('-------------------');
// create an object person with key name and age and print each keys values
let person={
    name:'Basak',
    age:20,
    City:'Jamshedpur'
};

for
(let key in person){
    console.log(person[key]);
}


// 


setTimeout(function(){
    console.log("This message is shown after 2 seconds");
},2000);
