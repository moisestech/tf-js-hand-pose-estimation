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

export default function App() {
  let project_name = "Tensorflow.js React Hand-Pose Estimation";

  console.log(project_name);
}

// video: https://www.youtube.com/watch?v=f7uBsb-0sGQ
// code: https://github.com/nicknochnack/HandPoseDetection