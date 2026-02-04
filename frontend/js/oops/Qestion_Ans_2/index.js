// SECTION 1: OOPS Thinking with Objects

	// 1.	Create an object called laptop that contains brand, price, and a start method that prints “Laptop started”.
const laptop = {
    brand: "Dell",
    price: 800,
    start: function() {
        console.log("Laptop started");
    }
};
laptop.start();
  
	// 2.	Add one more method to the same object that increases the price by 10 percent.
laptop.increasePrice = function() {
    this.price *= 1.10;
};

laptop.increasePrice();
console.log(laptop.price);

