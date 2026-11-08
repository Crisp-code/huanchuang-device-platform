import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// GitHub Pages 部署在子路径 /huanchuang-device-platform/，通过 VITE_BASE 环境变量配置
// 本地开发和 Vercel（根路径）保持默认 '/'
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [vue()],
})
