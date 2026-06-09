import gsap from "gsap";
import './style.css'


// const box =document.querySelector('box')

// const obj={

//   a:0, // custom property
// }
// gsap.fromTo(
//   ".box",
//   {
//     a: 0,
//     opacity: 0
//   },
//   {
//     x:200,
//     y: 300,

//     opacity: 1,
//     duration: 2,
//     delay: 1
//   }
// );


// // easing

// gsap.set('.box',{
//   x:-300
// })

// gsap.to('.box', {
// x:1500,
// duration:2,
// ease: "circ.inOut",
// y:500,
// // repeat:2,// repeat for 3 times because one is bydefault and 2 time repeat  value 
// repeat:-1
// // yoyo:true,
// });



gsap.to('.box',{
  x:500,
  duration:1.4,
  delay:3,
  ease:'power2.inOut',

   onStart:()=>{
    console.log("animation is Started!!!")
   }
})