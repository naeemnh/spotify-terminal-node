const spotFetch = require("../fetch");

const url = "https://api.spotify.com/v1/me/player";

async function getCurrentTrack() {
  const res = await spotFetch(url + "/currently-playing");
  console.log(res);
}

async function playNext() {
  await spotFetch(url + "/next", { method: "POST" });
  console.log("Playing Next Track");
}

async function playPrevious() {
  await spotFetch(url + "/previous", { method: "POST" });
  console.log("Playing Previous Track");
}

module.exports = {
  getCurrentTrack,
  playNext,
  playPrevious,
};
