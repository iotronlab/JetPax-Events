<template>
  <v-container fluid>
    <h1 class="text-h2 text-center">Featured in</h1>
    <v-divider class="my-2"></v-divider>
    <section v-if="$fetchState.pending">
      <Loading message="fetching events..." />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <v-col cols="12" md="9" class="text-center mx-auto">
        <v-row
          ><v-col
            v-for="(mention, i) in mentions"
            :key="i"
            cols="12"
            lg="4"
            md="6"
          >
            <a :href="mention.url" target="_blank">
              <v-img
                :src="
                  mention.image
                    ? mention.image
                    : 'https://via.placeholder.com/150/000000/FFFFFF/?text=Brand'
                "
                max-height="100"
                contain
              ></v-img
            ></a>
            <h1 class="text-overline text--secondary">{{ mention.name }}</h1>
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
      mentions: null,
      errorMessage: null,
    }
  },
  async fetch() {
    await this.$axios
      .$get('agency/mentions')
      .then((res) => {
        this.mentions = res.data
      })
      .catch((err) => {
        this.errorMessage = err
        this.$sentry.captureException(new Error(err))
      })
  },
}
</script>

