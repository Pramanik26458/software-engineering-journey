var body=document.body;
var aud=new Audio('./24.mp3')
var aud2=new Audio('./25.mp3')
var h1=document.querySelector('h1')


function handleEvent(dets) {
    h1.innerHTML = dets.key || "Clicked";

    if (dets.code === 'KeyD') {
        aud.play();
    }
    if (dets.code === 'KeyH') {
        aud2.play();
    }
}

body.addEventListener('keydown', handleEvent);
body.addEventListener('click', handleEvent);
