<script setup>
</script>

<template>
  <router-link to="/" class="back-home">
    <span class="arrow">←</span> 返回首页
  </router-link>
</template>

<style scoped>
.back-home {
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 8px 16px;
  font-size: 14px;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
}

.back-home:hover {
  color: var(--blue-light);
  border-color: var(--blue);
  background: rgba(37, 99, 235, 0.1);
  transform: translateX(-2px);
}

.arrow {
  font-size: 16px;
}
</style>
