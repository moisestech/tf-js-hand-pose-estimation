// 1. Install dependencies
// 2. Import dependencies
// 3. Setup webcam and canvas
// 4. Define references to those
// 5. Load handpose
// 6. Detect function
// 7. Drawing utilities
// 8. Draw functions

import React, { useRef } from "react";

// access to webcam
import Webcam from "react-webcam";

// for running object detection
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";

// drawings x, y points on canvas
import { drawHand } from "../utils";

export default function App({project_name = "Tensorflow.js React Hand-Pose Estimation"}) {

  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <div clasName="App">
      <h1>{project_name}</h1>
      <header>
        {/* where one intakes data for tfjs  */}
        <Webcam ref={webcamRef} className="react-webcam" />

        {/* where one draws the segmentation layer */}
        <Canvas ref={canvasRef} className="react-canvas" />
      </header>
    </div>
  )
}

// video: https://www.youtube.com/watch?v=f7uBsb-0sGQ
// code: https://github.com/nicknochnack/HandPoseDetection