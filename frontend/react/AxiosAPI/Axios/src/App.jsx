import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "./components/User.jsx";

const App = () => {
  const [AllData, setAllData] = useState([]);

  async function getData() {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setAllData(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect (function(){
    getData()
  },[]) 

  return (
    <div className="p-5">
      <button
        onClick={getData}
        className="bg-black text-white px-4 py-2 rounded-lg mb-5"
      >
        Load Users
      </button>

      <div className="flex flex-wrap">
        {AllData.map((elem) => {
          return <User key={elem.id} elem={elem} />;
        })}
      </div>
    </div>
  );
};

export default App;