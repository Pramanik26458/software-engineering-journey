import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
};

export default Counter;