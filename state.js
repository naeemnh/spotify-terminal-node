const fs = require("fs");
const path = require("path");
const parseBuffer = require("./helpers/parseBuffer");

const fileName = "spot_state.txt";
const filePath = path.join(__dirname, fileName);

function initializeState() {
  try {
    fs.writeFileSync(filePath, `client_id=\nauthorization_code=\n`);
    console.log(`File created for Spot State`);
  } catch (e) {
    console.error(`Error create file:`, e);
  }
}

function getState() {
  const bufferState = fs.readFileSync(filePath);
  const stateObject = parseBuffer(bufferState);

  return stateObject;
}

function updateState(newState) {
  const state = getState();
  const updatedState = { ...state, ...newState };

  let stateString = "";
  for (const key in updatedState) {
    if (updatedState.hasOwnProperty(key)) {
      stateString = `${stateString}\n${key}=${updatedState[key]}`;
    }
  }
  try {
    fs.writeFileSync(filePath, stateString);
  } catch (e) {
    console.err(`Error in updating state: ${e.message}`);
  }
}

module.exports = {
  initializeState,
  getState,
  updateState,
};
