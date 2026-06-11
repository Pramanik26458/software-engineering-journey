import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import './style.css'

// const play = document.querySelector('.play');

// const pause = document.querySelector('.pause');
// const restart = document.querySelector('.restart');
// const reverse = document.querySelector('.reverse');
// const seek = document.querySelector('.seek');

// // Fix: changed 'pause: true' to 'paused: true'
// const tl = gsap.timeline({ paused: true });

// tl.to(".box", {
//   x: 500,
//   duration: 1.3,
//   ease: "expo.out",
//   delay: 0.6,
// })
// .to(".box1", {
//   x: 500,
//   duration: 1.3,
//   ease: "expo.out",
// }, "basak")
// .to(".box2", {
//   x: 500,
//   duration: 1.3,
//   ease: "expo.out",
// }, "-=0.2")
// .to(".box3", {
//   x: 500,
//   duration: 1.3,
//   ease: "expo.out",
// }, "basak");

// // --- Button Event Listeners ---

// // Fix: changed "clcik" to "click"
// play.addEventListener("click", () => {
//   tl.play();
// });

// pause.addEventListener("click", () => {
//   tl.pause();
// });

// restart.addEventListener("click", () => {
//   tl.restart();
// });

// reverse.addEventListener("click", () => {
//   tl.reverse();
// });

// seek.addEventListener("click", () => {
//   // Seeks directly to 2 seconds into the animation
//   tl.seek(2); 
// });

// const loaderTimeline=()=>{
//   return gsap.timeline.toString(Element,{})



// }

// const navbarTimeLine=()=>{
//   return gsap.timeline()
// }
// const master =gsap.timeline();

// master.add(loaderTimeline,"-=0.4").add(navbarTimeLine);


gsap.set(".image", {
  scale: 0.3,
});

// Use vw (viewport width) so it dynamically starts outside the screen bounds safely
gsap.set(".content", {
  gap: "120vw", 
});

const t1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2",
    start: "top top",
    end: "+=120%", // Gives 120% of viewport height worth of scrolling to complete the effect
    scrub: 2,
    pin: true,
  }
});

t1.to(".image", {
  scale: 1,
  ease: "power2.out",
})
.to(".content", {
  gap: "4rem", // Brings text beautifully close together over the image
  ease: "power2.out"
}, "<"); // The "<" tag forces both animations to happen at the exact same time!

// gsap.to(".image",{
//   scale:1,
//   // x:500,
//   // duration:3,
//   ease:"power.out",
//   scrollTrigger:{
//     trigger:".page2",
//     start:"top top",
//     end:"top -40%",
//     scrub:2,
//     pin:true,
//     // onEnter:()=>{},
//     // onLeave:()=>{},
//     // onUpdate:()=>{},
//     // // onUpdate:()=>{},
//     // onUpdate:()=>{},
//   },
// })