const getClientId = require("./getClientId");
const SCOPES = require("../constants/scopes");
const generateRandomString = require("../helpers/generateRandomString");
const { sha256, base64encode } = require("./getCodeChallenge");
const { getState, updateState } = require("../state");
const authFetch = require("../fetch/authFetch");

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

    console.log(
      `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=https://naeemnh.github.io/spotify-terminal-node/index.html&code_challenge_method=S256&code_challenge=${codeChallenge}`,
    );
  } else {
    const res = await authFetch({
      client_id: clientId,
      grant_type: "authorization_code",
      code: process.argv[authorizationCodeIndex + 1],
      redirect_uri:
        "https://naeemnh.github.io/spotify-terminal-node/index.html",
      code_verifier: codeVerifier,
    });

    updateState({
      codeVerifier: "",
      access_token: res.access_token,
      refresh_token: res.refresh_token,
    });

    console.log("User Authenticated");
  }
}

module.exports = getAccessToken;
