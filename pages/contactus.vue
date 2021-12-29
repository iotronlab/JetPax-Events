<template>
  <v-container>
    <h1 class="text-h2 text-center mb-10">Contact Us</h1>
    <v-row no-gutters justify="center">
      <v-col cols="12" lg="7">
        <ContactForm />
      </v-col>
      <v-col cols="12" lg="4">
        <h2>Get in Touch</h2>
        <v-divider class="mb-4"></v-divider>
        <h2 class="text-body-1">
          If you are an artist looking to collaborate, click here!
        </h2>
        <address>
          Visit us at:<br />
          97, Ajay Nagar, Melabagan Estate,
          <br />Basak Bagan, Kolkata, <br />West Bengal 700074
        </address>
        <h2 class="text-body-1"></h2>
      </v-col> </v-row
  ></v-container>
</template>

<script>
import {
  mdiPhone,
  mdiWhatsapp,
  mdiEmail,
  mdiFacebook,
  mdiInstagram,
  mdiYoutube,
} from '@mdi/js'
export default {
  data() {
    return {
      icons: {
        phone: mdiPhone,
        email: mdiEmail,
        whatsapp: mdiWhatsapp,
        facebook: mdiFacebook,
        instagram: mdiInstagram,
        youtube: mdiYoutube,
      },
    }
  },
  head() {
    return {
      title: 'Contact US',
    }
  },
}
</script>
