<template>
  <div class="p-6 ml-64 min-h-screen flex flex-col overflow-hidden">
    <SpinnerComp v-if="loading" :fullscreen="true" />
    <div v-else>
      <!-- Título -->
      <div>
        <h1
          class="text-[#1E5D22] font-semibold text-3xl font-sans mb-4 ml-8 mt-7"
        >
          Carrito
        </h1>
      </div>

      <div class="ml-8 mt-6 flex justify-between items-center w-[1160px]">
        <!-- Select de Unidad -->
        <div
          class="flex items-center bg-white border border-[#969292]/30 rounded-xl p-2 w-[550px]"
        >
          <label class="ml-3 text-[#817F7F] text-lg font-semibold"
            >Unidad:</label
          >
          <select
            v-model="selectedUnidad"
            class="ml-3 text-black text-lg bg-transparent focus:outline-none w-full"
          >
            <option value="" disabled>Selecciona una unidad</option>
            <option v-for="unidad in unidades" :key="unidad.id" :value="unidad">
              {{ unidad.name }}
            </option>
          </select>
        </div>

        <!-- Operador -->
        <div
          class="flex items-center bg-white border border-[#969292]/30 rounded-xl p-2 w-[550px]"
        >
          <label class="ml-3 text-[#817F7F] text-lg font-semibold"
            >Operador:</label
          >
          <div class="ml-3 text-black text-lg w-full">
            {{ selectedUnidad?.operador_name || "Sin operador" }}
          </div>
        </div>
      </div>

      <!-- Tabla carrito -->
      <div class="ml-8 mt-10 w-[1160px]">
        <div
          class="bg-white border border-[#969292]/30 rounded-2xl overflow-hidden"
        >
          <table class="w-full table-auto text-left">
            <thead>
              <tr>
                <th
                  class="py-4 px-12 font-semibold text-[#817F7F] text-lg text-left w-[300px]"
                >
                  Producto
                </th>
                <th
                  class="py-4 px-6 font-semibold text-[#817F7F] text-lg text-center w-[120px]"
                >
                  Precio
                </th>
                <th
                  class="py-4 px-6 font-semibold text-[#817F7F] text-lg text-center w-[150px]"
                >
                  Cantidad
                </th>
                <th
                  class="py-4 px-6 font-semibold text-[#817F7F] text-lg text-center w-[140px]"
                >
                  Total
                </th>
                <th
                  class="py-4 px-6 font-semibold text-[#817F7F] text-lg text-center w-[50px]"
                ></th>
              </tr>
              <tr>
                <td colspan="5">
                  <div
                    class="w-[95%] mx-auto border-b border-[#969292]/30"
                  ></div>
                </td>
              </tr>
            </thead>

            <tbody class="border-separate border-spacing-y-2">
              <tr
                v-for="(producto, index) in productosCarrito"
                :key="index"
                class="hover:bg-gray-50"
              >
                <!-- Producto -->
                <td class="flex items-center gap-4 py-4 px-12 w-[300px]">
                  <img
                    :src="producto.imagen"
                    alt="Producto"
                    class="w-12 h-12 rounded-md object-contain"
                  />
                  <span class="text-black font-medium text-lg">{{
                    producto.nombre
                  }}</span>
                </td>

                <!-- Precio -->
                <td class="text-black py-4 px-6 text-center text-lg w-[120px]">
                  ${{ producto.precio.toFixed(2) }}
                </td>

                <!-- Cantidad -->
                <td class="py-4 px-6 text-center w-[150px]">
                  <div class="flex items-center justify-center gap-3">
                    <button
                      @click="disminuirCantidad(index)"
                      class="w-7 h-7 rounded-full bg-green-600 text-white text-base leading-none font-bold flex items-center justify-center"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      :max="producto.cantidad_max"
                      v-model.number="producto.cantidad"
                      @change="validarCantidad(index)"
                    />

                    <button
                      @click="aumentarCantidad(index)"
                      class="w-7 h-7 rounded-full bg-green-600 text-white text-base leading-none font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </td>

                <!-- Total -->
                <td
                  class="text-green-700 font-semibold py-4 px-6 text-center text-lg w-[140px]"
                >
                  ${{ (producto.precio * producto.cantidad).toFixed(2) }}
                </td>

                <!-- Eliminar -->
                <td class="py-4 px-6 text-center w-[50px]">
                  <button @click="eliminarProducto(index)">
                    <svg
                      class="w-5 h-5 text-black hover:text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        class="ml-8 mt-10 flex justify-between items-center w-[1160px] gap-4"
      >
        <!-- Total de productos -->
        <div
          class="flex items-center bg-white border border-[#969292]/30 rounded-xl px-6 py-[9px] text-lg font-semibold text-[#817F7F]"
        >
          Total de productos:
          <span class="ml-2 text-black font-normal">{{ totalProductos }}</span>
        </div>

        <!-- Total en dinero -->
        <div
          class="flex items-center bg-white border border-[#969292]/30 rounded-xl px-6 py-[9px] text-lg font-bold text-black"
        >
          Total:
          <span class="ml-2 text-black font-normal"
            >${{ totalCarrito.toFixed(2) }}</span
          >
        </div>

        <!-- Botón -->
        <button
          class="bg-[#00932A] text-white font-semibold px-8 py-[10px] rounded-xl text-base"
          @click="cargarStock"
        >
          Cargar Stock
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SpinnerComp from "@/components/SpinnerComp.vue";

