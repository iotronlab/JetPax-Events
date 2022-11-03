<template>
  <v-container>
    <section v-if="$fetchState.pending">
      <h1 class="text-lg-h1 text-h2 text-center">Locations</h1>
      <Loading message="fetching locations..." />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <v-list-item>
          <v-card-title class="text-lg-h4 text-md-h4 text-sm-h6">Change your city</v-card-title>
          <v-spacer></v-spacer>
          <v-btn rounded text><v-icon class="mb-1 mr-4">{{ icons.marker }}</v-icon>
              <span class="hidden-md-and-down">Current location</span>
          </v-btn>
      </v-list-item>
      <v-card tile flat class="ma-4">
          
          <v-row align="center" class="pt-6">
              <v-col cols="12">
              <v-autocomplete
                  outlined :items="City" item-text="name"
                  label="Search all cities" class="ma-4"
              ></v-autocomplete>
              </v-col>
          </v-row>

          <v-row class="mx-auto ma-4 justify-space-around d-flex py-2">
              <v-col v-for="(city, i) in City" :key="i" class="mr-2 text-md-body-1 text-sm-h1" sm="6" md="3">
                  <v-btn text tile class="ma-0 pa-0"><v-icon class="mr-2 mb-1">{{ icons.circle }}</v-icon> <span class="hover-underline-animation">{{ city.name }}</span></v-btn>
              </v-col>
          </v-row>

      </v-card>
    </section>
  </v-container>
</template>

<script>
import {
  mdiCrosshairsGps, mdiCircleMedium,
} from '@mdi/js'

export default {
  data() {
    return {
      mainCols: 3,
      icons: {
        marker: mdiCrosshairsGps,
        circle: mdiCircleMedium,
      },
      City: [],
      errorMessage: null,
    }
  },

  async fetch() {
    try {
      await this.$axios
        .$get('all-cities')
        .then((res) => {
          this.City = res.data
        })
        .catch((err) => {
          this.errorMessage = err
          // 
        })
    } catch (error) {
      // 
    }
  },

  head() {
    return {
      title: 'Location Selector',
    }
  },
}
</script>

<style scoped>
    .hover-underline-animation {
        display: inline-block;
        position: relative;
        color: white;
    }

    .hover-underline-animation::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: white;
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
    }

    .hover-underline-animation:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
</style>
