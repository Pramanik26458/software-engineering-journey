import React from "react";

const Navbar = (props) => {
  console.log(props);
  return (
    <div style={{backgroundColor:props.color}}className="flex justify-between items-center px-8 py-4 mb-1 bg-amber-500 cursor-pointer">
      <h1>{props.title}</h1>
      <div className="flex gap-10">
        {/* <h1 className="text-base">home</h1>
        <h1 className="text-base">home</h1> */}
        {props.links.map((elem,idx)=>{
            return <h1 key={idx}>{elem}</h1>
        })}
      </div>
    </div>
  );
};

export default Navbar;
