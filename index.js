#!/usr/bin/env node

const getAccessToken = require("./auth/getAccessToken");
const { initializeState, getState } = require("./state");
const getAvailableDevices = require("./player/getAvailableDevices");
const {
  getCurrentTrack,
  playNext,
  playPrevious,
} = require("./player/getCurrentTrack");

const arg = process.argv[2];

switch (arg) {
  case "authenticate":
    getAccessToken();
    break;

  case "init":
    initializeState();
    break;

  case "devices":
    getAvailableDevices();
    break;

  case "track":
    getCurrentTrack();
    break;

  case "next":
    playNext();
    break;

  case "prev":
    playPrevious();
    break;

  case "getState":
    const state = getState();
    console.log(state);
    break;

  default:
    console.log(`Invalid argument: ${arg}`);
}
