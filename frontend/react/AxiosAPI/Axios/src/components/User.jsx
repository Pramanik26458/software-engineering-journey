import React from "react";

const User = ({ elem }) => {
  const clr1 = Math.floor(Math.random() * 256);
  const clr2 = Math.floor(Math.random() * 256);
  const clr3 = Math.floor(Math.random() * 256);

  return (
    <div
      className="h-[200px] w-[250px] rounded-xl m-5 p-4 text-white shadow-lg"
      style={{ backgroundColor: `rgb(${clr1}, ${clr2}, ${clr3})` }}
    >
      <h2 className="text-lg font-bold">{elem.name}</h2>
      <p>{elem.email}</p>
      <p>{elem.phone}</p>
      <p className="text-sm">{elem.company.name}</p>
    </div>
  );
};

export default User;