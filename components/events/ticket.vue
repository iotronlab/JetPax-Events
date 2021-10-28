<template>
  <v-container fluid class="card-glass rounded-xl">
    <h1 class="primary--text">{{ ticket.name }}</h1>

    <h2 class="secondary--text">{{ ticket.price }}</h2>
    <h3 class="text-body-1">{{ ticket.desc }}</h3>
    <v-btn>Book now</v-btn>
  </v-container>
</template>

<script>
export default {
  props: {
    ticket: {
      required: true,
      type: Object,
    },
  },
}
</script>

