import React, { useState } from "react";

const Form = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [alluser, setAlluser] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    const oldUser = [...alluser];
    oldUser.push({username,email});

    setAlluser(oldUser); 
    console.log(oldUser)
    console.log(username,email)
    setUsername('');
    setEmail('');
  };

  return (
    <div>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          required
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button type="submit">Submit</button>
      </form>

      {alluser.map((elem, idx) => {
        return <div key={idx}>
          <h4>{elem.username}</h4>
          <h4>{elem.email}</h4>
        </div>
      })}
    </div>
  );
};

export default Form;