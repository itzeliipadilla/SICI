<template>
  <div class="p-6 -ml-[5px] border border-[#969292]/30 rounded-xl bg-white">
    <table class="w-full table-fixed text-lg bg-white -mt-5 -mb-4">
      <colgroup>
        <col v-for="(header, index) in filteredHeaders" :key="'col-' + index" :style="{ width: columnWidths[index] || 'auto' }"/>
      </colgroup>
      <thead class="bg-white">
        <tr>
          <th v-for="(header, index) in filteredHeaders" :key="'th-' + index" class="py-2 px-4 text-left text-lg font-semibold font-sans text-[#817F7F] border-b border-[#969292]/30">{{ header }}</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(row, rowIndex) in filteredRows" :key="'row-' + rowIndex">
          <td v-for="(colIndex, i) in visibleColumns" :key="'td-' + rowIndex + '-' + i" class="py-2 px-4 text-left align-middle text-lg">{{ row[colIndex] }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="border-t border-[#969292]/30">
          <td class="py-2 px-4 text-left text-lg font-semibold text-[#817F7F]" :colspan="filteredHeaders.length - 2">Total Productos: {{ rows.length }}</td>
          <td class="py-2 px-4 text-left text-lg font-semibold text-black">{{ totalLabel }}:</td>
          <td class="py-2 px-4 text-right text-lg font-semibold text-black pr-10">{{ totalAmount }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableComp",
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    visibleColumnsMobile: {
      type: Array,
      default: () => [],
    },
    columnWidths: {
      type: Array,
      default: () => [],
    },
    defaultRoute: {
      type: String,
      default: "",
    },
    openModal: {
      type: Boolean,
      default: false,
    },
    totalLabel: {
      type: String,
      default: "Total",
    },
    totalAmount: {
      type: String,
      default: "$0.00",
    },
  },

  data() {
    return {
      visibleColumns: [],
    };
  },

  computed: {
    filteredHeaders() {
      return this.headers.filter((_, index) =>
        this.visibleColumns.includes(index)
      );
    },
    filteredRows() {
      return this.rows.map((row) => {
        const values = Object.values(row);
        const filtered = {};
        this.visibleColumns.forEach((index) => {
          filtered[index] = values[index] ?? "";
        });
        return filtered;
      });
    },
  },

  methods: {
    setVisibleColumns() {
      if (this.headers && this.headers.length > 0) {
        this.visibleColumns =
          window.innerWidth < 768
            ? this.visibleColumnsMobile
            : this.headers.map((_, index) => index);
      } else {
        this.visibleColumns = [];
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.setVisibleColumns();
      window.addEventListener("resize", this.setVisibleColumns);
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.setVisibleColumns);
  },
};
</script>
