<template>
  <div class="p-6 -ml-[5px] border border-[#969292]/30 rounded-xl bg-white">
    <table class="w-full table-fixed text-lg bg-white -mt-5 -mb-4">
      <colgroup>
        <col
          v-for="(width, index) in columnWidths"
          :key="index"
          :style="{ width: width }"
        />
      </colgroup>
      <thead class="bg-white">
        <tr>
          <th
            v-for="(header, index) in filteredHeaders"
            :key="index"
            class="py-2 px-4 text-left text-lg font-semibold font-sans text-[#817F7F] border-b border-[#969292]/30"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="(row, index) in filteredRows"
          :key="index"
          @click="handleRowClick(row)"
          class="cursor-pointer hover:bg-gray-100"
        >
          <td
            v-for="(value, key) in row"
            :key="key"
            class="py-2 px-4 text-left align-middle text-lg"
          >
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    headers: Array,
    rows: Array,
    visibleColumnsMobile: Array,
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
        const filteredRow = {};
        Object.keys(row).forEach((key, index) => {
          if (this.visibleColumns.includes(index)) {
            filteredRow[key] = row[key];
          }
        });
        return filteredRow;
      });
    },
  },
  methods: {
    setVisibleColumns() {
      if (window.innerWidth < 768) {
        this.visibleColumns = this.visibleColumnsMobile;
      } else {
        this.visibleColumns = this.headers.map((_, index) => index);
      }
    },
    navigate(url) {
      if (this.$router) {
        this.$router.push(`${url}`);
      } else {
        window.location.href = `${url}`;
      }
    },
    handleRowClick(row) {
      console.log("Fila clickeada:", row);
      if (this.openModal) {
        this.$emit("open-modal", { row });
      } else if (this.defaultRoute) {
        const url = `${this.defaultRoute}/${row.ID}`;
        this.navigate(url);
      }
    },
  },
  mounted() {
    this.setVisibleColumns();
    window.addEventListener("resize", this.setVisibleColumns);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.setVisibleColumns);
  },
};
</script>
