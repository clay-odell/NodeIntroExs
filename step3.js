const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path, output) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) {
      console.error(`Error reading ${path}:`, err);
      process.exit(1);
    }
    if (output) {
      fs.writeFile(output, data, (err) => {
        if (err) {
          console.error(`Error writing to ${output}:`, err);
          process.exit(1);
        }
      });
    } else {
      console.log(data);
    }
  });
}

async function webCat(url, output) {
  try {
    const resp = await axios.get(url);
    if (output) {
      fs.writeFile(output, resp.data, (err) => {
        if (err) {
          console.error(`Error writing to ${output}:`, err);
          process.exit(1);
        }
      });
    } else {
      console.log(resp.data);
    }
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    process.exit(1);
  }
}

let pathOrUrl, output;
if (process.argv[2] === "--out") {
  output = process.argv[3];
  pathOrUrl = process.argv[4];
} else {
  pathOrUrl = process.argv[2];
}

if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
  webCat(pathOrUrl, output);
} else {
  cat(pathOrUrl, output);
}
