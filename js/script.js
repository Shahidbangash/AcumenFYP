var video;
$(document).ready(function () {
  $(".main-header").load("./header.html");
});

$(window).scroll(function () {
  var sc = $(window).scrollTop();
  if (sc > 150) {
    $("#main-navbar").addClass("navbar-scroll");
  } else {
    $("#main-navbar").removeClass("navbar-scroll");
  }
});

function uploadVideo() {}

function displayYouTubeVideo() {
  // load all modals

  // a little oveview about MTCNN

  // MTCNN (Multi-task Cascaded Convolutional Neural Networks) is an algorithm consisting of 3 stages,
  // which detects the bounding boxes of faces in an image along with their 5 Point Face Landmarks(link to the paper).
  // Each stage gradually improves the detection results by passing it’s inputs through a CNN,
  // which returns candidate bounding boxes with their scores, followed by non max suppression.

  Promise.all(
    faceapi.loadMtcnnModel("/"),
    faceapi.loadFaceRecognitionModel("/")
  ).then(
    navigator.getUserMedia(
      { video: {} },
      (stream) => (video.srcObject = stream),
      (err) => console.error(err)
    )
  );
}

function getResult() {
  $(".pre-loader").append(
    "<div><h2>We are loading Modal </h2><div class='loader ' id='loader'></div></div> "
  );

  Promise.all([
    // To load all the models
    faceapi.nets.tinyFaceDetector.loadFromUri(
      "/face-expression-detector/models"
    ),
    faceapi.nets.faceLandmark68Net.loadFromUri(
      "/face-expression-detector/models"
    ),
    faceapi.nets.faceRecognitionNet.loadFromUri(
      "/face-expression-detector/models"
    ),
    faceapi.nets.faceExpressionNet.loadFromUri(
      "/face-expression-detector/models"
    ),
  ]).then(startVideo);
}
function startVideo() {
  $("#video-result").empty();
  $("#video-result").append(`<video id="video" autoplay muted sr></video>`);
  video = document.getElementById("video");

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
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);
  });
  // document.querySelector("#loader").classList.add("hide-loader");
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}
