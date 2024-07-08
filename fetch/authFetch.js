async function authFetch(body) {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(body),
    });

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

module.exports = authFetch;
