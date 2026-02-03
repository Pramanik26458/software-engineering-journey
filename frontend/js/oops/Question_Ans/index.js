// SECTION 1: Objects and OOPS Thinking (Foundation)

// 1.	Create a user object that stores name and email and has a login method which prints “User logged in”.

console.log(
  "\n============= SECTION 1: Objects and OOPS Thinking (Foundation) ==============\n",
);
console.log("\n-------1st Question-------\n");

let User = {
  name: "Mr.pramanik",
  email: "mr@gamil.com",
  login: function () {
    console.log(`${this.name} has logged in`);
  },
};
User.login();

//  2.	Imagine you now have 5 users.
// First, think how you would manage them without using a class.
// Then convert the same logic using a class and observe how the code becomes cleaner. Write code for both approaches.

console.log("\n-------2nd Question-------\n");

class User1 {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  login() {
    return `${this.name} has Sucessfully loggedIn 🥳`;
  }
}
let u1 = new User1("ram", "ram@gmail.com");
let u2 = new User1("shyam", "shyam@gmail.com");
let u3 = new User1("Mohan", "mohan@gmail.com");
let u4 = new User1("sita", "sita@gmail.com");
let u5 = new User1("gita", "gita@gmail.com");

console.log(u1.login());
console.log(u2.login());

// 3.	Create a product object that stores name and price and has a method which returns the final price after discount.
console.log("\n-------3rd Question-------\n");

let Product = {
  name: "Bottle",
  price: 56,
  discount: 5,
  finalP: function () {
    console.log(
      `the final Price of the ${this.name} is ₹${this.price - (this.price * this.discount) / 100} after ${this.discount}% discount`,
    );
  },
};

Product.finalP();

console.log("\n========== SECTION 2: Classes and Objects ============\n");

/* 4.	Create a Car class with the following:
brand
speed
a drive method that prints the car brand and speed */

console.log("\n-------4th Question-------\n");

class Car {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }
  drive() {
    console.log(
      `The car brand is ${this.brand} and it is driving at a speed of ${this.speed} km/h`,
    );
  }
}
let car1 = new Car("Toyota", 120);
car1.drive();

// 5.	Create two different car objects from the same class and verify that their data is different.
let car2 = new Car("TATA", 130);
car2.drive();

console.log(
  "\n========== SECTION 3: Constructor and this keyword ============\n",
);

// 7.	Create a Student class whose constructor accepts name and roll number.

class Student {
  constructor(name, roll_No) {
    name = name;
    roll_No = roll_No;
  }

  intro() {
    console.log(
      `name of the Student is ${this.name} and roll No. is ${this.roll_No}`,
    );
  }
}

let std = new Student("Mohan", 2301292457);
// console.log(std);
std.intro();

/* 9.	Create an object with two methods:
One method using a normal function
One method using an arrow function */

let obj = {
  sayName: function () {
    console.log(this);
  },
  sayArrowName: () => {
    console.log(this);
  },
};

obj.sayName();
obj.sayArrowName();

console.log(
  "\n========== SECTION 4: Constructor Functions and Prototypes ============\n",
);

/*  10.	Create a User constructor function (do not use class syntax).
	11.	Add a login method in two ways:
*/

function Boy(name) {
  this.name = name;
  this.loggedin = function () {
    console.log("loggedin");
  };
}

// Boy.prototype.loggedin=function(){
//     console.log("loggedin");
// }

let user1 = new Boy("Basak");
let user2 = new Boy("Pramanik");

console.log(user1.loggedin == user2.loggedin);

console.log("\n========== SECTION 5: call, apply, bind ============\n");
/*
13.	Create a function that prints this.name.
14.	Create an object that contains a name property.*/


function abcd() {
  console.log(this.name);
}

let obj1 = {
  name: "Mr.pramanik",
};
abcd.call(obj1); // Using call
abcd.apply(obj1); // Using apply



