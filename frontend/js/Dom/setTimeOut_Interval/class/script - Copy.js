// // setTimeout-delay 
// console.log('hello guys ');
// setTimeout(()=>{
//     console.log(" hello guys 1 ")
// },4000)
// setTimeout(()=>{
//     console.log(" hello guys 2 ")
// },2000)
// setTimeout(()=>{
//     console.log(" hello guys 3 ")
// },3000)
// // console.log("hello 4")

var btn=document.querySelector("button")
var h1=document.querySelector('h1')

btn.addEventListener('click',()=>{
    setTimeout(()=>{
     h1.innerHTML="Hello i am Ashok!!!"
    },2500)
    setTimeout(()=>{
     h1.innerHTML="Hello i am Anima!!!"
    },4000)
    
    setTimeout(()=>{
     h1.innerHTML="Hello i am Pramanik!!!"
    },6500)

})



var a=0;
var int=setInterval(()=>{
    a++
    console.log(a);
},1000)

setTimeout(() => {
 clearInterval(int); // used to stop the the interval
 
}, 5000);