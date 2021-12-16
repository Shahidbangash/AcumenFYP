function readyFunction() {
  console.log("Page ready");

  //   getResult();
  document
    .getElementById("input")
    .addEventListener("change", async function () {
      var media = URL.createObjectURL(this.files[0]);
      document.getElementById("localVideoResult").style.display = "flex";
      var video = document.getElementById("localVideo");
      video.src = media;
      video.style.display = "block";
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
      ]).then(() => {
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
            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize
            );
            canvas
              .getContext("2d")
              .clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            // console.log(resizedDetections[0].expressions);
          }, 100);
        });
      });
    });
}


var expressionObjectArray = [];

var continueExpression = true;

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
    /////////////////


    var expressionsArray = [];
    var expressionsResult = [];

    var labels = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
    ];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Expression Result',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0.1, 0.25, 0.5, 0.75, 1.0],
      }],
      options: {
        responsive: true,
        aspectRatio: 1,
      }
    };

    const config = {
      type: 'bar',
      data,
      options: {}
    };

    var myChart = new Chart(
      document.getElementById('liveChart'),
      config
    );


    ////////////////

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

      if (resizedDetections[0] != null) {
        resizedDetections.forEach(element => {
          expressionObjectArray.push(element.expressions);
          console.log(element.expressions);
        });
        // console.log(resizedDetections[0].expressions);
        console.log(`Total people detect ${resizedDetections.length}`);

        expressionsArray = [];
        expressionsResult = [];
        labels = [];
        for (keys in resizedDetections[0].expressions) {
          expressionsArray.push(keys);
          expressionsResult.push(resizedDetections[0].expressions[keys]);
        }
        labels = expressionsArray;
        console.log(`labels now ${labels[0]}`);
        data.labels = expressionsArray;
        myChart.update();
        data.datasets[0].data = expressionsResult;
        myChart.update();
      }
      // console.log(resizedDetections[0].expressions);
    }, 1000);
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

document.getElementById("input").addEventListener("change", async function () {
  var media = URL.createObjectURL(this.files[0]);
  document.getElementById("localVideoResult").style.display = "flex";
  var video = document.getElementById("localVideo");
  video.src = media;
  video.style.display = "block";
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
  ]).then(() => {
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
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        // console.log(resizedDetections[0].expressions);
      }, 100);
    });
  });
});


function generateReport() {
  document.getElementById("liveChart").innerHTML = "";
  continueExpression = false;
  removeLiveVideoCanvas();
  removeLocalVideoCanvas();

  var finalResult = {
    neutral: 0,
    happy: 0,
    sad: 0,
    angry: 0,
    fearful: 0,
    disgusted: 0,
    surprised: 0,
  };

  expressionObjectArray.forEach((element, index) => {
    delete element[`${Object.keys(element).length - 1}`];
    for (key in element) {
      finalResult[key] += element[key];
    }
  });

  const data = {
    labels: Object.keys(expressionObjectArray[0]),
    datasets: [
      {
        label: 'Dataset 1',
        data: Object.values(finalResult),
        backgroundColor: [
          '#000957',
          '#FFCA03',
          '#B85252',
          '#105652',
          '#F05454',
          'rgba(153, 102, 255, .6)',
          '#1A374D'
        ],
        // backgroundColor: Object.values(Utils.CHART_COLORS),
      }
    ]
  };


  const config = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      aspectRatio: 3,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Expression and Behavior report'
        }
      }
    },
  };

  var myChart = new Chart(
    document.getElementById('report_chart'),
    config
  );

}



function saveHistory() {

  document.getElementById("liveChart").innerHTML = "";
  continueExpression = false;
  removeLiveVideoCanvas();
  removeLocalVideoCanvas();


  firebase.auth().onAuthStateChanged(function (user) { //or use firebase.auth().currentUser;
    if (user) {

      var finalResult = {
        neutral: 0,
        happy: 0,
        sad: 0,
        angry: 0,
        fearful: 0,
        disgusted: 0,
        surprised: 0,
      };

      expressionObjectArray.forEach((element, index) => {
        delete element[`${Object.keys(element).length - 1}`];

        for (key in element) {
          finalResult[key] += element[key];
        }
      });

      const db = firebase.firestore();

      var ref = db.collection("history").doc();

      var data = [];
      i = 0;
      for (key in finalResult) {
        if (i != 6) {
          data.push({
            "confidence": finalResult[key],
            "label": ` ${key}`,
          });

        }
        else {
          break;
          // do nothing
        }
        i++;
      }
      return ref.set({
        data: data,
        "time": Date.now(),
        userId: user.uid,
      })
        .then(function () {
          let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
          document.getElementById("modal_message").innerHTML = "Response";
          document.getElementById("myModalLongTitle").innerHTML = "History Saved to Database";
          myModal.show();
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error(error);
        });


      // User is signed in.
    } else {

      let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
      document.getElementById("modal_message").innerHTML = "Please Login to save your History";
      document.getElementById("myModalLongTitle").innerHTML = "User not logged in";
      myModal.show();
    }
  });
}


function closeModal() {
  let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
  // document.getElementById("modal_message").innerHTML = "Please Login to save your History";
  myModal.hide();
}

function printDiv(divID) {

  var canvas = document.getElementById('report_chart');
  // canvas.width = window.innerWidth - 100;
  // canvas.height = window.innerHeight - 300;

  // only jpeg is supported by jsPDF
  var imgData = canvas.toDataURL("image/jpeg", 1.0);
  var pdf = new jsPDF();

  pdf.addImage(imgData, 'JPEG', 0, 0);
  pdf.save("download.pdf");

}
