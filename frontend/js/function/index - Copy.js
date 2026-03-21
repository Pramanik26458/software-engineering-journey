
// pure function- a function that always returns the same output for the same input and has no side effects
let a=12;
function pureFunction(val){
   console.log(val*2);
}
pureFunction(12); // 24
pureFunction(12); // 24

// impure function- a function that may return different outputs for the same input or has side effects

let c = 0;
function impureFunction(val){
  console.log(( Math.random() +val)); // side effect
    return a+c;
}
impureFunction(10);
impureFunction(10);
impureFunction(10);


function scop(){
    let b=10;
    console.log(b);
}
scop();
console.log(b); // b is not defined because it is a local variable


// closure- a function that has access to its outer function scope even after the outer function has returned
//  a closure is created when a function is defined inside another function and the inner function references variables from the outer function

function outerFunction(){
    let d;
    return function innerFunction(innerVariable){
        console.log("Outer Variable: " + d);
        // console.log("Inner Variable: " + innerVariable);
    }
}