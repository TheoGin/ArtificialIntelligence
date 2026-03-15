import { spawn } from "child_process";

// client父进程可以不是终端


/* spawn 孕育
 function spawn(
 command: string,
 args?: readonly string[],
 ): ChildProcessWithoutNullStreams;
 *  */
// 创建子进程
const childProcess = spawn("node", ["server.js"]);

// 监听子进程输出
childProcess.stdout.on("data", (data) => {
  console.log(data.toString());
});

const messages = ["你好吗？", "人生有意义吗？", "努力好吗?"];
messages.forEach((message, index) => {
  setTimeout(() => {
    // 写入数据到子进程
    console.log("-->", message);
    childProcess.stdin.write(message);
  }, index * 1000);
});
