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
    shuffleArray(videoList);
    playedVideos.clear();
    playNextShuffledVideo();
  } catch (error) {
    console.error("Error fetching video list:", error);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function playNextShuffledVideo() {
  if (playedVideos.size === videoList.length) {
    playedVideos.clear();
    shuffleArray(videoList); 
  }

  const videoIndex = playedVideos.size;
  playedVideos.add(videoIndex);
  const nextVideo = videoList[videoIndex];
  videoSource.src = videoFolder + nextVideo;

  videoPlayer.load();
  videoPlayer.oncanplaythrough = () => videoPlayer.play();
  
  videoPlayer.onerror = () => {
    console.error("Error loading video:", videoSource.src);
    playNextShuffledVideo();
  };
}

nextButton.addEventListener("click", playNextShuffledVideo);

fetchVideoList();
