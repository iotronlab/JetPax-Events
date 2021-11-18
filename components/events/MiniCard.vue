<template>
  <v-container fluid class="card-glass rounded-xl text-center">
    <h1 style="font-size: 1.5rem">
      {{ event.name }}
    </h1>

    <v-row no-gutters class="mb-4" justify="center">
      <v-col cols="auto">
        <v-icon left size="3rem">{{ icon.calender }}</v-icon></v-col
      ><v-col cols="auto">
        <h1
          class="primary--text pl-2 pt-2"
          style="border-left: 0.5rem dotted #de3163; font-size: 1rem"
        >
          {{ event.startOn }}
          <span class="secondary--text"><br />- {{ event.endOn }}</span>
        </h1>
      </v-col></v-row
    >
    <v-divider class="my-2"></v-divider>
    <h3 class="my-4 text-body-1">
      <v-icon left>{{ icon.location }}</v-icon> Venue -
      {{ event.location }}
    </h3>
  </v-container>
</template>

<script>
import { mdiMapMarkerStar, mdiCalendarHeart } from '@mdi/js'
export default {
  props: {
    event: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      icon: { location: mdiMapMarkerStar, calender: mdiCalendarHeart },
    }
  },
}
</script>

