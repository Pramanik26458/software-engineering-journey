import React from "react";

const Form = ({ Gender, setGender }) => {

  function changeGender() {
    setGender(Gender === "Male" ? "Female" : "Male");
  }

  return (
    <div className="container">
      <div className="gender-box">
        <input
          type="radio"
          name="gender"
          checked={Gender === "Male"}
          onChange={() => setGender("Male")}
        />
        <label>Male</label>
      </div>

      <div className="gender-box">
        <input
          type="radio"
          name="gender"
          checked={Gender === "Female"}
          onChange={() => setGender("Female")}
        />
        <label>Female</label>
      </div>

      <div>
        <h2>{Gender}</h2>
        <button onClick={changeGender}>Change</button>
      </div>
    </div>
  );
};

export default Form;