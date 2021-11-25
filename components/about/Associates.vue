<template>
  <v-container fluid class="pa-0">
    <h1 class="text-h2 text-center">Associates</h1>
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
            v-for="(associate, i) in associates"
            :key="i"
            cols="12"
            lg="4"
            md="6"
          >
            <v-img
              :src="
                associate.image
                  ? associate.image
                  : 'https://via.placeholder.com/150/000000/FFFFFF/?text=Brand'
              "
              max-height="100"
              contain
            ></v-img>
            <h1 class="text-overline text--secondary">{{ associate.name }}</h1>
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
      associates: null,
      errorMessage: null,
    }
  },
  async fetch() {
    await this.$axios
      .$get('agency/associates')
      .then((res) => {
        this.associates = res.data
      })
      .catch((err) => {
        this.errorMessage = err
        this.$sentry.captureException(new Error(err))
      })
  },
}
</script>

