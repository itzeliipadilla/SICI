<template>
  <!-- Fondo -->
  <div
    :style="{
      backgroundImage: 'url(' + require('@/assets/fondo.svg') + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }"
    class="flex justify-center items-center"
  >
    <!-- Contenedor -->
    <div class="bg-white p-8 rounded-lg shadow-lg w-[400px]">
      <!-- Título -->
      <h1 class="text-[27px] font-semibold text-[#1A4D1E] text-center -mb-4">Inicio De Sesión</h1>

      <!-- Logo -->
      <div class="flex justify-center -mb-4">
        <img src="@/assets/logo.png" alt="Logo" class="w-[160px] bject-contain"/>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="submitForm">
        <!-- Teléfono -->
        <div class="mb-5">
          <label for="phone" class="block text-xl font-medium text-black mb-2">Teléfono:</label>
          <input
            id="phone"
            type="tel"
            v-model="formData.phone"
            class="w-full p-2 mt-2 pl-4 border border-[#969292]/30 rounded-xl text-lg"
            placeholder="Ingresa tu teléfono"
            required
            maxlength="10"
            @input="formData.phone = formData.phone.replace(/\D/g, '')"
          />
        </div>

        <!-- Contraseña -->
        <div class="mb-5">
          <label for="password" class="block text-xl font-medium text-black mb-2">Contraseña:</label>
          <input
            id="password"
            type="password"
            v-model="formData.password"
            class="w-full p-2 pl-4 mt-2 border border-[#969292]/30 rounded-xl text-lg"
            placeholder="Ingresa tu contraseña"
            maxlength="20"
            required
          />
        </div>

        <!-- Botón Ingresar -->
        <button type="submit" class="w-full py-2 bg-[#00932A] text-white rounded-xl font-semibold">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        phone: '',
        password: '',
      },
    };
  },
    mounted() {
    if (localStorage.getItem('token')) {
      this.tryAuth();
    }
  },
  methods: {
    submitForm() {
      this.$axios.post('/login', {
        phone: this.formData.phone,
        password: this.formData.password
      }).then(response => {
        const token = response.data.access_token;
        alert(response.data.message);
        localStorage.setItem('token', token);
        this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.$user.role = response.data.user.role;
        this.$router.push("/estadisticas");
      }).catch(error => {
        console.error('Error al iniciar sesión:', error.response);
        alert(error.response.data.message);
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