<template>
  <v-container fluid class="pa-0 glow-purple">
    <v-col cols="12" lg="8" class="mx-auto">
      <h1>Your Account</h1>
      <v-divider class="mb-2"></v-divider>
      Hi, {{ user.name }}
      <!-- {{ user }} -->
      <!-- {{ user }} -->
      <v-row no-gutters>
        <v-col v-for="(account, i) in accountItems" :key="i" class="pa-1">
          <v-card height="100" :to="account.to" class="card-glass">
            <h1 class="text-button text-center pt-4">{{ account.title }}</h1>
          </v-card>
        </v-col>
      </v-row>
      <v-app-bar fixed bottom>
        <v-btn block class="primary" @click="logout">logout</v-btn></v-app-bar
      >
    </v-col>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'auth',

  data() {
    return {
      accountItems: [
        {
          title: 'Profile',
          to: '/',
        },
        {
          title: 'Bookings',
          to: '/booking',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    async logout() {
      await this.$auth
        .logout()
        .then((result) => {})
        .catch((err) => {
          this.$sentry.captureException(new Error(err))
        })
    },
  },
}
</script>

