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
          <img src="https://www.dandolahora.cl/cdn/shop/files/banner_seikoclock3_724ded4d-896f-4c6d-995d-b14d6143e4ec.jpg?v=1750892104&width=1920" class="d-block w-100" alt="Relojes desde Japón">
          <div class="carousel-caption d-none d-md-block">
            <h5>Desde Japón</h5>
            <p>Mira nuestras nuevas adquisiciones de relojes inspirados en algunas de las series más carismáticas de Japón.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://www.dandolahora.cl/cdn/shop/files/banner_junghans6_ea3e5b6d-7053-4bf8-bd1b-46016435029b.jpg?v=1749754332&width=1920" class="d-block w-100" alt="Relojes desde Alemania">
          <div class="carousel-caption d-none d-md-block">
            <h5>Desde Alemania</h5>
            <p>Relojes confeccionados en Alemania, la mejor calidad de uno de los países más vanguardistas en la tecnología y lo clásico.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://media.revistagq.com/photos/5e4a4a284638e40008003f32/16:9/w_2720,h_1530,c_limit/mejores-relojes-casio-2020.jpeg" class="d-block w-100" alt="Relojes Casio">
          <div class="carousel-caption d-none d-md-block">
            <h5>Casio</h5>
            <p>Revisa una de nuestras más importantes marcas, Casio, con una gran variedad de relojes digitales y analógicos.</p>
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

    <ItemDisplay
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
  subtitle: 'Este modelo, el RA-AA0823L Kamasu Mako es una edición limitada que celebra los 75 años de Orient. Cuenta con un calibre automático y a cuerda F6922 de fabricación inhouse del propio Orient , correa y caja de acero inoxidable y calendario con día de la semana.Esta edición limitada por el 75 aniversario de Orient cuenta con el logo antiguo tanto en dial como tapa trasera.',
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

.carousel-caption h5 {
  color: white;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.carousel-caption p {
  color: white;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .carousel-caption {
    max-width: 80%;
    padding-left: 5%;
    padding-bottom: 5%;
  }
}
</style>