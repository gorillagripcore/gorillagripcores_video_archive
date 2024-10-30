const videoFolder = "videos/";
const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");
const nextButton = document.getElementById("nextButton");

const videoList = [];

async function fetchVideoList() {
  const response = await fetch(videoFolder);
  const data = await response.text();
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(data, "text/html");

  const links = htmlDoc.querySelectorAll("a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href.endsWith(".mp4")) {
      videoList.push(href);
    }
  });

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
