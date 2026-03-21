
# Basics of JS Concepts You Need To Know Before Starting React

## Basics of JS
- var, let, const
- datatype
- operators (+,-,*,/,&&,||,!)
- console statement
- conditionals
- loops

## Arrays Object
- Methods of Array (push, pop, shift, unshift, length)
- HOF (forEach, map, filter, reduce, some, find)
- basic level question solving with array
- use of objects
- Array of objects
- basic questions of array of objects

## Destructuring
- of array
- of object
- spread operator
- rest operator

## Function
- basics function
- arrow function
- return statement
- parameter, argument

## Promises, Async Await, fetch api

## error handling

## import export

---


## xxxxxxxxx-----------------XXXXXXXXXX-----------------XXXXXXXXX--------xxxxxxxxx

## Notes

### Basics of JavaScript

#### var, let, const

| Keyword | Scope    | Reassign | Redeclare |
| ------- | -------- | -------- | --------- |
| var     | Function | Yes      | Yes       |
| let     | Block    | Yes      | No        |
| const   | Block    | No       | No        |

```javascript
var a = 10;
a = 20;

let b = 30;
b = 40;

const c = 50;
// c = 60 Error
```

**React rule:** Always prefer let and const. Avoid var.

#### Data Types

**Primitive**
- Number
- String
- Boolean
- Undefined
- Null
- Symbol
- BigInt

**Non-Primitive**
- Object
- Array
- Function

```javascript
let age = 24;            // Number
let name = "Anubhav";   // String
let isActive = true;    // Boolean
let x;                  // Undefined
let y = null;           // Null
```

#### Operators

```javascript
// Arithmetic
10 + 5
10 - 5
10 * 5
10 / 5

// Logical
true && false
true || false
!true
```

#### Console Statements

```javascript
console.log("Hello");
console.warn("Warning");
console.error("Error");
console.table([{a:1},{a:2}]);
```

#### Conditionals

```javascript
let age = 18;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

**Ternary Operator**

```javascript
age >= 18 ? "Adult" : "Minor";
```

#### Loops

```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

let i = 1;
while (i <= 5) {
  console.log(i);
  i++;
}
```

### Arrays & Objects

#### Array Basics

```javascript
let arr = [10, 20, 30];
```

**Array Methods**

```javascript
arr.push(40);     // add end
arr.pop();        // remove end
arr.shift();      // remove start
arr.unshift(5);   // add start
arr.length;
```

#### Higher Order Functions (HOF)

**forEach**

```javascript
arr.forEach(num => {
  console.log(num);
});
```

**map (Most used in React)**

```javascript
let newArr = arr.map(num => num * 2);
```

**filter**

```javascript
let even = arr.filter(num => num % 2 === 0);
```

**reduce**

```javascript
let sum = arr.reduce((acc, curr) => acc + curr, 0);
```

**find**

```javascript
arr.find(num => num > 15);
```

**some**

```javascript
arr.some(num => num > 25);
```

#### Objects

```javascript
let user = {
  name: "Anubhav",
  age: 24,
  isDeveloper: true
};
```

**Access:**

```javascript
user.name;
user["age"];
```

#### Array of Objects

```javascript
let users = [
  { id: 1, name: "A" },
  { id: 2, name: "B" }
];

users.map(user => user.name);
```

### Destructuring

#### Array Destructuring

```javascript
let arr = [10, 20, 30];

let [a, b, c] = arr;
```

#### Object Destructuring (Very Important for React)

```javascript
let user = {
  name: "Anubhav",
  age: 24
};

let { name, age } = user;
```

#### Spread Operator ...

```javascript
let arr1 = [1, 2];
let arr2 = [...arr1, 3, 4];

let obj1 = { a: 1 };
let obj2 = { ...obj1, b: 2 };
```

#### Rest Operator ...

```javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}

sum(1,2,3,4);
```

### Functions

#### Normal Function

```javascript
function greet(name) {
  return "Hello " + name;
}
```

#### Arrow Function (Used in React)

```javascript
const greet = (name) => {
  return `Hello ${name}`;
};
```

**Short form:**

```javascript
const greet = name => `Hello ${name}`;
```

#### Parameters vs Arguments

```javascript
function add(a, b) {   // parameters
  return a + b;
}

add(10, 20);           // arguments
```

### Promises, Async / Await, Fetch API

#### Promise

```javascript
let promise = new Promise((resolve, reject) => {
  let success = true;

  if (success) resolve("Done");
  else reject("Failed");
});
```

#### Async / Await (React standard)

```javascript
async function getData() {
  try {
    let res = await fetch("https://api.quotable.io/random");
    let data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```

### Error Handling

**try-catch**

```javascript
try {
  let x = y + 10;
} catch (error) {
  console.log("Error:", error.message);
} finally {
  console.log("Always runs");
}
```

### Import & Export (ES Modules)

#### Enable Module in HTML

```html
<script type="module" src="main.js"></script>
```

#### Named Export

```javascript
// math.js
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;

// main.js
import { add, sub } from "./math.js";
```

#### Default Export

```javascript
// greet.js
export default function greet() {
  console.log("Hello");
}

import greet from "./greet.js";
```

#### Mixed Export

```javascript
export const name = "Anubhav";
export default function greet() {}
```

## Final React-Preparation Checklist

Before starting React, you must be comfortable with:

- map, filter, reduce
- Object & array destructuring
- Spread operator
- Arrow functions
- Async / await
- import / export
Displaying Day 66 Basics of JS.md.