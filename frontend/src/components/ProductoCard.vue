<template>
  <div
    class="relative w-[250px] rounded-xl border border-[#969292]/30 p-4 bg-white flex flex-col min-h-[100px]"
  >
    <!-- Icono de advertencia -->
    <div
      class="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center group"
      :class="{
        'text-[#00932A]': cantidad > stock_min,
        'text-[#FFCC00]': cantidad >= 1 && cantidad <= stock_min,
        'text-[#E11607]': cantidad == 0,
      }"
    >
      <svg
        class="w-8 h-8"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
          clip-rule="evenodd"
        />
      </svg>
      <div
        class="absolute bottom-full right-1/2 translate-x-1/2 mb-2 w-max bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      >
        {{ cantidad }} en existencia
      </div>
    </div>

    <!-- Imagen -->
    <img :src="imagen" :alt="nombre" class="mx-auto h-32 object-contain" />

    <!-- Información -->
    <div class="mt-2 ml-2">
      <h2 class="text-base font-semibold text-gray-800">{{ nombre }}</h2>
      <p class="text-[#00932A] text-base font-bold mt-1">$ {{ precio }}</p>
    </div>

    <!-- Botones -->
    <div class="mt-auto flex justify-between items-center pt-4">
      <button
        @click="agregarProducto"
        :disabled="cantidad === 0"
        :class="{
          'bg-[#00932A] hover:bg-[#007A1F] cursor-pointer': cantidad > 0,
          'bg-gray-400 cursor-not-allowed': cantidad === 0,
        }"
        class="text-white px-12 py-2 rounded-xl text-sm transition font-semibold"
      >
        {{ cantidad === 0 ? "Sin stock" : "Agregar" }}
      </button>

      <button
        class="bg-[#EBEEEA] p-2 px-4 rounded-xl transition"
        @click="mostrarModal = true"
      >
        <svg
          class="w-6 h-6 text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
          />
        </svg>
      </button>

      <!-- Modal -->
      <div
        v-if="mostrarModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-white rounded-xl p-6 w-full max-w-md relative">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-semibold text-[#1E5D22]">
              Editar Producto
            </h3>
            <button @click="mostrarModal = false" class="text-[#817F7F]">
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-8 mb-7">
            <div>
              <label class="block text-lg font-medium mb-4">Stock:</label>
              <input
                type="number"
                class="border rounded-xl w-full px-2 py-1 text-lg mb-2"
                v-model="editable.cantidad"
                disabled
              />
            </div>
            <div>
              <label class="block text-lg font-medium mb-4"
                >Añadir Stock:</label
              >
              <input
                type="number"
                min="0"
                class="border rounded-xl w-full px-2 py-1 text-lg mb-2"
                v-model="editable.cantidad_nueva"
              />
            </div>
            <div>
              <label class="block text-lg font-medium mb-4">Costo:</label>
              <input
                type="text"
                class="border rounded-xl w-full px-2 py-1 text-lg mb-2"
                v-model="editable.costo"
              />
            </div>
            <div>
              <label class="block text-lg font-medium mb-4">Precio:</label>
              <input
                type="text"
                class="border rounded-xl w-full px-2 py-1 text-lg mb-2"
                v-model="editable.precio"
              />
            </div>
            <div>
              <label class="block text-lg font-medium mb-4">Comisión:</label>
              <input
                type="text"
                class="border rounded-xl w-full px-2 py-1 text-lg mb-2"
                v-model="editable.comision"
              />
            </div>
          </div>
          <button
            @click="datosEditar"
            class="bg-[#00932A] text-white px-6 py-2 rounded-xl w-full font-semibold"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: [String, Number],
    nombre: String,
    precio: String,
    imagen: String,
    cantidad: Number,
    cantidad_nueva: Number,
    stock: Number,
    costo: String,
    comision: String,
    stock_min: Number,
  },
  data() {
    return {
      mostrarModal: false,
      editable: {
        cantidad: this.cantidad,
        cantidad_nueva: this.cantidad_nueva,
        costo: this.costo,
        precio: this.precio,
        comision: this.comision,
      },
    };
  },

  methods: {
    agregarProducto() {
      const carrito = JSON.parse(
        localStorage.getItem("productosSeleccionados") || "[]"
      );
      if (carrito.some((p) => p.id === this.id)) {
        alert("Este producto ya está en el carrito");
        return;
      }
      const producto = {
        id: this.id,
        nombre: this.nombre,
        precio: parseFloat(this.precio.replace("$", "")),
        imagen: this.imagen,
        cantidad: 1,
        cantidad_max: this.cantidad,
      };

      carrito.push(producto);
      localStorage.setItem("productosSeleccionados", JSON.stringify(carrito));
      this.$emit("agregar", producto);
    },

    datosEditar() {
      const editado = {
        id: this.id,
        ...this.editable,
      };
      this.$emit("editar", editado);
      this.mostrarModal = false;
    },
  },

  watch: {
    "editable.cantidad_nueva"(nuevoValor) {
      let nuevaCantidad = parseInt(nuevoValor) || 0;
      if (nuevaCantidad < 0) {
        nuevaCantidad = 0;
        this.editable.cantidad_nueva = 0;
      }
      this.editable.cantidad = this.cantidad + nuevaCantidad;
    },
  },
};
</script>
