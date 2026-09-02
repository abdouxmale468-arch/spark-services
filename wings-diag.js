// Temporary diagnostic: query panel + Wings daemons to see real states
const https = require("https");
const http = require("http");

const PANEL = "https://panel.spark-services.kdns.fr";
const KEY = "ptla_z4NC5jmMroTp0PHW5t1Ohmp94dEJNQzxnXYhwtX0oVI";

function req(method, url, auth, body) {
  return new Promise((resolve, reject) => {
    let lib = url.startsWith("https") ? https : http;
    const u = new URL(url);
    const opts = {
      hostname: u.hostname,
      port: u.port || (url.startsWith("https") ? 443 : 80),
      path: u.pathname + u.search,
      method,
      headers: { Accept: "application/json", "User-Agent": "Spark-Diag/1.0" },
      rejectUnauthorized: false,
    };
    if (auth) opts.headers.Authorization = "Bearer " + auth;
    if (body) { opts.headers["Content-Type"] = "application/json"; opts.headers["Content-Length"] = Buffer.byteLength(body); }
    const r = lib.request(opts, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString() }));
    });
    r.on("error", reject);
    if (body) r.write(body);
    r.end();
  });
}

(async () => {
  console.log("=== Spark Services Diagnostic ===");
  console.log("Panel:", PANEL);
  console.log("Checking connectivity...");
  const health = await req("GET", PANEL + "/api/application/servers?per_page=1", KEY);
  console.log("Status:", health.status);
  if (health.status >= 200 && health.status < 300) {
    console.log("✓ Panel connection OK");
  } else {
    console.log("✗ Panel connection failed");
  }
})();