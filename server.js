// Spark Services - local static server + Pterodactyl Client API proxy (no dependencies)
// Usage: node server.js   ->  http://localhost:3000

const PTERO_PANEL = process.env.PTERODACTYL_PANEL || "https://panel.spark-services.kdns.fr";
const PTERO_KEY   = process.env.PTERODACTYL_KEY   || "ptla_z4NC5jmMroTp0PHW5t1Ohmp94dEJNQzxnXYhwtX0oVI";
const PTERO_CLIENT_KEY = process.env.PTERODACTYL_CLIENT_KEY || "";

const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml"
};

const server = http.createServer((req, res) => {
    let urlPath;
    try {
        urlPath = decodeURIComponent(req.url.split("?")[0]);
    } catch (e) {
        res.writeHead(400);
        return res.end("Bad Request");
    }

    if (urlPath === "/") urlPath = "/index.html";

    const filePath = path.normalize(path.join(ROOT, urlPath));
    if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
        res.writeHead(403);
        return res.end("Forbidden");
    }

    fs.stat(filePath, (err, stat) => {
        if (err || !stat.isFile()) {
            res.writeHead(404);
            return res.end("404 Not Found");
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log("Spark Services running at http://localhost:" + PORT);
    console.log("Pterodactyl panel: " + (PTERO_PANEL || "not set"));
});