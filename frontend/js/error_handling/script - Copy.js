// ================== Error Types ==================

// Syntax Error
// console.log("Hello World"   // missing )

// Runtime Error
// let x = 10;
// console.log(y); // y not defined

// Logical Error
function add(a, b) {
    return a - b;   // wrong logic
}

console.log(add(5, 10));



// ================== try - catch ==================

try {
    let a = 10;
    console.log(a);

    console.log(b);   // error
} catch (err) {
    console.log("Something went wrong");
}

console.log("Program still running");



// ================== Error Object ==================

try {
    let x = 5;
    console.log(x);

    console.log(y);   // error
} catch (err) {
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
} finally {
    console.log("Done");
}



// ================== Custom Error ==================

try {
    let c = 12;

    if (typeof c !== "object") {
        throw new Error("Invalid data type");
    }

    console.log(c.name.first);
} catch (err) {
    console.log(err.message);
}
