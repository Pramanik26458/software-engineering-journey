// =====================================================
// SYNCHRONOUS vs ASYNCHRONOUS JAVASCRIPT
// =====================================================

// Synchronous Code (Executes line by line)
console.log("About synchronous and asynchronous code");
console.log("Synchronous code - executes line by line");
console.log("More synchronous code");

// Asynchronous Code (Executes after task completion)
console.log("Asynchronous code example starts");

setTimeout(() => {
  console.log("Asynchronous code executed after 1 second");
}, 1000);

console.log("This runs before the asynchronous code");

// =====================================================
// CALLBACK FUNCTION EXAMPLE
// =====================================================

// A callback is a function passed as an argument
// and executed after a task completes.

function fetchData(callback) {
  setTimeout(() => {
    const data = "Data fetched from server";
    callback(data);
  }, 2000);
}

fetchData((data) => {
  console.log(data);
});

// Simple callback example
function executeFunction(fn) {
  fn();
}

executeFunction(() => {
  console.log("Callback function executed");
});

// =====================================================
// CALLBACK HELL (Pyramid of Doom)
// =====================================================

function startProcess(fn1) {
  fn1(function (fn2) {
    fn2(function (fn3) {
      fn3(function (fn4) {
        fn4(function () {
          console.log("Callback Hell Example");
        });
      });
    });
  });
}

startProcess(function (next1) {
  next1(function (next2) {
    next2(function (next3) {
      next3(function (next4) {
        next4(function () {});
      });
    });
  });
});

// =====================================================
// REAL-LIFE STYLE EXAMPLES
// =====================================================

// Example 1: Fetch Address Details
function getAddressDetails(address, callback) {
  console.log("Fetching address details...");

  setTimeout(() => {
    callback({ latitude: 23.36, longitude: 76.5 });
  }, 3000);
}

getAddressDetails("H-4 Block", (details) => {
  console.log("Address Details:", details);
});

// Example 2: Bring Ice Cream
function bringIceCream(address, callback) {
  // Simulating task
  callback("Ice Cream");
}

bringIceCream("Some Address", (iceCream) => {
  console.log("Delivered:", iceCream);
});
