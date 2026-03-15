// var h1=document.querySelectorAll("h1");
// h1[1].style.color='red'

// another

// var outer=document.querySelector(".outer")
// // outer.style.backgroundColor="red"
// console.log(outer.childNodes[0]);




// var button = document.querySelectorAll("button");

// var isRequested = false;

// button[0].addEventListener("click", function () {
//   if (isRequested === false) {
//     // when sending request
//     alert("Friend Request Sent");
//     button[0].style.backgroundColor = "red";
//     button[0].style.color = "white";
//     button[0].innerHTML = "Requested";
//     isRequested = true;
//   } else {
//     // when removing request
//     alert("Request Removed");
//     button[0].style.backgroundColor = "royalblue";
//     button[0].style.color = "white";
//     button[0].innerHTML = "Add Friend";
//     isRequested = false;
//   }
// });



// console.log(allelem)

// allelem.forEach(function(elem) {
//     console.log(elem.childNodes);
// });


// not a good way 
// var allelem = document.querySelectorAll(".elem")

// allelem.forEach(function(elem) {
//    elem.childNodes[3].addEventListener("click", function() {
//     // console.log('hello');
//     if(elem.childNodes[3].innerHTML==="Add Friend"){
//         elem.childNodes[3].innerHTML='Following';
//         elem.childNodes[3].style.backgroundColor='green'
//     }else{
//         elem.childNodes[3].innerHTML='Add Freind';
//         elem.childNodes[3].style.backgroundColor='royalblue'
//     }
    
//    });
// });


// var allElems = document.querySelectorAll(".elem");

// allElems.forEach(function (elem) {
//   var addBtn = elem.querySelector("button");

//   addBtn.addEventListener("click", function () {
//     if (addBtn.innerHTML === "Add Friend") {
//       addBtn.innerHTML = "Following";
//       addBtn.style.backgroundColor = "white";
//       addBtn.style.color = "green";
//       addBtn.style.border = "1px solid green";
//       addBtn.style.pointerEvents = "none";

    
//       var unfollowBtn = document.createElement("button");
//       unfollowBtn.innerHTML = "Unfollow";
//       unfollowBtn.style.backgroundColor = "red";
//       unfollowBtn.style.color = "white";
//       unfollowBtn.style.marginLeft = "10px";

//       elem.appendChild(unfollowBtn);

//       unfollowBtn.addEventListener("click", function () {
//         unfollowBtn.remove();
//         addBtn.innerHTML = "Add Friend";
//         addBtn.style.backgroundColor = "royalblue";
//         addBtn.style.color = "white";
//         addBtn.style.border = "none";
//         addBtn.style.pointerEvents = "auto";
//       });
//     }
//   });
// });

var allElems = document.querySelectorAll(".elem");

// popup elements
var popup = document.getElementById("popup");
var cancelBtn = document.querySelector(".cancel-btn");
var confirmBtn = document.querySelector(".confirm-btn");

// store current buttons
var activeAddBtn = null;
var activeUnfollowBtn = null;

allElems.forEach(function (elem) {
  var addBtn = elem.querySelector("button");

  addBtn.addEventListener("click", function () {
    if (addBtn.innerText === "Add Friend") {
      addBtn.innerText = "Following";
      addBtn.style.backgroundColor = "white";
      addBtn.style.color = "green";
      addBtn.style.border = "1px solid green";
      addBtn.style.pointerEvents = "none";

      var unfollowBtn = document.createElement("button");
      unfollowBtn.innerText = "Unfollow";
      unfollowBtn.style.backgroundColor = "red";
      unfollowBtn.style.color = "white";
      unfollowBtn.style.marginLeft = "10px";

      elem.appendChild(unfollowBtn);

      unfollowBtn.addEventListener("click", function () {
        popup.classList.add("active");

        activeAddBtn = addBtn;
        activeUnfollowBtn = unfollowBtn;
      });
    }
  });
});

// cancel
cancelBtn.addEventListener("click", function () {
  popup.classList.remove("active");
});

// confirm
confirmBtn.addEventListener("click", function () {
  if (!activeAddBtn || !activeUnfollowBtn) return;

  activeUnfollowBtn.remove();

  activeAddBtn.innerText = "Add Friend";
  activeAddBtn.style.backgroundColor = "royalblue";
  activeAddBtn.style.color = "white";
  activeAddBtn.style.border = "none";
  activeAddBtn.style.pointerEvents = "auto";

  popup.classList.remove("active");

  activeAddBtn = null;
  activeUnfollowBtn = null;
});
