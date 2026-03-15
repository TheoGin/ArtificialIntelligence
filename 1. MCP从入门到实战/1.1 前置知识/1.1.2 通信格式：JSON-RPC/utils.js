import fs from "fs";

// const fs = require("node:fs");
// module.exports = {
export default {
  sum({ a, b }) {
    return a + b;
  },
  createFile({ filename, content }) {
    try {
      fs.writeFileSync(filename, content);
      return true;
    } catch (e) {
      return false;
    }
  },
};