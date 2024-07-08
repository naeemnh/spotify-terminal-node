const authFetch = require("../fetch/authFetch");
const { updateState } = require("../state");

const { clientId, refresh_token } = require("../state").getState();

async function refresh() {
  const res = await authFetch({
    grant_type: "refresh_token",
    refresh_token,
    client_id: clientId,
  });

  updateState({
    access_token: res.access_token,
    refresh_token: res.refresh_token,
  });

  console.log("Spot Refreshed");
}

module.exports = refresh;
