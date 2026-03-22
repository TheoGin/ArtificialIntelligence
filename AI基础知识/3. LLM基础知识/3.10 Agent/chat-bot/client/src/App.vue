<template>
  <div class="chat-container">
    <div class="chat-header">AI助手</div>

    <!-- 消息列表 -->
    <div class="chat-box" ref="chatBoxRef">
      <!-- 渲染 messages 里面的消息 -->
      <div v-for="(msg, index) in messages" :key="index">
        <div :class="['chat-msg', msg.role]">
          <div class="bubble">
            <span class="role-label">
              {{ msg.role === 'user' ? '🧑‍💻 我' : '🤖 模型' }}
            </span>
            <div class="text">
              {{ msg.text }}
            </div>
          </div>
        </div>
        <!-- AI loading效果 -->
        <div v-if="loading" class="chat-msg bot">
          <div class="bubble">
            <span class="role-label">🤖 模型</span>
            <!--<div class="text">正在思考...</div>-->
            <div class="text">
              正在思考
              <span class="dot">.</span>
              <span class="dot">.</span>
              <span class="dot">.</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <form class="input-area" @submit.prevent="handleSubmit">
      <input type="text" v-model="input" placeholder="请输入您的问题..." />
      <button type="submit">发送</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue";

const input = ref(''); // 和输入框做双向绑定
const loading = ref(false);
// user | robot
const messages = ref<{ role: 'user' | 'bot', text: string }[]>([]);
// const chatBoxRef = ref<HTMLElement | null>();
const chatBoxRef = ref<HTMLElement | null>(null);  // 绑定聊天框，通过这个 ref 拿到聊天框的 DOM 元素

async function handleSubmit() {
  // 1. 拿到用户输入的内容
  const question = input.value.trim();
  if (!question) {
    return;
  }

  // 2.将用户的消息放入 messages
  messages.value.push({role: 'user', text: question});
  // 将输入框清空
  input.value = '';
  loading.value = true;

  // 拿到 DOM 元素的最新状态
  await nextTick();
  // 让聊天页面做一个滚动
  chatBoxRef.value?.scrollTo({
    // clientHeight 是可视窗口高度，需要滚动的高度
    top: chatBoxRef.value?.scrollHeight,
    behavior: 'smooth',
  })


  try {
    // 3. 发送请求到代理服务器
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        question
      })
    });

    const result = await response.json();
    console.log(result); // {answer: '你好！很高兴见到你。我是你的智能助手，随时准备为您解答问题。有什么需要帮助的吗？'}

    // 将模型回复的内容，也放入到 messages 里面
    messages.value.push({role: 'bot', text: result.answer});

    // 拿到 DOM 元素的最新状态
    await nextTick();
    chatBoxRef.value?.scrollTo({
      top: chatBoxRef.value?.scrollHeight,
      behavior: 'smooth',
    })
  } finally {
    loading.value = false;
  }

  console.log(messages.value)
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}

.chat-header {
  text-align: center;
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  background: #f7f7f7;
}

.chat-box {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.chat-msg {
  display: flex;
  margin-bottom: 12px;
}

.chat-msg.user {
  justify-content: flex-end;
}

.chat-msg.bot {
  justify-content: flex-start;
}

.bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 18px;
  line-height: 1.4;
  position: relative;
}

.chat-msg.user .bubble {
  background: #daf1ff;
  color: #333;
  border-bottom-right-radius: 4px;
}

.chat-msg.bot .bubble {
  background: #e6e6e6;
  color: #222;
  border-bottom-left-radius: 4px;
}

.role-label {
  font-size: 12px;
  color: #666;
  display: block;
  margin-bottom: 4px;
}

.input-area {
  display: flex;
  padding: 12px;
  border-top: 1px solid #ddd;
  background: #fff;
}

.input-area input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  outline: none;
}

.input-area button {
  margin-left: 10px;
  padding: 10px 18px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.input-area button:hover {
  background-color: #0056b3;
}

.input-area button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.dot {
  animation: blink 1s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%,
  80%,
  100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
</style>
