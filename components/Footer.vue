<template>
  <v-container fluid>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" lg="3">
        <NuxtLink to="/"
          ><v-img
            src="/icon.png"
            max-width="220"
            contain
            class="mx-auto"
            alt="JetPax Logo"
        /></NuxtLink>
        <section class="text-center">
          <v-divider class="my-2" />
          <v-btn class="ma-2">Join our network</v-btn>
          <p class="caption">find us on</p>
          <v-row no-gutters justify="space-around" class="my-4">
            <v-btn v-for="(social, i) in socialLinks" :key="i" icon
              ><v-icon>{{ social.icon }}</v-icon></v-btn
            >
          </v-row>
          <v-divider class="my-2" />
          <v-row no-gutters justify="space-around">
            <p class="caption">
              <v-icon>{{ icons.phone }} </v-icon>&nbsp;+91 7980 123 456
            </p>
            <p class="caption">
              <v-icon>{{ icons.email }}</v-icon
              >&nbsp;contactus@jetpax.org
            </p>
          </v-row>
        </section></v-col
      >
      <v-col cols="12" lg="3">
        <p v-for="(link, i) in navItems" :key="i" class="subtitle-2 mb-1">
          <NuxtLink :to="link.to">{{ link.title }}</NuxtLink>
        </p></v-col
      >
      <v-col cols="12" lg="3">
        <section v-for="(link, i) in helpLinks" :key="i">
          <p class="caption mb-1">
            <NuxtLink :to="link.to">{{ link.title }}</NuxtLink>
          </p>
          <p
            v-for="(subLink, i) in link.children"
            :key="i"
            class="subtitle-2 mb-1"
          >
            <NuxtLink :to="link.to">{{ subLink.title }}</NuxtLink>
          </p>
        </section></v-col
      >
    </v-row>
    <v-row no-gutters>
      <span class="mr-2">&copy; {{ new Date().getFullYear() }}</span>
    </v-row>
  </v-container>
</template>

<script>
import { mdiEmail } from '@mdi/js'
import { mdiPhone } from '@mdi/js'
import { mdiFacebook } from '@mdi/js'
import { mdiInstagram } from '@mdi/js'
import { mdiYoutube } from '@mdi/js'
import { mdiLinkedin } from '@mdi/js'

export default {
  data() {
    return {
      icons: {
        email: mdiEmail,
        phone: mdiPhone,
      },
      navItems: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
        },

        {
          icon: 'mdi-chart-bubble',
          title: 'Influencers',
          to: '/influencers',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Portfolio',
          to: '/portfolio',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'About US',
          to: '/aboutus',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Contact US',
          to: '/aboutus#contact',
        },
      ],
      helpLinks: [
        {
          title: 'Services for Companies',
          to: '/inspire',
          children: [
            {
              title: 'Service A',
              to: '/inspire',
            },
            {
              title: 'Service B',
              to: '/inspire',
            },
          ],
        },
        {
          title: 'Services for Influencers',
          to: '/inspire',
          children: [
            {
              title: 'Service A',
              to: '/inspire',
            },
            {
              title: 'Service B',
              to: '/inspire',
            },
          ],
        },
        {
          title: 'knowlegde base',
          to: '/inspire',
          children: [
            {
              title: 'FAQ for companies',
              to: '/inspire',
            },
            {
              title: 'FAQ for Influencers',
              to: '/inspire',
            },
          ],
        },
      ],
      socialLinks: [
        { icon: mdiFacebook, url: '' },
        { icon: mdiYoutube, url: '' },
        { icon: mdiInstagram, url: '' },
        { icon: mdiLinkedin, url: 'Privacy Policy' },
      ],
    }
  },
}
</script>

<style scoped>
p a:hover {
  color: #6ee7b7;
}
</style>
