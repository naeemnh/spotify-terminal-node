#!/usr/bin/env node

const getAccessToken = require("./auth/getAccessToken");
const { initializeState, getState } = require("./state");

const arg = process.argv[2];

switch (arg) {
  case "authenticate":
    getAccessToken()
      .then((token) => {
        console.log(`Access Token: ${token}`);
        process.exit(0);
      })
      .catch((error) => {
        console.log(`Failed to get token: ${error.stack}`);
        process.exit(1);
      });
    return 1;
    getAccessToken();
    break;

  case "init":
    initializeState();
    break;

  case "getState":
    const state = getState();
    console.log(state);
    break;

  default:
    console.log(`Invalid argument: ${arg}`);
}
