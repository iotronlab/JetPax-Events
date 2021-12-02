<template>
  <v-container class="d-flex justify-center">
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      // token: this.$route.query.token ? this.$route.query.token : null
    }
  },
  mounted() {
    // this.$auth.setToken('local', 'Bearer ' + this.token)
    // this.$auth.setStrategy('laravelSanctum')
    this.getUser()
    // .then((res) => {
    //   console.log(res)
    //   // this.$store.commit('SET_SNACKBAR', {
    //   //   icon: 'mdi-human-greeting',
    //   //   text: 'Welcome ' + this.$auth.user.name,
    //   // })
    //   // return this.$router.push('/')
    //   console.log(this.$auth.user)
    // })
    // .catch((e) => {
    //   console.log(e)
    //   this.$auth.logout()
    //   return this.$router.push(`/?error=unable to get user`)
    // })
  },
  methods: {
    async getUser() {
      console.log('user')
      await this.$axios
        .$get(process.env.apiUrl + '/sanctum/csrf-cookie', {
          withCredentials: true,
        })
        .then(() => {
          this.$auth
            .setUserToken(true)
            .then((result) => {
              this.$router.push('/')
            })
            .catch((err) => {
              this.$router.push('/')
              this.$sentry.captureException(new Error(err))
            })
        })
        .catch((err) => {
          this.$sentry.captureException(new Error(err))
        })
    },
  },
}
</script>
