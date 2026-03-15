// arrays 


let arr=[12,4,5,7,8,9,55,64,65,45];
console.log(arr[5]);


// How to craete an array

let arr1=[];
let arr2=new Array();

// understand how to access elements of an array

let fruits=['apple','mango','banana','grapes'];
console.log(fruits[2]);


// function on Arrays -['push','pop','shift','unshift','length','toString','sort']

fruits.push('kiwi');
console.log(fruits);


fruits.pop();
console.log(fruits);


fruits.shift();
console.log(fruits);

fruits.unshift("orange")
console.log(fruits);



//index of

console.log(fruits.indexOf('banana'));

//array destructuring

let myFruits=['apple','banana','mango','grapes'];
let [fruit1,fruit2,fruit3,fruit4]=myFruits;
console.log(fruit3);


// filter method

let numbers=[12,45,67,89,23,45,78,90];

let filteredNumbers=numbers.filter((num)=>{
    return num>50;
});
console.log(filteredNumbers);

// spread operator

let array1=[1,2,3];
let array2=[4,5,6];

let combinedArray=[...array1,...array2];
console.log(combinedArray);


//  iterating over arrays using -['for loop' ,'for each']

let arr3=[1,2,3,4]

// for(let i=0;i<arr3.length;i++){
//     console.log(arr3[i]);
// }

arr3.forEach((element)=>{
    console.log(element);
});




let object1={
    name:'John',
    age:30,
    city:'New York'
};

// console.log(object1.name);

// or

console.log("age is " + object1['age']);


// Creating an object
let object2={};
let object3=new Object();

// Adding properties to an object
object2.name='Alice';
object2.age=25;
object2.city='Los Angeles';

console.log(object2);

// Object methods -['keys','values','entries','assign']

console.log(Object.keys(object1));
console.log(Object.values(object1));
console.log(Object.entries(object1));


// deleting a property from an object
delete object1.city;
console.log(object1);

//  nested object

let student={
    name:'Bob',
    age:22,
    address:{
        city:"bbsr",
        state:"odisha"
    }
};
console.log(student.address.city);
