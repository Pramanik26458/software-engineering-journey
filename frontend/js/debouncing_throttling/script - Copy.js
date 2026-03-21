// debounce and throtting

// debouncing
function debounce(fn,delay){
    let timer;
    return function(){
        clearTimeout(timer);4
        timer=setTimeout(fn,delay);
    };
}

document.querySelector("#search").addEventListener("input",debounce(function(){
    console.log("Input event triggered"); 
},400));


// throttling
function throttle(fn, delay) {
    let lastTime = 0;

    return function () {
        const now = Date.now();

        if (now - lastTime >= delay) {
            lastTime = now;
            fn();
        }  
    };
}

window.addEventListener("mousemove", throttle(function () {
    console.log("Mouse moved");
}, 1000));



// json pasre
// json stringify

JSON.parse('{"name":"Basak","age":21}') // string to object