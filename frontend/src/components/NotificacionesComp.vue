<template>
  <div class="relative cursor-pointer" @click="mostrar = !mostrar">
    <!-- Botón de campana con contador -->
    <div
      class="bg-white border border-[#969292]/30 rounded-lg w-[50px] h-[50px] flex items-center justify-center relative"
    >
      <!-- Botón de campana -->
      <div>
        <!-- Icono campana -->
        <svg
          class="w-8 h-8 text-gray-800 dark:text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
          />
        </svg>

        <!-- Burbuja contador -->
        <span
          v-if="notificaciones.length > 0"
          class="absolute -top-1 -right-1 bg-red-600 text-white text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center"
        >
          {{ notificaciones.length }}
        </span>
      </div>
    </div>

    <!-- Panel de notificaciones -->
    <div
      v-if="mostrar && notificaciones.length"
      class="absolute top-10 right-0 w-80 bg-white shadow-xl rounded-xl p-4 z-50"
    >
      <h3
        class="text-[#1A4D1E] text-xl font-semibold mb-3 bg-white relative z-10"
      >
        Notificaciones
      </h3>

      <div class="max-h-64 overflow-y-auto">
        <div
          v-for="(n, index) in notificaciones"
          :key="index"
          class="flex items-center gap-3 mb-3"
        >
          <div
            :class="[
              'w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold leading-none shrink-0',
              n.tipo === 'rojo'
                ? 'bg-red-600'
                : n.tipo === 'amarillo'
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-400',
            ]"
          >
            !
          </div>

          <div class="text-sm">
            <p class="font-semibold text-black">{{ n.titulo }}</p>
            <p class="text-gray-700">{{ n.mensaje }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mostrar: false,
      notificaciones: [],
    };
  },

  mounted() {
    this.$axios
      .get("/check-stock")
      .then((response) => {
        this.notificaciones = response.data.map((item) => ({
          tipo: item.tipo,
          titulo: item.titulo,
          mensaje: item.mensaje,
        }));
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },
};
</script>
