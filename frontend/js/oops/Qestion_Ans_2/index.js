// =====================================================
// SECTION 1: OOPS Thinking with Objects
// =====================================================

const laptop = {
  brand: "Dell",
  price: 800,

  start() {
    console.log("Laptop started");
  },

  increasePrice() {
    this.price *= 1.1;
  }
};

laptop.start();
laptop.increasePrice();
console.log("Updated Price:", laptop.price);

/*
Problem with plain objects:
- Code duplication
- Hard to maintain
- Not scalable
*/


// =====================================================
// SECTION 2: OOPS Thinking with Classes
// =====================================================

class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  showDetails() {
    console.log(`Name: ${this.name}, Salary: ${this.salary}`);
  }
}

const emp1 = new Employee("John", 50000);
const emp2 = new Employee("Rohan", 80000);
const emp3 = new Employee("Sohan", 60000);

emp1.showDetails();
emp2.showDetails();
emp3.showDetails();

emp1.salary = 350000;

console.log("\nAfter modifying emp1 salary:\n");
emp1.showDetails();
emp2.showDetails();
emp3.showDetails();


// =====================================================
// SECTION 3: Constructor and Initialization
// =====================================================

class BankAccount {
  constructor(accountHolderName, balance) {
    this.accountHolderName = accountHolderName;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(
      `Dear ${this.accountHolderName}, ₹${amount} credited successfully.`
    );
  }
}

const account1 = new BankAccount("Rohan", 2000);
const account2 = new BankAccount("Mohan", 2000);

account1.deposit(500);

console.log("Account1 Balance:", account1.balance);
console.log("Account2 Balance:", account2.balance);


// =====================================================
// SECTION 4: Understanding 'this'
// =====================================================

const profile = {
  username: "Basak",

  printName() {
    console.log(this.username);
  }
};

profile.printName(); // Basak

const storedFunction = profile.printName;
storedFunction(); // undefined (this lost)

const fixedFunction = profile.printName.bind(profile);
fixedFunction(); // Basak

/*
Important:
'this' depends on how a function is called.
*/


// =====================================================
// SECTION 5: Constructor Function & Prototype
// =====================================================

function Vehicle(type, wheels) {
  this.type = type;
  this.wheels = wheels;
}

Vehicle.prototype.describe = function () {
  console.log(`This is a ${this.type} with ${this.wheels} wheels.`);
};

const vehicle1 = new Vehicle("Car", 4);
const vehicle2 = new Vehicle("Bike", 2);

vehicle1.describe();
vehicle2.describe();

console.log(vehicle1.describe === vehicle2.describe); 
// true → shared via prototype


// =====================================================
// SECTION 6: call() Method
// =====================================================

function showBrand() {
  console.log(this.brand);
}

const phone1 = { brand: "Apple" };
const phone2 = { brand: "Samsung" };

showBrand.call(phone1);  // Apple
showBrand.call(phone2);  // Samsung


// =====================================================
// SECTION 7: apply() Method
// =====================================================

function introduce(city, role) {
  console.log(
    `My name is ${this.name}, I'm from ${city} and I am a ${role}`
  );
}

const person = { name: "Alice" };

introduce.apply(person, ["New York", "Developer"]);


// =====================================================
// SECTION 8: bind() Method
// =====================================================

function greet() {
  console.log(
    `Hello, ${this.name}! Welcome to the world of JavaScript.`
  );
}

const user = { name: "Basak" };

const boundGreet = greet.bind(user);

boundGreet(); 
// Hello, Basak! Welcome to the world of JavaScript.
