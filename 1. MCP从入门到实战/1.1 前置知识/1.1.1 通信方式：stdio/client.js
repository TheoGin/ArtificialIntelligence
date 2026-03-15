import { spawn } from "child_process";

// client父进程可以不是终端
// client.js - 向服务端发送消息并通过 stdout 获取响应

/* spawn 孕育
 function spawn(
 command: string,
 args?: readonly string[],
 ): ChildProcessWithoutNullStreams;
 *  */
// 启动 server.js 子进程
const childProcess = spawn("node", ["server.js"]);

// 监听服务端的响应
childProcess.stdout.on("data", (data) => {
  console.log(data.toString());
});

// 发送几条测试消息
const messages = ["你好吗？", "人生有意义吗？", "努力好吗?"];
messages.forEach((message, index) => {
  setTimeout(() => {
    // 写入数据到子进程
    console.log("-->", message);
    childProcess.stdin.write(message);
  }, index * 1000); // 每秒发一条
});
