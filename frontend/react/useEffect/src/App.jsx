import React, { useEffect, useState } from "react";
import axios from "axios";
import Otp from "./components/Otp";
import Captcha from "./components/Captcha";
import "./index.css";

const App = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [index, setIndex] = useState(0);

  const [otpVerified, setOtpVerified] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const [resetTrigger, setResetTrigger] = useState(0);

  // Fetch data
  const getData = async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon");
    setAllPokemon(res.data.results);
  };

  useEffect(() => {
    getData();
  }, []);

  // Next user
  const handleNext = () => {
    if (otpVerified && captchaVerified) {
      alert("✅ Verified Successfully");

      setIndex((prev) => prev + 1);

      setOtpVerified(false);
      setCaptchaVerified(false);

      // trigger reset
      setResetTrigger((prev) => prev + 1);
    } else {
      alert("❌ Complete OTP & CAPTCHA first");
    }
  };

  return (
    <div className="container">
      {allPokemon.length > 0 && (
        <>
          <h2>
            Hello{" "}
            <span className="name">
              {allPokemon[index]?.name}
            </span>
          </h2>

          <Otp
            onVerify={() => setOtpVerified(true)}
            resetTrigger={resetTrigger}
          />

          <Captcha
            onVerify={() => setCaptchaVerified(true)}
            resetTrigger={resetTrigger}
          />

          <button onClick={handleNext}>Next User</button>
        </>
      )}
    </div>
  );
};

export default App;