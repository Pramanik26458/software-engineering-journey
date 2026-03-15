// Complete the function 'runTwice' that takes another function as an argument and calls it two times.

function runTwice(fn) {
fn();
fn();

}
runTwice(function() {
    console.log("Hello, World!");
});


// ceate a pure function that always return the same output for the give input ,and one impoure function using a global variable.

function pureFunction(x, y) {
    return x + y;
}
console.log(pureFunction(3, 4)); 
console.log(pureFunction(3, 4)); // Always returns 7 for inputs 3 and 4

let globalVar = 10; 
function impureFunction(x) {
    globalVar++;
    return x + globalVar; 
}
console.log(impureFunction(5)); 
console.log(impureFunction(5)); // Output depends on the value of globalVar




// Write a function that uses destructuring to extract 'name' and 'age' from an object parameter and logs them.
function des({name, age}) {
    console.log(`My name is ${name} and I am ${age} years old.`);
}   
des({name: "Basak", age: 20});



// Create an object with properties and two methods: one regular function and one arrow function. Log 'this' in both methods to see the difference.
let obj={
    name:"Basak",
    age:20,
    city:"Jamshedpur",

    fun:function(){
        console.log(this);
    }
    ,
    fun2:()=>{
        console.log(this);
    }
}
obj.fun();
obj.fun2();



// Use the map function to create a new array that doubles each number in the original array.
let arr=[1,2,3,4,5];
let arr2=arr.map(function(x){
    return x*2;
});
console.log(arr2);




// Use the filter function to create a new array that only includes even numbers from the original array.
let arr3=[1,2,3,4,5];
let newArr=arr3.filter(function(val){
    return val%2===0;
}   
);
console.log(newArr);


// let salaries = [2000, 3000, 4000, 5000];
// Use the reduce function to calculate the total sum of all salaries in the array.
let salaries = [2000, 3000, 4000, 5000];    
let totalSalary=salaries.reduce(function(acc,val){
    return acc+val;
},0);
console.log(totalSalary);


// create an array of name and use some() and every() to test a condition (e.g., check if some names have length greater than 3 and if every name has length greater than 2).

let names=['Basak','Anu','Jo','Sam'];

let someResult=names.some(function(name){
    return name.length>3;
});
console.log(someResult); // true

let everyResult=names.every(function(name){
    return name.length>2;
});
console.log(everyResult); // false


// create an onbject user and test the behaviour of Object. freeze() and Object.seal() by adding/changing keys/values.
let user={
    name:'Basak',
    age:20
};
Object.freeze(user);
user.name='Anu'; // This will not change
user.city='Jamshedpur'; // This will not add
console.log(user);

let user2={
    name:'Sam',
    age:25,
    
};
Object.seal(user2);
user2.name='Max'; // This will change
user2.city='Delhi'; // This will not add
console.log(user2); 



// create a nested onject  (user->address->city,state) and access the city and state values inside it.

let user3={
    name:'Basak',
    age:20,
    address:{
        city:'Jamshedpur',
        state:'Jharkhand'
    }
};
console.log(user3.address.city);
console.log(user3.address.state);
