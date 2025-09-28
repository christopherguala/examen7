<template>
  <div class="home">


    <div class="hero-section">
      <h1 class="hero-title">¡Bienvenido a Dando La Hora!</h1>
      <p class="hero-subtitle">Tu tienda de relojes vintage y modernos</p>
      
      
    </div>

    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://www.dandolahora.cl/cdn/shop/files/banner_seikoclock3_724ded4d-896f-4c6d-995d-b14d6143e4ec.jpg?v=1750892104&width=1920" class="d-block w-100" alt="xboxx">
      <div class="carousel-caption d-none d-md-block">
        <h5>Desde Japon<img src="data:image/png;base64,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" alt="logo xboxx" class="carousel__logo"></h5>
        <p>Mira nuestras nuevas adquisiciones de relojes inspirados en algunas de las series mas carismaticas de japon.
        </p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://www.dandolahora.cl/cdn/shop/files/banner_junghans6_ea3e5b6d-7053-4bf8-bd1b-46016435029b.jpg?v=1749754332&width=1920" class="d-block w-100" alt="steam-deck">
      <div class="carousel-caption d-none d-md-block">
        <h5>Desde Alemania <img src="" alt=""></h5>
        <p>Relojes confeccionados en Alemania, la mejor calidad de uno de los paises mas vanguardistas en la tecnologia y lo clasico. </p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://media.revistagq.com/photos/5e4a4a284638e40008003f32/16:9/w_2720,h_1530,c_limit/mejores-relojes-casio-2020.jpeg" class="d-block w-100" alt="1xplayer">
      <div class="carousel-caption d-none d-md-block">
        <h5>Casio</h5>
        <p>Revisa una de nuestras mas importantes marcas, Casio, con una gran variedad de relojes digitales y analogicos.
        </p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> 

    <ScrollCards />

    <ItemDisplay
      :title="featured1.title"
      :subtitle="featured1.subtitle"
      :imgSrc="featured1.imgSrc"
      :reverse="false"
      buttonText="Ver detalles"
      priceText="$420.000"
    />

    <ItemDisplay
      :title="featured2.title"
      :subtitle="featured2.subtitle"
      :imgSrc="featured2.imgSrc"
      :reverse="true"
      buttonText="Ver detalles"
      priceText="$720.000"
    />

    <item-display
      :title="featured3.title"
      :subtitle="featured3.subtitle"
      :imgSrc="featured3.imgSrc"
      :reverse="false"
      buttonText="Ver detalles"
      priceText="$760.000"
    />

    
  </div>
</template>

<script setup>
import ScrollCards from '@/components/ScrollCards.vue';
import ItemDisplay from '@/components/ItemDisplay.vue';

const featured1 = {
  title: 'Reloj Orient Automatic RA-AA0820R Kamasu Diver Sapphire Rojo 41,8 mm',
  subtitle: 'Una de las especialidades de la compañía Orient son los modelos deportivos, en especial los pensados para resistencia de buceo, con 200 mts certificados, caseback cerrado, bezel giratorio y corona rosca de seguridad.Este modelo, el RA-AA0820R cuenta con un calibre automático y a cuerda F6922 de fabricación inhouse del propio Orient , correa y caja de acero inoxidable y calendario con día de la semana.',
  imgSrc: 'https://www.dandolahora.cl/cdn/shop/files/RA-AA0820R_parte_trasera_360x.webp?v=1758912736'
}

const featured2 = {
  title: 'Reloj Orient Star Automatic RE-AU0109L00B Sapphire 38,5mm Made in Japan',
  subtitle: 'Felices de tener presente en nuestra tienda a la renombrada marca Orient Star, protagonista de los modelos Orient Gama alta. Marca que lleva su nombre porque busca alcanzar las estrellas al cumplir con sus tres pilares: Pleasure to Wear, Delight to See y Joy of Connections.',
  imgSrc: 'https://www.dandolahora.cl/cdn/shop/files/4-RE-AU0109L_b_s_1600x_aec6a77e-b541-4d87-8e18-985cb8662334_360x.webp?v=1758132754'
}

const featured3 = {
  title: 'Reloj Orient Automatic RA-AA0823L 41,8mm 75th Anniversary [Edición Limitada]',
  subtitle: 'Este modelo, el RA-AA0823L Kamasu Mako es una edición limitada que celebra los 75 años de Orient. Cuenta con un calibre automático y a cuerda F6922 de fabricación inhouse del propio Orient , correa y caja de acero inoxidable y calendario con día de la semana.Esta edición limitada por el 75 aniversario de Orient cuenta con el logo antiguo tanto en dial como tapa trasera. ',
  imgSrc: 'https://www.dandolahora.cl/cdn/shop/files/RA-AA0823L_1_webp.webp?v=1758130737&width=612'
}

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

.carousel-inner {
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 500px;
  margin-top: 40px;
  overflow: hidden;
}

.carousel-item {
  height: 100%;
}

.carousel-item img {
  object-fit: cover;
  height: 100%;
}

.carousel-caption {
  left: 0;
  right: auto;
  text-align: left;
  max-width: 20%;
  padding-left: 3%;
  padding-bottom: 8%;
}

.carousel-caption img {
  height: 50px;
  padding-left: 10px;
}
</style>