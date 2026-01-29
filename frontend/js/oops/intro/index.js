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
const person = new Me('Basak', 20);
const person2 = new Me('Ashok', 23);
console.log(person.greet());  // Hi, I'm Basak
console.log(person2.greet()); // Hi, I'm Ashok


// student Data
class Student {
  constructor() {
    this.name ="Santosh";
    this.age = 20;
    this.grade = "A";
    this.subjects = ["frontend", "backend", "database"];

  }

  result() {
    console.log("result has been declared");
    return `${this.name} has scored ${this.grade} in the exams.`;
  }

}

let std1=new Student();
console.log(std1); // Santosh, 20, A, [ 'frontend', 'backend', 'database' ]
console.log(std1.result()); // Santosh has scored A in the exams.



// book
class Books{
    constructor(name,price,author,color){
        this.name=name;
        this.price=price;
        this.author=author;
        this.color=color;
    }
    ptOver(){}
    bookMark(){}
    Stusy(){}


}

let book1=new Books("moral",120,"Harman","balck");
let book2=new Books("os",521,"Aliva","yellow");
let book3=new Books("sql",452,"John","orange");

console.log(book1)
console.log(book2)
console.log(book3)


// prototype
class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
  Human.prototype.sansLo=function(){
    console.log("I am breathing");
  };
Human.prototype.khanaKhao=function(){
    console.log("I am eating");
  };


let h1=new Human("ram",23);
console.log(h1);

let h2=new Human("shyam",25);
console.log(h2);