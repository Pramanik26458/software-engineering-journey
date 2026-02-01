// ================================
// Class Expression
// ================================

// Class expressions do NOT support hoisting
// let an1 = new Animal(); ❌ ReferenceError

let Animal = class {
  constructor() {
    this.name = "dodo";
    this.breed = "dog";
  }
};

let an1 = new Animal();
// console.log(an1.name);
// console.log(an1.breed);


// ================================
// Inheritance using extends
// ================================

class Pen {
  constructor() {
    this.price = 5;
    this.color = "Blue";
  }

  write() {
    return `i'm using the ${this.color} ${this.type} pen to write.`;
  }
}

class GelPen extends Pen {
  constructor() {
    super(); // calls parent constructor
    this.type = "gel";
  }
}

let pen1 = new GelPen();

console.log(pen1.price); // 5
console.log(pen1.color); // Blue
console.log(pen1.type);  // gel
console.log(pen1.write());


// ================================
// Getter and Setter (Encapsulation)
// ================================

class Boy {
  constructor() {
    this._age = 5; // private-like property
  }

  set age(age) {
    if (age < 18) {
      console.error("You are not eligible for marriage");
      return;
    }
    this._age = age;
  }

  get age() {
    return this._age;
  }
}

let boy = new Boy();
boy.age = 6; // invalid
console.log(boy.age); // 5




