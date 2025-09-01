<!-- components/BarChart.vue -->
<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Registro de los componentes necesarios de Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            ticks: {
              color: "#000",
            },
          },
          x: {
            ticks: {
              color: "#000",
            },
            grid: {
              display: false,
            },
          },
        },
      },
    };
  },
};
</script>
