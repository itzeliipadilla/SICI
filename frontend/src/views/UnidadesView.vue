<template>
  <div class="p-6 ml-64 min-h-screen flex flex-col overflow-hidden">
    <SpinnerComp v-if="loading" :fullscreen="true" />
    <div v-else>
      <!-- Título -->
      <div>
        <h1 class="text-[#1E5D22] font-semibold text-3xl mb-4 ml-8 mt-7">
          Unidades
        </h1>
      </div>

      <div class="ml-8 mt-6 flex justify-between items-center w-[1160px]">
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
            v-model="busqueda"
            type="text"
            placeholder="Buscar..."
            class="ml-3 text-black text-lg placeholder-[#817F7F] bg-transparent focus:outline-none w-full"
          />
        </div>

        <!-- Botón Registrar -->
        <button
          @click="showModalUnidad = true"
          class="bg-[#00932A] text-white rounded-xl font-semibold py-2 px-8"
        >
          Registrar
        </button>
      </div>

      <!-- Tabla -->
      <div class="w-[1160px] mt-10 ml-8">
        <TableIcons
          :headers="headers"
          :rows="rowsFiltradas"
          :visibleColumnsMobile="visibleColumnsMobile"
          :visibleColumnsDesktop="visibleColumnsDesktop"
          :actions="tableActions"
          :columnWidths="['5%', '20%', '15%', '25%', '5%']"
          :hiddenColumns="[5]"
          @open-modal="openModalHandler"
        />
      </div>

      <!-- Modal registrar unidad -->
      <div
        v-if="showModalUnidad"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div
          class="relative bg-white p-6 rounded-xl z-10 mx-4 max-w-lg w-[400px]"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-semibold text-[#1E5D22]">
              Registrar Unidad
            </h3>
            <button @click="showModalUnidad = false" class="text-[#817F7F]">
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Formulario -->
          <form @submit.prevent="registrarUnidad">
            <div class="mb-5">
              <label for="unidad-name" class="block text-lg font-medium"
                >Nombre de la unidad:</label
              >
              <input
                id="unidad-name"
                v-model="formDataUnidad.name"
                type="text"
                class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg focus:outline-none"
                placeholder="Ingrese el nombre de la unidad"
                required
                minlength="5"
                maxlength="40"
              />
            </div>

            <div class="mb-5">
              <label for="unidad-operador" class="block text-lg font-medium"
                >Operador:</label
              >
              <select
                id="unidad-operador"
                v-model="formDataUnidad.operador"
                class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg focus:outline-none"
              >
                <option value="" disabled selected>
                  Seleccione un operador
                </option>
                <option
                  v-for="operador in operadores"
                  :key="operador.ID"
                  :value="operador.ID"
                >
                  {{ operador.Nombre }}
                </option>
              </select>
            </div>

            <div class="flex items-center mb-5">
              <input
                id="activo"
                type="checkbox"
                v-model="formDataUnidad.activo"
                class="mr-2 w-4 h-4"
              />
              <label for="activo" class="text-lg">Unidad activa</label>
            </div>

            <button
              type="submit"
              class="w-full px-6 py-2 bg-[#00932A] text-white rounded-xl font-semibold"
            >
              Aceptar
            </button>
          </form>
        </div>
      </div>

      <!-- Modal editar unidad -->
      <div
        v-if="showModalEditarUnidad"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div
          class="relative bg-white p-6 rounded-xl z-10 mx-4 max-w-lg w-[400px]"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-semibold text-[#1E5D22]">Editar Unidad</h3>
            <button
              @click="showModalEditarUnidad = false"
              class="text-[#817F7F]"
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Formulario -->
          <form @submit.prevent="guardarCambiosUnidad">
            <div class="mb-5">
              <label for="unidad-name" class="block text-lg font-medium"
                >Nombre de la unidad:</label
              >
              <input
                id="unidad-name"
                v-model="formDataEditarUnidad.name"
                type="text"
                class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg focus:outline-none"
                placeholder="Ingrese el nombre de la unidad"
                required
                minlength="5"
                maxlength="40"
              />
            </div>

            <div class="mb-5">
              <label for="unidad-operador" class="block text-lg font-medium"
                >Operador:</label
              >
              <select
                id="unidad-operador"
                v-model="formDataEditarUnidad.operator_id"
                class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg focus:outline-none"
              >
                <option value="">Sin operador</option>
                <option
                  v-for="operador in operadores"
                  :key="operador.ID"
                  :value="operador.ID"
                >
                  {{ operador.Nombre }}
                </option>
              </select>
            </div>

            <div class="flex items-center mb-5">
              <input
                id="activo"
                type="checkbox"
                v-model="formDataEditarUnidad.activo"
                class="mr-2 w-4 h-4"
              />
              <label for="activo" class="text-lg">Unidad activa</label>
            </div>

            <button
              type="submit"
              class="w-full px-6 py-2 bg-[#00932A] text-white rounded-xl font-semibold"
            >
              Aceptar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableIcons from "@/components/TableIcons.vue";
import SpinnerComp from "@/components/SpinnerComp.vue";

export default {
  components: {
    TableIcons,
    SpinnerComp,
  },
  data() {
    return {
      loading: true,
      showModalUnidad: false,
      showModalEditarUnidad: false,
      unidadSeleccionada: null,
      formDataUnidad: {
        name: "",
        operador: "",
        activo: true,
      },
      formDataEditarUnidad: {
        name: "",
        operator_id: "",
        ID: "",
        activo: true,
      },
      operadores: [],
      headers: ["ID", "Unidad", "Estado", "Operador", "", ""],
      rows: [],
      visibleColumnsMobile: [],
      visibleColumnsDesktop: [0, 1, 2, 3, 4, 5],
      tableActions: [
        {
          icon: `<svg class="w-6 h-6 text-gray-800 dark:text-[#A2A1A8]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/></svg>`,
          actionType: "modal",
        },
        {
          icon: `<svg class="w-6 h-6 text-gray-800 dark:text-[#A2A1A8]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>`,
          actionType: "link",
          url: "/unidades-stock",
        },
      ],
      busqueda: "",
    };
  },
  mounted() {
    this.$axios
      .get("/getUnit")
      .then((response) => {
        this.rows = response.data.deliveryUnits.map((item) => ({
          ID: item.id,
          name: item.name,
          Estado: item.active ? "Activo" : "Inactivo",
          Operador: item.operator?.user?.name || "Sin operador",
          action: true,
          operator_id: item.operator?.id || null,
        }));
        this.loading = false;
      })
      .catch((error) => {
        alert(error.response.data.message);
        this.loading = false;
      });

    this.$axios
      .get("/operators")
      .then((response) => {
        this.operadores = response.data.operators.map((item) => ({
          ID: item.id,
          Nombre: item.name,
        }));
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },
  methods: {
    registrarUnidad() {
      const DatosEnviar = {
        name: this.formDataUnidad.name,
        active: this.formDataUnidad.activo,
      };

      if (this.formDataUnidad.operador) {
        DatosEnviar.operator_id = parseInt(this.formDataUnidad.operador);
      }

      this.$axios
        .post("/registerUnit", DatosEnviar)
        .then((response) => {
          alert(response.data.message);
          this.showModalUnidad = false;
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },

    openModalHandler(data) {
      const unidad = data.row;
      this.formDataEditarUnidad = {
        name: unidad.name,
        ID: unidad.ID,
        activo: unidad.Estado === "Activo",
        operator_id: unidad.operator_id ?? "",
      };
      this.showModalEditarUnidad = true;
    },

    guardarCambiosUnidad() {
      const DatosEnviar = {
        name: this.formDataEditarUnidad.name,
        active: this.formDataEditarUnidad.activo,
        operator_id: this.formDataEditarUnidad.operator_id
          ? parseInt(this.formDataEditarUnidad.operator_id)
          : null,
      };
      this.$axios
        .put(`/updateUnit/${this.formDataEditarUnidad.ID}`, DatosEnviar)
        .then((response) => {
          alert(response.data.message);
          console.log("dataSent: ", DatosEnviar);
          this.showModalEditarUnidad = false;
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },

  computed: {
    rowsFiltradas() {
      if (!this.busqueda) return this.rows;
      return this.rows.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(this.busqueda.toLowerCase())
        )
      );
    },
  },
};
</script>
