<template>
  <div v-if="!$route.meta.hideNav" class="flex">
    <!-- Barra de navegación-->
    <nav v-if="!$route.meta.hideNav" class="bg-white border-r border-[#969292]/30 h-screen w-64 p-6 fixed left-0 top-0 flex flex-col gap-6 font-sans">
      <!-- Logo -->
      <div class="flex justify-center items-center">
        <img src="@/assets/logo.png" alt="Logo" class="w-[170px] -mt-8" />
      </div>

      <!-- Estadisticas -->
      <RouterLink
        to="/estadisticas"
        :class="{
          'text-white bg-[#00932A]': $route.path.includes('estadisticas'), 
          'text-[#000000]': !$route.path.includes('estadisticas'), 
        }"
        @click="selectOption('estadisticas')"
        class="group text-lg font-medium flex items-center gap-2 p-2 rounded-xl hover:bg-[#00932A] hover:text-white transition-all -mt-8"
      >
        <svg
          class="w-6 h-6 transition-all ml-[17px]"
          :class="{
            'text-white': $route.path.includes('estadisticas'),
            'text-[#00932A] group-hover:text-white': !$route.path.includes('estadisticas'),
          }"
          aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"/>
        </svg>
        Estadísticas
      </RouterLink>

      <!--Unidades -->
      <RouterLink
        to="/unidades"
        :class="{
          'text-white bg-[#00932A]': $route.path.includes('unidades'), 
          'text-[#000000]': !$route.path.includes('unidades'), 
        }"
        @click="selectOption('unidades')"
        class="group text-lg font-medium flex items-center gap-2 p-2 rounded-xl hover:bg-[#00932A] hover:text-white transition-all"
      >
        <svg
          class="w-6 h-6 transition-all ml-[17px]"
          :class="{
            'text-white': $route.path.includes('unidades'),
            'text-[#00932A] group-hover:text-white': !$route.path.includes('unidades'),
          }"
          aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
        </svg>
        Unidades
      </RouterLink>

      <!--Productos -->
      <RouterLink
        to="/productos"
        :class="{
          'text-white bg-[#00932A]': $route.path.includes('productos'), 
          'text-[#000000]': !$route.path.includes('productos'), 
        }"
        @click="selectOption('productos')"
        class="group text-lg font-medium flex items-center gap-2 p-2 rounded-xl hover:bg-[#00932A] hover:text-white transition-all"
      >
        <svg
          class="w-6 h-6 transition-all ml-[17px]"
          :class="{
            'text-white': $route.path.includes('productos'),
            'text-[#00932A] group-hover:text-white': !$route.path.includes('productos'),
          }"
          aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
        </svg>
        Productos
      </RouterLink>

      <!--Operadores -->
      <RouterLink
        to="/operadores"
        :class="{
          'text-white bg-[#00932A]': $route.path.includes('operadores'),
          'text-[#000000]': !$route.path.includes('operadores'), 
        }"
        @click="selectOption('operadores')"
        class="group text-lg font-medium flex items-center gap-2 p-2 rounded-xl hover:bg-[#00932A] hover:text-white transition-all"
      >
        <svg
          class="w-6 h-6 transition-all ml-[17px]"
          :class="{
            'text-white': $route.path.includes('operadores'),
            'text-[#00932A] group-hover:text-white': !$route.path.includes('operadores'),
          }"
          aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
        </svg>
        Operadores
      </RouterLink>

      <!--Gastos -->
      <RouterLink
        to="/gastos"
        :class="{
          'text-white bg-[#00932A]': $route.path.includes('gastos'),
          'text-[#000000]': !$route.path.includes('gastos'), 
        }"
        @click="selectOption('gastos')"
        class="group text-lg font-medium flex items-center gap-2 p-2 rounded-xl hover:bg-[#00932A] hover:text-white transition-all"
      >
        <svg
          class="w-6 h-6 transition-all ml-[17px]"
          :class="{
            'text-white': $route.path.includes('gastos'),
            'text-[#00932A] group-hover:text-white': !$route.path.includes('gastos'),
          }"
          aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
        </svg>
        Gastos
      </RouterLink>

      <!-- Contenedor -->
      <div class="flex flex-col gap-5 mt-auto">
        <!-- Perfil -->
        <RouterLink
          to="/perfil"
          :class="{
            'text-white bg-[#00932A]': $route.path.includes('perfil'),
            'text-[#000000]': !$route.path.includes('perfil'), 
          }"
          @click="selectOption('perfil')"
          class="group text-lg font-medium flex items-center gap-2 p-2 rounded-xl hover:bg-[#00932A] hover:text-white transition-all"
        >
          <svg
            class="w-6 h-6 transition-all ml-[17px]"
            :class="{
              'text-white': $route.path.includes('perfil'),
              'text-[#00932A] group-hover:text-white': !$route.path.includes('perfil'),
            }"
            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>
          Perfil
        </RouterLink>

        <!-- Salir -->
        <RouterLink
          to="/salir"
          :class="{
            'text-white bg-[#00932A]': $route.path.includes('salir'),
            'text-[#000000]': !$route.path.includes('salir'), 
          }"
          @click="selectOption('salir')"
          class="group text-lg font-medium flex items-center gap-2 p-2 rounded-xl hover:bg-[#00932A] hover:text-white transition-all"
        >
          <svg
            class="w-6 h-6 transition-all ml-[17px]"
            :class="{
              'text-white': $route.path.includes('salir'),
              'text-[#00932A] group-hover:text-white': !$route.path.includes('salir'),
            }"
            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
          </svg>
          Salir
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
    };
  },
  methods: {
    selectOption(option) {
      this.selected = option;
    },
  },
};
</script>