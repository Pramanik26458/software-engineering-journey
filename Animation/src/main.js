import gsap from "gsap";
import './style.css'


// const box =document.querySelector('box')

const obj={

  a:0, // custom property
}
gsap.fromTo(
  ".box",
  {
    a: 0,
    opacity: 0
  },
  {
    x:200,
    y: 300,

    opacity: 1,
    duration: 2,
    delay: 1
  }
);