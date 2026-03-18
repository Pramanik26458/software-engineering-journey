import React, { useState, useEffect } from "react";

const Captcha = ({ onVerify, resetTrigger }) => {
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let cap = "";

    for (let i = 0; i < 6; i++) {
      cap += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setCaptcha(cap);
    setUserInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [resetTrigger]);

  const handleVerify = () => {
    if (userInput === captcha) {
      alert("✅ CAPTCHA Verified");
      onVerify();
    } else {
      alert("❌ Wrong CAPTCHA");
      generateCaptcha();
    }
  };

  return (
    <div className="space">
      <h2 className="captcha-box">{captcha}</h2>

      <input
        type="text"
        placeholder="Enter CAPTCHA"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <button onClick={handleVerify}>Verify CAPTCHA</button>
    </div>
  );
};

export default Captcha;