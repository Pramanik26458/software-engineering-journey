import React from 'react'

const App = () => {

  const users = [
  {
    id: 1,
    fullName: "Wade Wilson",
    title: "UI/UX Designer",
    company: "Epic Coders",
    availability: "available",
    hourlyRate: 55,
    profileImage: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    skills: ["UI", "UX", "Photoshop"],
    extraSkillsCount: 4,
    description:
      "Wade is a 32 year old UI/UX designer with an impressive portfolio behind him."
  },

  {
    id: 2,
    fullName: "Basak Pramanik",
    title: "Frontend Developer",
    company: "GEC Bhubaneswar",
    availability: "available",
    hourlyRate: 20,
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    skills: ["React", "Node.js", "MongoDB"],
    extraSkillsCount: 5,
    description:
      "Basak is a passionate frontend developer focused on React, building modern UI projects and preparing for software development roles."
  },

  {
    id: 3,
    fullName: "Maria Petrescu",
    title: "Mobile Designer",
    company: null,
    availability: "freelancer",
    hourlyRate: 32,
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    skills: ["PHP", "Android", "iOS"],
    extraSkillsCount: 2,
    description:
      "Maria is an Android and iOS developer who worked at Apple for 6 years."
  },

  {
    id: 4,
    fullName: "Alexandra Morgan",
    title: "Mobile Designer",
    company: null,
    availability: "freelancer",
    hourlyRate: 42,
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    skills: ["PHP", "Android", "iOS"],
    extraSkillsCount: 12,
    description:
      "Alexandra is a dedicated developer for mobile platforms and is very good at it."
  }
];
 
  return (
    <div className='bg-black text-white'>  
      {users.map(function(elem){
        return <h1>{elem.fullName}</h1>
      })}
    </div>
  )
}

export default App