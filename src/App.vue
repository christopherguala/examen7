<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CartDetail from './components/CartDetail.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <CartDetail />
    <Footer />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
