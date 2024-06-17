const { access_token } = require("../state").getState();

async function spotFetch(input, init) {
  try {
    const response = await fetch(input, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
      },
      ...init,
    });
    if (!response.ok) {
      throw new Error(
        `Request Error: ${response.status} | ${response.message}`,
      );
    }
    if (response.status === 204) return;

    return await response.json();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

module.exports = spotFetch;
