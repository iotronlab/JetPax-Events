<template>
  <v-container fluid class="fill-height align-center bg ma-0">
    <v-card class="mx-auto">
      <v-card-title class="justify-space-between">
        <h1 class="text-h6">{{ currentTitle }}</h1>
        <v-avatar
          color="primary"
          class="text-h6"
          size="24"
          v-text="step"
        ></v-avatar>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <div class="ma-2">
            <h2 class="text-overline">verify using</h2>
            <v-btn-toggle v-model="verifyUsing" mandatory shaped>
              <v-btn value="number">
                Mobile Number <v-icon right>{{ icons.phone }}</v-icon>
              </v-btn>
              <v-btn value="email">
                <v-icon left>{{ icons.email }}</v-icon>
                Email
              </v-btn>
            </v-btn-toggle>
          </div>

          <AuthMobileVerify v-if="verifyUsing == 'number'" />
          <AuthEmailVerify v-if="verifyUsing == 'email'" />
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field label="Password" type="password"></v-text-field>
            <v-text-field
              label="Confirm Password"
              type="password"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
              Please enter a password for your account
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">Welcome to Vuetify</h3>
            <span class="text-caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>
    </v-card>
  </v-container>
</template>

<script>
import { mdiPhone, mdiEmail } from '@mdi/js'
export default {
  data: () => ({
    step: 1,
    verifyUsing: 'number',
    icons: {
      phone: mdiPhone,
      email: mdiEmail,
    },
  }),
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'sign-up'
        case 2:
          return 'Create a password'
        default:
          return 'Account created'
      }
    },
  },
}
</script>
<style >
.bg {
  background-image: url('@/assets/images/auth/iaa-bg.webp');
  background-size: cover;
}
</style>
