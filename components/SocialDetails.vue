<template>
  <section>
    <v-row
      v-if="displayData.genres"
      no-gutters
      class="mb-2"
      align="center"
      justify="center"
    >
      <h4>Genres</h4>
      <v-chip
        v-for="(genre, n) in displayData.genres"
        :key="n"
        class="ml-2"
        outlined
        >{{ genre }}</v-chip
      >
    </v-row>
    <v-row
      v-if="displayData.languages"
      no-gutters
      class="mb-2"
      justify="center"
      align="center"
    >
      <h4>Languages</h4>
      <v-chip
        v-for="(language, k) in displayData.languages"
        :key="k"
        class="ml-2"
        outlined
        >{{ language }}</v-chip
      >
    </v-row>
    <v-row
      v-if="displayData.external_links"
      no-gutters
      class="mb-2"
      justify="center"
      align="center"
    >
      <h4>Socials</h4>
      <v-chip
        v-for="(social, l) in displayData.external_links"
        :key="l"
        class="ml-2"
        outlined
        >{{ social }}</v-chip
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

