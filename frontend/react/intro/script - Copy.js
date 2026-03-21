// gsap.to('.box',{
//     x:665,
//     duration:2,
//     delay:1
// })

// console.log(ReactDOM);


// var h1= document.createElement('h1')
// h1.innerHTML="hello from js"
// document.body.appendChild(h1)


// var h1= React.createElement('h1',null,"mai hu Basak")
// var container= document.querySelector('.container')
// var root=ReactDOM.createRoot( container)

// root.render(h1)




// function h1(){
//     return React.createElement('h1',null,"hello from react")
// }


// import box from'./app.js'
// import circle  from './test.js';

// const parent=()=>React.createElement('div',null,[box(),circle()])

const root=ReactDOM.createRoot(document.querySelector('.container'))
import parent from './parent.js'
root.render(parent());


