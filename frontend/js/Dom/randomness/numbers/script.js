var btn=document.querySelector('#btn');
var span=document.querySelector('span')
var reset=document.querySelector('#reset')
var randomNum=0;
btn.addEventListener('click',function(){
    randomNum=Math.random()*10;
    var b=Math.floor(randomNum);
    span.innerHTML=b;
}
);

reset.addEventListener('click',function(){
    randomNum=0;
    span.innerHTML=randomNum;
})