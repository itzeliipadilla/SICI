<template>
  <div class="p-6 ml-64 min-h-screen flex flex-col overflow-hidden">
    <SpinnerComp v-if="loading" :fullscreen="true" />
    <!-- Título -->
    <div>
      <h1
        class="text-[#1E5D22] font-semibold text-3xl font-sans mb-4 ml-8 mt-7"
      >
        Perfil
      </h1>
    </div>

    <!-- Contenedor principal -->
    <div class="p-6 flex flex-col items-center -mt-7 overflow-hidden">
      <div
        class="bg-white border border-[#969292]/30 rounded-lg p-6 shadow-sm w-[600px] h-[105px] mt-[27px] flex flex-col items-center text-center"
      >
        <p
          class="text-lg !text-2xl text-[#1E5D22] font-semibold font-sans -mt-[6px]"
        >
          {{ perfil.name }}
        </p>
        <p class="text-lg text-[#000000] mt-2 font-sans">
          {{ perfil.phone }}
        </p>
      </div>

      <div class="flex items-center mt-10 w-[600px] mx-auto">
        <h2 class="text-[#1E5D22] font-semibold text-[26px] font-sans">
          Administradores
        </h2>
        <button
          class="bg-[#00932A] text-white py-2 px-6 font-semibold text-base rounded-xl focus:outline-none ml-auto"
          @click="showModal = true"
        >
          Registrar
        </button>
      </div>

      <!-- Modal registrar administrador-->
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="relative bg-white p-6 rounded-xl z-10 mx-4 max-w-lg w-[400px]"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-semibold text-[#1E5D22]">
              Registrar Administrador
            </h3>
            <button
              @click="showModal = false"
              class="text-[#817F7F] dark:text-white"
            >
              <svg
                class="w-6 h-6 text-[#817F7F]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
          </div>

          <!-- Formulario -->
          <form @submit.prevent="submitForm">
            <div class="mb-5">
              <label for="name" class="block text-lg font-medium"
                >Nombre:</label
              >
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg"
                placeholder="Ingrese el nombre completo"
                required
                minlength="5"
                maxlength="40"
              />
            </div>

            <div class="mb-5">
              <label for="phone" class="block text-lg font-medium"
                >Teléfono:</label
              >
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg mb-3"
                placeholder="Ingrese un número de contacto"
                required
                minlength="10"
                maxlength="10"
                @input="formData.phone = formData.phone.replace(/\D/g, '')"
              />
            </div>

            <!-- Botón Aceptar -->
            <div class="flex">
              <button
                type="submit"
                class="px-6 py-2 bg-[#00932A] text-white rounded-xl font-semibold w-[370px]"
                @click="registrarAdministrador"
              >
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- TableIcons -->
      <div class="w-[591px] mt-10 ml-1">
        <TableIcons
          :headers="headers"
          :rows="rows"
          :visibleColumnsMobile="visibleColumnsMobile"
          :actions="tableActions"
          :columnWidths="['12%', '32%', '22%', '10%']"
          @open-modal="openModalHandler"
        />
      </div>
    </div>

    <!-- Modal editar administrador -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        class="absolute inset-0 bg-black opacity-50"
        @click="isModalOpen = false"
      ></div>

      <div
        class="relative bg-white p-6 rounded-xl z-10 mx-4 max-w-lg w-[400px]"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-semibold text-[#1E5D22]">
            Editar Administrador
          </h3>
          <button
            @click="isModalOpen = false"
            class="text-[#817F7F] dark:text-white"
          >
            <svg
              class="w-6 h-6 text-[#817F7F]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
        </div>

        <!-- Formulario -->
        <form @submit.prevent="submitForm">
          <div class="mb-5">
            <label for="name" class="block text-lg font-medium">Nombre:</label>
            <input
              id="name"
              v-model="formDataEditar.name"
              type="text"
              class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg"
              required
              minlength="5"
              maxlength="40"
              placeholder="Ingrese el nombre completo"
            />
          </div>

          <div class="mb-5">
            <label for="phone" class="block text-lg font-medium"
              >Teléfono:</label
            >
            <input
              id="phone"
              v-model="formDataEditar.phone"
              type="tel"
              class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg"
              required
              minlength="10"
              maxlength="10"
              placeholder="Ingrese un número de contacto"
              @input="
                formDataEditar.phone = formDataEditar.phone.replace(/\D/g, '')
              "
            />
          </div>

          <div class="mb-5">
            <label for="password" class="block text-lg font-medium"
              >Contraseña:</label
            >
            <input
              id="password"
              v-model="formDataEditar.password"
              type="password"
              class="w-full p-2 pl-4 border border-[#969292]/30 rounded-xl mt-4 text-lg mb-3"
              required
              minlength="6"
              maxlength="20"
              placeholder="Ingrese una nueva contraseña"
            />
          </div>

          <!-- Botón Aceptar -->
          <div class="flex">
            <button
              type="submit"
              class="px-6 py-2 bg-[#00932A] text-white rounded-xl font-semibold w-[370px]"
              @click="editarAdministrador"
            >
              Aceptar
            </button>
          </div>
        </form>
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
      perfil: {},
      headers: ["ID", "Nombre", "Teléfono", ""],
      rows: [],
      visibleColumnsMobile: [],
      tableActions: [
        {
          icon: `<svg class="w-6 h-6 text-gray-800 dark:text-[#A2A1A8]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"/></svg>`,
          actionType: "modal", // Icono abrirá la modal
        },
      ],
      showModal: false,
      isModalOpen: false,
      modalData: null,
      formData: {
        name: "",
        phone: "",
        role: "Administrador",
        active: true,
      },
      formDataEditar: {
        name: "",
        phone: "",
        password: "",
      },
      seleccionadoId: "",
    };
  },

  mounted() {
    this.$axios
      .get("/user")
      .then((response) => {
        this.perfil = response.data;
      })
      .catch((error) => {
        alert(error.response.data.message);
      });

    this.$axios
      .get("/get-users-admin")
      .then((response) => {
        this.rows = response.data.users;
      })
      .catch((error) => {
        alert(error.response.data.message);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    openModalHandler(payload) {
      console.log("Payload recibido:", payload);
      const { id, row } = payload;
      //console.log(id, row);
      this.seleccionadoId = id;
      this.formDataEditar = {
        name: row.Nombre,
        phone: row.Telefono,
      };
      this.modalData = payload;
      this.isModalOpen = true;
    },

    registrarAdministrador() {
      this.$axios
        .post("/register-user", this.formData)
        .then((response) => {
          alert(response.data.message);
          this.showModal = false;
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    editarAdministrador() {
      const DatosEnviar = {
        name: this.formDataEditar.name,
        phone: this.formDataEditar.phone,
      };
      const phoneForm = (this.formDataEditar.phone || "").trim();
      const phoneOriginal = (this.originalPhone || "").trim();
      if (phoneForm === phoneOriginal) {
        delete DatosEnviar.phone;
      }
      this.$axios
        .put(`/update-user/${this.seleccionadoId}`, DatosEnviar)
        .then(() => {
          this.isModalOpen = false;
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error completo:", error.response?.data);
          alert(error.response?.data?.message);
        });
    },
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
