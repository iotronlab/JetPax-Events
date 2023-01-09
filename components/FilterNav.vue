<template>
  <v-row no-gutters align="center" justify="center">
    <v-col cols="12" class="d-flex justify-center mb-4">
      <v-btn outlined @click.stop="drawer = !drawer"
        >Filter<v-icon right>{{ icons.filter }}</v-icon>
      </v-btn>
    </v-col>
    {{ selected }}
    <div v-for="(filter, index) in selected" :key="index">
      -{{ index }}-<v-chip
        v-for="(option, i) in filter"
        :key="i"
        class="ma-1 font-weight-black"
        color="primary"
        outlined
        label
        close
        :close-icon="icons.closeChip"
        @click:close="removeFilter(index, option)"
        >{{ option }}
      </v-chip>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      fixed
      app
      right
      class="ma-2 rounded card-glass visualIndex"
    >
      <div class="mt-4">
        <v-btn class="primary" @click="applyFilter">Apply filter</v-btn>
        <v-btn @click="reset" outlined>Reset</v-btn>
      </div>
      <v-list>
        <v-list-group v-for="(filter, i) in filterList" :key="i">
          <template #activator>
            <v-list-item-content>
              <v-list-item-title class="text-left">
                {{ filter.name.charAt(0).toUpperCase() + filter.name.slice(1) }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <template #appendIcon>
            <v-icon>{{ icons.expand }}</v-icon>
          </template>

          <v-checkbox
            v-for="(option, index) in filter.options"
            :key="index"
            v-model="selected[filter.name]"
            class="my-2 mx-4"
            :label="option.name"
            :value="option.name"
            :off-icon="icons.checkboxOff"
            :on-icon="icons.checkboxOn"
            hide-details
            multiple
          >
          </v-checkbox>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-row>
</template>

<script>
import {
  mdiFilter,
  mdiChevronDown,
  mdiCheckboxBlankOutline,
  mdiCheckboxOutline,
  mdiCloseOutline,
} from "@mdi/js";

export default {
  name: "FilterNav",
  props: {
    filterList: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    drawer: false,
    checkbox: true,
    group: null,
    selected: {},
    icons: {
      filter: mdiFilter,
      expand: mdiChevronDown,
      checkboxOff: mdiCheckboxBlankOutline,
      checkboxOn: mdiCheckboxOutline,
      closeChip: mdiCloseOutline,
    },
  }),

  watch: {
    filterList() {
      this.parseQueryFilters();
    },
  },

  methods: {
    applyFilter() {
      const filters = this.selected;
      Object.keys(filters).forEach((key) => {
        if (filters[key].length > 0) {
          filters[key] = filters[key].toString();
        } else {
          this.$delete(filters, key);
        }
      });
      this.$router.push({ query: filters });
    },
    // applyFilter() {
    //   const filters = this.selected
    //   for (const key in filters) {
    //     if (filters[key].length > 0) {
    //       filters[key] = filters[key].toString();
    //       this.filterCount++;
    //     }
    //     else delete filters[key]
    //   }
    //   this.$router.push({ query: filters })
    // },

    removeFilter(filter, option) {
      this.selected[filter] = this.selected[filter].filter(function (element) {
        return element !== option;
      });
      this.applyFilter();
    },

    reset() {
      this.$router.push(this.$route.path);
    },

    parseQueryFilters() {
      const queryFilters = this.$route.query;
      this.selected = {};

      this.filterList.forEach((el) => {
        // check if route query filters exists in fetched filters array
        if (queryFilters[el.name]) {
          // set filters to selected if exists
          // this.selected[el.name] = queryFilters[el.name].split(",")
          this.$set(this.selected, el.name, queryFilters[el.name].split(","));
        }
      });
    },
  },
};
</script>

<style scoped>
.visualIndex {
  z-index: 100;
}

input[type="checkbox"] {
  accent-color: #ed2f7b;
  cursor: pointer;
  transform: scale(1.5);
  margin-right: 0.5rem;
}

.listBorder {
  border-bottom: 5px solid white;
  margin: 0 0.5rem;
  border-radius: 0 0 7px 7px;
}
</style>
