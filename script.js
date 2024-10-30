const videoFolder = "videos/";
const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");
const nextButton = document.getElementById("nextButton");

let videoList = [];

async function fetchVideoList() {
  try {
    const response = await fetch("videos.json");
    const data = await response.json();
    videoList = data.videos;
    playRandomVideo();
  } catch (error) {
    console.error("Error fetching video list:", error);
  }
}

function playRandomVideo() {
  const randomIndex = Math.floor(Math.random() * videoList.length);
  const randomVideo = videoList[randomIndex];
  videoSource.src = videoFolder + randomVideo;

  videoPlayer.load();

  videoPlayer.oncanplaythrough = () => {
    videoPlayer.play();
  };

  videoPlayer.onerror = (e) => {
    console.error("Error loading video:", e);
  };
}

nextButton.addEventListener("click", playRandomVideo);

fetchVideoList();
