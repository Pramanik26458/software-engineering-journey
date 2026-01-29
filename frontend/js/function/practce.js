

function doSomething(name,age,email){
console.log("Name is: " + name);
console.log("Age is: " + age);
console.log("Email is: " + email);
console.log("-------------------");

console.log(`Name is: ${name}, Age is: ${age}, Email is: ${email}`);

console.log("-------------------");

console.log(name,age,email);
console.log("-------------------");

console.log(arguments[0])   
}
doSomething("John", 25 ,"xyz@gmail.com")



