<script setup>
import { ref, computed } from 'vue'

const manuals = [
  { id: 1, name: '三相异步电动机', model: 'Y2-160M-4', category: '动力设备', sections: ['安装说明', '运行参数', '维护保养', '故障处理'] },
  { id: 2, name: '变频器', model: 'VFD-7.5kW', category: '控制设备', sections: ['接线图', '参数设置', '操作指南', '报警代码'] },
  { id: 3, name: 'PLC 控制器', model: 'S7-1200', category: '控制设备', sections: ['硬件手册', '编程指南', '通信配置', '诊断功能'] },
  { id: 4, name: '工业触摸屏', model: 'HMI-10.1"', category: '人机交互', sections: ['界面组态', '变量绑定', '配方管理', '系统设置'] },
  { id: 5, name: '空气压缩机', model: 'GA-22', category: '辅助设备', sections: ['操作规程', '日常巡检', '保养周期', '安全须知'] },
  { id: 6, name: '冷却水泵', model: 'ISG-65', category: '辅助设备', sections: ['安装要求', '运行调试', '维护保养', '常见故障'] },
  { id: 7, name: '伺服驱动器', model: 'SGD7S', category: '控制设备', sections: ['接线说明', '参数调试', '运动控制', '故障诊断'] },
  { id: 8, name: '配电柜', model: 'GGD-800A', category: '供电设备', sections: ['电气原理图', '元器件清单', '操作说明', '安全规范'] },
]

const keyword = ref('')
const selected = ref(null)

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  if (!k) return manuals
  return manuals.filter(
    (m) =>
      m.name.toLowerCase().includes(k) ||
      m.model.toLowerCase().includes(k) ||
      m.category.toLowerCase().includes(k),
  )
})
</script>

<template>
  <div class="page">
    <h1>设备手册查询</h1>
    <p>搜索设备名称或型号，快速定位设备手册内容。</p>

    <div class="search-bar">
      <input v-model="keyword" placeholder="搜索设备名称 / 型号 / 类别…" />
    </div>

    <div class="manual-layout">
      <div class="manual-list">
        <div v-if="filtered.length === 0" class="empty">未找到匹配的设备手册</div>
        <div
          v-for="m in filtered"
          :key="m.id"
          class="manual-item"
          :class="{ active: selected?.id === m.id }"
          @click="selected = m"
        >
          <div class="manual-name">{{ m.name }}</div>
          <div class="manual-model">{{ m.model }}</div>
          <span class="manual-cat">{{ m.category }}</span>
        </div>
      </div>

      <div class="manual-detail">
        <div v-if="!selected" class="detail-empty">
          <span class="detail-icon">📖</span>
          <p>选择左侧设备查看手册详情</p>
        </div>
        <template v-else>
          <div class="detail-header">
            <h2>{{ selected.name }}</h2>
            <span class="detail-model">型号：{{ selected.model }}</span>
          </div>
          <div class="detail-sections">
            <div v-for="s in selected.sections" :key="s" class="section-card">
              <span class="section-icon">📄</span>
              <span class="section-title">{{ s }}</span>
              <button class="section-btn">查看</button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  max-width: 640px;
  margin: 0 auto;
}

.search-bar input {
  width: 100%;
  padding: 12px 18px;
  border-radius: 10px;
  background: var(--black-card);
  border: 1px solid var(--border);
  color: var(--text);
  font: inherit;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.search-bar input:focus {
  border-color: var(--blue);
}

.manual-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 20px;
  margin-top: 24px;
  max-width: 960px;
  margin-inline: auto;
  text-align: left;
}

.manual-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 560px;
  overflow-y: auto;
}

.empty {
  color: var(--text-muted);
  text-align: center;
  padding: 40px 0;
  font-size: 14px;
}

.manual-item {
  background: var(--black-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.manual-item:hover {
  border-color: rgba(37, 99, 235, 0.5);
}

.manual-item.active {
  border-color: var(--blue);
  background: rgba(37, 99, 235, 0.08);
}

.manual-name {
  font-weight: 600;
  color: #fff;
  font-size: 15px;
}

.manual-model {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 2px;
}

.manual-cat {
  display: inline-block;
  margin-top: 8px;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--black-soft);
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.manual-detail {
  background: var(--black-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 28px;
  min-height: 400px;
}

.detail-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 360px;
  color: var(--text-muted);
}

.detail-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.detail-header {
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 16px;
}

.detail-header h2 {
  margin-bottom: 6px;
}

.detail-model {
  font-size: 14px;
  color: var(--text-muted);
}

.detail-sections {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--black-soft);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: border-color 0.2s;
}

.section-card:hover {
  border-color: var(--blue);
}

.section-icon {
  font-size: 18px;
}

.section-title {
  font-size: 15px;
  color: var(--text);
}

.section-btn {
  margin-left: auto;
  padding: 5px 16px;
  border-radius: 6px;
  border: 1px solid var(--blue);
  background: transparent;
  color: var(--blue-light);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.section-btn:hover {
  background: var(--blue);
  color: #fff;
}

.manual-list::-webkit-scrollbar {
  width: 6px;
}
.manual-list::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

@media (max-width: 700px) {
  .manual-layout {
    grid-template-columns: 1fr;
  }
}
</style>
