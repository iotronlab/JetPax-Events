<template>
  <v-container fluid class="pa-0">
    <h1 class="text-h2 text-center">Our Team</h1>
    <v-divider class="my-2"></v-divider>
    <section v-if="$fetchState.pending">
      <Loading message="fetching events..." />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <v-col cols="12" lg="10" class="mx-auto">
        <v-row
          ><v-col v-for="(member, i) in team" :key="i" cols="12" lg="4" md="6">
            <v-img
              :src="
                member.image
                  ? member.image
                  : 'https://via.placeholder.com/150/000000/FFFFFF/?text=Member'
              "
              max-height="400"
              contain
            ></v-img>
            <h1 class="mt-4">{{ member.name }}</h1>
            <p>{{ member.desc }}</p>
          </v-col></v-row
        ></v-col
      >
    </section>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      team: null,
      errorMessage: null,
    }
  },
  async fetch() {
    await this.$axios
      .$get('agency/staffs')
      .then((res) => {
        this.team = res.data
      })
      .catch((err) => {
        this.errorMessage = err
        this.$sentry.captureException(new Error(err))
      })
  },
}
</script>
