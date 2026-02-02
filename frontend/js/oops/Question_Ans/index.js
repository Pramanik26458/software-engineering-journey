// SECTION 1: Objects and OOPS Thinking (Foundation)


// 1.	Create a user object that stores name and email and has a login method which prints “User logged in”.

console.log("\n============= SECTION 1: Objects and OOPS Thinking (Foundation) ==============\n")
console.log("\n-------1st Question-------\n")


let User={
    name:"Mr.pramanik",
    email:"mr@gamil.com",
    login: function(){
        console.log(`${this.name} has logged in`)
    }
}
User.login();


//  2.	Imagine you now have 5 users.
// First, think how you would manage them without using a class.
// Then convert the same logic using a class and observe how the code becomes cleaner. Write code for both approaches.

console.log("\n-------2nd Question-------\n")

class User1{
    constructor(name,email){
        this.name=name;
        this.email=email;
    }
    login(){
        return `${this.name} has Sucessfully loggedIn 🥳`
    }
}
let u1=new User1("ram","ram@gmail.com")
let u2=new User1("shyam","shyam@gmail.com")
let u3=new User1("Mohan","mohan@gmail.com")
let u4=new User1("sita","sita@gmail.com")
let u5=new User1("gita","gita@gmail.com")

console.log(u1.login())
console.log(u2.login())


// 3.	Create a product object that stores name and price and has a method which returns the final price after discount.
console.log("\n-------3rd Question-------\n")

let Product={
    name:"Bottle",
    price:56,
    discount:5,
    finalP:function(){
        console.log(`the final Price of the ${this.name} is ₹${(this.price)-this.price*this.discount/100} after ${this.discount}% discount`)
    }
}

Product.finalP();


console.log("\n========== SECTION 2: Classes and Objects ============\n")