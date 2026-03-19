import { McpServer } from "@modelcontextprotocol/sdk/dist/esm/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/dist/esm/server/stdio.js";
import z from "zod";
import fs from "node:fs";

const mcpServer = new McpServer({
  // 服务端信息
  name: "ExampleServer",
  title: "Example Server Display Name",
  version: "1.0.0",
});

/* const stdioServerTransport = new StdioServerTransport();

mcpServer.connect(stdioServerTransport); */

mcpServer.registerTool(
  "sum",  // 函数名
  {
    title: "两数求和",
    description: "得到两个数的和",
    inputSchema: z.object({
      a: z.number().describe("第一个数"),
      b: z.number().describe("第一个数"),
    }),
  }, ({ a, b }) => {
    return {
      content: [
        {
          type: "text",
          text: "两数求和结果：" + (a + b),
        },
      ],
    };
  });

mcpServer.registerTool(
  "createFile",
  {
    title: "创建文件",
    description: "在指定目录下创建一个文件",
    inputSchema: z.object({
      fileName: z.string().describe("文件名"),
      fileContent: z.string().describe("文件内容"),
    }),
  },
  ({ fileName, fileContent }) => {
    try {
      fs.writeFileSync(fileName, fileContent);
      return {
        content: [
          {
            type: "text",
            text: "文件创建成功",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: error.message || "文件创建失败：",
          },
        ],
      };
    }
  }
)

const stdioServerTransport = new StdioServerTransport();

mcpServer.connect(stdioServerTransport);