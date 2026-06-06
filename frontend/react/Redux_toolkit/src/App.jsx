import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "./redux/slices/counterSlice";
import Navbar from "./components/Navbar";

const App = () => {
  const num = useSelector((state) => state.counter.value);
  const theme = useSelector((state) => state.theme.value);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>
        {num}
      </h1>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          dispatch(reset());
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        Decrement
      </button>


        <Navbar />

    </div>
  );
};

export default App;
