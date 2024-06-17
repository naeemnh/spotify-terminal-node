const fs = require("fs");
const path = require("path");
const parseBuffer = require("./helpers/parseBuffer");

function initializeState() {
  const fileName = `spot_state.txt`;
  const filePath = path.join(__dirname, fileName);

  try {
    fs.writeFileSync(filePath, `client_id=\nauthorization_code=\n`);
    console.log(`File created for Spot State`);
  } catch (e) {
    console.error(`Error create file:`, e);
  }
}

function getState() {
  const stateFilePath = path.join(__dirname, "spot_state.txt");
  const bufferState = fs.readFileSync(stateFilePath);
  const stateObject = parseBuffer(bufferState);

  return stateObject;
}

function updateState(newState) {
  const state = getState();
  const updatedState = { ...state, ...newState };

  const filePath = path.join(__dirname, "spot_state.txt");
  let stateString;
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
