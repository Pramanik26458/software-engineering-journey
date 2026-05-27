import React, { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

const FaceExpression = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [faceLandmarker, setFaceLandmarker] =
    useState(null);

  const [expression, setExpression] =
    useState("😐 Neutral");

  const [isDetecting, setIsDetecting] =
    useState(false);

  // -----------------------------------
  // Load MediaPipe Model
  // -----------------------------------
  useEffect(() => {
    const loadModel = async () => {
      const vision =
        await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

      const landmarker =
        await FaceLandmarker.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            },

            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1,
          }
        );

      setFaceLandmarker(landmarker);
    };

    loadModel();
  }, []);

  // -----------------------------------
  // Webcam + Face Detection
  // -----------------------------------
  useEffect(() => {
    if (!faceLandmarker) return;

    let animationFrameId;

    const startCamera = async () => {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      videoRef.current.srcObject = stream;

      videoRef.current.addEventListener(
        "loadeddata",
        predict
      );
    };

    const predict = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) return;

      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const results =
        faceLandmarker.detectForVideo(
          video,
          performance.now()
        );

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // -----------------------------------
      // Face Mesh
      // -----------------------------------
      if (
        results.faceLandmarks &&
        results.faceLandmarks.length > 0
      ) {
        const landmarks =
          results.faceLandmarks[0];

        landmarks.forEach((point) => {
          ctx.beginPath();

          ctx.arc(
            point.x * canvas.width,
            point.y * canvas.height,
            1.5,
            0,
            2 * Math.PI
          );

          ctx.fillStyle = "#00ffcc";

          ctx.fill();
        });

        // -----------------------------------
        // Detect Expression ONLY on Button Click
        // -----------------------------------
        if (isDetecting) {
          const blendShapes =
            results.faceBlendshapes[0].categories;

          const getScore = (name) => {
            return (
              blendShapes.find(
                (shape) =>
                  shape.categoryName === name
              )?.score || 0
            );
          };

          const smileLeft =
            getScore("mouthSmileLeft");

          const smileRight =
            getScore("mouthSmileRight");

          const mouthFrownLeft =
            getScore("mouthFrownLeft");

          const mouthFrownRight =
            getScore("mouthFrownRight");

          const browDownLeft =
            getScore("browDownLeft");

          const browDownRight =
            getScore("browDownRight");

          const eyeBlinkLeft =
            getScore("eyeBlinkLeft");

          const eyeBlinkRight =
            getScore("eyeBlinkRight");

          const jawOpen =
            getScore("jawOpen");

          const browInnerUp =
            getScore("browInnerUp");

          // HAPPY
          if (
            smileLeft > 0.45 &&
            smileRight > 0.45
          ) {
            setExpression("😊 Happy");
          }

          // SURPRISED
          else if (
            jawOpen > 0.35 &&
            browInnerUp > 0.25
          ) {
            setExpression("😲 Surprised");
          }

          // ROMANTIC
          else if (
            (eyeBlinkLeft > 0.6 ||
              eyeBlinkRight > 0.6) &&
            smileLeft > 0.25
          ) {
            setExpression("😍 Romantic");
          }

          // SAD
          else if (
            mouthFrownLeft > 0.18 ||
            mouthFrownRight > 0.18
          ) {
            setExpression("😢 Sad");
          }

          // ANGRY
          else if (
            browDownLeft > 0.25 &&
            browDownRight > 0.25
          ) {
            setExpression("😠 Angry");
          }

          // NEUTRAL
          else {
            setExpression("😐 Neutral");
          }
        }
      }

      animationFrameId =
        requestAnimationFrame(predict);
    };

    startCamera();

    return () =>
      cancelAnimationFrame(animationFrameId);
  }, [faceLandmarker, isDetecting]);

  return (
    <div>
      <h1>Moodify</h1>

      {/* CAMERA */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        {/* VIDEO */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            transform: "scaleX(-1)",
          }}
        />

        {/* FACE MESH */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transform: "scaleX(-1)",
          }}
        />
      </div>

      {/* EXPRESSION */}
      <h2>{expression}</h2>

      {/* BUTTON */}
      <button
        onClick={() =>
          setIsDetecting(!isDetecting)
        }
      >
        {isDetecting
          ? "Stop Detection"
          : "Start Detection"}
      </button>
    </div>
  );
};

export default FaceExpression;