<template>
  <div class="p-6 -ml-[5px] border border-[#969292]/30 rounded-xl bg-white">
    <table class="w-full table-fixed text-lg bg-white -mt-5 -mb-4">
      <colgroup>
        <col
          v-for="(width, index) in columnWidths"
          :key="index"
          :style="{ width: width }"
          :class="{ hidden: hiddenColumns.includes(index) }"
        />
      </colgroup>
      <thead class="bg-white">
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="py-2 px-4 text-left text-lg font-semibold font-sans text-[#817F7F] border-b border-[#969292]/30"
            :class="{
              hidden:
                hiddenColumns.includes(index) ||
                !visibleColumns.includes(index),
            }"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(row, index) in rows" :key="index">
          <td
            v-for="(value, key, idx) in row"
            :key="key"
            class="py-2 px-4 text-left align-middle text-lg"
            :class="{
              hidden:
                hiddenColumns.includes(idx) || !visibleColumns.includes(idx),
            }"
          >
            <span v-if="key === 'action'" class="flex justify-center space-x-2">
              <span
                v-for="(action, i) in actions"
                :key="i"
                class="cursor-pointer"
                @click="handleAction(action, row.ID, row)"
                v-html="action.icon"
              ></span>
            </span>
            <span v-else>
              <span
                v-if="key === 'Estado'"
                :class="{
                  'text-[#00932A]': value === 'Activo',
                  'text-[#B9A404]': value === 'Inactivo',
                }"
              >
                {{ value }}
              </span>
              <span v-else>{{ value }}</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableIcons",
  props: {
    headers: Array,
    rows: Array,
    visibleColumnsMobile: Array,
    visibleColumnsDesktop: {
      type: Array,
      default: () => [],
    },
    hiddenColumns: {
      type: Array,
      default: () => [],
    },
    actions: {
      type: Array,
      default: () => [],
    },
    columnWidths: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      visibleColumns: [],
    };
  },

  methods: {
    setVisibleColumns() {
      if (window.innerWidth < 768) {
        this.visibleColumns = this.visibleColumnsMobile.length
          ? this.visibleColumnsMobile
          : this.headers.map((_, i) => i);
      } else {
        this.visibleColumns = this.visibleColumnsDesktop.length
          ? this.visibleColumnsDesktop
          : this.headers.map((_, i) => i);
      }
    },
    navigate(url) {
      if (this.$router) {
        this.$router.push(`${url}`);
      } else {
        window.location.href = `${url}`;
      }
    },
    handleAction(action, id, row) {
      if (action.actionType === "modal") {
        this.$emit("open-modal", { action, id, row });
      } else if (action.actionType === "link") {
        const urlWithId = `${action.url}/${id}`;
        this.navigate(urlWithId);
      } else {
        this.navigate(action.url);
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

<style scoped>
.hidden {
  display: none;
}
</style>
