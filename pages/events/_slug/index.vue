<template>
  <v-container fluid>
    <section v-if="$fetchState.pending">
      <Loading :message="'fetching event ' + url" />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <v-parallax
        :src="
          event.images[0]
            ? event.images[0].url
            : 'https://via.placeholder.com/150/000000/FFFFFF/?text=Member'
        "
        height="360"
        :alt="event.name"
      ></v-parallax>
      <v-row no-gutters justify="center">
        <v-col cols="12" lg="5">
          <v-container fluid class="card-glass rounded-xl mt-n16">
            <Breadcrumb :breadcrumb-items="breadcrumbItems" />

            <v-divider class="my-2"></v-divider>
            <h1 class="text-center" style="font-size: 2.5rem">
              {{ event.name }}
            </h1>

            <v-row no-gutters class="mb-4" justify="center">
              <v-col cols="auto">
                <v-icon left size="5rem">{{ icon.calender }}</v-icon></v-col
              ><v-col cols="auto">
                <h1
                  class="primary--text pl-2 pt-2"
                  style="border-left: 0.5rem dotted #de3163; font-size: 1.5rem"
                >
                  {{ event.startOn }}
                  <span class="secondary--text"><br />- {{ event.endOn }}</span>
                </h1>
              </v-col></v-row
            >
            <v-divider class="my-2"></v-divider>
            <v-row no-gutters class="mb-2" align="center" justify="center">
              <v-btn
                v-if="event.isBookingOpen == true"
                rounded
                color="primary"
                :to="{
                  name: 'events-slug-booking',
                  params: {
                    slug: event.url,
                  },
                }"
                >Book Now</v-btn
              >
              <v-btn v-else text disabled>Booking Closed</v-btn>
              <v-btn
                class="ml-2"
                rounded
                outlined
                :to="{ hash: 'lineup' }"
                @click.native="scrollTo('#lineup')"
                >Line Up</v-btn
              >
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="12" lg="5">
          <div class="text-body-2 ma-2">
            <v-btn
              text
              class="my-2"
              :href="`https://plus.codes/${event.locationCode}`"
              target="_blank"
            >
              <v-icon left>{{ icon.location }}</v-icon
              >View on map</v-btn
            >
            <v-btn text class="my-2" @click="share">
              <v-icon left>{{ icon.share }}</v-icon
              >Share</v-btn
            >
            <v-btn
              v-if="event.isBookingOpen == true"
              text
              class="my-2"
              :href="`tel:${event.organizerContact}`"
              target="_blank"
            >
              <v-icon left>{{ icon.phone }}</v-icon
              >Contact Organizer</v-btn
            >
            <h3 class="my-4 text-body-1">Venue - {{ event.location }}</h3>
            <SocialDetails :display-data="event" /></div
        ></v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="12" md="5">
          <section id="lineup" class="pt-6">
            <h2 class="text-h2 text-center my-4">Line Up</h2>
            <v-divider class="mb-2"></v-divider>
            <v-row no-gutters justify="center"
              ><v-col
                v-for="(artist, z) in event.artists"
                :key="z"
                cols="12"
                lg="4"
                md="6"
                sm="6"
              >
                <ArtistsDetails :artist="artist" /> </v-col
            ></v-row></section
        ></v-col>

        <v-col cols="12" md="5" class="pa-2">
          <v-sheet color="transparent" v-html="event.description"></v-sheet
        ></v-col>
      </v-row>

      <section>
        <h2 class="text-h2 text-center my-4">Event Passes</h2>
        <v-divider class="mb-2"></v-divider>
        <v-row no-gutters justify="center"
          ><v-col
            v-for="(ticket, z) in event.tickets"
            :key="z"
            cols="12"
            lg="5"
            class="pa-1"
          >
            <EventsTicket :ticket="ticket" :event="event" /> </v-col
        ></v-row>
      </section>
    </section>
  </v-container>
</template>

<script>
import {
  mdiShareVariantOutline,
  mdiMapMarkerStar,
  mdiCalendarHeart,
  mdiPhone,
} from '@mdi/js'

export default {
  data() {
    return {
      event: {},
      errorMessage: null,
      icon: {
        share: mdiShareVariantOutline,
        location: mdiMapMarkerStar,
        calender: mdiCalendarHeart,
        phone: mdiPhone,
      },
      breadcrumbItems: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Events',
          disabled: false,
          to: '/events',
          exact: true,
        },
        {
          text: this.$route.params.slug,
          disabled: true,
        },
      ],
    }
  },

  async fetch() {
    try {
      await this.$axios
        .$get(`events/${this.$route.params.slug}`)
        .then((res) => {
          this.event = res.data
        })
        .catch((err) => {
          this.errorMessage = err
          //  this.$sentry.captureException(new Error(err))
        })
    } catch (error) {
      // this.$sentry.captureException(new Error(error))
    }
  },
  head() {
    return {
      title: this.event.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.event.desc,
        },
      ],
    }
  },
  computed: {
    url() {
      return this.$route.params.slug
    },
  },

  methods: {
    async share() {
      const shareData = {
        title: this.event.name,
        text: this.event.desc,
        url: 'https://www.iaa.org.in' + this.$route.path,
      }
      try {
        await navigator.share(shareData)
      } catch (err) {
        this.$sentry.captureException(new Error(err))
      }
    },
    scrollTo(hash) {
      this.$nextTick(function () {
        const el = document.querySelector(hash)
        if (el) {
          setTimeout(() => {
            return this.$vuetify.goTo(el)
            // if ('scrollBehavior' in document.documentElement.style) {
            //   return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
            // } else {
            //   return window.scrollTo(0, el.offsetTop)
            // }
          }, 500)
        }
      })
    },
  },
}
</script>

