<template>
  <div class="p-6 ml-64 min-h-screen flex flex-col overflow-hidden">
    <SpinnerComp v-if="loading" :fullscreen="true" />
    <div v-else>
      <!-- Título -->
      <div>
        <h1 class="text-[#1E5D22] font-semibold text-3xl mb-2 ml-8 mt-5">
          Venta {{ ventaID[0] }} - {{ unidad[0] }}
        </h1>
        <p class="text-[#817F7F] text-xl ml-8">{{ operador[0] }}</p>
      </div>

      <div class="ml-8 mt-11 flex justify-between items-center w-[1160px]">
        <!-- Búsqueda -->
        <div
          class="flex items-center bg-white border border-[#969292]/30 rounded-xl p-2 w-[500px]"
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
            type="text"
            v-model="busqueda"
            placeholder="Buscar..."
            class="ml-3 text-black text-lg placeholder-[#817F7F] bg-transparent focus:outline-none w-full"
          />
        </div>

        <!-- Botón Cargar Stock -->
        <button
          @click="irAProductos"
          class="bg-[#00932A] text-white rounded-xl font-semibold py-2 px-8"
        >
          Cargar Stock
        </button>
      </div>

      <TableComp
        class="w-[1160px] ml-8 mt-9"
        :headers="['Producto', 'Costo', 'Stock', 'Total']"
        :rows="filteredProductos"
        :visibleColumnsMobile="[0, 1]"
        :columnWidths="['40%', '15%', '15%', '9%']"
        total-label="Total"
        :total-amount="`$${totalGeneral.toFixed(2)}`"
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
      loading: true,
      ventaID: [],
      unidad: [],
      operador: [],
      productos: [],
      totalGeneral: 0,
      busqueda: "",
    };
  },
  mounted() {
    let sumaTotal = 0;
    const id = this.$route.params.id;
    this.$axios
      .get(`/getStorage/${id}`)

      .then((response) => {
        const deliveryUnits = response.data.deliveryUnits;
        if (deliveryUnits && deliveryUnits.length > 0) {
          const firstUnit = deliveryUnits[0];
          this.ventaID = [String(firstUnit.delivery_unit.id)];
          this.unidad = [firstUnit.delivery_unit.name];
          this.operador = [firstUnit.delivery_unit.operator.user.name];
          this.productos = deliveryUnits.map((du) => {
            const product = du.product;
            const costo = product.price;
            const stock = du.stock;
            const total = costo * stock;
            sumaTotal += total;
            return {
              Producto: product.name,
              Costo: `$${costo.toFixed(2)}`,
              Stock: stock,
              Total: `$${total.toFixed(2)}`,
            };
          });
        }
        this.totalGeneral = sumaTotal;
        this.loading = false;
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Error al cargar datos");
        this.loading = false;
      });
  },
  computed: {
    filteredProductos() {
      if (!this.busqueda) return this.productos;
      const term = this.busqueda.toLowerCase();
      return this.productos.filter((p) =>
        p.Producto.toLowerCase().includes(term)
      );
    },
  },
  methods: {
    irAProductos() {
      this.$router.push("/productos");
    },
  },
};
</script>
