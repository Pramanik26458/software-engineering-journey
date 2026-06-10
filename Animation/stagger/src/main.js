import gsap from "gsap";
import './style.css'

// gsap.to('h1 span',{
//   y:500,
//   duration:1.4,
//   opacity:0,
//   ease:"expo.out",
//   stagger:{
//     each:0.03,
//     from:"center"
//   }
// })


// gsap.to('.box1',{
//   x:1000,
//   duration:1.4,
//   delay:0.6,
//   ease:"expo.out",
  
// })

// gsap.to('.box2',{
//   x:1000,
//   duration:1.4,
//   delay:0.6,
//   ease:"expo.out",
  
// })
// import gsap from "gsap";

// const tl = gsap.timeline();

// tl.to('.box1', {
//   x: 500,
//   duration: 1,
//   ease: "power3.out",
//   delay: 0.6
// })
// .to('.box2', {
//   x: 500,
//   duration: 1,
//   ease: "power3.out"
// },
// "<")
// .to('.box3', {
//   x: 500,
//   duration: 1,
//   ease: "power3.out"
// },"<0.3")
// .to('.box4', {
//   x: 500,
//   duration: 1,
//   ease: "power3.out"
// },"+=0.1")
// .to('.box5', {
//   x: 500,
//   duration: 1,
//   ease: "power3.out"
// },"-=0.1")


let count = 0;

const loaderCount = document.querySelector('.loaderCounter h1');

const interval = setInterval(() => {

  count++;

  loaderCount.textContent = `${count}%`;

  if (count === 100) {
    clearInterval(interval);
    landingAnimation()
  }

}, 30);

function landingAnimation() {

  const tl = gsap.timeline();

  tl.to('.loaderCounter', {
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  })

  .to('.loader', {
    yPercent: 100,
    duration: 1,
    ease: "expo.out"
  }, "<")

  .from('.background img', {
    scale: 1.3,
    duration: 1.1,
    ease: "expo.out"
  }, "-=0.2")

  .from('.heading h1', {
    yPercent: 100,
    duration: 1,
    ease: "expo.out"
  }, "-=0.97")

  .from('.subHeading h2', {
    yPercent: 100,
    duration: 1,
    ease: "expo.out"
  }, "=0.27");
}