/*
1. Basic Operators (Arithmetic, Assignment, Increment, Decrement,
Comparison, Logical, Bitwise)
a. Create two numbers a = 10 and b = 3.
Perform and log: a + b, a - b, a * b, a / b, a % b.

*/

let a = 10;
let b = 3;
console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Modulus:", a % b);



/*
b. Write: let x = 5; x = x + 3;
Now rewrite the same using +=.
Do the same for -=, *=, /=.
*/
let x = 5;
x=x+3;
console.log(x);
x+=3;
console.log(x);

x-=1;
console.log(x);

x*=2;
console.log(x);

x/=2;
console.log(x);


/*
c. let count = 5;
Use count++ and log value before and after.
Repeat for count–.

*/

let count=5;
console.log("Before count++:", count);
count++;
console.log("After count++:", count);

/*
d. Compare two values: 5 == “5” and 5 === “5”.
Observe difference.

*/

console.log("5 == '5':", 5 == "5"); // true
console.log("5 === '5':", 5 === "5"); // false

/*
e. Check if 10 is greater than 5, less than 20, and equal to 10.

*/
console.log("10 > 5:", 10 > 5); // true
console.log("10 < 20:", 10 < 20); // true
console.log("10 == 10:", 10 == 10); // true
/*


f. Try logical AND and OR:
true && false
true || false
!(true)
*/
console.log("true && false:", true && false);
console.log("true || false:", true || false);
console.log("!(true):", !(true));
/*


g. Predict the result of:
(5 > 3 && 10 > 8),
(5 > 3 || 10 < 8)
*/

console.log("(5 > 3 && 10 > 8):", (5 > 3 && 10 > 8)); // true
console.log("(5 > 3 || 10 < 8):", (5 > 3 || 10 < 8)); // true
/*

h. Bitwise (light intro):
Evaluate 5 & 1 and 5 | 1.
Write result and your observation (no deep explanation needed now).
*/
// 2. Variable Hoisting in JavaScript
// a. Predict output of:
// console.log(a);
// var a = 10

// Assignment - 29 Oct 1

// b. Predict output of:
// console.log(b);
// let b = 10
// c. Predict output of:
// test()
// function test() { console.log(“Hello”) }
/*
// d. Try writing a function expression before initialization and call it:
// hello()
// var hello = function() { console.log(“Hi”) }
// Write what happened and why.
*/

// e. Write one sentence:
// What gets hoisted?
// What does not get hoisted fully?



// 3. Conditional Operators (if, else, else-if, ternary, switch)
// a. Take input using prompt for age.
// If age > 18 → log “Adult”.
// Else → log “Minor”.
// b. Write a program:
// If marks >= 90 → “A grade”
// Else if marks >= 75 → “B grade”
// Else if marks >= 50 → “C grade”
// Else → “Fail”
// c. Create a variable city = “Bhopal”.
// If city is “Bhopal” → log “MP”
// Else if city is “Delhi” → log “Capital”
// Else → log “Unknown City”
// d. Use ternary operator:
// Let score = 40.
// If score > 35 → “Pass” else “Fail” using a ternary.
// e. Convert this if-else into a ternary:
// if (temperature > 30) { “Hot” } else { “Pleasant” }

// Assignment - 29 Oct 2

// f. Write a switch case:
// Take day number (1 to 7).
// Print the day name.
// Default case: “Invalid Day”.
// g. Using logical operators in condition:
// If age > 18 and country == “India” → log “Eligible for Vote”
// Else → “Not Eligible”