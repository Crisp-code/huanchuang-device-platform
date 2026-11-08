<script setup>
</script>

<template>
  <router-link to="/" class="back-home">返回首页</router-link>
</template>

<style scoped>
.back-home {
  display: flex;
  width: fit-content;
  align-items: center;
  margin-bottom: 24px;
  padding: 9px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  border: 1px solid var(--blue-light);
  border-radius: 8px;
  background: var(--blue);
  box-shadow: 0 0 14px var(--accent-glow);
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
}

.back-home:hover {
  background: var(--blue-light);
  box-shadow: 0 4px 20px var(--accent-glow);
  transform: translateY(-1px);
}
</style>
