<script setup>
const awards = [
  { year: 2024, title: '全国大学生智能设备创新大赛', level: '国家级一等奖', desc: '基于设备文档的智能问答系统设计与实现' },
  { year: 2024, title: '工业互联网应用挑战赛', level: '省级特等奖', desc: '工单智能分类与工单流转优化方案' },
  { year: 2023, title: '"挑战杯"大学生课外学术科技作品', level: '国家级二等奖', desc: '设备运维知识图谱构建及应用' },
  { year: 2023, title: '智能制造创新设计大赛', level: '省级一等奖', desc: '面向工厂场景的设备手册检索平台' },
  { year: 2022, title: '中国大学生计算机设计大赛', level: '省级二等奖', desc: '基于 NLP 的工单文本分析系统' },
  { year: 2022, title: '校级创新创业优秀团队', level: '校级', desc: '环创工作室年度优秀创新团队' },
]

const stats = [
  { num: '6', label: '获奖项目' },
  { num: '4', label: '国家级/省级奖项' },
  { num: '3', label: '参赛年份' },
]
</script>

<template>
  <div class="page">
    <div class="awards-hero">
      <h1>环创工作室 · 奖项成果</h1>
      <p>以技术创新驱动设备运维智能化，以下是工作室历年获奖成果。</p>
    </div>

    <div class="stats-row">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <span class="stat-num">{{ s.num }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </div>

    <div class="timeline">
      <div v-for="(a, i) in awards" :key="i" class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-year">{{ a.year }}</div>
        <div class="timeline-card">
          <h3>{{ a.title }}</h3>
          <span class="award-level">{{ a.level }}</span>
          <p>{{ a.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.awards-hero {
  text-align: center;
  margin-bottom: 32px;
}

.stats-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.stat-card {
  background: var(--black-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px 40px;
  text-align: center;
  min-width: 140px;
}

.stat-num {
  display: block;
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--blue-light);
  line-height: 1;
}

.stat-label {
  display: block;
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 8px;
}

.timeline {
  max-width: 680px;
  margin: 0 auto;
  position: relative;
  padding-left: 28px;
  text-align: left;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: linear-gradient(180deg, var(--blue), var(--border));
}

.timeline-item {
  position: relative;
  margin-bottom: 28px;
}

.timeline-dot {
  position: absolute;
  left: -28px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--blue);
  border: 3px solid var(--black);
  box-shadow: 0 0 12px var(--accent-glow);
}

.timeline-year {
  font-size: 14px;
  font-weight: 700;
  color: var(--blue-light);
  margin-bottom: 6px;
}

.timeline-card {
  background: var(--black-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 18px 22px;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.timeline-card:hover {
  border-color: var(--blue);
  box-shadow: 0 0 20px var(--accent-glow);
}

.timeline-card h3 {
  font-size: 16px;
  color: #fff;
  margin-bottom: 8px;
}

.award-level {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 12px;
  border-radius: 6px;
  background: rgba(37, 99, 235, 0.15);
  color: var(--blue-light);
  margin-bottom: 10px;
}

.timeline-card p {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}
</style>
