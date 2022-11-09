<template>
  <div>
    <v-icon class="mb-2 mr-2" size="30" @click.stop="drawer = !drawer">{{
        icons.filter
    }}</v-icon>
    <v-navigation-drawer v-model="drawer" temporary fixed app right class="ma-2 rounded card-glass visualIndex">
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
            <v-icon>{{
                icons.expand
            }}</v-icon>
          </template>

          <v-checkbox v-for="(option, index) in filter.options" :key="index" v-model="selected[filter.name]"
            class="my-2 mx-4" :label="option.name" :value="option.name" :off-icon="icons.checkboxOff"
            :on-icon="icons.checkboxOn" hide-details multiple>
          </v-checkbox>

        </v-list-group>
      </v-list>

    </v-navigation-drawer>
  </div>
</template>


<script>
import { mdiFilter, mdiChevronDown, mdiCheckboxBlankOutline, mdiCheckboxOutline } from '@mdi/js'

export default {
  name: 'FilterNav',
  props: {
    filterList: {
      type: Array,
      required: true
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
      checkboxOn: mdiCheckboxOutline
    },
  }),
  watch: {
    filterList() {
      this.parseQuery()
    }
  },
  methods: {
    applyFilter() {
      const filters = this.selected
      Object.keys(filters).forEach(key => {
        filters[key] = filters[key].toString();
      });
      this.$router.push({ query: filters })
    },
    reset() {
      this.$router.push(this.$route.path)
    },
    parseQuery() {
      const queryFilters = this.$route.query
      console.log(this.filterList)
      this.filterList.forEach(el => {
        // check if route query filters exists in fetched filters array
        console.log(el)
        if (queryFilters[el.name]) {
          // set filters to selected if exists
          this.selected[el.name] = queryFilters[el.name].split(",")
        }
      });
    }
  },
}
</script>

<style scoped>
.visualIndex {
  z-index: 100;
}

input[type='checkbox'] {
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

