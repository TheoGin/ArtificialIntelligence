const express = require("express");
const router = express.Router();

// 注意，需要是一个post请求
router.post("/ask",async (req, res)=>{
  // 拿到用户的问题
  const question = req.body.question || "";

  // 接下来需要将用户问题放入到提示词模板
  const prompt = `
    你是一个中文智能助手，请使用中文回答用户的问题。
    问题：${question}
  `;

  const response = await fetch("http://localhost:11434/api/generate",{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      model: "qwen3.5:0.8b",
      prompt,
      stream: false // 是否开启流式，暂时先关闭
    })
  })

  const result = await response.json();
  // 向客户端返回大模型输出的结果
  res.json({
    answer: result.response
  })
})

module.exports = router;
