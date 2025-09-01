<template>
  <div class="p-6 ml-64 min-h-screen flex flex-col overflow-hidden">
    <SpinnerComp v-if="loading" :fullscreen="true" />
    <div v-else>
      <!-- Título -->
      <div>
        <h1 class="text-[#1E5D22] font-semibold text-3xl mb-2 ml-8 mt-5">
          Venta {{ venta[0] }}
        </h1>
        <p class="text-[#817F7F] text-xl ml-8">{{ operador[0] }}</p>
      </div>

      <div class="flex justify-between gap-4 px-4 py-2 mt-8 ml-4 mr-4">
        <!-- Cliente -->
        <div
          class="flex gap-1 bg-white border border-[#969292]/30 rounded-xl text-lg px-4 py-2"
        >
          <p class="text-[#817F7F] font-semibold mr-1">Cliente:</p>
          <p class="text-black">{{ cliente[0] }}</p>
        </div>

        <!-- Fecha -->
        <div
          class="flex gap-1 bg-white border border-[#969292]/30 rounded-xl text-lg px-4 py-2"
        >
          <p class="text-[#817F7F] font-semibold mr-1">Fecha:</p>
          <p class="text-black">{{ fecha[0] }}</p>
        </div>
      </div>

      <!-- Tabla -->
      <TableComp
        class="w-[1160px] ml-8 mt-9"
        :headers="['Producto', 'Cantidad', 'Total', 'Comisión']"
        :rows="productos"
        :visibleColumnsMobile="[0, 1]"
        :columnWidths="['40%', '15%', '15%', '9%']"
        total-label="Comisión"
        :total-amount="Comisiontotal"
      />
    </div>
  </div>
</template>

<script>
import TableComp from "@/components/TableComp.vue";
import SpinnerComp from "@/components/SpinnerComp.vue";

export default {
  components: {
    TableComp,
    SpinnerComp,
  },
  data() {
    return {
      operador: [],
      venta: [],
      cliente: ["Itzel Larraga Padilla"],
      fecha: [],
      productos: [],
      Comisiontotal: 0,
      loading: true,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.$axios
      .get(`getSalesDetails/${id}`)
      .then((response) => {
        this.operador = response.data.operador;
        this.venta = response.data.venta;
        this.fecha = response.data.fecha;
        this.cliente = response.data.cliente;
        this.productos = response.data.productos.map((item) => ({
          Producto: item.Producto,
          Cantidad: item.Cantidad,
          Total: item.Total,
          Comision: item.Comision,
        }));
        this.Comisiontotal = response.data.totalComision;
        this.loading = false;
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },
};
</script>
