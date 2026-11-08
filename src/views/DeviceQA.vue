<script setup>
import { ref, nextTick } from 'vue'
import BackHome from '../components/BackHome.vue'

const messages = ref([
  { role: 'bot', text: '你好！我是环创设备问答助手，可以基于设备文档回答你关于设备的问题。试试问我："电机过热怎么处理？"' },
])

const input = ref('')
const chatBody = ref(null)

const kb = [
  { keys: ['过热', '发热', '温度高'], a: '电机过热常见原因：① 负载过大，检查是否超载运行；② 散热不良，清理风扇和散热片灰尘；③ 轴承磨损，检查润滑情况；④ 环境温度过高，改善通风条件。建议先停机降温，再逐一排查。' },
  { keys: ['异响', '噪音', '声音'], a: '设备异响排查步骤：① 确定声源位置（轴承、齿轮、风扇）；② 检查紧固件是否松动；③ 轴承部位听诊判断是否缺油或磨损；④ 齿轮箱检查油位和齿面状况。持续异响应立即停机检查。' },
  { keys: ['漏电', '绝缘', '接地'], a: '漏电处理：① 立即断电；② 使用兆欧表测量绝缘电阻，低于 0.5MΩ 需处理；③ 检查接线端子是否受潮或破损；④ 确认接地线连接可靠，接地电阻 ≤ 4Ω。修复后方可通电。' },
  { keys: ['启动', '不转', '无法启动'], a: '电机无法启动检查：① 电源是否正常，电压是否在额定范围 ±10%；② 接触器/断路器是否动作；③ 过载保护是否跳闸；④ 绕组是否断路或短路。逐一排查电源、控制回路和电机本体。' },
  { keys: ['振动', '震动'], a: '设备振动过大原因：① 地脚螺栓松动；② 联轴器不对中；③ 转子不平衡；④ 轴承间隙过大。使用测振仪测量，振动值超过 ISO 10816 标准限值需停机检修。' },
]

function answer(q) {
  const lower = q.toLowerCase()
  for (const item of kb) {
    if (item.keys.some((k) => lower.includes(k))) {
      return item.a
    }
  }
  return '抱歉，设备文档中暂未找到相关内容。你可以换一种方式提问，或前往「设备手册」页面查阅完整文档。'
}

async function send() {
  const q = input.value.trim()
  if (!q) return
  messages.value.push({ role: 'user', text: q })
  input.value = ''
  await nextTick()
  chatBody.value.scrollTop = chatBody.value.scrollHeight

  setTimeout(async () => {
    messages.value.push({ role: 'bot', text: answer(q) })
    await nextTick()
    chatBody.value.scrollTop = chatBody.value.scrollHeight
  }, 600)
}

function onKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}
</script>

<template>
  <div class="page">
    <BackHome />
    <h1>设备文档问答</h1>
    <p>输入设备相关问题，系统基于文档知识库智能匹配答案。</p>

    <div class="chat-wrap">
      <div ref="chatBody" class="chat-body">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="bubble"
          :class="msg.role"
        >
          <span class="bubble-avatar">{{ msg.role === 'bot' ? '🤖' : '🧑' }}</span>
          <span class="bubble-text">{{ msg.text }}</span>
        </div>
      </div>

      <div class="chat-input">
        <textarea
          v-model="input"
          @keydown="onKey"
          rows="1"
          placeholder="输入设备问题，如：电机过热怎么处理？"
        ></textarea>
        <button class="btn" @click="send">发送</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-wrap {
  max-width: 760px;
  margin: 24px auto 0;
  background: var(--black-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  height: 520px;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bubble {
  display: flex;
  gap: 10px;
  max-width: 85%;
}

.bubble.user {
  flex-direction: row-reverse;
  align-self: flex-end;
}

.bubble-avatar {
  font-size: 22px;
  flex-shrink: 0;
  line-height: 1.4;
}

.bubble-text {
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.6;
}

.bubble.bot .bubble-text {
  background: var(--black-soft);
  border: 1px solid var(--border);
  color: var(--text);
}

.bubble.user .bubble-text {
  background: var(--blue);
  color: #fff;
}

.chat-input {
  display: flex;
  gap: 10px;
  padding: 14px;
  border-top: 1px solid var(--border);
}

.chat-input textarea {
  flex: 1;
  resize: none;
  background: var(--black-soft);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  padding: 10px 14px;
  font: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input textarea:focus {
  border-color: var(--blue);
}

.chat-input .btn {
  white-space: nowrap;
}

.chat-body::-webkit-scrollbar {
  width: 6px;
}
.chat-body::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}
</style>
