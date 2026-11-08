<script setup>
const links = [
  { to: '/', label: '首页' },
  { to: '/qa', label: '设备问答' },
  { to: '/ticket', label: '工单分类' },
  { to: '/manual', label: '设备手册' },
  { to: '/awards', label: '工作室奖项' },
]
</script>

<template>
  <header class="navbar">
    <div class="nav-inner">
      <router-link to="/" class="brand">
        <span class="brand-dot"></span>
        环创
      </router-link>

      <nav class="nav-links">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
        >
          {{ link.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.brand:hover {
  color: var(--blue-light);
}

.brand-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--blue);
  box-shadow: 0 0 12px var(--blue);
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  position: relative;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-muted);
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}

.nav-link:hover {
  color: #fff;
  background: rgba(37, 99, 235, 0.12);
}

.nav-link.router-link-exact-active {
  color: var(--blue-light);
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: var(--blue);
  box-shadow: 0 0 8px var(--blue);
}

@media (max-width: 600px) {
  .nav-link {
    padding: 8px 10px;
    font-size: 14px;
  }
  .brand {
    font-size: 17px;
  }
}
</style>
