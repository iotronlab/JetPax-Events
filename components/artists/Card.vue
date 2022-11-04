<template>
  <!-- <v-container>{{creator}}</v-container> -->

  <v-card rounded="lg" class="card-glass" elevation="6">
    <!-- <v-img
      height="10rem"
      :src="
        creator.bannerImage.url
          ? creator.bannerImage.url
          : require('@/assets/images/index/landing.webp')
      "
      :lazy-src="require('@/assets/images/index/landing.webp')"
      gradient="to top, rgba(0, 0, 0, 0.8) 0%, transparent 70%"
      dark
    >
      <v-row no-gutters class="fill-height" align="end">
        <v-col cols="6"
          ><h4 class="text-subtitle-2 ml-4">{{ creator.name }}</h4></v-col
        >
      </v-row></v-img
    > -->
    <v-row no-gutters>
      <v-col cols="6">
        <h6 class="text-caption ml-4 mt-1" style="
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box !important;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          " v-html="creator.desc"></h6>
      </v-col>
      <v-col cols="6">
        <v-img :src="
          creator.displayImage.url
            ? creator.displayImage.url
            : require('@/assets/images/index/landing.webp')
        " :lazy-src="require('@/assets/images/index/landing.webp')" max-width="150" :aspect-ratio="1 / 1"
          class="mt-n16 ml-auto mr-4 rounded-lg" />
      </v-col>
    </v-row>
    <v-row no-gutters class="pa-2">
      <SocialDetails :display-data="creator" />
    </v-row>
  </v-card>
</template>
<script>
import { mdiFacebook, mdiTwitter, mdiInstagram, mdiYoutube } from '@mdi/js'

export default {
  props: {
    creator: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      icons: {
        Facebook: { link: mdiFacebook, color: '#1877f2' },
        Youtube: { link: mdiYoutube, color: '#FF0000' },
        Instagram: { link: mdiInstagram, color: '#7232bd' },
        Twitter: { link: mdiTwitter, color: '#1DA1F2' },
      },
    }
  },
  computed: {
    formattedFollows() {
      return (num) =>
        Math.abs(num) > 999
          ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
          : Math.sign(num) * Math.abs(num)
    },
  },
}
</script>
