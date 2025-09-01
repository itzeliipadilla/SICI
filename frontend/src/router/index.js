import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import EstadisticasView from "../views/EstadisticasView.vue";
import ProductosView from "../views/ProductosView.vue";
import CarritoView from "../views/CarritoView.vue";
import UnidadesView from "../views/UnidadesView.vue";
import StockView from "../views/StockView.vue";
import OperadoresView from "../views/OperadoresView.vue";
import NominaView from "../views/NominaView.vue";
import VentaView from "../views/VentaView.vue";
import GastosView from "../views/GastosView.vue";
import PerfilView from "../views/PerfilView.vue";
import SalirView from "../views/SalirView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    meta: { hideNav: true }, // Ocultar la barra en Login
  },
  {
    path: "/estadisticas",
    name: "estadisticas",
    component: EstadisticasView,
    meta: { requiresAuth: true },
  },
  {
    path: "/unidades",
    name: "unidades",
    component: UnidadesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/productos",
    name: "productos",
    component: ProductosView,
    meta: { requiresAuth: true },
  },
  {
    path: "/productos-carrito",
    name: "productos-carrito",
    component: CarritoView,
    meta: { requiresAuth: true },
  },
  {
    path: "/unidades-stock/:id",
    name: "unidades-stock",
    component: StockView,
    meta: { requiresAuth: true },
  },
  {
    path: "/operadores",
    name: "operadores",
    component: OperadoresView,
    meta: { requiresAuth: true },
  },
  {
    path: "/operadores-nomina/:id",
    name: "operadores-nomina",
    component: NominaView,
    meta: { requiresAuth: true },
  },
  {
    path: "/operadores-venta/:id",
    name: "operadores-venta",
    component: VentaView,
    meta: { requiresAuth: true },
  },
  {
    path: "/gastos",
    name: "gastos",
    component: GastosView,
    meta: { requiresAuth: true },
  },
  {
    path: "/perfil",
    name: "perfil",
    component: PerfilView,
    meta: { requiresAuth: true },
  },
  {
    path: "/salir",
    name: "salir",
    component: SalirView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (to.path === "/" && isAuthenticated) {
    next({ name: "estadisticas" });
  } else if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
