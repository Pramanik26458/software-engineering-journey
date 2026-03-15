console.log("connected")

var   a="basak";
let b="sheryians"
const c="guy"

// a="updated";
// b="updated";
// c="updated";

{
    let x=10;
}

console.log("basak")
console.info("basak")
console.warn("basak")
console.error("basak")

// let y=prompt("name?")
//  alert(`${y}`)

 // what ever we will ake from prompt that will be string

 let nam="basak"


//  let age=prompt("what  is your age? ")

//  console.log(age+5," is a", typeof age,)


 let msg="i love sheryians"
 console.log(msg.slice(2,6));
 
//  msg.split('');
 console.log(msg.split(''));
 
//  msg.replace("love"," study at");
 console.log(msg.replace("love"," study at"));
 

// let y=5+10*2;
// console.log(y)

let age=25;
console.log(age,typeof age);
let skills=['html','js'];
console.log(skills,typeof skills);


let n=null;
console.log(n,typeof n);

let u;
console.log(u,typeof u);

let i="basak_0"
console.log(i+8);

console.log(1/0);

console.log(0/0);

console.log(undefined+1);

// premitivve vs refrence

let x=5
let y=x
    y=10;
console.log(x,y);

let obj1={
    name:"basak"
};
let obj2=obj1;
obj2.name="pramanik"

console.log(obj1,obj2);