import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { init, detect } from "../utils/utils";

const FaceExpression = () => {
  const videoRef = useRef(null);

  const landmarkerRef =
    useRef(null);

  const streamRef = useRef(null);

  const [expression, setExpression] =
    useState("Detecting...");

  // INIT
  useEffect(() => {
    init({
      landmarkerRef,
      videoRef,
      streamRef,
    });

    // CLEANUP
    return () => {
      // Close MediaPipe
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      // Stop Webcam
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Moodify</h1>

      {/* VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "600px",
          transform: "scaleX(-1)",
        }}
      />

      {/* EXPRESSION */}
      <h2>{expression}</h2>

      {/* BUTTON */}
      <button
        onClick={() =>
          detect({
            landmarkerRef,
            videoRef,
            setExpression,
          })
        }
      >
        Detect Expression
      </button>
    </div>
  );
};

export default FaceExpression;