const p = document.querySelector("p");
const text = p.innerText;
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; //52 characters

let iteration = 0;

function randomText() {
  const str = text
    .split("")
    .map((char, index) => {
      if (index < iteration) {
        return char;
      }
      return chars.split("")[Math.floor(Math.random() * 52)];
    })
    .join("");
  p.innerText = str;
  iteration += 0.25;
}

setInterval(randomText, 30);
