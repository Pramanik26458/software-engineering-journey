import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

// -----------------------------------
// INIT
// -----------------------------------
export const init = async ({
  landmarkerRef,
  videoRef,
  streamRef,
}) => {
  // Load Vision
  const vision =
    await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

  // Create Face Landmarker
  landmarkerRef.current =
    await FaceLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
        },

        outputFaceBlendshapes: true,

        runningMode: "VIDEO",

        numFaces: 1,
      }
    );

  // Start Webcam
  streamRef.current =
    await navigator.mediaDevices.getUserMedia({
      video: true,
    });

  videoRef.current.srcObject =
    streamRef.current;

  await videoRef.current.play();
};

// -----------------------------------
// DETECT
// -----------------------------------
export const detect = ({
  landmarkerRef,
  videoRef,
  setExpression,
}) => {
  if (
    !landmarkerRef.current ||
    !videoRef.current
  )
    return;

  const results =
    landmarkerRef.current.detectForVideo(
      videoRef.current,
      performance.now()
    );

  // Face Detected
  if (
    results.faceBlendshapes?.length > 0
  ) {
    const blendShapes =
      results.faceBlendshapes[0].categories;

    // Get Score
    const getScore = (name) =>
      blendShapes.find(
        (b) =>
          b.categoryName === name
      )?.score || 0;

    // Scores
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
};