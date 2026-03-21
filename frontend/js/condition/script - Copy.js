// condition

let age=17;
if(age>=18){
    console.log("you can vote");
}
else{
    console.log("you can't vote");
}

// falsy values- 0 "" false null undefined NaN document.all
// truthy values- 1 "hello" -1 true {}

if(""){
    console.log("this is truthy");
} else{
    console.log("this is falsy");
}



// ternary operator

// condition? true statement: false statement

let number=4;
number%2==0 ? console.log("even"): console.log("odd");



switch(5){
    case 1:
        console.log("one");
        break;
    case 2:
        console.log("two");
        break;
    case 3:
        console.log("three");
        break;
    default:
        console.log("no match");
        break;
}

