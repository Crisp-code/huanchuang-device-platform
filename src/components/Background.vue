<script setup>
import { ref, onMounted } from 'vue'

const stars = ref([])

onMounted(() => {
  const count = 90
  stars.value = Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
    opacity: Math.random() * 0.6 + 0.2,
  }))
})
</script>

<template>
  <div class="bg-layer">
    <!-- 星空 -->
    <div class="starfield">
      <span
        v-for="(s, i) in stars"
        :key="i"
        class="star"
        :style="{
          top: s.top + '%',
          left: s.left + '%',
          width: s.size + 'px',
          height: s.size + 'px',
          animationDelay: s.delay + 's',
          animationDuration: s.duration + 's',
          opacity: s.opacity,
        }"
      ></span>
    </div>

    <!-- 漂浮发光圆圈 -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <!-- 漂浮方块 -->
    <div class="cube cube-1"></div>
    <div class="cube cube-2"></div>
    <div class="cube cube-3"></div>

    <!-- 网格 -->
    <div class="grid"></div>
  </div>
</template>

<style scoped>
.bg-layer {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: #0d1117;
}

.bg-layer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, #1a2233 0%, #0d1117 60%);
}

/* ---- 星空 ---- */
.starfield {
  position: absolute;
  inset: 0;
}

.star {
  position: absolute;
  border-radius: 50%;
  background: #fff;
  animation: twinkle ease-in-out infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.15;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.4);
    box-shadow: 0 0 8px rgba(96, 165, 250, 0.9);
  }
}

/* ---- 发光圆圈 ---- */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0.5;
}

.orb-1 {
  width: 360px;
  height: 360px;
  top: -80px;
  left: -60px;
  background: radial-gradient(circle, #2563eb, transparent 70%);
  animation: float-orb 18s ease-in-out infinite;
}

.orb-2 {
  width: 280px;
  height: 280px;
  top: 40%;
  right: -40px;
  background: radial-gradient(circle, #3b82f6, transparent 70%);
  animation: float-orb 22s ease-in-out infinite reverse;
}

.orb-3 {
  width: 320px;
  height: 320px;
  bottom: -100px;
  left: 30%;
  background: radial-gradient(circle, #1d4ed8, transparent 70%);
  animation: float-orb 26s ease-in-out infinite;
  animation-delay: -5s;
}

@keyframes float-orb {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(40px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 40px) scale(0.95);
  }
}

/* ---- 漂浮方块 ---- */
.cube {
  position: absolute;
  border: 1.5px solid rgba(59, 130, 246, 0.45);
  border-radius: 8px;
  background: rgba(37, 99, 235, 0.08);
  box-shadow: 0 0 20px rgba(37, 99, 235, 0.15);
}

.cube-1 {
  width: 64px;
  height: 64px;
  top: 18%;
  left: 12%;
  animation: float-cube 16s ease-in-out infinite;
}

.cube-2 {
  width: 42px;
  height: 42px;
  top: 65%;
  left: 78%;
  animation: float-cube 20s ease-in-out infinite reverse;
  animation-delay: -3s;
}

.cube-3 {
  width: 90px;
  height: 90px;
  top: 75%;
  left: 8%;
  animation: float-cube 24s ease-in-out infinite;
  animation-delay: -8s;
}

@keyframes float-cube {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-60px) rotate(180deg);
    opacity: 0.6;
  }
}

/* ---- 网格 ---- */
.grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(59, 130, 246, 0.04) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, #000 0%, transparent 75%);
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    #000 0%,
    transparent 75%
  );
}
</style>
