import { useState } from "react";
import Card from "./components/Card.jsx";

const App = () => {
  const [username, setusername] = useState("");
  const [userRole, setuserRole] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [description, setDescription] = useState("");

  const [allUser, setallUser] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setallUser([...allUser,{ username, userRole, imageUrl, description }]);
    setusername("");
    setuserRole("");
    setimageUrl("");
    setDescription("");
  };


  const deleteHandler=(idx)=>{
    console.log('elemented is deleted')
    const copyUsers=[...allUser]
    copyUsers.splice(idx,1)
    console.log(copyUsers)

    setallUser(copyUsers)
  }

  return (
    <div className="bg-amber-500 h-screen flex flex-col items-center">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex flex-wrap justify-center w-[60%] bg-white  rounded-lg shadow-lg mt-5  p-5"
      >
        <input
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
          className="border-2 rounded px-2 py-3 font-semibold w-[48%] m-2 outline-none focus:border-emerald-600"
          type="text"
          placeholder="Enter Your Name"
          required
        />

        <input
          value={userRole}
          onChange={(e) => {
            setuserRole(e.target.value);
          }}
          className="border-2 rounded px-2 py-3 font-semibold w-[48%] m-2 outline-none focus:border-emerald-600"
          type="text"
          placeholder="Enter Your Role"
          required
        />

        <input
          value={imageUrl}
          onChange={(e) => {
            setimageUrl(e.target.value);
          }}
          className="border-2 rounded px-2 py-3 font-semibold w-[48%] m-2 outline-none focus:border-emerald-600"
          type="text"
          placeholder="Enter Image URL"
          required
        />

        <input
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="border-2 rounded px-2 py-3 font-semibold w-[48%] m-2 outline-none focus:border-emerald-600"
          type="text"
          placeholder="Enter Description"
          required
        />

        <button className="bg-emerald-700 text-white px-2 py-3 rounded font-semibold w-[95%] m-2 active:scale-95 transition">
          Submit
        </button>
      </form>

      <div className="flex flex-wrap justify-center w-[60%] p-5 rounded-lg shadow-lg">
        {allUser.map(function (elem,idx) {
          return <Card idx={idx} elem={elem} deleteHandler={deleteHandler} />
        })}
      </div>

    </div>
  );
};

export default App;
