var btn = document.querySelector("button");
var main = document.querySelector("main");

btn.addEventListener("click", function () {
  var OTP = Math.floor(Math.random() * 10000);
  console.log(
    `your one time passward is ${OTP} ,please do not share it with anyone`
  );

  var h1 = document.createElement("h1");
  h1.innerHTML = `Your OTP has Sent on your registered mobile number `;
  main.appendChild(h1);

  var input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter OTP";
  main.appendChild(input);

  var verifyBtn = document.createElement("button");
  verifyBtn.innerHTML = "Verify OTP";
  main.appendChild(verifyBtn);

  verifyBtn.addEventListener("click", function () {
    var enteredOTP = input.value;
    if (enteredOTP == OTP) {
      alert("OTP verified successfully! 🎉");
    } else {
      alert("Invalid OTP, please try again. 🤔");
    }
  });

  input.style.width = "200px";
  input.style.height = "30px";
  input.style.marginTop = "10px";
  input.style.fontSize = "16px";
  input.style.textAlign = "center";
  input.style.backgroundColor = "lightblue";
  input.style.border = "2px solid gray";
  input.style.borderRadius = "5px";
  input.style.outline = "none";
  input.style.color = "black";
  verifyBtn.style.height = "35px";
  verifyBtn.style.fontSize = "16px";
  verifyBtn.style.marginLeft = "10px";

});
