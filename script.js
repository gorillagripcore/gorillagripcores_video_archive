const videoFolder = "videos/";
const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");
const nextButton = document.getElementById("nextButton");

let videoList = [];

async function fetchVideoList() {
  const response = await fetch("videos.json");
  const data = await response.json();
  videoList = data.videos;
  playRandomVideo();
}

function playRandomVideo() {
  const randomIndex = Math.floor(Math.random() * videoList.length);
  const randomVideo = videoList[randomIndex];
  videoSource.src = videoFolder + randomVideo;
  videoPlayer.load();
  videoPlayer.play();
}

nextButton.addEventListener("click", playRandomVideo);

fetchVideoList();
