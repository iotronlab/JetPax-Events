<template>
  <v-container fluid class="pa-0">
    <section v-if="$fetchState.pending">
      <Loading :message="'fetching artist ' + $route.params.slug" />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <v-img
        :aspect-ratio="$vuetify.breakpoint.smAndUp ? 16 / 2.5 : 16 / 9"
        :src="
          artist.bannerImage.url
            ? artist.bannerImage.url
            : require('@/assets/images/index/landing.webp')
        "
        :lazy-src="require('@/assets/images/index/landing.webp')"
      />

      <v-row no-gutters>
        <v-col cols="12" lg="4" md="4">
          <v-container fluid class="d-flex justify-center">
            <v-avatar size="200" class="mt-n16">
              <v-img
                :src="
                  artist.displayImage.url
                    ? artist.displayImage.url
                    : require('@/assets/images/index/landing.webp')
                "
                :lazy-src="require('@/assets/images/index/landing.webp')"
              ></v-img
            ></v-avatar>
          </v-container>
        </v-col>
        <v-col cols="12" lg="4" md="4" order-md="first">
          <v-container fluid class="text-center text-lg-right">
            <Breadcrumb :breadcrumb-items="breadcrumbItems" />
            <h1>
              <!-- {{ artist.display_name }} -->

              {{ artist.name }}
            </h1>
            <h2 class="subtitle-1">{{ artist.location }}</h2>
            <v-btn
              class="mt-2 btn-artist"
              color="primary"
              rounded
              dark
              to="/contactus"
            >
              <v-icon left size="28">{{ icons.email }}</v-icon
              >Enquire</v-btn
            >
          </v-container>
        </v-col>

        <v-col cols="12" lg="4" md="4">
          <v-container fluid class="px-3">
            <SocialDetails :display-data="artist" />
          </v-container>
        </v-col>
      </v-row>

      <v-row no-gutters justify="center" class="glow-purple">
        <v-col cols="12" lg="4" class="pa-2">
          <h5 class="overline mt-2">About the artist</h5>
          <v-sheet
            color="transparent"
            v-html="
              artist.desc ? artist.desc : 'This artist has not updated bio yet.'
            "
          ></v-sheet>
        </v-col>
        <v-col cols="12" lg="6">
          <h5 class="text-h3 text-center mt-2">Gallery</h5>
          <v-divider></v-divider>
          <Gallery :gallery="artist.images"
        /></v-col>
      </v-row>
      <section v-if="artist.videoLinks.length > 0">
        <h5 class="text-h3 text-center mt-2">Music Videos</h5>
        <v-divider></v-divider>
        <v-row no-gutters class="glow-red">
          <ArtistsVideos :videos="artist.videoLinks" />
        </v-row>
      </section>
      <section v-if="artist.events.length > 0" class="glow-pink">
        <h5 class="text-h3 text-center mt-2">Events</h5>
        <v-divider></v-divider>
        <v-row no-gutters justify="center">
          <v-col
            v-for="(event, i) in artist.events"
            :key="i"
            cols="12"
            lg="4"
            class="pa-1"
          >
            <NuxtLink
              :to="{
                name: 'events-slug',
                params: {
                  slug: event.url,
                },
              }"
            >
              <EventsMiniCard :event="event" />
            </NuxtLink> </v-col
        ></v-row>
      </section>
    </section>
  </v-container>
</template>
<script>
import { mdiEmail } from '@mdi/js'

export default {
  data() {
    return {
      dialog: false,
      artist: null,
      errorMessage: null,
      breadcrumbItems: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Artists',
          disabled: false,
          to: '/artists',
          exact: true,
        },
        {
          text: this.$route.params.slug,
          disabled: true,
        },
      ],
      icons: {
        email: mdiEmail,
      },
    }
  },
  async fetch() {
    await this.$axios
      .$get(`artists/${this.$route.params.slug}`)
      .then((res) => {
        this.artist = res.data
      })
      .catch((err) => {
        this.$sentry.captureException(new Error(err))
      })
  },
}
</script>
