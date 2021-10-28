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
        :src="require('@/assets/images/events/placeholder.png')"
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
                small
                outlined
                rounded
                color="success"
                >Book Now</v-btn
              >
              <v-btn v-else small text disabled>Booking Closed</v-btn>
              <v-btn class="ml-2" small rounded outlined>Line Up</v-btn>
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="12" lg="5">
          <div class="text-body-2 text-center">
            <v-btn text class="my-2">
              <v-icon left>{{ icon.location }}</v-icon
              >View on map</v-btn
            >
            <v-btn text class="my-2">
              <v-icon left>{{ icon.share }}</v-icon
              >Share</v-btn
            >
            <v-btn text class="my-2">
              <v-icon left>{{ icon.phone }}</v-icon
              >Contact Organizer</v-btn
            >
            <h3 class="my-4">Venue - {{ event.location }}</h3>
            <SocialDetails :display-data="event" /></div
        ></v-col>
        <v-col cols="12" lg="10">
          <p class="mt-4">{{ event.description }}</p></v-col
        >
      </v-row>

      <section>
        <h2 class="text-h2 text-center my-4">Line Up</h2>
        <v-divider class="mb-2"></v-divider>
        <v-row no-gutters justify="center"
          ><v-col
            v-for="(artist, z) in event.artists"
            :key="z"
            cols="12"
            lg="5"
          >
            <ArtistsDetails :artist="artist" /> </v-col
        ></v-row>
      </section>
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
            <EventsTicket :ticket="ticket" /> </v-col
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
        // console.log(err)
      }
    },
  },
}
</script>

