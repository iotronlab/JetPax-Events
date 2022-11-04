<template>
  <v-container fluid class="fill-height align-center">
    <v-col cols="12" sm="8" md="6" lg="4" class="mx-auto">
      <v-card class="nucard" rounded="xl" min-width="40%" min-height="330">
        <v-card-title class="justify-space-between">
          <h1 class="text-button">{{ currentTitle }}</h1>
          <v-avatar color="secondary" size="24" v-text="step"></v-avatar>
        </v-card-title>
        <v-window v-model="step" touchless>
          <v-window-item :value="1">
            <!-- <v-img :src="require('@/assets/images/logo-white.png')" contain alt="artify logo" max-width="100"
              class="mx-auto mb-10" /> -->

            <AuthMobileVerify type="register" @otpsent="otpSentEvent" @success="verifiedContact" />
          </v-window-item>

          <v-window-item :value="2">
            <AuthRegisterForm :contact="contact" />
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { mdiPhone, mdiEmail } from '@mdi/js'
export default {
  name: 'RegisterPage',
  layout: 'auth',
  data: () => ({
    step: 1,
    otpSent: false,
    icons: {
      phone: mdiPhone,
      email: mdiEmail,
    },
    contact: '',
  }),
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'sign-up'
        case 2:
          return 'Create a password'
        default:
          return 'verify'
      }
    },
  },
  methods: {
    otpSentEvent(data) {
      if (data.contact) {
        this.contact = data.contact
      } else if (data.email) {
        this.email = data.email
      }
      this.otpSent = true
    },
    verifiedContact(data) {
      this.contact = data.contact
      this.step = 2
    },
  },
}
</script>
