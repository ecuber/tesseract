[![Netlify Status](https://api.netlify.com/api/v1/badges/cef1266a-68cc-4cdf-bc66-dee1b9edf100/deploy-status)](https://app.netlify.com/sites/tesseract22/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-blueviolet.svg)](https://opensource.org/licenses/MIT)
# Tesseract Visualizer

I created this visualization as an extra credit project for the multivariable calculus class I took in the fall of my senior year of high school. 

A [tesseract](https://en.wikipedia.org/wiki/Tesseract) is essentially a 4D cube; what you see on the website is a visualization of the points of the tesseract undergoing two [perspective projections](https://en.wikipedia.org/wiki/Perspective_(graphical)): once from 4D into 3D, and again from 3D into 2D (which you see on your computer screen!)

![demo gif](./demo/tesseractdemo.gif)

The graphics were created all with [p5.js](https://p5js.org/). I did not use this library's built-in WebGL 3D renderer—rather, everything you see is represented by 2D shapes, the positions and scales of which I calculated manually (for whatever reason, doing something like this has been on my bucket list for a while).

## Website
The site is live at [https://tesseract22.netlify.app](https://tesseract22.netlify.app)! Feel free to visit and try it out.

### Parameters
* **Speed** - Drag the slider to control the speed at which the rotations are happening.
* **Rotation Axes (3D cube only)** - Enable or disable axes about which to rotate the cube.
* **Rotation Planes (4D tesseract only)** - In 4D, we can't really rotate about a singular axis. Instead, we rotate about a *plane*. Each rotation is represented by a 4x4 matrix. By checking a box, you add a rotation matrix to a list of matrices to be composed—the resulting matrix is applied to all the points of the tesseract *prior* to projection.

## Tech Stack
As mentioned, the animation itself is rendered with [p5.js](https://p5js.org/). The website was programmed with [Create React App](https://create-react-app.dev/) and [TypeScript](https://www.typescriptlang.org/). For CSS, I used [Emotion in the styled flavor](https://emotion.sh/docs/styled).

## Acknowledgements
The code was inspired in part by Daniel Shiffman's YouTube video on [3D projection](https://www.youtube.com/watch?v=p4Iz0XJY-Qk). I didn't actually realize he had [another video]((https://www.youtube.com/watch?v=XE3YDVdQSPo)) on 4D projection until I was well into the project—but proved to be useful during my myriad sanity checks.

## License
[MIT](https://choosealicense.com/licenses/mit/)
