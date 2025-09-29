# Proyecto: Tienda Virtual con Vue.js

## Descripción

Esta es una aplicación de comercio electrónico desarrollada con Vue.js como parte de la evaluación final del módulo. La aplicación permite a los usuarios visualizar un catálogo de productos, realizar búsquedas, y gestionar un carrito de compras. La interacción con los datos se simula a través de módulos de JavaScript que actúan como una API REST, utilizando promesas para manejar la asincronía.

## Características Principales

- **Visualización de Productos**: La página de inicio muestra una lista completa de los productos disponibles.
- **Búsqueda**: Permite a los usuarios filtrar productos por nombre.
- **Carrito de Compras**:
  - Añadir productos al carrito especificando la cantidad deseada.
  - Visualizar el detalle del carrito en una ventana emergente.
  - Eliminar productos del carrito.
- **Autenticación Simulada**: Incluye un formulario de login que valida credenciales de prueba.

## Estructura del Proyecto

El proyecto sigue una estructura organizada para separar componentes, vistas y lógica de servicios.

### Vistas (`src/views`)

- **`Home.vue`**: Es la vista principal de la aplicación. Contiene y renderiza el componente `Products.vue`.
- **`Login.vue`**: Presenta el formulario de inicio de sesión para los usuarios.

### Componentes (`src/components`)

- **`Products.vue`**: Se encarga de cargar, mostrar y filtrar la lista de productos obtenida del servicio API.
- **`Navbar.vue`**: Componente de navegación principal que contiene los menús y accesos de la aplicación.
- **`CartDetail.vue`**: Es una ventana emergente (popup) que muestra el detalle de los productos añadidos al carrito.

### Servicios (`src/services`)

- **`API.js`**: Simula una API REST para la gestión de productos.
  - `Products.all()`: Retorna una promesa que, al resolverse, entrega un arreglo con la lista de todos los productos.
- **`Auth.js`**: Simula el servicio de autenticación de usuarios.
  - `Auth.login(creds)`: Retorna una promesa que se resuelve con un objeto de usuario si las credenciales son correctas, o lanza un error en caso contrario.
  - **Credenciales de prueba:**
    - **Usuario:** `usuario1@mitienda.com`
    - **Contraseña:** `password`

## Guía de Instalación y Uso

### Requisitos

- Node.js
- npm (o un gestor de paquetes compatible)

### Instalación

1. Clona el repositorio en tu máquina local.
2. Abre una terminal en el directorio raíz del proyecto.
3. Instala las dependencias del proyecto ejecutando el siguiente comando:
   ```bash
   npm install
   ```

### Ejecución en Modo Desarrollo

Para correr la aplicación, necesitas tener dos procesos corriendo simultáneamente en terminales separadas: el servidor de la API y el servidor de desarrollo de Vite.

**1. Iniciar Servidor de API**

Este comando inicia el servidor local que provee los datos de los productos. Abre una terminal y ejecuta:

```bash
npm run server
```

**2. Iniciar Servidor de Desarrollo**

En una **nueva terminal**, ejecuta este comando para iniciar el servidor de Vite y ver la aplicación en tu navegador:

```bash
npm run dev
```

## Integrantes Equipo 1 - UNAB

- Christopher Guala
- Franco Giaverini
- Isabel Palacios
- Valeria Torrealba
- Valentina Troncoso
