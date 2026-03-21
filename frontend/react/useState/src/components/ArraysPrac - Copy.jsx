import React, { useState } from "react";

const ArraysPrac = () => {
  // prac-1

  const [num, setnum] = useState(0);
  let arr = ["basak", "ashok", "ram", "shyam", "sita"];

  // prac-2
const [marks, setmarks] = useState([60,55,45,28,45,78,51,25,54,89,98])
  function graceStd() {
    console.log("hmm hum grace chahiye babu");
   const newMarks= marks.map((elem)=>{

        if(elem<33) return elem+5;
        return elem;

    })
    console.log(newMarks)
    setmarks(newMarks)
  }
  return (
    <div>
      <h1>Practice on Arrays</h1>
      <h1>{arr[num]}</h1>
      <button
        onClick={() => {
          if (num < arr.length - 1) {
            console.log(num);
            setnum(num + 1);
          }
        }}
      >
        change User
      </button>

      {marks.map((elem, idx) => {
        return (
          <h2 key={idx}>
            Student {idx + 1} = {elem} ({elem>=33?'PASS':'FAIL'})
          </h2>
        );
      })}

      <button onClick={graceStd}>Give them grace Mark*</button>
    </div>
  );
};

export default ArraysPrac;
