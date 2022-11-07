<template>
  <div>
    <v-icon class="mb-2 mr-2" size="30" @click.stop="drawer = !drawer">{{
      icon.filter
    }}</v-icon>
    <v-navigation-drawer
      v-model="drawer"
      bottom
      temporary
      fixed
      app
      right
      class="ma-2 rounded-xl card-glass elevated-1 visualIndex"
    >
      <v-list>
        <v-list-group :value="false" no-action sub-group class="listBorder">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="text-left">
                <h3>City</h3>
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="city in filterList.city" :key="city.name" link>
            <v-list-item-title class="text-left align-self-left">
              <input type="checkbox" :name="city.name" :value="city.name" />
              <label>{{ city.name }}</label>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group :value="false" no-action sub-group class="listBorder">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="text-left">
                <h3>Genre</h3>
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="genre in filterList.genre" :key="genre.name" link>
            <v-list-item-title class="text-left align-self-left">
              <input type="checkbox" :name="genre.name" :value="genre.name" />
              <label>{{ genre.name }}</label>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group :value="false" no-action sub-group class="listBorder">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="text-left">
                <h3>Language</h3>
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="language in filterList.language" :key="language.name" link>
            <v-list-item-title class="text-left align-self-left">
              <input type="checkbox" :name="language.name" :value="language.name" />
              <label>{{ language.name }}</label>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group :value="false" no-action sub-group class="listBorder">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="text-left">
                <h3>Time</h3>
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="time in filterList.time" :key="time.name" link>
            <v-list-item-title class="text-left align-self-left">
              <input type="checkbox" :name="time.name" :value="time.name" />
              <label>{{ time.name }}</label>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
import { mdiFilter } from '@mdi/js'
// import axios from 'axios';
export default {
  name: 'FilterNav',
  data: () => ({
    drawer: false,
    checkbox: true,
    group: null,
    filterList: {},
    icon: {
      filter: mdiFilter,
    },
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
  created() {
    return this.fetchFilterList()
  },
  methods: {
    async fetchFilterList() {
      const fetchedList = await this.$axios.$get('filter-options')
      this.filterList = { ...fetchedList }
      // console.log(this.filterList)
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
  transform : scale(1.5);
  margin-right: 0.5rem;
}

.listBorder {
  border-bottom: 5px solid white;
  margin: 0 0.5rem;
  border-radius: 0 0 7px 7px;

}
</style>

