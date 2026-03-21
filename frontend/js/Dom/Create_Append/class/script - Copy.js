var btn = document.querySelector("button");
var main = document.querySelector("main");
// for square element
btn.addEventListener("click", () => {
  var div = document.createElement("div");
  //  for position

  var x = Math.floor(Math.random() * 100);
  var y = Math.floor(Math.random() * 100);

  //for rotation
  var r = Math.floor(Math.random() * 360);

  // for color
  var c1 = Math.floor(Math.random() * 256);
  var c2 = Math.floor(Math.random() * 256);
  var c3 = Math.floor(Math.random() * 256);
  div.style.backgroundColor = `rgb(${c1},${c2},${c3})`;
  div.style.height = "50px";
  div.style.width = "50px";
  // div.style.position='absolute'
  div.style.left = x + "%";
  div.style.top = y + "%";
  div.style.rotate = r + "deg";

  main.append(div);
});

// for revise purpose only so i am defining the same things again and again
//for circle

var btn2 = document.querySelector("#btn2");
var main = document.querySelector("main");

btn2.addEventListener("click", () => {

  var a = Math.floor(Math.random() * 90);
  var b = Math.floor(Math.random() * 90);
  var c = Math.floor(Math.random() * 360);

  var cl1 = Math.floor(Math.random() * 256);
  var cl2 = Math.floor(Math.random() * 256);
  var cl3 = Math.floor(Math.random() * 256);

  var div1 = document.createElement("div");

  div1.style.height = "60px";
  div1.style.width = "60px";
  div1.style.borderRadius = "50%";
  div1.style.position = "absolute";
  div1.style.zIndex=9;

  div1.style.backgroundColor = `rgba(${cl1}, ${cl2}, ${cl3}, 0.25)`;
  div1.style.backdropFilter = "blur(20px)";
  div1.style.webkitBackdropFilter = "blur(20px)";
  div1.style.border = "1px solid rgba(255,255,255,0.3)";
  div1.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";

  div1.style.left = a + "%";
  div1.style.top = b + "%";
  div1.style.transform = `rotate(${c}deg)`;

  main.appendChild(div1);
});



// for mouse movement 
var main = document.querySelector("main");

main.addEventListener("mousemove", (e) => {

  var circle = document.createElement("div");

  var cl1 = Math.floor(Math.random() * 256);
  var cl2 = Math.floor(Math.random() * 256);
  var cl3 = Math.floor(Math.random() * 256);
  
  circle.style.width = "50px";
  circle.style.height = "50px";
  circle.style.borderRadius = "50%";
  circle.style.position = "absolute";

  circle.style.left = e.clientX + "px";
  circle.style.top = e.clientY + "px";
  circle.style.transform = "translate(-50%, -50%)";
  
  circle.style.backgroundColor = `rgba(${cl1}, ${cl2}, ${cl3}, 0.25)`;
  circle.style.backdropFilter = "blur(20px)";
  circle.style.webkitBackdropFilter = "blur(20px)";
  circle.style.border = "1px solid rgba(255,255,255,0.3)";
  circle.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";

  circle.style.pointerEvents = "none";

  main.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 140);
});



// another practice

var btn3=document.querySelector('#btn3');
// console.log(ar)
var arr=['Hey i am Basak!!!','DevCodex is the Best 🎉',"Bishnu is handsome","please follow us on social media"]
btn3.addEventListener("click",()=>{
  var h1=document.createElement('h1')
  var ar=Math.floor(Math.random()*arr.length)
  h1.innerHTML=arr[ar]
  // console.log(h1);
  main.appendChild(h1)
  //  for position

  var x = Math.floor(Math.random() * 100);
  var y = Math.floor(Math.random() * 100);
  var scl=Math.floor(Math.random()*4)
  //for rotation
  var r = Math.floor(Math.random() * 180);
  h1.style.position='absolute';
  h1.style.left=x+"%"
  h1.style.top=y+"%"
  h1.style.rotate=r+"deg"
  h1.style.scale=scl;
  // console.log(arr[ar]);

})