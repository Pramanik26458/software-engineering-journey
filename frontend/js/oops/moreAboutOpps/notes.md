# JavaScript OOP Notes (Classes & Inheritance)

This file explains **Class Expression**, **Inheritance**, and **Getters & Setters**
in a simple and beginner-friendly way.

---

## 1. Class Expression

### What is a Class Expression?
A class expression is when we assign a class to a variable.
That variable name becomes the class name.

Example:
- The class is stored inside a variable
- The class cannot be used before declaration

### Important Points
- Class expressions do NOT support hoisting
- You must declare the class before creating an object
- Similar behavior to `let` and `const`

If accessed before declaration:
ReferenceError occurs.

---

## 2. Inheritance in JavaScript

### What is Inheritance?
Inheritance allows one class (child) to reuse properties and methods
of another class (parent).

### Keywords Used
- `extends` → to inherit a class
- `super()` → to call the parent constructor

### How it Works
- Child class automatically gets parent properties
- Parent methods can access child properties
- `super()` must be called before using `this`

---

## 3. Getters and Setters

### What is Encapsulation?
Encapsulation means protecting data and controlling access to it.

JavaScript provides:
- `get` → to read data
- `set` → to update data with validation

### Why Use `_propertyName`?
JavaScript does not have true private properties.
Using `_` is a convention to indicate private-like variables.

---

## 4. Advantages of Getters & Setters
- Data validation
- Better security
- Clean and maintainable code
- Follows OOP principles

---


## JS OOP – Quick Ref
• Class Expression → no hoisting
• Inheritance → extends, super()
• Getter/Setter → encapsulation & validation

• Ref:https://drive.google.com/file/d/1p-tDlfAoMp0-j987C9VE7PExzcwOf-Cs/preview
*/

## Summary

| Concept | Description |
|-------|------------|
| Class Expression | Class stored in a variable |
| Inheritance | Reuse code using `extends` |
| super() | Calls parent constructor |
| Getter | Reads value safely |
| Setter | Updates value with rules |
