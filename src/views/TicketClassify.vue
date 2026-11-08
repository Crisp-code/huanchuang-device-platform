<script setup>
import { ref } from 'vue'

const input = ref('')
const result = ref(null)
const loading = ref(false)

const categories = [
  { name: '硬件故障', color: '#ef4444', keywords: ['损坏', '断裂', '烧毁', '冒烟', '变形', '裂', '磨损', '松动'] },
  { name: '软件故障', color: '#f59e0b', keywords: ['报错', '崩溃', '卡死', '蓝屏', '无法打开', '程序', '系统', '闪退'] },
  { name: '网络问题', color: '#10b981', keywords: ['断网', '连接失败', '延迟', '丢包', '无法连接', '网络', '信号', '掉线'] },
  { name: '供电问题', color: '#8b5cf6', keywords: ['断电', '跳闸', '电压', '不通电', '电源', '电池', '漏电', '没电'] },
  { name: '环境问题', color: '#06b6d4', keywords: ['温度', '湿度', '漏水', '粉尘', '进水', '腐蚀', '环境'] },
]

function classify() {
  const text = input.value.trim()
  if (!text) return
  loading.value = true
  result.value = null

  setTimeout(() => {
    const scores = categories.map((c) => {
      let score = 0
      const matched = []
      c.keywords.forEach((k) => {
        if (text.includes(k)) {
          score++
          matched.push(k)
        }
      })
      return { ...c, score, matched }
    })

    scores.sort((a, b) => b.score - a.score)
    const top = scores[0]

    if (top.score === 0) {
      result.value = { name: '其他', color: '#6b7280', confidence: 0, matched: [], all: scores }
    } else {
      const total = scores.reduce((s, c) => s + c.score, 0)
      result.value = {
        ...top,
        confidence: Math.round((top.score / total) * 100),
        all: scores.filter((c) => c.score > 0),
      }
    }
    loading.value = false
  }, 700)
}

const samples = [
  '设备通电后冒烟，电源模块烧毁，无法启动',
  '系统频繁蓝屏崩溃，程序闪退无法正常使用',
  '网络连接失败，持续掉线，延迟很高',
  '机房温度过高，设备过热报警',
]
</script>

<template>
  <div class="page">
    <h1>工单文本分类</h1>
    <p>输入工单描述，系统自动识别故障类型并给出分类结果。</p>

    <div class="classify-box">
      <textarea
        v-model="input"
        rows="4"
        placeholder="请输入工单描述，例如：设备通电后冒烟，电源模块烧毁……"
      ></textarea>

      <div class="samples">
        <span class="samples-label">示例：</span>
        <button
          v-for="(s, i) in samples"
          :key="i"
          class="sample-chip"
          @click="input = s"
        >{{ s.slice(0, 12) }}…</button>
      </div>

      <button class="btn classify-btn" :disabled="!input.trim() || loading" @click="classify">
        {{ loading ? '分析中…' : '开始分类' }}
      </button>
    </div>

    <div v-if="result" class="result-card">
      <h2>分类结果</h2>
      <div class="result-main">
        <span class="result-tag" :style="{ background: result.color }">{{ result.name }}</span>
        <span class="result-conf" v-if="result.confidence">置信度 {{ result.confidence }}%</span>
      </div>
      <div v-if="result.matched.length" class="result-keywords">
        <span class="kw-label">命中关键词：</span>
        <span v-for="k in result.matched" :key="k" class="kw-chip">{{ k }}</span>
      </div>
      <div v-if="result.all && result.all.length > 1" class="result-others">
        <p>其他可能分类：</p>
        <div v-for="c in result.all.slice(1)" :key="c.name" class="other-row">
          <span class="other-dot" :style="{ background: c.color }"></span>
          {{ c.name }}
          <span class="other-score">{{ c.score }} 个关键词命中</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.classify-box {
  max-width: 640px;
  margin: 24px auto 0;
  background: var(--black-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
}

.classify-box textarea {
  width: 100%;
  resize: vertical;
  background: var(--black-soft);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  padding: 14px;
  font: inherit;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.classify-box textarea:focus {
  border-color: var(--blue);
}

.samples {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 14px 0;
}

.samples-label {
  font-size: 13px;
  color: var(--text-muted);
}

.sample-chip {
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--black-soft);
  color: var(--text-muted);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.sample-chip:hover {
  border-color: var(--blue);
  color: var(--blue-light);
}

.classify-btn {
  width: 100%;
  margin-top: 4px;
}

.classify-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.result-card {
  max-width: 640px;
  margin: 20px auto 0;
  background: var(--black-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  text-align: left;
}

.result-card h2 {
  font-size: 1.1rem;
  margin-bottom: 16px;
}

.result-main {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}

.result-tag {
  padding: 6px 18px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}

.result-conf {
  font-size: 14px;
  color: var(--text-muted);
}

.result-keywords {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.kw-label {
  font-size: 13px;
  color: var(--text-muted);
}

.kw-chip {
  padding: 3px 10px;
  border-radius: 6px;
  background: rgba(37, 99, 235, 0.15);
  color: var(--blue-light);
  font-size: 13px;
}

.result-others {
  border-top: 1px solid var(--border);
  padding-top: 14px;
}

.result-others p {
  font-size: 13px;
  margin-bottom: 8px;
}

.other-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  padding: 4px 0;
  color: var(--text);
}

.other-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.other-score {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-muted);
}
</style>
