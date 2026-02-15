// var arr=["Swagnik","Swattik","Aadi","Dalai","Sumit","Sudip","Shyam","Basak"];
// // var a=Math.floor(Math.random()*arr.length);
// // console.log(arr[a]);

// var box=document.querySelector("#box");
// var btn=document.querySelector("#btn");

// btn.addEventListener("click",function(){
//     var a=Math.floor(Math.random()*arr.length);
//     // box.innerText=arr[a];
// console.log(arr[a]);

// })

// NOTE: This is a hypothetical IPL 2026 dataset for project purposes only.

var arr = [
  {
    Team: "CSK",
    Captain: "Ruturaj Gaikwad",
    primaryColor: "#F9CD05",
    secondaryColor: "#1C3FA8",
  },

  {
    Team: "MI",
    Captain: "Hardik Pandya",
    primaryColor: "#001799ff",
    secondaryColor: "#D4AF37",
  },

  {
    Team: "RCB",
    Captain: "Rajat Patidar",
    primaryColor: "#D71920",
    secondaryColor: "#000000",
  },

  {
    Team: "KKR",
    Captain: "Shreyas Iyer",
    primaryColor: "#5A2D82",
    secondaryColor: "#D4AF37",
  },

  {
    Team: "DC",
    Captain: "Axar Patel",
    primaryColor: "#004C93",
    secondaryColor: "#D71920",
  },

  {
    Team: "RR",
    Captain: "Riyan Parag",
    primaryColor: "#EA1A85",
    secondaryColor: "#17479E",
  },

  {
    Team: "SRH",
    Captain: "Pat Cummins",
    primaryColor: "#F26522",
    secondaryColor: "#000000",
  },

  {
    Team: "PBKS",
    Captain: "Shreyas Iyer",
    primaryColor: "#ED1B24",
    secondaryColor: "#C0C0C0",
  },

  {
    Team: "GT",
    Captain: "Shubman Gill",
    primaryColor: "#0A1A44",
    secondaryColor: "#D4AF37",
  },

  {
    Team: "LSG",
    Captain: "Rishabh Pant",
    primaryColor: "#5AB4E5",
    secondaryColor: "#F26A1B",
  },
];


var h1=document.querySelector('h1');
var btn = document.querySelector('#btn');
var teamName = document.querySelector('#teamName');
var captainText = document.querySelector('#captain');
var main = document.querySelector('main');
var hero = document.querySelector('.hero');


btn.addEventListener('click', function () {
  var winner = arr[Math.floor(Math.random() * arr.length)];

  teamName.textContent = winner.Team;
  captainText.textContent = "Captain: " + winner.Captain;

  teamName.style.background = `linear-gradient(90deg, ${winner.primaryColor}, ${winner.secondaryColor})`;
  teamName.style.webkitBackgroundClip = "text";
  teamName.style.webkitTextFillColor = "transparent";
   teamName.style.webkitTextStroke = `0.5px ${winner.secondaryColor}`;


  hero.style.border = `2px solid ${winner.secondaryColor}`;
  main.style.background = `linear-gradient(135deg, ${winner.primaryColor}, ${winner.secondaryColor})`;
});

