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

    <ais-instant-search :search-client="searchClient" index-name="cities" style="min-width: 40vw;">
      <ais-index index-name="cities" />
      <ais-autocomplete>
        <template v-slot="{ currentRefinement, indices, refine }">

          <!-- <input
            type="search"
            :value="currentRefinement"
            placeholder="Search for a city"
            @input="refine($event.currentTarget.value)"
          > -->

          <!-- <v-text-field
            type="search" rounded outlined :prepend-inner-icon="icons.search"
            :value="currentRefinement" color="success"
            placeholder="Search city"
            @input="refine($event.currentTarget.value)"
          ></v-text-field> -->

          <!-- <input type="text" id="search-input" placeholder="Search cities" /> -->

          <div class="v-input theme--dark v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--placeholder v-text-field--rounded mt-2 mx-4">
            <div class="v-input__control">
              <div class="v-input__slot">
                <div class="v-input__prepend-inner">
                  <div class="v-input__icon v-input__icon--prepend-inner">
                    <span aria-hidden="true" class="v-icon notranslate theme--dark">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg">
                        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <fieldset aria-hidden="true">
                  <legend style="width: 0;">
                    <span class="notranslate"></span>
                  </legend>
                </fieldset>
                <div class="v-text-field__slot">
                  <input
                    type="search"
                    :value="currentRefinement"
                    placeholder="Search a city"
                    @input="refine($event.currentTarget.value)"
                  >
                </div>
              </div>
              <div class="v-text-field__details">
                <div class="v-messages theme--dark">
                  <div class="v-messages__wrapper"></div>
                </div>
              </div>
            </div>
          </div>

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

            <v-list v-for="(index, i) in indices.filter((element, j) => j % 2 == 0)" :key="i" class="mt-n4 pt-0">
              <v-subheader class="overline">{{ index.indexName }}</v-subheader>
              <v-list-item-group v-if="index.hits.length > 0">
                <v-list-item v-for="hit in index.hits" :key="hit.objectID">
                  <v-list-item-content>
                    <v-list-item-title>
                      <ais-highlight attribute="name" :hit="hit" class="text-body-1"/>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
              <v-list-item-group v-else>
                <v-list-item>
                  <v-list-item-content>
                    No results found
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
// import { autocomplete, getAlgoliaResults, getAlgoliaFacets } from '@algolia/autocomplete-js';
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
     startAlgolia() {

    /*  const search = VueInstantSearch({
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
      search.start(); */

      /* var datasets = [
      {
        displayKey: "Cities",
        index: this.searchClient.initIndex("cities"), 
      },
      {
        displayKey: "Artist",
        index: this.searchClient.initIndex("artists"),
      }];

      autocomplete("#search-input", { hint: false }, [{
      source: autocomplete.sources.hits(datasets[0].index, { hitsPerPage: 5 }),
      displayKey: datasets[0].displayKey,
      templates: {
        suggestion: function (suggestion) {

          return suggestion._highlightResult.name.value;
        }}},


      {
        source: autocomplete.sources.hits(datasets[1].index, { hitsPerPage: 5 }),
        displayKey: datasets[1].displayKey,
        templates: {
          suggestion: function (suggestion) {

            return suggestion._highlightResult.name.value;
          } } }]).

      on("autocomplete:selected", function (event, suggestion, dataset) {
          // code
      }); */

    }
  },
};
</script>
