<template>
  <div class="p-6 ml-64 min-h-screen flex flex-col overflow-hidden">
    <SpinnerComp v-if="loading" :fullscreen="true" />
    <div v-else>
      <!-- Título -->
      <div>
        <h1 class="text-[#1E5D22] font-semibold text-3xl mb-4 ml-8 mt-7">
          Gastos
        </h1>
      </div>

      <!-- Contenedor de búsqueda -->
      <div
        class="ml-8 mt-6 flex items-center bg-white border border-[#969292]/30 rounded-xl p-2 w-[500px]"
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

      <!-- Tabla de pacientes -->
      <DataTable
        class="mt-11 w-[1160px] ml-8"
        :headers="tableHeaders"
        :rows="filteredRows"
        :visibleColumnsMobile="visibleColumnsForMobile"
        :columnWidths="columnWidths"
        :openModal="true"
        @open-modal="abrirModal"
      />

      <!-- Modal -->
      <div
        v-if="modalVisible"
        class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
      >
        <div
          class="bg-white rounded-xl p-6 w-[600px] shadow-lg relative flex gap-4"
        >
          <!-- Botón de cerrar -->
          <button
            @click="modalVisible = false"
            class="absolute top-3 right-3 text-[#817F7F] dark:text-white"
          >
            <svg
              class="w-6 h-6 text-[#817F7F]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>

          <!-- Imagen -->
          <div class="w-[400px]">
            <img
              :src="gasto.Imagen"
              alt="Recibo"
              class="w-full h-auto rounded-lg"
            />
          </div>

          <!-- Contenido -->
          <div class="w-[500px]">
            <h2 class="text-2xl font-semibold text-[#1E5D22] mb-4">
              Descripción de Gasto
            </h2>
            <p class="text-lg mb-2">
              <span class="font-semibold">Hora:</span> {{ gasto.Hora }}
            </p>
            <p class="text-lg mb-2">
              <span class="font-semibold">Fecha:</span> {{ gasto.Fecha }}
            </p>
            <p class="text-lg mb-2">
              <span class="font-semibold">Operador:</span> {{ gasto.Operador }}
            </p>
            <p class="text-lg mb-2">
              <span class="font-semibold">Descripción:</span>
              {{ gasto.Descripcion }}
            </p>
            <p class="text-lg mb-2">
              <span class="font-semibold">Total:</span> ${{ gasto.Total }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import SpinnerComp from "@/components/SpinnerComp.vue";

export default {
  components: {
    DataTable,
    SpinnerComp,
  },
  data() {
    return {
      loading: true,
      tableHeaders: ["ID", "Fecha", "Hora", "Operador", "Total"],
      tableRows: [],
      visibleColumnsForMobile: [0, 1, 2],
      columnWidths: ["25%", "40%", "42%", "92%", "25%"],
      modalVisible: false,
      gasto: {},
      busqueda: "",
    };
  },
  mounted() {
    this.$axios
      .get("/getGastos")
      .then((response) => {
        this.tableRows = response.data.map((item) => ({
          ID: item.id,
          Fecha: item.fecha,
          Hora: item.hora,
          operador: item.operador,
          total: item.total,
        }));
        this.loading = false;
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },
  methods: {
    abrirModal(seleccionado) {
      const id = seleccionado.row.ID;
      this.$axios
        .get(`/detallesGastos/${id}`)
        .then((response) => {
          const item = response.data;
          this.gasto = {
            Hora: item.hora,
            Fecha: item.fecha,
            Operador: item.operador,
            Descripcion: item.description,
            Total: item.total,
            Imagen: item.image,
          };
          console.log(this.gasto);
          this.modalVisible = true;
        })
        .catch((error) => {
          alert(error.response?.data?.message);
        });
    },
  },

  computed: {
    filteredRows() {
      if (!this.busqueda) return this.tableRows;

      const texto = this.busqueda.toLowerCase();

      return this.tableRows.filter((row) => {
        return (
          String(row.ID).toLowerCase().includes(texto) ||
          row.Fecha.toLowerCase().includes(texto) ||
          row.Hora.toLowerCase().includes(texto) ||
          row.operador.toLowerCase().includes(texto) ||
          String(row.total).toLowerCase().includes(texto)
        );
      });
    },
  },
};
</script>
