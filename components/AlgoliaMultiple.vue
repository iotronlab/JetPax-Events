<template>
  <v-col cols="12" lg="8" class="mx-auto">
    <v-row no-gutters justify="center">
      <h1 class="ma-4">{{ greet }}, Friend!</h1>
      <v-text-field
        label="Search"
        :prepend-inner-icon="icons.search"
        rounded
        class="mx-2 my-2"
        outlined
        v-model="query"
        color="success"
        placeholder="search events, artists, cities"
      ></v-text-field>

      <!-- <v-autocomplete v-model="query" outlined :items="results" label="Search cities" class="ma-4">
      </v-autocomplete> -->

      <!-- <v-autocomplete
            v-model="query"
            :items="results"
            :prepend-inner-icon="icons.search"
            single-line
            label="Search anything"
            attach
            item-text="index"
            :search-input.sync="query"
            >

            <template v-slot:item="data">
                <v-list class="mt-0 pt-0" flat>

                    <v-list-item-group color="primary">
                        <v-subheader class="text-h5">{{ data.index }}</v-subheader>
                        <v-list-item v-for="(hit, j) in data.hits" :key="j">
                        <v-list-item-content>
                            <v-list-item-title v-text="hit.name"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>

                </v-list>
            </template>
            </v-autocomplete> -->
    </v-row>

    <v-list class="mt-0 pt-0" flat>
      <div v-if="this.query.length > 0">
        <div v-for="(item, i) in results" :key="i">
          <v-list-item-group color="primary" v-if="item.hits.length > 0">
            <v-subheader class="text-h5">{{ item.index }}</v-subheader>
            <v-list-item v-for="(hit, j) in item.hits" :key="j">
              <v-list-item-content>
                <v-list-item-title v-text="hit.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-divider
            v-if="i + 1 !== results.length"
            class="mx-4 my-2"
          ></v-divider>
        </div>
      </div>
    </v-list>
  </v-col>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
import algoliasearch from 'algoliasearch/lite'

export default {
  data() {
    return {
      greet: '',
      icons: {
        search: mdiMagnify,
      },
      searchClient: algoliasearch(
        '59EY5CH98E',
        '6ce4114a8c3e029c0e0768c169afd193'
      ),
      query: '',
      results: [],
    }
  },

  watch: {
    query() {
      this.startAlgolia()
    },

    /* search(newVal, oldVal) {
        this.query = ""
    } */
  },

  mounted() {
    const current = new Date()
    const currentHours = current.getHours()
    if (currentHours > 0 && currentHours < 12) this.greet = 'Good Morning'
    else if (currentHours >= 12 && currentHours < 18)
      this.greet = 'Good Afternoon'
    else this.greet = 'Good Evening'

    this.startAlgolia()
  },

  methods: {
    startAlgolia() {
      const queries = [
        {
          indexName: 'cities',
          query: this.query,
          params: {
            hitsPerPage: 3,
          },
        },
        {
          indexName: 'artists',
          query: this.query,
          params: {
            hitsPerPage: 3,
          },
        },
      ]

      this.searchClient.multipleQueries(queries).then(({ results }) => {
        this.results = results
      })
    },
  },
}
</script>
