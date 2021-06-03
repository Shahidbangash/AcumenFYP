// this function will make canvas fro local video empty
function removeLocalVideoCanvas() {
  document.getElementById("localVideoResult").style.display = "none";
  $("#localVideoResult").empty();
}


//  this function will make canvas for live result empty
function removeLiveVideoCanvas() {
  document.getElementById("video-result").style.display = "none"; // hide the parent of live video canvas using dom
  $("#video-result").empty(); // jquery function to remove all the children
}
