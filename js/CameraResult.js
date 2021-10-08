// document.onload =
function readyFunction() {
  console.log("Page ready");
  getResult();
}

// document.getElementById("input").addEventListener("change", async function () {
//   var media = URL.createObjectURL(this.files[0]);
//   document.getElementById("localVideoResult").style.display = "flex";
//   var video = document.getElementById("localVideo");
//   video.src = media;
//   video.style.display = "block";
//   await Promise.all([
//     // To load all the models
//     // faceapi.nets.tinyFaceDetector.loadFromUri("/AcumenFYP/models"),
//     faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
//     // faceapi.nets.faceLandmark68Net.loadFromUri("/AcumenFYP/models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//     // faceapi.nets.faceRecognitionNet.loadFromUri("/AcumenFYP/models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//     // faceapi.nets.faceExpressionNet.loadFromUri("/AcumenFYP/models"),
//     faceapi.nets.faceExpressionNet.loadFromUri("/models"),
//   ]).then(() => {
//     video.play();

//     video.addEventListener("play", () => {
//       const canvas = faceapi.createCanvasFromMedia(video);
//       // document.body.append(canvas);
//       document.getElementById("localVideoResult").style.display = "flex";
//       document.getElementById("localVideoResult").appendChild(canvas);
//       const displaySize = { width: 720, height: 520 };
//       faceapi.matchDimensions(canvas, displaySize);

//       setInterval(async () => {
//         const detections = await faceapi
//           .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks()
//           .withFaceExpressions();
//         const resizedDetections = faceapi.resizeResults(
//           detections,
//           displaySize
//         );
//         canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//         // console.log(resizedDetections[0].expressions);
//       }, 100);
//     });
//   });
// });

async function getResult() {
  // $
  $(".pre-loader").empty();
  $(".pre-loader").append(
    `<div><h2>We are loading Modal. Result will be shown shortly </h2>
            <div class='loader text-center' id='loader'></div>
      </div> `
  );

  await Promise.all([
    // To load all the models
    // faceapi.nets.tinyFaceDetector.loadFromUri("/AcumenFYP/models"),
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    // faceapi.nets.faceLandmark68Net.loadFromUri("/AcumenFYP/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    // faceapi.nets.faceRecognitionNet.loadFromUri("/AcumenFYP/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    // faceapi.nets.faceExpressionNet.loadFromUri("/AcumenFYP/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  ]).then(startVideo);
}

function startVideo() {
  removeLiveVideoCanvas();
  removeLocalVideoCanvas();
  // we have to remove existing data if it exist
  // $("#video-result").empty();

  // add video player
  $("#video-result").append(`<video id="video" autoplay muted sr></video>`);
  video = document.getElementById("video");
  document.getElementById("video-result").style.display = "flex";

  video.addEventListener("play", () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    // document.body.append(canvas);
    document.getElementById("video-result").appendChild(canvas);
    const displaySize = { width: 720, height: 520 };
    faceapi.matchDimensions(canvas, displaySize);

    document.querySelector(".pre-loader").innerHTML = "";

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks() // show face landmarks such as nose position ,
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      // console.log(resizedDetections[0].expressions);
    }, 100);
  });
  document.querySelector("#loader").classList.add("hide-loader");

  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      { audio: true, video: { width: 1280, height: 720 } },
      function (stream) {
        var video = document.querySelector("video");
        video.srcObject = stream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      },
      function (err) {
        console.log("The following error occurred: " + err.name);
      }
    );
  } else {
    console.log("getUserMedia not supported");
    alert("Sorry your browser does not support Video");
  }
}
