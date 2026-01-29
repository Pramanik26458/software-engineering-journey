const users = [
  {
    username: "john_doe",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    profession: "Frontend Developer",
    description: "Passionate about building interactive UI using modern JavaScript frameworks.",
    tags: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    username: "emma_watson",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    profession: "UI/UX Designer",
    description: "Designing clean and user-friendly interfaces with a focus on user experience.",
    tags: ["Figma", "Adobe XD", "UI Design"]
  },
  {
    username: "alex_smith",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    profession: "Backend Developer",
    description: "Works with APIs, databases, and server-side logic.",
    tags: ["Node.js", "Express", "MongoDB"]
  },
  {
    username: "sophia_lee",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    profession: "Data Scientist",
    description: "Loves analyzing data and building machine learning models.",
    tags: ["Python", "Machine Learning", "Pandas"]
  },
  {
    username: "michael_ray",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    profession: "Mobile App Developer",
    description: "Creates smooth and scalable mobile applications.",
    tags: ["Flutter", "Android", "iOS"]
  }
];



var sum=' '
users.forEach((elem)=>{
  sum+=`  <div class="card">
  <img src="${elem.image}" alt="">
  <h3>${elem.username}</h3>
  <h4>${elem.profession}</h4>
  <p>${elem.description}</p>
  <p>${elem.tags}</p>
  
  </div> `
})


var main=document.querySelector('main')

main.innerHTML=sum