// OOPS in JavaScript - Basics

class Me {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hi, I'm ${this.name}`;
  }
}
const person = new Me("Basak", 20);
const person2 = new Me("Ashok", 23);
console.log(person.greet()); // Hi, I'm Basak
console.log(person2.greet()); // Hi, I'm Ashok

// student Data
class Student {
  constructor() {
    this.name = "Santosh";
    this.age = 20;
    this.grade = "A";
    this.subjects = ["frontend", "backend", "database"];
  }

  result() {
    console.log("result has been declared");
    return `${this.name} has scored ${this.grade} in the exams.`;
  }
}

let std1 = new Student();
console.log(std1); // Santosh, 20, A, [ 'frontend', 'backend', 'database' ]
console.log(std1.result()); // Santosh has scored A in the exams.

// book
class Books {
  constructor(name, price, author, color) {
    this.name = name;
    this.price = price;
    this.author = author;
    this.color = color;
  }
  ptOver() {}
  bookMark() {}
  Stusy() {}
}

let book1 = new Books("moral", 120, "Harman", "balck");
let book2 = new Books("os", 521, "Aliva Panda", "yellow");
let book3 = new Books("sql", 452, "John", "orange");

console.log(book1);
console.log(book2);
console.log(book3);

// prototype
class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
Human.prototype.sansLo = function () {
  console.log("I am breathing");
};
Human.prototype.khanaKhao = function () {
  console.log("I am eating");
};

let h1 = new Human("ram", 23);
console.log(h1);

let h2 = new Human("shyam", 25);
console.log(h2);

/**************************************************
 * Understanding `this` keyword in JavaScript
 * All important cases in one place
 **************************************************/

// 1️ `this` in global scope (Browser)
console.log(this);
// Output: window

// 2️ `this` inside a normal function
function normalFunction() {
  console.log(this);
}
normalFunction();
// Output: window (in non-strict mode)

// 3️ `this` inside an object method (normal function)
const user = {
  name: "Basak",
  showName: function () {
    console.log(this.name);
  },
};
user.showName();
// Output: Basak
// Reason: object is calling the function

// 4️ `this` inside an arrow function inside an object
const obj = {
  name: "JavaScript",
  show: () => {
    console.log(this);
  },
};
obj.show();
// Output: window
// Reason: arrow function does not have its own `this`

// 5️ Normal function inside another normal function (inside object)
const ladka = {
  name: "Basak",
  outerFunction: function () {
    function innerFunction() {
      console.log(this);
    }
    innerFunction();
  },
};
ladka.outerFunction();
// Output: window
// Reason: inner function is called normally, not by object

// 6️ Arrow function inside a normal function (inside object)
const student = {
  name: "Basak",
  outerFunction: function () {
    const innerArrow = () => {
      console.log(this.name);
    };
    innerArrow();
  },
};
student.outerFunction();
// Output: Basak
// Reason: arrow function borrows `this` from outerFunction





/**************************************************
 * call(), apply(), and bind() in JavaScript
 * Assuming `person` object is already declared

 * If a function’s this refers to window, but we want it to refer to another object, we can use call(), apply(), or bind() to explicitly set the value of this.

 **************************************************/

// Example existing object
// const person = { name: "Basak" };

// Normal function
function introduce(city, country) {
  console.log(
    `Hi, I am ${this.name} from ${city}, ${country}`
  );
}

/*
  1️⃣ call()
  - Executes immediately
  - Arguments passed one by one
  - Sets `this` to person
*/
introduce.call(person, "Bhubaneswar", "India");
// Output: Hi, I am Basak from Bhubaneswar, India



/*
  2️⃣ apply()
  - Executes immediately
  - Arguments passed as an array
  - Sets `this` to person
*/
introduce.apply(person, ["Bhubaneswar", "India"]);
// Output: Hi, I am Basak from Bhubaneswar, India



/*
  3️⃣ bind()
  - Does NOT execute immediately
  - Returns a new function
  - Permanently binds `this` to person
*/
const boundIntroduce = introduce.bind(
  person,
  "Bhubaneswar",
  "India"
);

// Called later
boundIntroduce();
// Output: Hi, I am Basak from Bhubaneswar, India
