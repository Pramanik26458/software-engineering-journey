var inc=document.querySelector('#incrementBtn')
var h2=document.querySelector('span')
var count=0



inc.addEventListener('click',function(){
console.log('button clicked')   
count++;
console.log(count)
h2.innerHTML=count
})


var dec=document.querySelector('#decrementBtn')
dec.addEventListener('click',function(){
    console.log('decrement button clicked')
    count--;
    console.log(count)
    h2.innerHTML=count
})


var res=document.querySelector('#resetBtn')
res.addEventListener('click',function(){
    console.log('reset button clicked')
    count=0;
    console.log(count)
    h2.innerHTML=count
})