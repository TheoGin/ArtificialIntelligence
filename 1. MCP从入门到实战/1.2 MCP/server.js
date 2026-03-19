import utils, { tools } from "./utils.js"; // node 运行ESModule要加后缀！！

process.stdin.on("data", data => {
  const requestObj = JSON.parse(data);

  let result;
  if (requestObj.method === "tools/call") {
    result = tools[requestObj.params.name](requestObj.params.arguments);
  } else if (requestObj.method in utils) {
    result = utils[requestObj.method]();
  } else {
    return;
  }

  const response = {
    jsonrpc: "2.0",
    result,
    id: requestObj.id,
  };
  process.stdout.write(JSON.stringify(response) + "\n");
});