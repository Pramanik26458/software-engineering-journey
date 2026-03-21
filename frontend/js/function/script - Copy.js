// 1️⃣ Recursive Function
function abcd(n) {
    if (n == 0) return;
    console.log(n);
    abcd(n - 1);
}
abcd(5);



// 2️⃣ Function Declaration
function abc() {
    console.log("function declaration");
}
abc();
abc();
abc();
abc();

// 3️⃣ Function Expression
let xyz = function() {
    console.log("function expression");
};
xyz();

// 4️⃣ Simple Function
function partha() {
    console.log("🫓");
}
partha();
partha();

// 5️⃣ Function with Parameters & Arguments
function add(a, b) { // parameters
    console.log("Sum =", a + b);
}
add(12, 13); // arguments

// 6️⃣ Parameters Example (undefined values)
function xz(x, y, z) {
    console.log(x, y, z); // undefined undefined undefined
}
xz();

// 7️⃣ Object Destructuring in Function Parameters
function ob({ name, age }) {
    console.log(name, age);
}
ob({ name: "partha", age: 23 }); // ✅ corrected from 'abcd' to 'ob'

// 8️⃣ Rest Operator
function sum(...numbers) {
    console.log(numbers); // logs array of arguments
}
sum(10, 20, 30);

// 9️⃣ Default Parameter Values
function un(a = 0, b = 0, c = 0) {
    console.log(a, b, c);
}
un(10, 20); // 10 20 0

// 🔟 Positional Argument Example (using undefined)
function pqr(a = 0, b = 0, c = 0) {
    console.log(a, b, c);
}
pqr(10, undefined, 30); // 10 0 30

// 1️⃣1️⃣ Nested Function Example (Classic)
function classic() {
    function d() {
        console.log("d chala");
    }

    d();

    console.log("le claassic bhi chala diya");
}
classic();


// scoping 

// let m=12; // global scope
function abc(){
    let k=13;
    function defg(){
        console.log(k);
        // console.log(m);
    }
    defg();  
}

abc();


// IIFE- Immediately Invoked Function Expression
// why we use IIFE?  
// to avoid polluting the global scope and to create a private scope

// let balance = 1000;

(function(){
    let balance = 1000;
})(); 




// functions in javascript

// fat arrow function

let fnc=()=>{
    console.log("fat arrow function");
}
fnc();

let fatArrow = (a, b) => {
    return a + b;
}   
console.log(fatArrow(10, 20));

let fatArrow2 = (a, b) => a + b;
console.log(fatArrow2(30, 40));

// if there is only one line of code in the function body then we can omit the curly braces and the return keyword


// anonmoymous function- function without a name

setTimeout(function(){
    console.log("this is an anonymous function");
}
, 2000);

setTimeout(()=>{
    console.log("this is an anonymous fat arrow function");
}
, 3000);



// higher order function- a function that takes another function as an argument or returns a function as a result

function higherOrderFunction(){
    return fn()
}


//  callback function- a function that is passed as an argument to another function and is executed after some operation is completed

function callbackFunction(callback){
    console.log("inside callback function");
    callback();
}


// first class function- functions are treated as first class citizens in javascript- they can be assigned to variables, passed as arguments to other functions, and returned from other functions
// i.e a concept 
// example of first class function
let firstClassFunction = function(){
    console.log("this is a first class function");
}   
callbackFunction(firstClassFunction);

// example 2 of first class function
function abcde(a,b){

}
abcde(function(){

},12);

// example 3 of first class function
function xyzde(){
    return function(){
        console.log("returned function");
    }   
}
let returnedFunction = xyzde();
returnedFunction();

// or we can directly call the returned function\


// pure function- a function that always returns the same output for the same input and has no side effects

function pureFunction(a,b){
    return a+b;
}
console.log(pureFunction(10,20)); // 30
console.log(pureFunction(10,20)); // 30

// impure function- a function that may return different outputs for the same input or has side effects

let c = 0;
function impureFunction(a){
    c++;
    return a+c;
}
console.log(impureFunction(10)); // 11
console.log(impureFunction(10)); // 12
