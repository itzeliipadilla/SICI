<template>
  <div class="p-6 ml-64 min-h-screen flex flex-col overflow-hidden">
    <SpinnerComp v-if="loading" :fullscreen="true" />
    <div v-else>
      <!-- Título -->
      <div>
        <h1 class="text-[#1E5D22] font-semibold text-3xl mb-2 ml-8 mt-5">
          Nómina
        </h1>
        <p class="text-[#817F7F] text-xl ml-8">{{ nombres[0] }}</p>
      </div>

      <div class="ml-8 mt-9 flex justify-between items-center w-[1160px]">
        <div class="flex items-center gap-3">
          <!-- Selector de fechas -->
          <div
            class="flex gap-4 px-4 py-2 bg-white border border-[#969292]/30 rounded-xl"
          >
            <span class="text-[#817F7F] font-semibold mr-1 text-lg"
              >Tiempo:</span
            >
            <select
              v-model="opcionTiempo"
              class="text-black border-none focus:outline-none focus:ring-0 pr-4 -ml-4 text-lg"
            >
              <option value="hoy">Hoy</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
              <option value="todo">Todo el tiempo</option>
              <option value="fecha">Seleccionar fecha</option>
              <option value="rango">Rango de fechas</option>
            </select>
          </div>

          <!-- Input para Seleccionar fecha -->
          <input
            v-if="opcionTiempo === 'fecha'"
            type="date"
            v-model="fecha"
            class="px-4 py-2 border border-[#969292]/30 rounded-xl text-black text-lg"
          />

          <!-- Inputs para Rango de fechas -->
          <div v-if="opcionTiempo === 'rango'" class="flex gap-2">
            <input
              type="date"
              v-model="fechaInicio"
              class="px-4 py-2 border border-[#969292]/30 rounded-xl text-black text-lg"
            />
            <input
              type="date"
              v-model="fechaFin"
              class="px-4 py-2 border border-[#969292]/30 rounded-xl text-black text-lg"
            />
          </div>
        </div>

        <!-- Botón Generar PDF -->
        <button
          @click="generarPDF"
          class="px-6 py-2 font-semibold text-white bg-[#00932A] rounded-xl"
        >
          Generar PDF
        </button>
      </div>

      <div
        class="bg-white rounded-2xl border border-[#969292]/30 p-6 w-[1160px] ml-8 mt-12"
      >
        <h1 class="text-[#1E5D22] font-semibold text-2xl mb-3 ml-2">Ventas</h1>

        <!-- Tabla  -->
        <DataTable
          class="border-none w-[1140px] -ml-[16px]"
          :headers="tableHeaders"
          :rows="tableRows"
          :visibleColumnsMobile="visibleColumnsForMobile"
          :columnWidths="columnWidths"
          :defaultRoute="'/operadores-venta'"
          :openModal="false"
        />
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
      nombres: ["Ezequiel Montes Rivas"],
      opcionTiempo: "hoy",
      fecha: null,
      fechaInicio: null,
      fechaFin: null,
      tableHeaders: ["ID", "Fecha", "Hora", "Operador", "Total"],
      tableRows: [],
      visibleColumnsForMobile: [0, 1, 2],
      columnWidths: ["10%", "20%", "20%", "30%", "10%"],
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.$axios
      .get(`getSalesOperator/${id}`)
      .then((response) => {
        this.nombres = response.data.nombres;
        this.tableRows = response.data.ventas.map((item) => ({
          ID: item.id,
          Fecha: item.fecha,
          Hora: item.hora,
          Operador: item.operador,
          Total: item.total,
        }));
        this.loading = false;
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },

  methods: {
    generarPDF() {
      const id = Number(this.$route.params.id);
      let filtroPayload = { id: id, filtro: this.opcionTiempo };

      if (this.opcionTiempo === "fecha") {
        if (!this.fecha) {
          alert("Por favor, selecciona una fecha.");
          return;
        }
        filtroPayload.fecha = this.fecha;
      } else if (this.opcionTiempo === "rango") {
        if (!this.fechaInicio || !this.fechaFin) {
          alert("Por favor, selecciona ambas fechas para el rango.");
          return;
        }
        filtroPayload.fecha_inicio = this.fechaInicio;
        filtroPayload.fecha_fin = this.fechaFin;
      }

      this.$axios
        .post("/generar-nomina", filtroPayload, {
          responseType: "blob", 
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          window.open(url, "_blank");
        })
        .catch((error) => {
          alert(error.response?.data?.message || "Error al generar la nómina");
        });

      console.log("Datos para generar nómina:", filtroPayload);
    },
  },
};
</script>
