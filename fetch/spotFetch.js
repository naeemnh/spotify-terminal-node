const { access_token } = require("../state").getState();

async function spotFetch(input, init) {
  console.log(input, init);
  try {
    const response = await fetch(input, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
      },
      ...init,
    });

    // No Response Required
    if (response.status === 204) return;

    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Request Error: ${response.status} | ${result.error}`);
    }

    return result;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

module.exports = spotFetch;
