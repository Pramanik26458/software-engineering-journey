import React from "react";
import Card from "./components/Card.jsx";
import Button from "./components/button.jsx";
const App = () => {
  const user = ["Basak", "Ashok", "Harsh", "Chetan"];
  return (
    <div className="bg-black p-10 rounded-2xl w-fit">
      {/* <Card user="Basak" age="21" /> */}
      {user.map(function (elem) {
       
        return   <Card  user={elem}/>;
      })}

      <Button text="Explore Now" />
      <Button text="Buy Now" />
    </div>
  );
};

export default App;
