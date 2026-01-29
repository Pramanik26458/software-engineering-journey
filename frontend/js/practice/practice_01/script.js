/* 
========================================
 Level 1 – Pure Beginner Practice Tasks
========================================
1. Print numbers from 1 to 10 using loop
2. Print only even numbers from 1 to 20 using loop
3. Print numbers from 10 to 1 (Reverse loop)
4. Print the word "yes" 5 times using loop
5. Print whether numbers from 1–10 are even or odd
6. Take number input and print even/odd (prompt + conditional)
7. Take age input and print if eligible to vote (prompt + conditional)
8. Multiplication table of 5 using loop
9. Check whether number is positive or negative
10. Count how many numbers are greater than 8 from 1–15
11. Create password prompt with up to 3 attempts
12. Unlimited password attempts until correct password entered
13. Print numbers from 1 to 50 which are divisible by 7
14. Print the sum of first 30 odd numbers
15. Keep asking user for number until they enter an even number
16. Print numbers between two user input values (start and end)

========================================
*/

// ========================================
// Q1: Print numbers from 1 to 10
// ========================================
// for (let i = 1; i <= 10; i++) {
//   console.log(i);
// }

// ========================================
// Q2: Print even numbers from 1 to 20
// ========================================
// for (let i = 1; i <= 20; i++) {
//   if (i % 2 === 0) console.log(i);
// }

// ========================================
// Q3: Print numbers from 10 to 1 (Reverse)
// ========================================
// for (let i = 10; i >= 1; i--) {
//   console.log(i);
// }

// ========================================
// Q4: Print the word "yes" 5 times
// ========================================
// for (let i = 1; i <= 5; i++) {
//   console.log("yes");
// }

// ========================================
// Q5: Multiplication table of 5
// ========================================
// for (let i = 1; i <= 10; i++) {
//   console.log(`5 x ${i} = ${5 * i}`);
// }

// ========================================
// Q6: Check even/odd for numbers 1–10
// ========================================
// for (let i = 1; i <= 10; i++) {
//   console.log(i, i % 2 === 0 ? "even" : "odd");
// }

// ========================================
// Q7: Take a number input and print even/odd
// ========================================
// let a = prompt("Enter a number:");
// if (a % 2 === 0) console.log("Even");
// else console.log("Odd");

// ========================================
// Q8: Check voting eligibility
// ========================================
// let age = prompt("Enter your age:");
// if (age >= 18) console.log("You are eligible to vote");
// else console.log("You are not eligible to vote");

// ========================================
// Q9: Check positive or negative
// ========================================
// let num1 = +prompt("Enter a number:");
// if (num1 >= 0) console.log("Positive");
// else console.log("Negative");

// ========================================
// Q10: Count numbers greater than 8 (1–15)
// ========================================
// let count = 0;
// for (let i = 1; i <= 15; i++) {
//   if (i > 8) count++;
// }
// console.log(`Count: ${count}`);

// ========================================
// Q11: Password prompt with 3 attempts (OLD VERSION)
// ========================================
// let attempts = 0;
// let pass = "admin123";
// let open = false;
// let passd = prompt("Enter password:");
// while (passd !== pass) {
//   if (attempts === 3) {
//     console.error("Account locked");
//     break;
//   }
//   console.warn(`Wrong password, you have ${3 - attempts} attempts left`);
//   passd = prompt("Enter password again:");
//   if (passd === pass) open = true;
//   attempts++;
// }
// if (open) console.log(`Account opened, Welcome ${pass} 🥂🥳🍾`);

// ========================================
// Q12: Unlimited password attempts
// ========================================
// let correctPass = "basak";
// let userInput = prompt("Enter your password:");
// while (userInput !== correctPass) {
//   console.warn("Wrong password, try again");
//   userInput = prompt("Enter your password:");
// }
// console.log(`Welcome ${correctPass} 🥂🥳🍾`);

// ========================================
//  FINAL PASSWORD SYSTEM (RUN THIS)
// ========================================

// let attempts2 = 0;
// let correctPassword = "secret";
// let userInput2 = prompt("Enter your password");
// attempts2++;

// while (attempts2 < 3 && userInput2 !== correctPassword) {
//   console.warn("Wrong password, try again");
//   console.log(`You have ${3 - attempts2} attempts left`);
//   userInput2 = prompt("Enter your password");
//   attempts2++;
// }

// if (attempts2 === 3 && userInput2 !== correctPassword) {
//   console.error("Account locked");
// } else {
//   console.log(`Account opened, Welcome ${correctPassword} 🥂🥳🍾`);
// }

// ========================================
// Ask user for words until they type "Stop" count how many time "yes" words were entered
// ========================================

// let yesCount = 0;
// let userWord = prompt("Enter a word (type 'Stop' to end):");

// while (userWord !== "Stop") {
//   if (userWord === "yes") yesCount++;
//   userWord = prompt("Enter a word (type 'Stop' to end):");
// }

// console.log(`You entered "yes" ${yesCount} times.`);

// ========================================
// Q13:print nuber 1-50 which are divisible by 7
// ========================================

// for(let i=1;i<=50;i++){
//   if(i%7==0){
//     console.log(i);
//   }
// }

//==========================================
// Q14: print the sum of first 30 odd numbers
//==========================================

// let sumOdd=0;
// for(let i=0;i<=30;i++){
//   if(i%2!=0){
//     sumOdd+=i;
//   }
//   else{
//     sumOdd+=0;
//   }
// }
// console.log(`Sum of first 30 odd numbers is: ${sumOdd}`);

//==========================================
// Q15: keep asking user for number until they enter  an even number
//==========================================

// let num=+prompt("Enter a number:");
// while(num%2!==0){
//   num=+prompt("Enter a number:");
// }

//==========================================
//Q16: print numbers b/w two user input input start and and end using prompt- print all b/w
//==========================================

// let start=+prompt("Enter start number:");
// let end=+prompt("Enter end number:");
// if(start>end){
//   console.error("Start number should be less than end number");
// }
// for(let i=start;i<=end;i++){
//   console.log(i);
// }

//==========================================
//Q17: print first 3 odd number from 1-20
//==========================================

// let cnt=0;
// for(let i=1;i<=20;i++){
//   if(cnt==3) break;
// if(i%2!=0){
//   console.log(i);
//   cnt++;
// }
// }

//==========================================
//Q18: ask user 5 Number . count howw many number are positive
//==========================================

// let cnt=0;
// for(let i=1;i<=5;i++){
//   let num=+prompt("Enter a number:");
//   if(num>0){
//     cnt++;
//   }
// }
// console.log(`You entered ${cnt} positive numbers.`);

//===========================================
//Q19. Atm Withdrawal Simulation, User has initial balance of $1000, 
// can make up to 3 withdrawals. For each withdrawal, prompt user for amount. If amount is less than or equal to balance, deduct it and show remaining balance. If amount exceeds balance, show "Insufficient balance" and end process. After 3 successful withdrawals or insufficient balance, display "Thank you for using our ATM service."
//===========================================

let balance = 1000;
// let amt=+prompt("Enter amount to withdraw:");
let count = 0;
let flag = false;
while (balance > 0 && count !== 3) {
  let withdraw = +prompt("Enter amount to withdraw:");
  count++;
  if (withdraw <= balance) {
    console.log("Processing your withdrawal...");
    balance -= withdraw;
    console.log(`Withdrawal successful. Remaining balance: $${balance}`);
  } else {
    flag = true;
    break;
  }
}

if (flag == true) {
  console.log(
    `insufficient balance. You have exceeded your withdrawal limit or balance.`
  );
  console.log("Thank you for using our ATM service.");
}
