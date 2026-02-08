/*
SECTION 1: OOPS Thinking with Objects
	1.	Create an object called laptop that contains brand, price, and a start method that prints “Laptop started”.
	2.	Add one more method to the same object that increases the price by 10 percent.
	3.	Now imagine you need 10 laptops with same structure but different data.
Write down (in words or code) what problems you will face if you keep using plain objects. 
*/
//1
const laptop = {
  brand: "Dell",
  price: 800,
  start: function () {
    console.log("Laptop started");
  },
};
laptop.start();
//2
laptop.increasePrice = function () {
  this.price *= 1.1;
};

laptop.increasePrice();
console.log(laptop.price);

// ---------------------------------------------------------------------------------------------------------------------------------------------------------
console.log(
  "\n ===========SECTION 2: OOPS Thinking with Classes================\n ",
);

/*
    4.  Create a class named Employee that stores:name,salary add a method showDetails that prints name and salary.
	5.	Create three employee objects from the same class and verify that modifying one employee does not affect the others.
	6.	Explain in your own words:
Why is class considered a better option than writing similar objects again and again?
*/

class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  showDetails() {
    console.log(`Name: ${this.name}, Salary: ${this.salary}`);
  }
}

let emp1 = new Employee("John", 50000);
emp1.showDetails();

let emp2 = new Employee("rohan", 80000);
emp2.showDetails();

let emp3 = new Employee("sohan", 60000);
emp3.showDetails();

emp1.salary = 350000;

console.log("\n after modifing the details of emp1 \n");
emp1.showDetails();
emp2.showDetails();
emp3.showDetails();

console.log(
  "\n ================== SECTION 3: Constructor and Initialization =====================\n",
);
//7

class BankAccount {
  constructor(AHName, balance) {
    this.AHname = AHName;
    this.balance = balance;
  }
  Deposit(depAmt) {
    this.balance += depAmt;
    let dateTime = new Date().toLocaleString();

    console.log(`Dear ${this.AHname} Your A/C has been credited with ₹${depAmt} on ${dateTime}.`);
    
  }
}

let BankAccount1=new BankAccount("rohan",2000)
let BankAccount2=new BankAccount("Mohan",2000)

BankAccount1.Deposit(500);
console.log(`Available Balance: ₹${BankAccount1.balance}.\n`);

console.log(`Another Account Available Balance: ₹${BankAccount2.balance} \n`);

/*
SECTION 4: Understanding this (Very Important)
	11.	Create an object named profile with a property username and a method printName that logs this.username.
	12.	Call the method normally and observe the output.
	13.	Store the method in a separate variable and call it.
Observe what happens to this and explain why.
	14.	Modify the code so that this works correctly again.
  */

  console.log('\n SECTION 4: Understanding this (Very Important) \n');

  let profile={
    username:"Basak",
    printName:function(){
      console.log(this.username);
    }
  }
profile.printName();
// Output: Basak
// Reason: Method is called using the object, so `this` points to `profile`

let Uname= profile.printName;
Uname();
// Output: undefined
// Reason: Function is called without the object reference,
// so `this` becomes undefined (or window in non-strict mode)

const fixedShowName = profile.printName.bind(profile);
fixedShowName();
// Output: Basak
// Reason: bind() permanently sets `this` to the profile object

// `this` depends on HOW a function is called, not where it is defined
