# Object-Oriented Programming (OOP) in JavaScript

Object-Oriented Programming (OOP) helps us write **clean**, **reusable**, and **well-structured** code by organizing logic into **objects and classes**.

These notes are written as part of my learning journey and focus on **clarity over complexity**.

---

## 1. What is OOP?

OOP is a way of writing code where:

- Data and functionality stay together
- Code becomes easier to understand and manage
- We can reuse logic instead of rewriting it

JavaScript supports OOP using **objects**, **classes**, and **prototypes**.

---

## 2. Object in JavaScript

An object is a collection of **key–value pairs**.

- Keys are called **properties**
- Functions inside objects are called **methods**

Objects help group related data and actions together.

---

## 3. Class in JavaScript

A class is a **blueprint** used to create multiple objects with the same structure.

### Important rules about classes

- Class names should **always start with a capital letter**
- A class does not hold data itself
- Objects are created from a class using the `new` keyword

Example naming:
- ✅ `User`
- ✅ `Car`
- ❌ `user`
- ❌ `car`

---

## 4. Constructor

A constructor is a **special method** inside a class.

- It runs automatically when an object is created
- It is mainly used to **initialize values**
- A class can have only **one constructor**

Inside a constructor, we use `this` to refer to the current object.

---

## 5. `this` Keyword

- `this` refers to the **current object**
- It helps access properties and methods inside the same object
- The value of `this` depends on **how a function is called**

---

## 6. Prototype in JavaScript

JavaScript is a **prototype-based language**.

- Every function has a `prototype`
- Methods added to the prototype are **shared**
- This saves memory and improves performance

Instead of creating the same method for every object, JavaScript uses prototypes.

---

## 7. Inheritance

Inheritance allows one class to **reuse properties and methods** of another class.

- The parent class is also called **base class**
- The child class is also called **derived class**
- JavaScript uses the `extends` keyword for inheritance

Inheritance helps avoid code duplication.

---

## 8. Why OOP is useful

- Code becomes organized
- Easier to debug and maintain
- Reusability increases
- Useful for large applications
- Matches real-world thinking

---

## Final Note

These concepts become clearer with **practice**.

All runnable examples and experiments related to OOP are written in  
👉 `index.js`

This folder will be updated and improved as my understanding grows.
