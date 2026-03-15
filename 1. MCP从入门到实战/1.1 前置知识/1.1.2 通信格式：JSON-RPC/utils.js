// import * as fs from "node:fs";

// export default {
const fs = require("node:fs");
module.exports = {
  sum({ a, b }) {
    return a + b;
  },
  createFile({ filename, content }) {
    fs.writeFileSync(filename, content);
  },
};