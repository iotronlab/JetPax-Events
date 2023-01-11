<template>
  <!-- <v-container>{{creator}}</v-container> -->

  <v-card rounded="lg" class="card-glass fill-height" elevation="6">
    <v-img
      :src="
        creator.bannerImage
          ? creator.bannerImage.url
          : require('@/assets/images/index/landing.webp')
      "
      :lazy-src="require('@/assets/images/index/landing.webp')"
      gradient="to top, rgba(0, 0, 0, 0.8) 0%, transparent 70%"
      :aspect-ratio="$vuetify.breakpoint.smAndUp ? 16 / 5 : 16 / 9"
      dark
    >
      <!-- <div class="d-flex align-content-space-between flex-wrap fill-height pa-1">
        <h5 v-if="creator.upcoming_events > 0">Events - {{ creator.upcoming_events }}</h5>
        <h4 class="text-subtitle-1 ml-4">{{ creator.name }}</h4>
      </div> -->
      <div
        class="d-flex align-content-space-between flex-wrap fill-height pa-1"
      >
        <v-row no-gutters style="width: 100%">
          <v-chip class="card-glass" v-if="creator.upcoming_events > 0">
            {{ creator.upcoming_events }} upcoming
          </v-chip>
        </v-row>

        <v-col cols="6" md="7" class="pa-1">
          <h4 class="text-h6">{{ creator.name }}</h4>
        </v-col>
      </div>
    </v-img>
    <v-row no-gutters>
      <v-col class="flex-grow-1 flex-shrink-0 pa-2">
        <h6
          class="text-subtitle-2"
          style="
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box !important;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          "
          v-html="creator.desc"
        ></h6>
      </v-col>
      <v-col class="flex-grow-0 flex-shrink-1 px-2">
        <v-img
          :src="
            creator.displayImage
              ? creator.displayImage.url
              : require('@/assets/images/index/landing.webp')
          "
          :lazy-src="require('@/assets/images/index/landing.webp')"
          max-width="150"
          :aspect-ratio="1 / 1"
          class="mt-n16 rounded-lg"
        />
      </v-col>
    </v-row>
    <v-row no-gutters align="end">
      <v-col class="flex-grow-1 flex-shrink-0 pa-2">
        <SocialDetails :display-data="creator" />
      </v-col>
      <v-col class="flex-grow-0 flex-shrink-1 pa-2">
        <FollowButton
          :creator="creator"
          @subscribed="subscribed"
          @unsubscribed="unsubscribed"
        />
      </v-col>
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
