// import utils from "./utils";
const utils = require("./utils.js");

process.stdin.on("data", data => {
  const obj = JSON.parse(data);
  const method = obj.method;
  const params = obj.params;
  const result = utils[method](params);

  const response = {
    jsonrpc: "2.0",
    result,
    id: obj.id,
  };
  process.stdout.write(JSON.stringify(response) + "\n");
});