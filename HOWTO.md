# HOW-TO

## **1.** Install dependencies

- Install Tensorflow Model Semantic segmentation and run segmentation in the browser (DeepLab).
- Full list of dependencies and devDependencies in [package.json]().

## **2.** Import dependencies

- App/index.js
  i. `import * as bodypix` and `import * as tf`.
  ii. `import {useRef} from 'react'`. [useRef link](https://reactjs.org/docs/hooks-reference.html#useref)

  - help us reference our onscreen in DOM elements that keep state during the component lifecycle.

## **3.** Setup webcam and canvas

i. App/index.js in `<header />` DOM element returns components.

```javascript
// App () comp return function
return (
  <Webcam className="react-webcam"/>
  <Canvas className="react-canvas" />
)
```

## **4.** Define references to those

i. App/index.js in `App()` component body connect canvas and webcam components with `useRef`.

```javascript
// App () function body
const webcamRef = useRef(null);
const canvasRef = useRef(null);
```

## **5.** Load handpose

i. async function **`runHandpose`** will perform hand detections using the **`webcamRef`**.

```javascript
const runHandpose = async () => {
  const net = await handpose.load();
  console.log("Handpose model loaded!");
};
```

## **6.** Detect function

**i.** async function **`detect`** runs when the app starts, goes ahead and detects our model and our webcam.

**ii.** **`if`** statement will check the **`webcamRef`** is defined with a **`readState`** of 4.

**iii.** Once **`webcamRef`** is ready, the const **`video`**, **`videoWidth`**, and **`videoHeight`** are defined from **`webcamRef.current.video`**.

**iv.** Width const **`video, videoWidth, videoHeight`** the width and height of the **`webcamRef`** and **`canvasRef`** are set.

**v.** await/async **`net.estimateHands(video)`** is stored in **`hand`** const which returns an **array** of **objects**.

```javascript
const detect = async (net) => {
  // Check data is available
  if (
    typeof webcamRef.current !== "undefined" &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4
  ) {
    // Get Video Properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Set canvas height and width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // Make Detections
    const hand = await net.estimateHands(video);
    console.log(hand);

    // Draw mesh
    const ctx = canvasRef.current.getContext("2d");
    drawHand(hand, ctx);
  }
};
```

## **7.** **drawHand** points function

**i.** **`drawHand`** function takes in parameters **`predictions, ctx`**

**ii.** Check wether or not we have predictions.

**iii.** Loop through **`predictions`** and extract the **`prediction.landmarks`** to store in const **`landmarks`**.

**iv.** Loop through **`landmarks`** and draw each **`landmark`** on to the canvas **`ctx`**.

```javascript
// Drawing function
export const drawHand = (predictions, ctx) => {
  // Check if we have predictions
  if (predictions.length > 0) {
    // Loop through each prediction
    predictions.forEach((prediction) => {
      // Grab landmarks
      const landmarks = prediction.landmarks;

      // Loop through fingers
      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        //  Loop through pairs of joints
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          // Get pairs of joints
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          // Draw path
          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          );
          ctx.strokeStyle = "plum";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      // Loop through landmarks and draw em
      for (let i = 0; i < landmarks.length; i++) {
        // Get x point
        const x = landmarks[i][0];
        // Get y point
        const y = landmarks[i][1];
        // Start drawing
        ctx.beginPath();
        ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);

        // Set line color
        ctx.fillStyle = style[i]["color"];
        ctx.fill();
      }
    });
  }
};
```

## **8.** **drawHand** Landmarks in Detect Function

```javascript
// end of detect function in src/App/index.js

// Draw mesh
const ctx = canvasRef.current.getContext("2d");
drawHand(hand, ctx);
```

## **9.** **drawHand** Landmarks mesh

```javascript

```

---

## NPM

1. **Run App** `npm start`
2. Webpack Hot Reloading and ./dist directory bundling.

### npm start

- **scripts**: `npm start` runs scripts: `{ "start": "webpack serve"}`,
  - store your webpack commmands in package.json#scripts
  - alternatively run `npx webpack` or `node_modules/./bin/webpack`

---

## Package.JSON

### Packaging App

- **scripts**: `npm start` runs scripts: { "start": "webpack serve"},
- **main**: `webpack.config.js` is where webpack starts bundling from.

---

## WEBPACK HOW-TO

- [**Webpack**](https://www.npmjs.com/package/webpack): a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
- [**webpack-cli**](https://www.npmjs.com/package/webpack-cli): is the interface we use to communicate with webpack. webpack CLI provides a set of tools to improve the setup of custom webpack configuration.
- [**webpack-dev-server**](https://www.npmjs.com/package/webpack-dev-server): Use webpack with a development server that provides live reloading. This should be used for development only.
  - It uses [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) under the hood, which provides fast in-memory access to the webpack assets.

### Plugins

- [**CopyWebpackPlugin**](https://www.npmjs.com/package/copy-webpack-plugin): Copies individual files or entire directories, which already exist, to the build directory.
- [**HtmlWebpackPlugin**](https://www.npmjs.com/package/html-webpack-plugin): Plugin that simplifies creation of HTML files to serve your bundles.
- [**CleanWebpackPlugin**](https://www.npmjs.com/package/clean-webpack-plugin): A webpack plugin to remove/clean your build folder(s).
- [**UglifyPlugin**](https://www.npmjs.com/package/uglifyjs-webpack-plugin): This plugin uses [uglify-js](https://github.com/mishoo/UglifyJS) to minify your JavaScript.

---

## BABEL HOW-TO

### Babel Loader

#### Babel Presets

- **@babel/preset-env**: info coming soon.
- **@babel/preset-react**: info coming soon.

### Babel Plugins

- **@babel/plugin-transform-runtime**: info coming soon.
- **@babel/plugin-proposal-pipeline-operator**: info coming soon.
- **@babel/plugin-syntax-dynamic-import**: info coming soon.

---

## TREE

- Install Tree with Homebrew using `brew install tree`
- To create dir structure `tree -I 'node_modules|package-lock.json|dist'`
