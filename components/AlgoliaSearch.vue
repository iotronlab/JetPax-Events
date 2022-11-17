<template>
  <v-col cols="12" lg="12" class="mx-auto mt-16">
    <v-row no-gutters justify="center">
      <h1 class="ma-4">{{ greet }}, Friend!</h1>

      <!-- <ais-instant-search :search-client="searchClient" index-name="cities">
        <ais-search-box placeholder="Search cities" />
        <ais-stats />
        <ais-refinement-list attribute="brand" />
        <ais-hits>
          <template v-slot:item="{ item }">
            <p>
              <ais-highlight attribute="name" :hit="item" />
            </p>
            <p>
              <ais-highlight attribute="brand" :hit="item" />
            </p>
          </template>
        </ais-hits>
        <ais-pagination />
      </ais-instant-search> -->

    <ais-instant-search :search-client="searchClient" index-name="cities">
      <ais-index index-name="cities" />
      <ais-autocomplete>
        <template v-slot="{ currentRefinement, indices, refine }">

          <input
            type="search"
            :value="currentRefinement"
            placeholder="Search for a city"
            @input="refine($event.currentTarget.value)"
          >

          <v-text-field
            type="search" rounded outlined :prepend-inner-icon="icons.search"
            :value="currentRefinement" color="success"
            placeholder="Search city"
            @input="refine($event.currentTarget.value)"
          ></v-text-field>

          <div v-if="currentRefinement && currentRefinement.length > 0">

            <!--  <ul v-for="index in indices" :key="index.indexId">
              <li>
                <h3>{{ index.indexName }}</h3>
                <ul>
                  <li v-for="hit in index.hits" :key="hit.objectID">
                    <ais-highlight attribute="name" :hit="hit"/>
                  </li>
                </ul>
              </li>
            </ul> -->

            <v-list dense v-for="(index, i) in indices" :key="i" class="mt-0 pt-0">
              <v-subheader class="overline">{{ index.indexName }}</v-subheader>
              <v-list-item-group>
                <v-list-item v-for="hit in index.hits" :key="hit.objectID">
                  <v-list-item-content>
                    <ais-highlight attribute="name" :hit="hit"/>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>

          </div>
        </template>
      </ais-autocomplete>
    </ais-instant-search>

    </v-row>
  </v-col>
</template>

<script>
import Vue from 'vue';
import { mdiMagnify } from "@mdi/js";
import algoliasearch from 'algoliasearch/lite';
import VueInstantSearch from 'vue-instantsearch';
Vue.use(VueInstantSearch);

export default {
  data() {
    return {
      greet: "",
      SearchCity: "",
      icons: {
        search: mdiMagnify,
      },
      searchClient: algoliasearch(
        '59EY5CH98E',
        '6ce4114a8c3e029c0e0768c169afd193'
      ),
    };
  },
  mounted() {
    const current = new Date();
    // current.setHours(12);
    const currentHours = current.getHours();
    // console.log(currentHours)
    if (currentHours > 0 && currentHours < 12) this.greet = "Good Morning";
    else if (currentHours >= 12 && currentHours < 18) this.greet = "Good Afternoon";
    else this.greet = "Good Evening";
  },

  methods: {
    /* startAlgolia() {
      const search = VueInstantSearch({
        appId: '59EY5CH98E',
        apiKey: '6ce4114a8c3e029c0e0768c169afd193',
        indexName: 'cities',
      });

      search.addWidget({
        init: function(opts) {
          const helper = opts.helper;
          const input = document.querySelector('#searchBox');
          input.addEventListener('input', function(e) {
            helper.setQuery(e.currentTarget.value)
                  .search();
          });
        }
      });

      search.addWidget({
        render: function(opts) {
          const results = opts.results;
          document.querySelector('#hits').innerHTML = results.hits.map(function(h) {
            return '<p>' + h._highlightResult.title.value + '</p>';
          }).join('');
        }
      });
      search.start();
    } */
  },
};
</script>
