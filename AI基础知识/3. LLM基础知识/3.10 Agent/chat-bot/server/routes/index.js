const express = require("express");
const router = express.Router();

// 注意，需要是一个post请求
// router.route("/ask", async (request, response) => {
router.post("/ask", async (request, response) => {
  const question = request.body.question || "";
  // 接下来需要将用户问题放入到提示词模板
  const prompt = `
   你是一个中文智能助手，请使用中文回答用户的问题。
   问题：${ question }
   `;

  /*
   curl http://localhost:11434/api/generate -d '{
   "model": "deepseek-r1:1.5b",
   "prompt": "你是谁？"
   }'
   *  */
  const respHead = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: "qwen:0.5b",
      // 一般不会直接把用户的问题作为提示词
      // prompt: question,
      prompt,
      stream: false, // 是否开启流式，暂时先关闭
    }),
  });

  const result = await respHead.json();

  // 向客户端返回大模型输出的结果
  response.json({
    // answer: result,
    answer: result.response,
  });
});

module.exports = router;
