<template>
  <v-container fluid class="text-center">
    <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular
    ><br /><br />
    fetching user...
  </v-container>
</template>
<script>
export default {
  async fetch() {
    await this.$axios
      .$get(process.env.apiUrl + "/sanctum/csrf-cookie", {
        withCredentials: true,
      })
      .then(() => {
        this.$auth.setUserToken(true);
      })
      .catch((err) => {
        this.$sentry.captureException(new Error(err));
      });
  },
};
</script>
