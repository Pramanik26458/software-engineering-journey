// selecting an html element
var h1=document.querySelector('h1')
// changing the inner html of that element
h1.innerHTML="changed"
console.log(h1)

// changing the style of that element
h1.style.color="red"
h1.style.backgroundColor="black"
h1.style.textAlign="center"
h1.style.padding="10px"
h1.style.borderRadius="10px"
h1.style.border="2px solid blue"
h1.style.boxShadow="5px 5px 10px gray"
// var anyName=document.querySelector('h2')
// console.log(anyName) 


var box=document.querySelector('#box')
box.innerHTML="<p>This is a box</p>"
box.style.backgroundColor='royalblue'


//  eventListener
h1.addEventListener('click',function(){
    console.log('you clicked the heading')
    alert('you clicked the heading')
    h1.style.backgroundColor="lightgreen"
    h1.style.pointer="cursor"
})

box.addEventListener('mouseover',function(){
    box.style.backgroundColor="yellow"
})


var h2=document.querySelector('h2')
var btn=document.querySelector('button')

btn.addEventListener('click',function(){
    h2.innerHTML="I am learning DOM manipulation"
    // h2.style.display="block"
    h2.style.color="purple"
    h2.style.textAlign="center"
    h2.style.fontSize="60px"
})



//  selecting element by getElementById

var para=document.getElementById('para')
para.innerHTML="This is a paragraph selected by getElementById"
para.style.fontSize="20px"
para.style.color="brown"
para.style.textAlign="center"
para.style.padding="10px"
para.style.border="2px solid green"
para.style.borderRadius="10px"
para.style.margin="10px"


// selecting element by getElementsByClassName
var items=document.getElementsByClassName('Cpara')
for(var i=0;i<items.length;i++){
    items[i].style.backgroundColor="lightgray"
    items[i].style.margin="10px"
    items[i].style.padding="10px"
    items[i].style.borderRadius="5px"
}

// items[0].innerHTML="This is the first item"