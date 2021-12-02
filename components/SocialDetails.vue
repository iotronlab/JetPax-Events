<template>
  <section>
    <v-row v-if="displayData.genres" no-gutters class="mb-2" align="center">
      <h4 class="caption">Genres</h4>
      <v-chip
        v-for="(genre, n) in displayData.genres"
        :key="n"
        class="ma-1"
        outlined
        >{{ genre }}</v-chip
      >
    </v-row>
    <v-row v-if="displayData.languages" no-gutters class="mb-2" align="center">
      <h4 class="caption">Languages</h4>
      <v-chip
        v-for="(language, k) in displayData.languages"
        :key="k"
        class="ma-1"
        outlined
        >{{ language }}</v-chip
      >
    </v-row>
    <h4 class="caption">External links</h4>
    <v-row
      v-if="displayData.externalLinks"
      no-gutters
      class="mb-2"
      align="center"
    >
      <v-btn
        v-for="(link, l) in displayData.externalLinks"
        :key="l"
        class="ma-1"
        :color="link.color"
        :href="link.url"
        small
        target="_blank"
        >{{ link.site }}</v-btn
      >
    </v-row>
  </section>
</template>

<script>
export default {
  props: {
    displayData: {
      required: true,
      type: Object,
    },
  },
}
</script>

