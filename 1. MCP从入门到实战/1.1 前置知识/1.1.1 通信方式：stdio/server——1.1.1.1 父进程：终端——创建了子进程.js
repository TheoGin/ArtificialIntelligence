/*
process.stdout.write( "Hello world!\n");

console.log("Hello world!"); // 内部就是调用 process.stdout.write 并加上换行、多个参数等实现打印*/

// 父进程：终端——创建了子进程
process.stdout.write('子进程 pid: ' + process.pid + "\n");