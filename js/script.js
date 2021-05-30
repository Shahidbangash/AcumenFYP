var video;
$(document).ready(function () {
  $(".main-header").load("./header.html");
  $("footer").load("./footer.html");
});

$(window).scroll(function () {
  var sc = $(window).scrollTop();
  if (sc > 150) {
    $("#main-navbar").addClass("navbar-scroll");
  } else {
    $("#main-navbar").removeClass("navbar-scroll");
  }
});

document.getElementById("input").addEventListener("change", function () {
  var media = URL.createObjectURL(this.files[0]);
  document.getElementById("localVideoResult").style.display = "flex";
  var video = document.getElementById("localVideo");
  video.src = media;
  video.style.display = "block";
  video.play();

  video.addEventListener("play", () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    // document.body.append(canvas);
    document.getElementById("localVideoResult").style.display = "flex";
    document.getElementById("localVideoResult").appendChild(canvas);
    const displaySize = { width: 720, height: 520 };
    faceapi.matchDimensions(canvas, displaySize);

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
      // console.log(resizedDetections[0].expressions);
    }, 100);
  });
});

function getResult() {
  $(".pre-loader").append(
    `<div><h2>We are loading Modal. Result will be shown shortly </h2>
          <div class='loader text-center' id='loader'></div>
    </div> `
  );

  Promise.all([
    // To load all the models
    faceapi.nets.tinyFaceDetector.loadFromUri("/AcumenFYP/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/AcumenFYP/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/AcumenFYP/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/AcumenFYP/models"),
  ]).then(startVideo);
}

function startVideo() {
  $("#video-result").empty();
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
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      // console.log(resizedDetections[0].expressions);
    }, 100);
  });
  // document.querySelector("#loader").classList.add("hide-loader");
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}
