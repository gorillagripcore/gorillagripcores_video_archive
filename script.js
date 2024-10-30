const videoFolder = "videos/";
const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");
const nextButton = document.getElementById("nextButton");

let videoList = [];
let playedVideos = new Set();

async function fetchVideoList() {
  try {
    const response = await fetch("videos.json");
    const data = await response.json();
    videoList = data.videos;
    playedVideos.clear();
    playRandomVideo();
  } catch (error) {
    console.error("Error fetching video list:", error);
  }
}

function playRandomVideo() {
  if (playedVideos.size === videoList.length) {
    fetchVideoList();
    return;
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * videoList.length);
  } while (playedVideos.has(randomIndex));

  playedVideos.add(randomIndex);
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
