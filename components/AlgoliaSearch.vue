<template>
  <v-col cols="12" lg="8" class="mx-auto mt-16">
    <v-row no-gutters justify="center">
      <h1 class="ma-4">{{ greet }}, Friend!</h1>

      {{ searchClient }}

    </v-row>
  </v-col>
</template>

<script>
import { mdiMagnify } from "@mdi/js";
import algoliasearch from 'algoliasearch/lite';

export default {
  data() {
    return {
      greet: "",
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
};
</script>
