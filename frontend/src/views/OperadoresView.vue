<template>
  <div class="p-6 ml-64 min-h-screen flex flex-col overflow-hidden">
    <SpinnerComp v-if="loading" :fullscreen="true" />
    <div v-else>
      <!-- Título -->
      <div>
        <h1 class="text-[#1E5D22] font-semibold text-3xl mb-4 ml-8 mt-7">
          Operadores
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
          @click="showModalOperador = true"
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
          :actions="tableActions"
          :columnWidths="['5%', '20%', '10%', '10%', '5%']"
          @open-modal="openModalHandler"
        />
      </div>

      <!-- Modal registrar operador -->
      <div
        v-if="showModalOperador"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div
          class="relative bg-white p-6 rounded-xl z-10 mx-4 max-w-lg w-[400px]"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-semibold text-[#1E5D22]">
              Registrar Operador
            </h3>
            <button @click="showModalOperador = false" class="text-[#817F7F]">
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
          <form @submit.prevent="registrarOperador">
            <div class="mb-5">
              <label for="operador-name" class="block text-lg font-medium"
                >Nombre:</label
              >
              <input
                id="operador-name"
                v-model="formDataOperador.name"
                type="text"
                class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg focus:outline-none"
                placeholder="Ingrese el nombre completo"
                required
                minlength="5"
                maxlength="40"
              />
            </div>

            <div class="mb-3">
              <label for="operador-phone" class="block text-lg font-medium"
                >Teléfono:</label
              >
              <input
                id="operador-phone"
                v-model="formDataOperador.phone"
                type="tel"
                class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg mb-3 focus:outline-none"
                placeholder="Ingrese un número de contacto"
                required
                minlength="10"
                maxlength="10"
                @input="
                  formDataOperador.phone = formDataOperador.phone.replace(
                    /\D/g,
                    ''
                  )
                "
              />
            </div>

            <div class="flex items-center mb-5">
              <input
                id="activo"
                type="checkbox"
                v-model="formDataOperador.activo"
                class="mr-2 w-4 h-4"
              />
              <label for="activo" class="text-lg">Operador activo</label>
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

      <!-- Modal editar operador -->
      <div
        v-if="showModalEditarOperador"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div
          class="relative bg-white p-6 rounded-xl z-10 mx-4 max-w-lg w-[400px]"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-semibold text-[#1E5D22]">
              Editar Operador
            </h3>
            <button
              @click="showModalEditarOperador = false"
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

          <form @submit.prevent="guardarCambiosOperador">
            <div class="mb-5">
              <label for="edit-name" class="block text-lg font-medium"
                >Nombre:</label
              >
              <input
                id="edit-name"
                v-model="formDataEditarOperador.name"
                type="text"
                class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg focus:outline-none"
                placeholder="Ingrese el nombre completo"
                required
                minlength="5"
                maxlength="40"
              />
            </div>

            <div class="mb-3">
              <label for="edit-phone" class="block text-lg font-medium"
                >Teléfono:</label
              >
              <input
                id="edit-phone"
                v-model="formDataEditarOperador.phone"
                type="tel"
                class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg mb-3 focus:outline-none"
                placeholder="Ingrese un número de contacto"
                required
                minlength="10"
                maxlength="10"
                @input="
                  formDataEditarOperador.phone =
                    formDataEditarOperador.phone.replace(/\D/g, '')
                "
              />
            </div>

            <div class="flex items-center mb-5">
              <input
                id="edit-activo"
                type="checkbox"
                v-model="formDataEditarOperador.activo"
                class="mr-2 w-4 h-4"
              />
              <label for="edit-activo" class="text-lg">Operador activo</label>
            </div>

            <button
              type="submit"
              class="w-full px-6 py-2 bg-[#00932A] text-white rounded-xl font-semibold"
            >
              Guardar
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
      showModalOperador: false,
      showModalEditarOperador: false,
      formDataEditarOperador: {
        name: "",
        phone: "",
        activo: true,
      },

      formDataOperador: {
        name: "",
        phone: "",
        activo: true,
      },
      headers: ["ID", "Nombre", "Estado", "Teléfono", ""],
      rows: [],
      visibleColumnsMobile: [],
      tableActions: [
        {
          icon: `<svg class="w-6 h-6 text-gray-800 dark:text-[#A2A1A8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"/></svg>`,
          actionType: "modal",
        },
        {
          icon: `<svg class="w-6 h-6 text-gray-800 dark:text-[#A2A1A8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/></svg>`,
          actionType: "link",
          url: "/operadores-nomina",
        },
      ],
      busqueda: "",
      seleccionadoId: null,
    };
  },
  mounted() {
    this.$axios
      .get("/operators")
      .then((response) => {
        this.rows = response.data.operators.map((item) => ({
          ID: item.id,
          Nombre: item.name,
          Estado: item.active ? "Activo" : "Inactivo",
          Teléfono: item.phone,
          action: true,
        }));
        this.loading = false;
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },
  methods: {
    registrarOperador() {
      const DatosEnviar = {
        name: this.formDataOperador.name,
        phone: this.formDataOperador.phone,
        active: this.formDataOperador.activo,
        role: "operador",
      };
      console.log("data", DatosEnviar);
      this.$axios
        .post("/register-user", DatosEnviar)
        .then((response) => {
          alert(response.data.message);
          this.showModalOperador = false;
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    openModalHandler({ id }) {
      const row = this.rows.find((r) => r.ID === id);
      if (!row) return;
      this.seleccionadoId = id;
      this.formDataEditarOperador = {
        name: row.Nombre,
        phone: row.Teléfono,
        activo: row.Estado === "Activo",
      };
      this.originalPhone = row.Teléfono;
      this.showModalEditarOperador = true;
    },

    guardarCambiosOperador() {
      const DatosEnviar = {
        name: this.formDataEditarOperador.name,
        phone: this.formDataEditarOperador.phone,
        active: this.formDataEditarOperador.activo ? 1 : 0,
      };
      const phoneForm = (this.formDataEditarOperador.phone || "").trim();
      const phoneOriginal = (this.originalPhone || "").trim();
      if (phoneForm === phoneOriginal) {
        delete DatosEnviar.phone;
      }
      this.$axios
        .put(`/updateOperador/${this.seleccionadoId}`, DatosEnviar)
        .then(() => {
          this.showModalEditarOperador = false;
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error completo:", error.response?.data);
          alert(error.response?.data?.message);
        });
    },
  },

  computed: {
    rowsFiltradas() {
      if (!this.busqueda) {
        return this.rows;
      }

      const texto = this.busqueda.toLowerCase();

      return this.rows.filter((row) => {
        return Object.values(row).some((value) =>
          String(value).toLowerCase().includes(texto)
        );
      });
    },
  },
};
</script>
