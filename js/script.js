var video;
$(document).ready(function () {

  try {

    const firebaseConfig = {
      apiKey: "AIzaSyC1GkiWGio-_MohFCjXEZxr2akg286nKWA",
      authDomain: "acumenfyp.firebaseapp.com",
      projectId: "acumenfyp",
      storageBucket: "acumenfyp.appspot.com",
      messagingSenderId: "982412180494",
      appId: "1:982412180494:web:eca5e3ea3ef3819abad05f",
      measurementId: "G-25G6CNZT8L"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    //const analytics = firebase.getAnalytics(app);

    //let app = firebase.app();
    let features = [
      'auth',
      'database',
      'firestore',
      'functions',
      'messaging',
      'storage',
      'analytics',
      'remoteConfig',
      'performance',
    ].filter(feature => typeof app[feature] === 'function');
    //loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
  } catch (e) {
    console.log(e);
  }

  // var user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged(function (user) { //or use 
  if (user) {
    console.log(`User is login ${user.displayName}`);
    $(".main-header").load("./loginHeader.html");
    // User is signed in.
  } else {
    console.log(`User is not login `);
    // No user is signed in.
    $(".main-header").load("./header.html");
  }
  });
  // $(".main-header").load("./header.html");
  $("footer").load("./footer.html");
  // loadModels();
});

$(window).scroll(function () {
  var sc = $(window).scrollTop();
  if (sc > 150) {
    $("#main-navbar").addClass("navbar-scroll");
  } else {
    $("#main-navbar").removeClass("navbar-scroll");
  }
});

// async function loadModels() {
//   await Promise.all([
//     faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
//     // faceapi.nets.faceLandmark68Net.loadFromUri("/AcumenFYP/models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//     // faceapi.nets.faceRecognitionNet.loadFromUri("/AcumenFYP/models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//     // faceapi.nets.faceExpressionNet.loadFromUri("/AcumenFYP/models"),
//     faceapi.nets.faceExpressionNet.loadFromUri("/models"),
//   ]);
// }


// async function getResult() {
//   // $
//   $(".pre-loader").empty();
//   $(".pre-loader").append(
//     `<div><h2>We are initiating Models. Result will be appeared shortly</h2>
//           <div class='loader text-center' id='loader'></div>
//     </div> `
//   );

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
//   ]).then(startVideo);
// }


// function startVideo() {
//   removeLiveVideoCanvas();
//   removeLocalVideoCanvas();
//   $('.pre-loader').empty();
//   // $(".pre-loader").append(
//   //   `<div><h2>Here is the result</h2>
//   //         <div class='loader text-center' id='loader'></div>
//   //   </div> `);
//   // we have to remove existing data if it exist
//   // $("#video-result").empty();

//   // add video player
//   $("#video-result").append(`<video id="video" autoplay muted sr></video>`);
//   video = document.getElementById("video");
//   document.getElementById("video-result").style.display = "flex";

//   video.addEventListener("play", () => {
//     const canvas = faceapi.createCanvasFromMedia(video);
//     // document.body.append(canvas);
//     document.getElementById("video-result").appendChild(canvas);
//     const displaySize = { width: 720, height: 520 };
//     faceapi.matchDimensions(canvas, displaySize);

//     document.querySelector(".pre-loader").innerHTML = "";

//     setInterval(async () => {
//       const detections = await faceapi
//         .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks() // show face landmarks such as nose position ,
//         .withFaceExpressions();
//       const resizedDetections = faceapi.resizeResults(detections, displaySize);
//       canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//       faceapi.draw.drawDetections(canvas, resizedDetections);
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//       // console.log(resizedDetections[0].expressions);
//     }, 100);
//   });
//   document.querySelector("#loader").classList.add("hide-loader");

//   navigator.getUserMedia =
//     navigator.getUserMedia ||
//     navigator.webkitGetUserMedia ||
//     navigator.mozGetUserMedia;

//   if (navigator.getUserMedia) {
//     navigator.getUserMedia(
//       { audio: true, video: { width: 1280, height: 720 } },
//       function (stream) {
//         var video = document.querySelector("video");
//         video.srcObject = stream;
//         video.onloadedmetadata = function (e) {
//           video.play();
//         };
//       },
//       function (err) {
//         console.log("The following error occurred: " + err.name);
//       }
//     );
//   } else {
//     console.log("getUserMedia not supported");
//     alert("Sorry your browser does not support Video");
//   }
// }

// Get Result Using Video file
