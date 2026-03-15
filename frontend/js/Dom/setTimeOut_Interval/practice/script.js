var grow = 0;
var btn = document.querySelector('button');
var inner = document.querySelector('.inner');
var h2 = document.querySelector('h2');

btn.addEventListener("click", () => {

    btn.style.pointerEvents = "none"; // disables the button after one click

    var time = 50 + Math.floor(Math.random() * 50); // creates a random time for download
    // console.log(time)

    console.log(`Your file will be downloaded in ${time / 10} seconds`);

    var int = setInterval(() => {
        grow++;
        h2.innerHTML = grow + "%";
        inner.style.width = grow + '%';
    }, time);

    setTimeout(() => {
        clearInterval(int);
        btn.innerHTML = "Downloaded";
        btn.style.opacity = 0.85;
    }, time * 100);

});
