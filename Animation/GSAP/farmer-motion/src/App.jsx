import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const App = () => {
  // const boxVariant = {
  //   hidden: {
  //     opacity: 0,
  //     x: -100,
  //   },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     transition: {
  //       duration: 0.8,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  // const ContainerVariant = {
  //   hidden: {},
  //   visible: {
  //     transition: {
  //       staggerChildren: 0.3,
  //     },
  //   },
  // };

  const [show, setShow] = useState(false);

  return (
    <>
      {/* <motion.div
        className="container"
        variants={ContainerVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="box" variants={boxVariant} />
        <motion.div className="box" variants={boxVariant} />
        <motion.div className="box" variants={boxVariant} />
        <motion.div className="box" variants={boxVariant} />
      </motion.div> */}

      <button
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        Click Me
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0, y: 300 }}
            className="box"
          >
            {" "}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;