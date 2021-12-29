<template>
  <v-container>
    <section v-if="$fetchState.pending">
      <Loading :message="'fetching... ' + $route.params.slug" />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <v-container fluid v-html="policy.desc"></v-container>
    </section>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      policy: {},
      errorMessage: null,
    }
  },
  async fetch() {
    await this.$axios
      .$get(`policy/${this.$route.params.slug}`)
      .then((res) => {
        this.policy = res.data
      })
      .catch((err) => {
        this.errorMessage = err
        this.$sentry.captureException(new Error(err))
      })
  },
}
</script>

