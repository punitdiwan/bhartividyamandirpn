// build.js
const { execSync } = require("child_process");

// Use legacy OpenSSL provider to avoid webpack errors
execSync("NODE_OPTIONS=--openssl-legacy-provider next build", {
  stdio: "inherit",
});
