<!-- components/LineaChart.vue -->
<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

export default {
  name: "LineaChart",
  components: { Line },
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
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 0,
            bottom: 0,
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
              maxRotation: 0,
              minRotation: 0,
              autoSkip: false,  // <-- muestra todos los meses sin saltos
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
