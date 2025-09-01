<template>
  <div class="p-6 ml-64 min-h-screen flex flex-col overflow-hidden">
    <!-- Título -->
    <div>
      <h1 class="text-[#1E5D22] font-semibold text-3xl font-sans mb-4 ml-8 mt-7">Salir</h1>
    </div>

    <!-- Contenedor principal -->
    <div class="p-6 flex flex-col items-center -mt-7 overflow-hidden">
      <div class="bg-white border border-[#969292]/30 rounded-xl p-6 shadow-sm w-[600px] h-[185px] mt-[27px] flex flex-col items-center text-center">
        <p class="text-2xl font-medium mb-3 text-[#1E5D22]">Cerrar sesión</p>
        <p class="text-black mb-5 text-lg">¿Estás seguro de que deseas salir?</p>
        <button @click="logout" class="bg-[#00932A] text-white px-8 py-2 rounded-xl font-semibold text-base">Aceptar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$axios.delete('/logout').then(
        response => {
          alert(response.data.message);
          localStorage.removeItem('token');
          this.$router.push('/');
        }).catch(error => {
          if (error.response.request.status) {
            localStorage.removeItem('token');
            this.$router.push('/');
          }
          alert(error.response.data.message);
        });
    }
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
