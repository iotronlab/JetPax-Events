<template>
  <v-col cols="12" lg="8" class="mx-auto">
    <v-row no-gutters justify="center">
      <h1 class="ma-4">{{ greet }}, Friend!</h1>
      <v-text-field
        label="Search amazing events"
        :prepend-inner-icon="icons.search"
        rounded
        outlined
        color="success"
        placeholder="search events, artists, cities"
      ></v-text-field>
    </v-row>
  </v-col>
</template>

<script>
import { mdiMagnify } from '@mdi/js'

export default {
  data() {
    return {
      greet: '',
      icons: {
        search: mdiMagnify,
      },
    }
  },
  mounted() {
    const current = new Date()
    // current.setHours(12);
    const currentHours = current.getHours()
    // console.log(currentHours)
    if (currentHours > 0 && currentHours < 12) this.greet = 'Good Morning'
    else if (currentHours >= 12 && currentHours < 18)
      this.greet = 'Good Afternoon'
    else this.greet = 'Good Evening'
  },
}
</script>
