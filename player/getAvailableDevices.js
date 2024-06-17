const spotFetch = require("../fetch");

async function getAvailableDevices() {
  const res = await spotFetch("https://api.spotify.com/v1/me/player/devices");

  console.log(res);
}

module.exports = getAvailableDevices;
