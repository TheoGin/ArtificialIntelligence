// const utils = require("./utils.js");
// import utils from "./utils";
import utils from "./utils.js"; // node 运行ESModule要加后缀！！

process.stdin.on("data", data => {
  const requestObj = JSON.parse(data);
  const functionName = requestObj.method;
  const params = requestObj.params;
  const result = utils[functionName](params);

  const response = {
    jsonrpc: "2.0",
    result,
    id: requestObj.id,
  };
  process.stdout.write(JSON.stringify(response) + "\n");
});