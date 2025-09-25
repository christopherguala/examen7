<template>
  <footer class="footer">
    <div class="newsletter-section">
      <div class="newsletter-container">
        <div class="newsletter-content">
          <h3 class="newsletter-title">Forma parte de nuestra comunidad!</h3>
          <div class="newsletter-benefits">
            <span class="benefit">✧ Ofertas especiales</span>
            <span class="benefit">✧ Noticias relojeras de primera mano</span>
            <span class="benefit">✧ Comunidad bacan</span>
            <span class="benefit">✧ +50k suscriptores</span>
          </div>
        </div>
        <div class="newsletter-form">
          <form @submit.prevent="handleNewsletterSubmit" class="email-form">
            <input
              type="email"
              v-model="email"
              placeholder="Tu email"
              class="email-input"
              required
            />
            <button type="submit" class="subscribe-btn" :disabled="loading">
              <span v-if="loading">⏳</span>
              <span v-else>Dale!</span>
            </button>
          </form>
          <div v-if="subscribed" class="success-message">
            Email añadido con éxito!
          </div>
        </div>
      </div>
    </div>

    <div class="footer-main">
      <div class="footer-container">
        <div class="footer-section">
          <h4 class="footer-title">Información</h4>
          <ul class="footer-links">
            <li><RouterLink to="/despachos" class="footer-link">Despachos</RouterLink></li>
            <li><RouterLink to="/cambios-devoluciones" class="footer-link">Cambios y devoluciones</RouterLink></li>
            <li><RouterLink to="/metodos-pago" class="footer-link">Métodos de pago</RouterLink></li>
            <li><RouterLink to="/preguntas-frecuentes" class="footer-link">Preguntas frecuentes</RouterLink></li>
            <li><RouterLink to="/terminos-condiciones" class="footer-link">Términos y condiciones</RouterLink></li>
            <li><RouterLink to="/politicas-privacidad" class="footer-link">Políticas de privacidad</RouterLink></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">Sobre nosotros</h4>
          <ul class="footer-links">
            <li><RouterLink to="/conocenos" class="footer-link">Conócenos</RouterLink></li>
            <li><RouterLink to="/blog" class="footer-link">Blog Nº1 en Chile</RouterLink></li>
            <li><RouterLink to="/youtube" class="footer-link">Canal de Youtube +50K suscriptores</RouterLink></li>
            <li><RouterLink to="/trabaja-con-nosotros" class="footer-link">Trabaja con Nosotros</RouterLink></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">Servicio al cliente</h4>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📱</span>
              <a href="https://wa.me/56955555" class="contact-link">
                Whatsapp +56 9 555555
              </a>
            </div>
            <div class="contact-item">
              <span class="contact-icon">✉️</span>
              <a href="mailto:sos@dandolahora.cl" class="contact-link">
                soporte@gmail.com
              </a>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🕒</span>
              <span class="contact-text">
                Lunes a Viernes (Horario de atención 10:00-17:00)
              </span>
            </div>
          </div>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">Síguenos</h4>
          <div class="social-links">
            <a href="https://instagram.com/dandolahora" class="social-link" target="_blank" rel="noopener">
              <span class="social-icon">📷</span>
              <span class="social-text">Instagram</span>
            </a>
            <a href="https://youtube.com/@dandolahora" class="social-link" target="_blank" rel="noopener">
              <span class="social-icon">📺</span>
              <span class="social-text">YouTube</span>
            </a>
            <a href="https://facebook.com/dandolahora" class="social-link" target="_blank" rel="noopener">
              <span class="social-icon">👥</span>
              <span class="social-text">Facebook</span>
            </a>
            <a href="https://tiktok.com/@dandolahora" class="social-link" target="_blank" rel="noopener">
              <span class="social-icon">🎵</span>
              <span class="social-text">TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-container">
        <div class="footer-logo">
          <RouterLink to="/" class="logo-link">
            <span class="logo-text">Dando La Hora</span>
          </RouterLink>
        </div>
        <div class="footer-copyright">
          <p>© 2025 Dando La Hora.</p>
        </div>
        <div class="footer-legal">
          <p class="legal-text">
            Grupo1 UNAB
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Estado local
const email = ref('')
const loading = ref(false)
const subscribed = ref(false)

// Métodos
const handleNewsletterSubmit = async () => {
  if (!email.value.trim()) return
  
  loading.value = true
  
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simular éxito
    subscribed.value = true
    email.value = ''
    
    // Resetear mensaje después de 3 segundos
    setTimeout(() => {
      subscribed.value = false
    }, 3000)
    
  } catch (error) {
    console.error('Error al suscribirse:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

.footer {
  background: var(--primary-white);
  border-top: 1px solid var(--gray-200);
}

.newsletter-section {
  background: var(--primary-blue);
  color: white;
  padding: 3rem 0;
}

.newsletter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.newsletter-content {
  flex: 1;
}

.newsletter-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.newsletter-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.benefit {
  font-size: 0.875rem;
  opacity: 0.9;
}

.newsletter-form {
  flex-shrink: 0;
  min-width: 300px;
}

.email-form {
  display: flex;
  gap: 0.5rem;
}

.email-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  color: var(--gray-900);
}

.email-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}

.email-input::placeholder {
  color: var(--gray-500);
}

.subscribe-btn {
  padding: 0.75rem 1.5rem;
  background: var(--primary-yellow);
  color: var(--black);
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;
}

.subscribe-btn:hover:not(:disabled) {
  background: #b8e002;
}

.subscribe-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--primary-green);
  font-weight: 500;
}

.footer-main {
  padding: 3rem 0;
  background: var(--gray-50);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0 0 1rem 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: var(--gray-600);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--primary-green);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-icon {
  font-size: 1rem;
  color: var(--gray-500);
}

.contact-link {
  color: var(--gray-600);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: var(--primary-green);
}

.contact-text {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--gray-600);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.social-link:hover {
  color: var(--primary-green);
}

.social-icon {
  font-size: 1rem;
}

.social-text {
  font-weight: 500;
}

.footer-bottom {
  background: var(--primary-white);
  border-top: 1px solid var(--gray-200);
  padding: 1.5rem 0;
}

.footer-bottom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.footer-logo {
  flex-shrink: 0;
}

.logo-link {
  text-decoration: none;
  color: var(--primary-black);
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-green);
}

.footer-copyright {
  flex: 1;
  text-align: center;
}

.footer-copyright p {
  margin: 0;
  color: var(--gray-600);
  font-size: 0.875rem;
}

.footer-legal {
  flex-shrink: 0;
  text-align: right;
}

.legal-text {
  margin: 0;
  color: var(--gray-500);
  font-size: 0.75rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .newsletter-container {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .newsletter-form {
    min-width: auto;
    width: 100%;
  }
  
  .email-form {
    flex-direction: column;
  }
  
  .newsletter-benefits {
    justify-content: center;
  }
  
  .footer-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-bottom-container {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .footer-copyright {
    order: 2;
  }
  
  .footer-legal {
    order: 3;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .newsletter-section {
    padding: 2rem 0;
  }
  
  .newsletter-title {
    font-size: 1.25rem;
  }
  
  .newsletter-benefits {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .footer-main {
    padding: 2rem 0;
  }
  
  .footer-bottom {
    padding: 1rem 0;
  }
}
</style>
