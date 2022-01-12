<template>
  <section>
    <v-row v-if="displayData.genres" no-gutters align="center">
      <h4 class="text-subtitle-2">Genres</h4>
      <v-chip
        v-for="(genre, n) in displayData.genres"
        :key="n"
        class="ma-1"
        outlined
        small
        >{{ genre }}</v-chip
      >
    </v-row>
    <v-row v-if="displayData.languages" no-gutters align="center">
      <h4 class="text-subtitle-2">Languages</h4>
      <v-chip
        v-for="(language, k) in displayData.languages"
        :key="k"
        class="ma-1"
        outlined
        small
        >{{ language }}</v-chip
      >
    </v-row>

    <v-row
      v-if="displayData.externalLinks"
      no-gutters
      class="mb-2"
      align="center"
    >
      <h4 class="text-subtitle-2">External links</h4>
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

