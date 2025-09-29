<script setup>
import { RouterView } from 'vue-router'
import CyberNavbar from './components/CyberNavbar.vue'
import NavbarSimple from './components/NavbarSimple.vue'
import Footer from './components/Footer.vue'
import CartDetail from './components/CartDetail.vue'
</script>

<template>
  <div id="app">
    <CyberNavbar />
    <main class="main-content">
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
  width: 100%;
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>
