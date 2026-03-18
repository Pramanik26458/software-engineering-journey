import React, { useState, useEffect } from "react";

const Otp = ({ onVerify, resetTrigger }) => {
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");

  // Generate OTP
  const generateOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(newOtp);
    setUserOtp("");
  };

  useEffect(() => {
    generateOtp();
  }, []);

  // 🔥 Reset when parent triggers
  useEffect(() => {
    generateOtp();
  }, [resetTrigger]);

  const handleVerify = () => {
    if (userOtp === otp) {
      alert("✅ OTP Verified");
      onVerify();
    } else {
      alert("❌ Wrong OTP");
      generateOtp();
    }
  };

  return (
    <div className="space">
      <h3>
        Your OTP: <span className="otp">{otp}</span>
      </h3>

      <input
        type="text"
        placeholder="Enter OTP"
        value={userOtp}
        onChange={(e) => setUserOtp(e.target.value)}
      />

      <button onClick={handleVerify}>Verify OTP</button>
    </div>
  );
};

export default Otp;