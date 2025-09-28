

<script setup>
import { ref, onMounted } from 'vue'
import { fetchProducts } from '../services/api.js'
import ProductCard from './ProductCard.vue'

const items = ref([])
const cardsContainer = ref(null)

function getShortDescription(text, maxWords = 15) {
  if (!text || typeof text !== 'string') return ''
  const words = text.split(' ')
  return words.length > maxWords
    ? words.slice(0, maxWords).join(' ') + '...'
    : text
}

onMounted(async () => {
  const productos = await fetchProducts()
  items.value = productos.slice(0, 20).map(product => ({
    ...product,
    descripcionCorta: getShortDescription(product.descripcion)
  }))
})

function scrollNext() {
  cardsContainer.value?.scrollBy({
    left: cardsContainer.value.clientWidth * 0.8,
    behavior: 'smooth'
  })
}

function scrollPrev() {
  cardsContainer.value?.scrollBy({
    left: -cardsContainer.value.clientWidth * 0.8,
    behavior: 'smooth'
  })
}
</script>

<template>
  <section class="featured-collection">
    <h2 class="featured-title">Productos Destacados</h2>

    <div class="featured-wrapper">
      <button class="nav-btn prev-btn" @click="scrollPrev">‹</button>

      <div class="cards-container" ref="cardsContainer">
        <ProductCard
          v-for="product in items"
          :key="product.id"
          :product="product"
        />
      </div>

      <button class="nav-btn next-btn" @click="scrollNext">›</button>
    </div>
  </section>
</template>

<style scoped>
.featured-collection {
  padding: 2rem;
}
.featured-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: center;
}
.featured-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.cards-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 1rem;
  padding: 1rem 0;
}
.cards-container::-webkit-scrollbar {
  height: 8px;
}
.cards-container::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.2);
  border-radius: 4px;
}
.nav-btn {
  background: rgba(255,255,255,0.8);
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 0 0.5rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}
.prev-btn {
  left: 0;
}
.next-btn {
  right: 0;
}
</style>