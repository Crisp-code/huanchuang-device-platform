<script setup>
const features = [
  { to: '/qa', icon: '💬', title: '设备文档问答', desc: '基于设备文档智能问答，快速获取设备相关信息' },
  { to: '/ticket', icon: '📋', title: '工单文本分类', desc: '自动识别工单类型，辅助工单分发与处理' },
  { to: '/manual', icon: '📖', title: '设备手册查询', desc: '检索设备手册，快速定位操作与维护信息' },
  { to: '/awards', icon: '🏆', title: '工作室奖项', desc: '环创工作室历年获奖成果展示' },
]
</script>

<template>
  <div class="page">
    <div class="hero">
      <div class="hero-badge">环创工作室</div>
      <h1>智能设备<span class="accent">运维平台</span></h1>
      <p>集成设备文档问答、工单分类、手册查询与成果展示，为设备运维提供一体化解决方案。</p>
    </div>

    <div class="feature-grid">
      <router-link v-for="f in features" :key="f.to" :to="f.to" class="feature-card">
        <span class="feature-icon">{{ f.icon }}</span>
        <h2>{{ f.title }}</h2>
        <p>{{ f.desc }}</p>
        <span class="feature-arrow">→</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 32px 0 48px;
}

.hero-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: var(--blue-light);
  background: rgba(37, 99, 235, 0.12);
  border: 1px solid rgba(37, 99, 235, 0.3);
  margin-bottom: 20px;
}

.accent {
  color: var(--blue-light);
}

.hero p {
  max-width: 560px;
  margin: 0 auto;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 16px;
}

.feature-card {
  position: relative;
  display: block;
  background: var(--black-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 28px;
  text-decoration: none;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.feature-card:hover {
  border-color: var(--blue);
  box-shadow: 0 0 24px var(--accent-glow);
  transform: translateY(-3px);
}

.feature-icon {
  font-size: 30px;
  display: block;
  margin-bottom: 12px;
}

.feature-card h2 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #fff;
}

.feature-card p {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}

.feature-arrow {
  position: absolute;
  right: 24px;
  bottom: 24px;
  color: var(--blue);
  font-size: 18px;
  transition: transform 0.25s;
}

.feature-card:hover .feature-arrow {
  transform: translateX(4px);
}

@media (max-width: 600px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
