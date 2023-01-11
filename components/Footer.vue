<template>
  <v-container fluid>
    <v-row no-gutters justify="center" class="text-center">
      <v-col cols="12" lg="3">
        <NuxtLink to="/"
          ><v-img
            src="/icon.png"
            max-width="110"
            contain
            class="mx-auto"
            alt="JetPax Logo"
        /></NuxtLink>
        <section class="text-center">
          <v-divider class="my-2" />
          <v-row no-gutters justify="space-around" class="mb-4">
            <a href="tel:+91 7439 790 770">
              <v-icon>{{ icons.phone }} </v-icon>&nbsp;+91 7439 790 770
            </a>
            <a href="mailto:contactus@iaa.org.in">
              <v-icon>{{ icons.email }}</v-icon
              >&nbsp;contactus@iaa.org.in
            </a>
          </v-row>

          <v-btn class="ma-2" to="/joinus" outlined>Join our network</v-btn>
          <p class="text-subtitle-2">find us on</p>
          <v-row no-gutters justify="space-around" class="my-4">
            <v-btn
              v-for="(social, i) in socialLinks"
              :key="i"
              icon
              :href="social.url"
              target="_blank"
              rel="noopener"
              ><v-icon :aria-label="social.name">{{
                social.icon
              }}</v-icon></v-btn
            >
          </v-row>
        </section>
      </v-col>

      <v-col cols="12" lg="3" class="pa-2">
        <p v-for="(link, i) in navItems" :key="i" class="subtitle-1 mb-1">
          <NuxtLink :to="link.to">{{ link.title }}</NuxtLink>
        </p>
      </v-col>
      <v-col cols="12" lg="3">
        <section>
          <p class="caption mb-1">Policies</p>
          <p v-for="(policy, i) in policies" :key="i" class="subtitle-1 mb-1">
            <NuxtLink :to="'/policy/' + policy.url">
              {{ policy.title }}
            </NuxtLink>
          </p>
        </section>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <span class="mr-2">&copy; {{ new Date().getFullYear() }}</span>
    </v-row>
  </v-container>
</template>

<script>
import {
  mdiEmail,
  mdiYoutube,
  mdiPhone,
  mdiInstagram,
  mdiFacebook,
  mdiGoogle,
} from '@mdi/js'

export default {
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      icons: {
        email: mdiEmail,
        phone: mdiPhone,
      },
      policies: [],
      errorMessage: null,
      socialLinks: [
        {
          name: 'Facebook',
          url: 'https://www.facebook.com/jetpaxevents',
          icon: mdiFacebook,
        },
        {
          name: 'Instagram',
          url: 'https://www.instagram.com/independentartistassociation',
          icon: mdiInstagram,
        },
        {
          name: 'Youtube',
          url: 'https://www.youtube.com/channel/UC0Q1WPPZBPwfXj3G7ZtGPUQ',
          icon: mdiYoutube,
        },
        {
          name: 'Google',
          url: 'https://goo.gl/maps/Q6jKTGNSywZPSHj59',
          icon: mdiGoogle,
        },
      ],
    }
  },
  async fetch() {
    await this.$axios
      .$get('policy')
      .then((res) => {
        this.policies = res.data
      })
      .catch((err) => {
        this.errorMessage = err
        this.$sentry.captureException(new Error(err))
      })
  },
}
</script>
