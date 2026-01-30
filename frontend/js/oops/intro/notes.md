# Object-Oriented Programming (OOP) in JavaScript

Object-Oriented Programming (OOP) helps us write **clean, reusable, and well-structured code** by organizing our logic into **objects and classes**.

This repository contains my **personal notes while learning OOP in JavaScript**, written in very **simple language** so that even someone who is starting from zero can understand.

👉 All **runnable code examples** related to these topics are written in **`index.js`**. This README focuses only on **concepts and explanations**.

---

## Project Structure

```text
├── index.js   // All OOP practical code and experiments
└── README.md  // OOP concepts explained in simple language
```

---

## What is OOP?

OOP is a way of writing code where:

* Data and the functions that work on that data stay together
* Code becomes easier to read and manage
* Logic can be reused instead of writing it again and again

JavaScript supports OOP mainly using **objects**, **classes**, **constructors**, **prototypes**, and function context (`this`).

---

## Object in JavaScript

An object represents a **real-world entity** in code.

* It stores data using **properties**
* It performs actions using **methods**

👉 **Important:** An object is an **instance of a class**.

In JavaScript, objects can also be created **without using classes** (for example, using object literals). This is one reason JavaScript is more flexible than traditional OOP languages.

---

## Class in JavaScript

A class is a **blueprint** used to create multiple objects with the same structure and behavior.

### Naming Convention (Important)

Class names are written in **PascalCase**:

* ✅ `User`
* ✅ `Car`
* ❌ `user`
* ❌ `car`

This convention helps clearly differentiate **classes** from **objects and variables**.

---

## Constructor

A constructor is a **special method** inside a class.

* It runs automatically when an object is created
* It initializes object properties
* A class can have only **one constructor**

The `this` keyword inside a constructor refers to the **current object being created**.

---

## The `this` Keyword

The `this` keyword refers to the **object that is calling the function**.

Its value depends on **how the function is called**, not where it is written.

In JavaScript, `this` behaves differently in:

* Global scope
* Normal functions
* Object methods
* Arrow functions

Understanding `this` is very important before learning `call`, `apply`, and `bind`.

---

## call(), apply(), and bind()

In JavaScript, **call**, **apply**, and **bind** are used to **explicitly control the value of `this`**.

👉 **Core idea:** If a function’s `this` refers to `window`, but we want it to refer to another object, we can use **call()**, **apply()**, or **bind()** to explicitly set the value of `this`.

They are useful when:

* A function’s `this` is not pointing to the expected object
* We want to reuse the same function with different objects
* We are working with callbacks or detached functions

### call()

* Invokes the function **immediately**
* Arguments are passed **one by one**
* Explicitly sets the value of `this`

### apply()

* Similar to `call()`
* Invokes the function **immediately**
* Arguments are passed as an **array**

### bind()

* Does **not** invoke the function immediately
* Returns a **new function** with `this` permanently bound
* The returned function can be called later

### Quick Difference

* `call()` → call now, arguments separately
* `apply()` → call now, arguments as an array
* `bind()` → bind now, call later

---

## Class Documents

For additional reference and better understanding, the documents related to these classes can be found here:

👉 Class document 1: [https://drive.google.com/file/d/1utpaP_5q21IdorzK8SnPVJ7uFgGprcVa/view](https://drive.google.com/file/d/1utpaP_5q21IdorzK8SnPVJ7uFgGprcVa/view)

👉 Class document 2: [https://drive.google.com/file/d/1FlGNQoOXk65FHlFz5jELV6pY4ggBo6HV/previ](https://drive.google.com/file/d/1FlGNQoOXk65FHlFz5jELV6pY4ggBo6HV/previ)

## Final Note

These notes are written by me while learning JavaScript OOP.

They focus on **clear understanding**, not memorizing definitions. I’ll keep updating this repository as I learn more and practice regularly.

This repo represents my learning journey, step by step.
