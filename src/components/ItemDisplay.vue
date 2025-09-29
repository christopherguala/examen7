


<template>
  <section class="item-display" :class="{'reverse': reverse}">
    <div class="item-content bg-black text-white p-4 rounded">
      <div class="text-block">
        <h2 class="item-title">{{ title }}</h2>
        <p class="item-subtitle">{{ subtitle }}</p>
        <div class="button-group" v-if="buttonText || priceText">
            <button v-if="buttonText" class="item-button">{{ buttonText }}</button>
            <button v-if="priceText" class="item-button price">{{ priceText }}</button>
        </div>
      </div>
      <div class="img-block">
        <img :src="imgSrc" :alt="title" />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  imgSrc: { type: String, required: true },
  reverse: { type: Boolean, default: false },
  buttonText: { type: String, default: '' },
   priceText: { type: String, default: '' }
})
</script>

<style scoped>
.item-display {
  width: 100%;
  margin: 2rem 0;
}

.item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.item-display.reverse .item-content {
  flex-direction: row-reverse;
}

.text-block {
  flex: 1 1 400px; 
  padding: 1rem;
}

.item-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.item-subtitle {
  font-size: 1.125rem;
  color: #555;
  margin-bottom: 1rem;
}

.item-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: var(--primary-color, #007bff);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
}

.img-block {
  flex: 1 1 400px;
  padding: 1rem;
  display: flex;
  justify-content: center;
}

.img-block img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .item-content {
    flex-direction: column;
  }
  .text-block, .img-block {
    flex: 1 1 auto;
  }
  .item-title {
    font-size: 1.75rem;
  }
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.item-button.price {
  background-color: #e0e0e0;
  color: #333;
}
</style>