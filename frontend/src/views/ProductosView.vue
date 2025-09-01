<template>
  <div class="p-6 ml-64 min-h-screen flex flex-col overflow-hidden">
    <SpinnerComp v-if="loading" :fullscreen="true" />
    <div v-else>
      <!-- Encabezado con título y notificaciones -->
      <div class="flex justify-between items-center w-[1160px] ml-8 mt-7 mb-4">
        <h1 class="text-[#1E5D22] font-semibold text-3xl">Productos</h1>
        <NotificacionesComp ref="notificacionesRef" />
      </div>

      <!-- Buscador arriba -->
      <div class="ml-8 flex justify-between items-center w-[1160px] mb-4 mt-6">
        <div
          class="flex items-center bg-white border border-[#969292]/30 rounded-xl p-2 w-full"
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-[#817F7F] ml-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-width="2"
              d="M21 21l-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar..."
            class="ml-3 text-black text-lg placeholder-[#817F7F] bg-transparent focus:outline-none w-full"
          />
        </div>
      </div>

      <!-- Fila de categorías y botón de carrito -->
      <div class="ml-8 mt-6 flex justify-between items-center w-[1160px]">
        <div
          class="flex items-center bg-white border border-[#969292]/30 rounded-xl p-2 w-[850px]"
        >
          <label class="ml-3 text-[#817F7F] text-lg font-semibold"
            >Categorías:</label
          >
          <select
            v-model="categoriaSeleccionada"
            class="ml-3 text-black text-lg bg-transparent focus:outline-none w-full"
          >
            <option value="">Todas</option>
            <option value="Básicos">Básicos</option>
            <option value="Novedades">Novedades</option>
            <option value="categoria3">Artículos de temporada</option>
            <option value="Artículos escolares y papelería">
              Artículos escolares y papelería
            </option>
            <option value="Ferretería">Ferretería</option>
            <option value="Jarciería">Jarciería</option>
            <option value="Sandalias">Sandalias</option>
            <option value="Accesorios para celular">
              Accesorios para celular
            </option>
          </select>
        </div>

        <!-- Botón de carrito -->
        <router-link
          to="/productos-carrito"
          class="flex items-center bg-[#00932A] text-white text-base font-semibold px-8 py-2 rounded-xl ml-4"
        >
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
            />
          </svg>
          Ver carrito
        </router-link>
      </div>

      <!-- Tarjetas de productos -->
      <div class="ml-8 mt-10 flex flex-wrap gap-[53px]">
        <ProductoCard
          v-for="(producto, index) in productosFiltrados"
          :key="index"
          :id="producto.id"
          :imagen="producto.imagen"
          :nombre="producto.nombre"
          :precio="producto.precio"
          :cantidad="producto.cantidad"
          :costo="producto.costo"
          :comision="producto.comision"
          :stock_min="producto.stock_min"
          @agregar="mostrarEnConsola"
          @editar="editarProducto"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductoCard from "@/components/ProductoCard.vue";
import NotificacionesComp from "@/components/NotificacionesComp.vue";
import SpinnerComp from "@/components/SpinnerComp.vue";
import { ref, onMounted, watch, computed } from "vue";

export default {
  components: {
    ProductoCard,
    NotificacionesComp,
    SpinnerComp,
  },

  setup() {
    const notificacionesRef = ref(null);
    const loading = ref(true); // 👈 Spinner control

    const productos = ref([]);
    const productosSeleccionados = ref([]);
    const categoriaSeleccionada = ref("");
    const busqueda = ref("");

    const mostrarEnConsola = (producto) => {
      const existente = productosSeleccionados.value.find(
        (p) => p.id === producto.id
      );
      if (existente) {
        alert("Este producto ya está en el carrito.");
        return;
      }
      productosSeleccionados.value.push({ ...producto, cantidad: 1 });
    };

    const productosFiltrados = computed(() => {
      return productos.value.filter((p) => {
        const coincideCategoria =
          !categoriaSeleccionada.value ||
          p.family === categoriaSeleccionada.value;
        const coincideBusqueda =
          !busqueda.value ||
          p.nombre.toLowerCase().includes(busqueda.value.toLowerCase());
        return coincideCategoria && coincideBusqueda;
      });
    });

    onMounted(() => {
      const saved = localStorage.getItem("productosSeleccionados");
      if (saved) {
        productosSeleccionados.value = JSON.parse(saved);
      }
      // Agrega notificaciones si aplica
      productos.value.forEach((p) => {
        if (p.estado === "rojo" || p.estado === "amarillo") {
          const notifs = notificacionesRef.value?.notificaciones || [];
          const existe = notifs.some((n) => n.mensaje.includes(p.nombre));
          if (!existe) {
            notificacionesRef.value?.agregarNotificacion?.(p);
          }
        }
      });
    });

    watch(
      productosSeleccionados,
      (newVal) => {
        localStorage.setItem("productosSeleccionados", JSON.stringify(newVal));
      },
      { deep: true }
    );

    return {
      productos,
      loading,
      notificacionesRef,
      mostrarEnConsola,
      productosFiltrados,
      categoriaSeleccionada,
      busqueda,
    };
  },

  mounted() {
    this.$axios
      .get("/productos")
      .then((response) => {
        this.productos = response.data.products.map((item) => ({
          id: item.id,
          nombre: item.name,
          precio: item.price.toString(),
          cantidad: item.stock,
          costo: item.cost,
          comision: item.comision,
          imagen: item.image,
          family: item.family,
          stock_min: item.stock_min,
        }));
        console.log("prod", this.productos);
        this.loading = false;
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },

  methods: {
    editarProducto(productoEditado) {
      const datos = {
        stock: productoEditado.cantidad,
        cost: productoEditado.costo,
        price: productoEditado.precio,
        comision: productoEditado.comision,
      };
      this.$axios
        .post(`/actualizar-amount/${productoEditado.id}`, datos)
        .then((response) => {
          alert(response.data.message);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error al editar producto:", error);
          alert(error.response?.data?.message || "Error desconocido");
          if (error.response?.data?.errors) {
            console.table(error.response.data.errors);
          }
        });
    },
  },
};
</script>
