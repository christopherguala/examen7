# 🕰️ Navbar & Footer Components - Tienda Dando la Hora

## Descripción
Componentes Navbar y Footer completamente replicados del diseño original de "Dando la Hora" con funcionalidades completas de autenticación, navegación y newsletter.

## ✨ Características Implementadas

### 🎨 Diseño 100% Replicado de Dando la Hora
- **Top Bar**: Barra superior roja con horario de atención y contacto
- **Logo**: "Dando La Hora" con tipografía original
- **Búsqueda**: Barra de búsqueda central con placeholder original
- **Carrito**: Botón con texto "Carrito" y contador
- **Menú Principal**: Navegación completa con dropdowns grandes
- **Colores**: Rojo característico (#dc2626) y esquema de grises exacto
- **Tipografía**: Limpia y legible como el original
- **Layout**: Responsive con menú hamburguesa en móvil
- **Estilo**: Minimalista y profesional idéntico al original

### 🔐 Sistema de Autenticación
- **Estado Global**: Store centralizado con `store/user.js`
- **Menú Dinámico**: 
  - Muestra "Login" cuando no está autenticado
  - Muestra "Usuario" con dropdown cuando está autenticado
- **Funcionalidad de Logout**: Botón para cerrar sesión
- **Persistencia**: Datos guardados en localStorage

### 📱 Responsive Design
- **Desktop**: Menú horizontal completo
- **Tablet**: Adaptación de elementos
- **Mobile**: Menú hamburguesa con navegación vertical

### 🛒 Funcionalidades Adicionales
- **Carrito**: Botón con contador (preparado para implementar)
- **Dropdown de Usuario**: Acceso a perfil, pedidos y logout
- **Navegación**: Enlaces a todas las secciones principales

### 📧 Footer Completo
- **Newsletter**: Sección de suscripción con beneficios
- **Información**: Enlaces a políticas y términos
- **Sobre Nosotros**: Enlaces a blog, YouTube, etc.
- **Servicio al Cliente**: WhatsApp, email y horarios
- **Redes Sociales**: Instagram, YouTube, Facebook, TikTok
- **Copyright**: Información legal y derechos

## 🚀 Uso

### 1. Store de Usuario (`store/user.js`)
```javascript
import { useUserStore } from './store/user.js'

const userStore = useUserStore()

// Loguear usuario
userStore.login({
  id: 1,
  name: 'Usuario',
  email: 'usuario@email.com'
})

// Cerrar sesión
userStore.logout()

// Verificar estado
console.log(userStore.isAuthenticated) // true/false
console.log(userStore.user) // objeto usuario o null
```

### 2. Componentes Navbar y Footer
```vue
<template>
  <div id="app">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>
```

### 3. Página de Login
- Ruta: `/login`
- Formulario funcional con validación
- Integración completa con el store
- Diseño responsive

### 4. Newsletter del Footer
```vue
<!-- El newsletter se maneja automáticamente en el Footer -->
<!-- Solo necesitas implementar la lógica de backend para el email -->
```

## 🎯 Funcionalidades del Navbar

### Estado No Autenticado
- Logo/Brand clickeable
- Menú de navegación (Inicio, Productos, Nosotros, Contacto)
- Botón de carrito
- Botón "Login" que lleva a `/login`

### Estado Autenticado
- Logo/Brand clickeable
- Menú de navegación
- Botón de carrito
- Dropdown de usuario con:
  - Información del usuario (nombre, email)
  - Enlace a "Mi Perfil"
  - Enlace a "Mis Pedidos"
  - Botón "Cerrar Sesión"

### Mobile Menu
- Menú hamburguesa animado
- Navegación vertical completa
- Sección de autenticación adaptada
- Información de usuario en móvil

## 🎯 Funcionalidades del Footer

### Newsletter Section
- Formulario de suscripción funcional
- Validación de email
- Mensaje de éxito
- Diseño responsive

### Secciones de Información
- **Información**: Despachos, cambios, métodos de pago, FAQ, términos
- **Sobre Nosotros**: Conócenos, blog, YouTube, trabajo
- **Servicio al Cliente**: WhatsApp, email, horarios de atención
- **Redes Sociales**: Enlaces a todas las plataformas

### Footer Bottom
- Logo clickeable
- Copyright actualizado
- Información legal

## 🎨 Variables CSS
```css
:root {
  --primary-red: #dc2626;
  --primary-red-dark: #b91c1c;
  --primary-black: #1f2937;
  --primary-white: #ffffff;
  /* ... más variables de color y sombras */
}
```

## 📱 Breakpoints
- **Desktop**: > 768px
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

## 🔧 Personalización

### Cambiar Colores
Modifica las variables CSS en el componente:
```css
:root {
  --primary-red: #tu-color-principal;
  --primary-red-dark: #tu-color-oscuro;
}
```

### Agregar Enlaces
En el template del Navbar:
```vue
<RouterLink to="/nueva-ruta" class="nav-link">Nueva Sección</RouterLink>
```

### Modificar Store
Extiende el store en `store/user.js`:
```javascript
const state = reactive({
  user: null,
  isAuthenticated: false,
  loading: false,
  // Agregar nuevas propiedades
  cart: [],
  preferences: {}
})
```

## 🚀 Próximos Pasos Sugeridos
1. Implementar funcionalidad del carrito
2. Agregar más rutas (productos, perfil, pedidos)
3. Implementar autenticación real con API
4. Agregar notificaciones
5. Implementar búsqueda en el navbar

## 📝 Notas Técnicas
- **Vue 3 Composition API**: Uso completo de `<script setup>`
- **Vue Router**: Navegación SPA
- **Reactive State**: Estado reactivo con `reactive()`
- **LocalStorage**: Persistencia de sesión
- **CSS Variables**: Sistema de diseño escalable
- **Mobile First**: Diseño responsive desde móvil

¡El navbar está listo para usar! 🎉
