<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchProducts } from "../services/api.js";

const products = ref([]);
const searchQuery = ref("");

onMounted(async () => {
  products.value = await fetchProducts();
});

const filteredProducts = computed(() =>
  products.value.filter(
    (p) =>
      p.titulo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

function addToCart(product) {
  alert(`"${product.titulo}" añadido al carrito`);
}

</script>

<template>
  <section class="products">
    <h2 class="products__title">Productos</h2>

    <input v-model="searchQuery" type="text" class="products__search" placeholder="Buscar producto..."/>

    <div class="products__grid">
      <article v-for="product in filteredProducts" :key="product.id" class="product-card">
        <img :src="product.imagen" class="product-card__image" :alt="product.titulo"/>

        <div class="product-card__body">
          <p class="product-card__brand">Casio</p>
          <h3 class="product-card__title">{{ product.titulo }}</h3>
          <p class="product-card__description">{{ product.descripcion }}</p>

          <div class="product-card__rating">
            <span v-for="n in 5" :key="n" class="product-card__star">
              <svg v-if="n <= Math.round(product.rating)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.612 15.443 4.897 9.64.478 6.072l6.178-.898L8 0l2.344 5.174 6.178.898-4.419 3.568 1.285 5.803L8 12.347l-4.389 3.096z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 16 16">
                <path d="M8 0l2.344 5.174 6.178.898-4.419 3.568 1.285 5.803L8 12.347l-4.389 3.096 1.285-5.803-4.419-3.568 6.178-.898z"/>
              </svg>
            </span>
            <small class="product-card__reviews">[{{ product.reviews }}]</small>
          </div>

          <p class="product-card__price">
            ${{ product.precio.toLocaleString() }}
          </p>

          <button v-if="product.stock > 0" class="product-card__button" @click="addToCart(product)">Añadir al carrito</button>
          <p v-else class="product-card__soldout">Agotado</p>
        </div>
      </article>
    </div>

    <p v-if="filteredProducts.length === 0" class="products__empty">No se encontraron productos</p>
  </section>
</template>

<style scoped>
.products {
  padding: 2rem;
  background-color: #1c1c1c;
  color: #fff;
}

.products__title {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.products__search {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 2rem;
  background-color: #2a2a2a;
  border: none;
  border-radius: 8px;
  color: #fff;
}

.products__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 992px) {
  .products__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .products__grid {
    grid-template-columns: 1fr;
  }
}

.product-card {
  background-color: #2a2a2a;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.4);
}

.product-card__image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  background-color: #fff;
  padding: 1rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.product-card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-card__brand {
  color: #4caf50;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.product-card__title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.product-card__description {
  color: #aaa;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.product-card__rating {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.product-card__star {
  color: #ffc107;
  margin-right: 2px;
  display: inline-flex;
}

.product-card__reviews {
  margin-left: 0.5rem;
  color: #ccc;
  font-size: 0.8rem;
}

.product-card__price {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.product-card__button {
  margin-top: auto;
  padding: 0.75rem;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.product-card__button:hover {
  background-color: #0056b3;
}

.product-card__soldout {
  color: #ff4d4d;
  font-weight: bold;
  text-align: center;
}

.products__empty {
  margin-top: 2rem;
  color: #aaa;
  text-align: center;
}
</style>