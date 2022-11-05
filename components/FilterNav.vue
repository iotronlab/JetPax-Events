<template>
  <div>
      <v-icon @click.stop="drawer = !drawer" class="mb-2 mr-2" size="30">{{icon.filter}}</v-icon>
  <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"> hello </v-app-bar-nav-icon> -->
  <v-navigation-drawer
      v-model="drawer"
      bottom
      temporary
      fixed
      app
      class="ma-2 rounded-xl card-glass elevated-1 visualIndex"
    >
    <div class="pa-3">
    
          <div class="my-2">
              <h2>City</h2>
              <v-row class="my-3">
                <div v-for="city in filterList.city" :key="city.name"  class="d-inline ma-1">
                  <input
                    type="checkbox"
                    :name="city.name"
                    :value="city.name"
                  />
                  <label>{{city.name}}</label>
                </div>
              </v-row>
          </div>
          <hr>
          <div class="my-2">
              <h2>Genre</h2>
              <v-row class="my-3">
                <div v-for="genre in filterList.genre" :key="genre.name"  class="d-inline ma-1">
                  <input
                    type="checkbox"
                    :name="genre.name"
                    :value="genre.name"
                  />
                  <label>{{genre.name}}</label>
                </div>
              </v-row>
          </div>
          <hr>
          <div class="my-2">
              <h2>Language</h2>
              <v-row class="my-2">
                <div v-for="language in filterList.language" :key="language.name"  class="d-inline ma-1">
                  <input
                    type="checkbox"
                    :name="language.name"
                    :value="language.name" 
                  />
                  <label>{{language.name}}</label>
                </div>
              </v-row>
          </div>
          <hr>
          <div class="my-2">
              <h2>Time</h2>
              <v-row class="my-3">
                <div v-for="time in filterList.time" :key="time.name"  class="d-inline ma-1">
                  <input
                    type="checkbox"
                    :name="time.name"
                    :value="time.name"
                  />
                  <label>{{time.name}}</label>
                </div>
              </v-row>
          </div>
                    
</div>
    </v-navigation-drawer>
    </div>
</template>


<script>
import { mdiFilter } from '@mdi/js';
// import axios from 'axios';
  export default {
    name: "FilterNav",
    data: () => ({
      drawer: false,
      checkbox: true,
      group: null,
      filterList: {},
      icon: {
        filter: mdiFilter
      }
    }),
     watch: {
      group () {
        this.drawer = false
      },
    },
    created() {
      return this.fetchFilterList()
    },
    methods: {
      async fetchFilterList () {
        const fetchedList = await this.$axios.$get("filter-options")
        this.filterList = {...fetchedList}
        console.log(this.filterList)
      }
    },
  }
</script>

<style scoped>
.visualIndex {
  z-index: 100;
}

 input[type="checkbox"] {
          accent-color: #ed2f7b;
          cursor: pointer;
        }
</style>

