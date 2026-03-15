import React, { useState } from "react";
import Counter from "./components/Counter.jsx";
import ArraysPrac from "./components/ArraysPrac.jsx";
import Form from "./components/Form.jsx";
import Washroom from "./components/Washroom.jsx";

const App = () => {
  const [king, setKing] = useState("King");
  const [queen, setQueen] = useState("Queen");

  const [Gender, setGender] = useState("Male");

  const changeKingQueen = () => {
    setKing("Raja");
    setQueen("Rani");
  };

  const changeKing = () => {
    setKing("Kumar");
  };

  const changeQueen = () => {
    setQueen("Kumari");
  };

  return (
    <div>
      <button onClick={changeKingQueen}>Change Both</button>
      <button onClick={changeKing}>Change King</button>
      <button onClick={changeQueen}>Change Queen</button>

      <h1>King: {king}</h1>
      <h1>Queen: {queen}</h1>

      <h1>Hello from App</h1>

      <Counter />
      <ArraysPrac />

      <Form Gender={Gender} setGender={setGender} />

      <Washroom user={Gender} />
    </div>
  );
};

export default App;