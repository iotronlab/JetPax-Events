<template>
  <!-- <v-container>{{creator}}</v-container> -->

  <v-card rounded="lg" class="pb-4 card-glass" elevation="6">
    <v-img
      height="10rem"
      :src="require('@/assets/images/index/landing.webp')"
      gradient="to top, rgba(0, 0, 0, 0.8) 0%, transparent 70%"
      dark
    >
      <v-row no-gutters class="fill-height" align="end">
        <v-col cols="6"
          ><h4 class="text-subtitle-2 ml-4">{{ creator.name }}</h4></v-col
        >
      </v-row></v-img
    >
    <v-row no-gutters>
      <v-col cols="6">
        <h6
          class="text-caption ml-4 mt-1"
          style="
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box !important;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          "
        >
          Bio:
          {{ creator.desc }}
        </h6></v-col
      ><v-col cols="6">
        <v-img
          :src="require('@/assets/images/index/landing.webp')"
          max-width="150"
          :aspect-ratio="1 / 1"
          class="mt-n16 ml-auto mr-4 rounded-lg"
      /></v-col>
    </v-row>
    <h4 class="caption ml-2 mt-2">
      Languages
      <v-chip
        v-for="(lang, i) in creator.languages"
        :key="i"
        small
        label
        outlined
        class="ma-1"
      >
        {{ lang }}</v-chip
      >
    </h4>
    <h4 class="caption ml-2 mt-2">
      Genres
      <v-chip
        v-for="(category, i) in creator.genres"
        :key="i"
        small
        label
        outlined
        class="ma-1"
      >
        {{ category }}</v-chip
      >
    </h4>
    <h4 class="caption ml-2 mt-2">
      Links
      <v-chip
        v-for="(link, i) in creator.externalLinks"
        :key="i"
        class="ma-1"
        dark
        small
        label
        outlined
      >
        <!-- <v-icon left v-if="social.type == 'Instagram'"> mdi-instagram </v-icon> -->
        {{ link }}</v-chip
      >
    </h4>
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
