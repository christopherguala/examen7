<template>
  <div class="home">
    <div class="hero-section">
      <h1 class="hero-title">¡Bienvenido a Dando La Hora!</h1>
      <p class="hero-subtitle">Tu tienda de relojes vintage y modernos</p>
      
      <div class="color-test">
        <h2>Test de Colores Aplicados</h2>
        <div class="color-grid">
          <div class="color-item green">
            <span class="color-name">Verde</span>
            <span class="color-value">#00f032</span>
          </div>
          <div class="color-item blue">
            <span class="color-name">Azul</span>
            <span class="color-value">#8171f6</span>
          </div>
          <div class="color-item yellow">
            <span class="color-name">Amarillo</span>
            <span class="color-value">#d2fa03</span>
          </div>
          <div class="color-item red">
            <span class="color-name">Rojo</span>
            <span class="color-value">#fe3301</span>
          </div>
        </div>
        
        <div class="button-test">
          <button class="btn-green">Botón Verde</button>
          <button class="btn-blue">Botón Azul</button>
          <button class="btn-yellow">Botón Amarillo</button>
          <button class="btn-red">Botón Rojo</button>
        </div>
      </div>
    </div>
    <Products />
  </div>
</template>

<script setup>
// Componente de prueba para verificar colores
import Products from '../components/Products.vue'
</script>

<style scoped>
.home {
  padding: 2rem;
  min-height: 100vh;
}

.hero-section {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-green);
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--gray-600);
  margin-bottom: 3rem;
}

.color-test {
  background: var(--gray-50);
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 2rem;
}

.color-test h2 {
  color: var(--black);
  margin-bottom: 1.5rem;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.color-item {
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  color: white;
  font-weight: 600;
}

.color-item.green {
  background: var(--green);
}

.color-item.blue {
  background: var(--blue);
}

.color-item.yellow {
  background: var(--yellow);
  color: var(--black);
}

.color-item.red {
  background: var(--red);
}

.color-name {
  display: block;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.color-value {
  display: block;
  font-size: 0.875rem;
  opacity: 0.8;
}

.button-test {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.button-test button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-green {
  background: var(--green);
  color: var(--black);
}

.btn-blue {
  background: var(--blue);
  color: white;
}

.btn-yellow {
  background: var(--yellow);
  color: var(--black);
}

.btn-red {
  background: var(--red);
  color: white;
}

.button-test button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .color-grid {
    grid-template-columns: 1fr;
  }
  
  .button-test {
    flex-direction: column;
    align-items: center;
  }
}
</style>