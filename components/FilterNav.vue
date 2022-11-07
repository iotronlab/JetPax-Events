<template>
  <div>
    <v-icon class="mb-2 mr-2" size="30" @click.stop="drawer = !drawer">{{
        icons.filter
    }}</v-icon>
    {{ selected }}
    <v-navigation-drawer v-model="drawer" temporary fixed app right class="ma-2 rounded card-glass visualIndex">

      <v-list>
        <v-btn @click="applyFilter">Apply filter</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-list-group v-for="(filter, i) in filterList" :key="i" no-action sub-group>
          <template #activator>
            <v-list-item-content>
              <v-list-item-title class="text-left">
                {{ filter.name }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <template #appendIcon>
            <v-icon>{{
                icons.expand
            }}</v-icon>
          </template>
          <v-list dense>
            <v-list-item v-for="(option, index) in filter.options" :key="index" dense>
              <v-checkbox v-model="selected[filter.name]" :label="option.name" :value="option.name"
                :off-icon="icons.checkboxOff" :on-icon="icons.checkboxOn" multiple>
              </v-checkbox>


            </v-list-item>

          </v-list>
          <!-- <v-list-item  link>
            <v-list-item-title class="text-left align-self-left">
              <input type="checkbox" :name="city.name" :value="city.name" />
              <label>{{ city.name }}</label>
            </v-list-item-title>
          </v-list-item> -->
        </v-list-group>
      </v-list>

    </v-navigation-drawer>
  </div>
</template>


<script>
import { mdiFilter, mdiChevronDown, mdiCheckboxBlankOutline, mdiCheckboxOutline } from '@mdi/js'

export default {
  name: 'FilterNav',
  data: () => ({
    drawer: false,
    checkbox: true,
    group: null,
    selected: {},
    filterList: {},
    icons: {
      filter: mdiFilter,
      expand: mdiChevronDown,
      checkboxOff: mdiCheckboxBlankOutline,
      checkboxOn: mdiCheckboxOutline
    },
  }),
  async fetch() {
    await this.$axios
      .$get('filter-options')
      .then((res) => {
        this.filterList = res.data
      })
      .catch((err) => {
        this.errorMessage = err
        this.$sentry.captureException(new Error(err))
      })
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
  methods: {
    applyFilter() {
      const filters = this.selected
      filters.constructor.keys(filters).forEach(key => {
        filters[key] = filters[key].toString();
      });
      this.$router.push({ query: filters })
    },
    reset() {
      this.$router.push(this.$route.path)
    },
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