export default {
  components: {
    SpinnerComp,
  },
  props: {
    productos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      unidades: [
        {
          id: "1",
          name: "Unidad 1",
          operador_name: "Operador A",
          operador_id: "101",
        },
        {
          id: "2",
          name: "Unidad 2",
          operador_name: "Operador B",
          operador_id: "102",
        },
        {
          id: "3",
          name: "Unidad 3",
          operador_name: "Operador C",
          operador_id: "103",
        },
      ],
      selectedUnidad: "",
      productosCarrito: [],
    };
  },

  computed: {
    totalProductos() {
      return this.productosCarrito.reduce(
        (sum, prod) => sum + prod.cantidad,
        0
      );
    },
    totalCarrito() {
      return this.productosCarrito.reduce(
        (sum, prod) => sum + prod.precio * prod.cantidad,
        0
      );
    },
  },
  methods: {
    aumentarCantidad(index) {
      const producto = this.productosCarrito[index];
      if (producto.cantidad < producto.cantidad_max) {
        producto.cantidad++;
        this.actualizarStockAPI(
          producto.id,
          producto.cantidad_max - producto.cantidad
        );
        this.actualizarLocalStorage();
      }
    },

    disminuirCantidad(index) {
      const producto = this.productosCarrito[index];
      if (producto.cantidad > 1) {
        producto.cantidad--;
        this.actualizarStockAPI(
          producto.id,
          producto.cantidad_max - producto.cantidad
        );
        this.actualizarLocalStorage();
      }
    },

    eliminarProducto(index) {
      const producto = this.productosCarrito[index];
      const stockActual = producto.cantidad_max - producto.cantidad;
      const nuevoStock = stockActual + producto.cantidad;
      this.productosCarrito.splice(index, 1);
      this.actualizarLocalStorage();
      this.actualizarStockAPI(producto.id, nuevoStock);
    },

    actualizarStockAPI(id, nuevoStock) {
      this.$axios
        .put(`/actualizar-stock/${id}`, { stock: nuevoStock })
        .catch((error) => console.error("Error al actualizar stock:", error));
    },

    actualizarLocalStorage() {
      localStorage.setItem(
        "productosSeleccionados",
        JSON.stringify(this.productosCarrito)
      );
    },

    validarCantidad(index) {
      const producto = this.productosCarrito[index];
      let cantidad = Number(producto.cantidad);
      if (isNaN(cantidad)) {
        cantidad = 1;
      }
      cantidad = Math.max(1, Math.min(cantidad, producto.cantidad_max));
      producto.cantidad = cantidad;
      this.actualizarStockAPI(
        producto.id,
        producto.cantidad_max - producto.cantidad
      );
      this.actualizarLocalStorage();
    },

    cargarStock() {
      if (!this.selectedUnidad) {
        alert("Selecciona una unidad antes de continuar");
        return;
      }

      const stockData = this.productosCarrito.map((producto) => ({
        delivery_unit: this.selectedUnidad.id,
        product_id: producto.id,
        stock: producto.cantidad,
      }));

      const payload = { items: stockData };

      console.log("Datos a enviar:", JSON.stringify(payload, null, 2));

      this.$axios
        .post("/registerStorage", payload)
        .then(() => {
          alert("Stock cargado exitosamente");
          this.productosCarrito = [];
          localStorage.removeItem("productosSeleccionados");
          window.history.back();
        })
        .catch((error) => {
          console.error("Error al cargar stock:", error);
          if (error.response && error.response.status === 422) {
            console.error("Errores de validación:", error.response.data.errors);
          }
          alert("Ocurrió un error al cargar el stock");
        });
    },
  },

  mounted() {
    const productosGuardados = localStorage.getItem("productosSeleccionados");
    if (productosGuardados) {
      try {
        this.productosCarrito = JSON.parse(productosGuardados);
      } catch (error) {
        this.productosCarrito = [];
      }
    }

    this.$axios
      .get("/getUnitOperator")
      .then((response) => {
        this.unidades = response.data.units.map((item) => ({
          id: item.id,
          name: item.name,
          operador_name: item.operator?.user?.name,
          operador_id: item.operator?.user?.id,
        }));
        this.loading = false;
      })
      .catch((error) => {
        alert(error.response.data.message);
        this.loading = false;
      });
  },

  watch: {
    productosCarrito: {
      handler(newVal) {
        newVal.forEach((prod) => {
          if (prod.cantidad === "" || prod.cantidad === null) {
            return;
          }
          const cantidadNum = Number(prod.cantidad);
          if (!isNaN(cantidadNum)) {
            if (cantidadNum >= prod.cantidad_max) {
              prod.cantidad = prod.cantidad_max;
            } else if (cantidadNum < 1) {
              prod.cantidad = 1;
            }
            // Actualiza stock en API automáticamente cuando cambia cantidad
            this.actualizarStockAPI(prod.id, prod.cantidad_max - prod.cantidad);
          }
        });
        this.actualizarLocalStorage();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
