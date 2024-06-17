const readline = require("readline/promises");

const { getState } = require("../config");
const { updateState } = require("../state");

async function getClientId(clientIdIndex) {
  const { clientId } = getState();

  let newClientId;

  if (clientIdIndex > -1) {
    newClientId = process.argv[clientIdIndex + 1];
  }

  if (!clientId && !newClientId) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    newClientId = await rl.question("Please Enter Client Id:");
  }

  updateState({ clientId: newClientId || clientId });
  return newClientId || clientId;
}

module.exports = getClientId;
