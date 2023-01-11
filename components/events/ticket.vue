<template>
  <v-container fluid class="card-glass rounded-xl">
    <h1 class="primary--text">{{ ticket.name }}</h1>

    <h2 class="secondary--text">{{ ticket.formattedPrice }}</h2>
    <v-sheet color="transparent" v-html="ticket.desc"> </v-sheet>
    <v-btn
      v-if="event.isBookingOpen == true"
      :to="{
        name: 'slug-booking',
        params: {
          slug: event.url,
        },
      }"
      class="mt-4"
      color="primary"
      >Book now</v-btn
    >
  </v-container>
</template>

<script>
export default {
  props: {
    ticket: {
      required: true,
      type: Object,
    },
    event: {
      required: true,
      type: Object,
    },
  },
}
</script>
