<template>
  <div class="p-6 ml-64 min-h-screen flex flex-col overflow-hidden">
    <SpinnerComp v-if="loading" :fullscreen="true" />
    <div v-else>
      <!-- Título -->
      <div>
        <p class="text-[#817F7F] text-xl ml-8 mt-5">{{ saludo }}</p>
        <h1 class="text-[#1E5D22] font-semibold text-3xl mb-6 ml-8">
          {{ administrador[0].nombre }}
        </h1>
      </div>

      <!-- Rectángulos estadisticas -->
      <div class="flex gap-14 ml-8 mt-3">
        <div
          v-for="(item, index) in estadisticas"
          :key="index"
          class="bg-white border border-[#969292]/30 rounded-xl w-[349px] h-[100px] p-4"
        >
          <div class="text-base font-medium text-black -mt-2">
            {{ item.titulo }}
          </div>

          <div class="text-2xl font-semibold text-[#1A4D1E] mt-1">
            {{ item.simbolo }}{{ item.valor.toLocaleString() }}
          </div>

          <div class="flex items-center text-sm -ml-1">
            <!-- Ícono segun variacion  -->
            <svg
              v-if="item.variacion >= 0"
              class="w-6 h-6 mr-1 text-green-500 mt-1"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6 mr-1 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 10l4 4 4-4 5 5m0 0h-3.207M20 15v-3.207"
              />
            </svg>

            <!-- Porcentaje -->
            <span
              class="mr-1"
              :class="{
                'text-[#00932A]': item.variacion >= 0,
                'text-[#FF0073]': item.variacion < 0,
              }"
            >
              {{ Math.abs(item.variacion) }}%
            </span>

            <span class="text-[#817F7F]"
              >{{ item.variacion >= 0 ? "Más" : "Menos" }} que el mes
              pasado</span
            >
          </div>
        </div>
      </div>

      <!-- Grafica Ventas y Gastos-->
      <div
        class="bg-white border border-[#969292]/30 rounded-xl w-[1160px] h-[450px] mt-8 ml-8 p-6"
      >
        <div class="flex items-center justify-between mb-4 -mt-1 ml-2 mr-2">
          <h2 class="text-[#1E5D22] font-semibold text-2xl">
            Ventas y Costo de Productos
          </h2>
          <select
            v-model="gastosyventas"
            @change="cargarGastosyVentas"
            class="border border-none focus:outline-none rounded-md px-3 py-1 text-base text-black"
          >
            <option value="hoy">Hoy</option>
            <option value="semana">Esta semana</option>
            <option value="mes">Este mes</option>
            <option value="todo">Todo el tiempo</option>
          </select>
        </div>

        <div class="w-full h-[350px] mt-8">
          <LineaChart :chartData="LinerData" />
        </div>
      </div>

      <div class="flex gap-14 ml-8 mt-8">
        <!-- Grafica Unidades-->
        <div
          class="bg-white border border-[#969292]/30 rounded-xl w-[460px] h-[300px] p-4"
        >
          <div class="flex items-center justify-between mb-2 ml-2 mr-2">
            <h2 class="text-[#1E5D22] font-semibold text-2xl">Unidades</h2>
            <select
              v-model="reparto"
              @change="cargarUnidadesReparto"
              class="border-none focus:outline-none rounded-md px-2 py-1 text-base text-black"
            >
              <option value="hoy">Hoy</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
              <option value="todo">Todo el tiempo</option>
            </select>
          </div>

          <div class="w-[400px] h-[220px] mt-7 ml-2">
            <BarChart :chartData="BarData" />
          </div>
        </div>

        <!-- Top Productos -->
        <div
          class="bg-white border border-[#969292]/30 rounded-xl w-[642px] h-[300px] p-4"
        >
          <div class="flex items-center justify-between mb-2 ml-2 mr-2">
            <h2 class="text-[#1E5D22] font-semibold text-2xl">Top Productos</h2>
            <select
              v-model="topProdct"
              @change="cargarTopProductos"
              class="border-none focus:outline-none rounded-md px-2 py-1 text-base text-black"
            >
              <option value="hoy">Hoy</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
              <option value="todo">Todo el tiempo</option>
            </select>
          </div>

          <!-- Tabla de productos -->
          <table class="w-[590px] mt-8 table-fixed ml-2">
            <thead>
              <tr
                class="text-left text-base text-[#817F7F] border-b border-[#969292]/30"
              >
                <th class="pb-2 w-1/2 font-normal">Nombre</th>
                <th class="pb-2 w-1/2 font-normal">Popularidad</th>
              </tr>
            </thead>

            <tbody class="text-base">
              <tr
                v-for="(producto, index) in productos"
                :key="index"
                class="h-[60px]"
              >
                <td class="pr-4">{{ producto.nombre }}</td>
                <td>
                  <div class="flex items-center gap-4">
                    <div
                      class="w-full h-2 rounded-full"
                      :class="producto.bgFondo"
                    >
                      <div
                        class="h-2 rounded-full"
                        :class="producto.color"
                        :style="{
                          width: producto.popularidad + '%',
                          backgroundColor: producto.color,
                        }"
                      ></div>
                    </div>
                    <span class="text-base" :class="producto.textColor"
                      >{{ producto.popularidad }}%</span
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineaChart from "@/components/LineaChart.vue";
import BarChart from "@/components/BarChart.vue";
import SpinnerComp from "@/components/SpinnerComp.vue";
export default {
  components: {
    LineaChart,
    BarChart,
    SpinnerComp,
  },
  data() {
    return {
      administrador: [{ nombre: "Miguel Ramírez" }],
      saludo: "",
      topProdct: "hoy",
      reparto: "hoy",
      LinerData: {
        labels: [],
        datasets: [],
      },
      BarData: {
        labels: [],
        datasets: [],
      },
      gastosyventas: "hoy",
      productos: [],
      estadisticas: [],
      loading: true,
    };
  },
  created() {
    this.generarSaludo();
  },
  methods: {
    generarSaludo() {
      const hora = new Date().getHours();
      if (hora >= 5 && hora < 12) {
        this.saludo = "¡Buenos días!";
      } else if (hora >= 12 && hora < 19) {
        this.saludo = "¡Buenas tardes!";
      } else {
        this.saludo = "¡Buenas noches!";
      }
    },
    cargarEstadisticas() {
      this.$axios
        .get("/totalEstadisticas")
        .then((response) => {
          this.estadisticas = response.data.estadisticas;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    cargarTopProductos() {
      this.$axios
        .get("/top-productos", {
          params: {
            period: this.topProdct,
          },
        })
        .then((response) => {
          this.productos = response.data.productos;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    cargarUnidadesReparto() {
      this.$axios
        .get("/ventas-reparto", {
          params: {
            period: this.reparto,
          },
        })
        .then((response) => {
          this.BarData = {
            labels: response.data.labels,
            datasets: response.data.datasets,
          };
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    cargarGastosyVentas() {
      this.$axios
        .get("/gastos-ventas", {
          params: {
            period: this.gastosyventas,
          },
        })
        .then((response) => {
          this.LinerData = {
            labels: response.data.labels,
            datasets: response.data.datasets,
          };
          this.loading = false;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
  mounted() {
    this.cargarTopProductos();
    this.cargarEstadisticas();
    this.cargarGastosyVentas();
    this.cargarUnidadesReparto();
    this.interval = setInterval(() => {
      this.cargarEstadisticas();
    }, 3000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>
