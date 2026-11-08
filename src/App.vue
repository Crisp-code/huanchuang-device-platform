<script setup>
import NavBar from './components/NavBar.vue'
import Background from './components/Background.vue'
</script>

<template>
  <Background />
  <NavBar />
  <main>
    <router-view />
  </main>
</template>
