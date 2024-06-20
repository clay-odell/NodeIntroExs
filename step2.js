const fs = require("fs");
const process = require("process");
const axios = require('axios');
function cat(path) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) {
      console.error(`Error reading ${path}:`, err);
      process.exit(1);
    }
    console.log(data);
  });
}
async function webCat(url) {
    try {
        const resp = await axios.get(url);
        console.log(resp.data);
    } catch (error) {
        console.error(`Error fetching ${url}:`, err);
        process.exit(1);
    }
}
const pathOrUrl = process.argv[2];
if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    webCat(pathOrUrl);
} else {
    cat(pathOrUrl);
}