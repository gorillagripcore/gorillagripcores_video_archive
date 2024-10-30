const fs = require("fs");
const path = require("path");

const videosFolder = path.join(__dirname, "videos");
const outputFile = path.join(__dirname, "videos.json");

fs.readdir(videosFolder, (err, files) => {
  if (err) {
    console.error("Error reading videos folder:", err);
    return;
  }

  const videoFiles = files.filter((file) => file.endsWith(".mp4"));

  const jsonContent = {
    videos: videoFiles,
  };

  fs.writeFile(outputFile, JSON.stringify(jsonContent, null, 2), (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("videos.json has been generated successfully.");
    }
  });
});
