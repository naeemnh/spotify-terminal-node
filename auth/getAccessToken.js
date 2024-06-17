const getClientId = require("./getClientId");
const SCOPES = require("../constants/scopes");
const generateRandomString = require("../helpers/generateRandomString");
const { sha256, base64encode } = require("./getCodeChallenge");
const { getState, updateState } = require("../state");

/**
 * Requests a new authorization token for Spotify Web Api
 *
 * @returns {Promise<string>}
 */
async function getAccessToken() {
  // Get clientId
  const clientId = await getClientId(process.argv.indexOf("--client-id"));
  const authorizationCodeIndex = process.argv.indexOf("--authorization-code");

  if (!clientId) {
    throw new Error("ClientId Not Provided");
  }

  let codeVerifier = getState().codeVerifier || generateRandomString(64);

  if (authorizationCodeIndex < 0) {
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const scope = SCOPES.join("%20");
    updateState({ codeVerifier: codeVerifier });

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=https://lennyomg.github.io/Spotify-PowerShell/index.html&code_challenge_method=S256&code_challenge=${codeChallenge}`;
  } else {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: process.argv[authorizationCodeIndex + 1],
        redirect_uri:
          "https://lennyomg.github.io/Spotify-PowerShell/index.html",
        client_id: clientId,
        code_verifier: codeVerifier,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    updateState({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    });
    return data.access_token;
  }
}

module.exports = getAccessToken;
