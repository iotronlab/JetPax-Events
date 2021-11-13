<template>
  <v-container fluid>
    <h1 class="text-h2 text-center mt-8">Featured in</h1>
    <v-divider class="my-2"></v-divider>
    <section v-if="$fetchState.pending">
      <Loading message="fetching events..." />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <v-row
        ><v-col
          v-for="(member, i) in team"
          :key="i"
          cols="12"
          lg="4"
          md="6"
        ></v-col
      ></v-row>
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
      .$get('team')
      .then((res) => {
        this.team = res
      })
      .catch((err) => {
        this.errorMessage = err
        this.$sentry.captureException(new Error(err))
      })
  },
}
</script>

