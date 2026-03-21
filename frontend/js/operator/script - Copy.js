// operators

console.log(12*13)
console.log(12%13) // 12 can't be devided by 13 
console.log(13%12) // 13 can be devided by 12 with remainder 1
console.log(2**2) // exponentiation 2^2 = 4

// assignment operators
let a = 5
a += 3 // a = a + 3
console.log(a) // 8 
a *= 2 // a = a * 2
console.log(a) // 16

a -= 4 // a = a - 4
console.log(a) // 12
a /= 3 // a = a / 3 12/3=4
console.log(a) // 4

a%=3 // a = a % 3 4%3=1
console.log(a) // 1

// increment and decrement operators
let b = 10
b++ // b = b + 1
console.log(b) // 11    

b-- // b = b - 1
console.log(b) // 10

// comparison operators
console.log(5 == '5') // true, only value is compared
console.log(5 === '5') // false, value and type are compared strict equality
console.log(5 != '5') // false, only value is compared 
console.log(5 !== '5') // true, value and type are compared strict inequality

console.log(7 > 3) // true
console.log(7 < 3) // false
console.log(7 >= 7) // true
console.log(7 <= 5) // false


// loical operators
console.log(true && false) // false, both operands must be true
console.log(true || false) // true, at least one operand must be true
console.log(!true) // false, negation operator
console.log(!false) // true

// operator precedence
console.log(3 + 4 * 2) // 11, multiplication has higher precedence than addition
console.log((3 + 4) * 2) // 14, parentheses change the order of evaluation

// ternary operator
let age = 20
let canVote = (age >= 18) ? 'Yes' : 'No'
console.log(canVote) // Yes

// type checking operator
console.log(typeof 42) // number
console.log(typeof 'Hello') // string
console.log(typeof true) // boolean
console.log(typeof {}) // object
console.log(typeof undefined) // undefined
console.log(typeof function() {}) // function
console.log(typeof null) // object (this is a known quirk in JavaScript)

let arr = [1,2,3]
console.log(arr instanceof Array)
// arr instanceof Array , true, checks if arr is an instance of Array


// string operators
let str1 = 'Basak '
let str2 = 'Pramanik!'
let greeting = str1 + str2 // concatenation
console.log(greeting) // Basak Pramanik!


greeting += ' How are you?' // concatenation assignment
console.log(greeting) // Basak Pramanik! How are you?


// spread /Rest more about spread operator in arrays and objects in later sections
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let combinedArr = [...arr1, ...arr2]
console.log(combinedArr) // [1, 2, 3, 4, 5, 6]  

let obj1 = {a: 1, b: 2}
let obj2 = {c: 3, d: 4}
let combinedObj = {...obj1, ...obj2}
console.log(combinedObj) // {a: 1, b: 2, c: 3, d: 4}    

// rest
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0)
} 

console.log(sum(1, 2, 3, 4)) // 10
console.log(sum(5, 10, 15)) // 30

// nullish coalescing operator
let userInput = null
let defaultValue = 'sorry'
let finalValue = userInput ?? defaultValue
console.log(finalValue) // sorry

userInput = 'Hello'
finalValue = userInput ?? defaultValue
console.log(finalValue) // Hello 

// optional chaining operator
let user = {
    name: 'Basak',
    address: {
        city: 'New York'
    }
}  
console.log(user.address?.city) // New York
console.log(user.contact?.phone) // undefined, no error thrown if we keep here ? mark then we will not get error



// hoisting with var -  mtlab hai ki variable create se pahle hi use kar sakte hai but value undefined rahegi
// hoisting mai veriable toot do part mai divide ho jata hai declaration and initialization 
// hoisting ke time pe sirf declaration upar chala jata hai , initialization wahi rehta hai jaha pe likha hai
//  hoisting sirf var ke sath hota hai , let and const ke sath nahi hota


console.log(x) // undefined due to hoisting
var x = 10
console.log(x) // 10


// console.log(y) // 20 // ReferenceError: Cannot access 'y' before initialization
let y = 20
console.log(y) // 20