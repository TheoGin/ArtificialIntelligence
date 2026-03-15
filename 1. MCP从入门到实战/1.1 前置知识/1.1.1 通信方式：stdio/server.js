// 设置编码方式为 utf-8，默认为 Buffer
process.stdin.setDefaultEncoding("utf-8");

// 监听父进程的输入
process.stdin.on("data", (data) => {
  const response = data.toString()
                       .replace(/[?？]/g, "")
                       .replace(/吗/g, "")
                       .replace(/你/, "我")
                       .replace(/我/, "你");
  // process.stdout.write("回复：" + response + "\n");
  process.stdout.write(response);
});