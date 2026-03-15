import React, { useState } from "react";
import Card from "./Card";

const Form = () => {
  const [username, setusername] = useState("");
  const [userRole, setuserRole] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [description, setDescription] = useState("");

  const localData = JSON.parse(localStorage.getItem("allUser")) || [];
  console.log(localData);
  const [allUser, setallUser] = useState(localData);

  const submitHandler = (e) => {
    e.preventDefault();
    const oldUsers = [...allUser];
    oldUsers.push({ username, userRole, imageUrl, description });
    setallUser(oldUsers);
    localStorage.setItem("allUser", JSON.stringify(oldUsers));

    setusername("");
    setuserRole("");
    setimageUrl("");
    setDescription("");
  };

  const deleteHandler = (idx) => {
    const copyUsers = [...allUser];

    const conf = confirm("Are You Sure Want To Delete This Account");

    if (conf) {
      copyUsers.splice(idx, 1);
    } else {
      alert("element Not Deleted");
    }
    
    setallUser(copyUsers);
    localStorage.setItem("allUser", JSON.stringify(copyUsers));
  };

  return (
    <div className="bg-amber-500 min-h-screen flex flex-col items-center">
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap justify-center w-[60%] bg-white rounded-lg shadow-lg mt-5 p-5"
      >
        <input
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="border-2 rounded px-2 py-3 font-semibold w-[48%] m-2 outline-none focus:border-emerald-600"
          type="text"
          placeholder="Enter Your Name"
          required
        />

        <input
          value={userRole}
          onChange={(e) => setuserRole(e.target.value)}
          className="border-2 rounded px-2 py-3 font-semibold w-[48%] m-2 outline-none focus:border-emerald-600"
          type="text"
          placeholder="Enter Your Role"
          required
        />

        <input
          value={imageUrl}
          onChange={(e) => setimageUrl(e.target.value)}
          className="border-2 rounded px-2 py-3 font-semibold w-[48%] m-2 outline-none  focus:border-emerald-600"
          type="text"
          placeholder="Enter Image URL"
          required
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 rounded px-2 py-3 font-semibold w-[48%] m-2 outline-none focus:border-emerald-600"
          type="text"
          placeholder="Enter Description"
          required
        />

        <button className="bg-emerald-700 text-white px-2 py-3 rounded font-semibold w-[95%] m-2 active:scale-95 transition">
          Submit
        </button>
      </form>

      <div className="flex flex-wrap justify-center gap-5 w-[60%] p-5">
        {allUser.map((elem, idx) => (
          <Card key={idx} idx={idx} elem={elem} deleteHandler={deleteHandler} />
        ))}
      </div>
    </div>
  );
};

export default Form;
