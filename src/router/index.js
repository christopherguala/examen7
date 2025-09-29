import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginViewSimple.vue"),
    },
    {
      path: "/productos",
      name: "Productos",
      component: () => import("../views/ProductsView.vue"),
    },
    {
      path: "/relojes",
      name: "Relojes",
      component: () => import("../views/ProductsView.vue"),
    },
    {
      path: "/relojes/:category",
      name: "RelojesCategoria",
      component: () => import("../views/ProductsView.vue"),
    },
    {
      path: "/test-productos",
      name: "TestProductos",
      component: () => import("../views/TestProductsView.vue"),
    },
  ],
});

export default router;
