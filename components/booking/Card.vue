<template>
  <v-card
    :to="{
      name: 'booking-slug',
      params: {
        slug: booking.uuid,
      },
    }"
    outlined
    class="pa-2 rounded"
    :disabled="expired"
  >
    <p class="caption">booked on {{ booking.updated }}</p>
    <v-row no-gutters>
      <v-col cols="auto">
        <h1 class="caption">
          Status<br />
          <b
            class="text-h6"
            :class="booking.status == 'confirm' ? 'success--text' : 'warning--text'"
            >{{ booking.status }}</b
          >
          <br />
        </h1>
      </v-col>
      <v-col v-if="booking.status === 'pending'" class="ml-2 text-right">
        <h1 class="text-h6">{{ formattedTimeLeft }}</h1>
        <h2 class="caption">
          {{
            expired
              ? `kindly rebook tickets from event page`
              : `complete payment to prevent auto cancellation`
          }}
        </h2>
      </v-col>
    </v-row>

    <h2 class="caption">
      Booking ID <br /><b class="text-h6">{{ booking.uuid }}</b>
      <br />
      Event <br /><b class="text-h6">{{ booking.event.name }}</b>
      <br />
      Event Date <br /><b class="text-h6">{{ booking.event.startOn }}</b>
    </h2>
    <v-divider class="my-2" />
    <v-card-actions>
      <slot></slot>
      <v-btn
        color="primary"
        outlined
        :to="{
          name: 'booking-slug',
          params: {
            slug: booking.uuid,
          },
        }"
        @click.prevent
      >
        Go to Event</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    booking: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timerInterval: null,
      timeLimit: null,
    };
  },
  computed: {
    formattedTimeLeft() {
      if (this.booking.status === "pending" && this.timeLimit > 0) {
        const timeLeft = this.timeLimit;
        // Time calculations minutes and seconds

        const minutes = Math.floor((timeLeft / 60) % 60);
        let seconds = Math.floor(timeLeft % 60);
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        // The output in MM:SS format
        return `${minutes}:${seconds}`;
      }
      return "Expired";
    },
    expired() {
      if (this.booking.status === "pending" && this.timeLimit <= 0) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    if (this.booking.status === "pending") {
      const countDownDate = new Date(this.booking.expires).getTime();
      const now = new Date().getTime();
      // timeLimit in total of seconds
      this.timeLimit = Math.floor((countDownDate - now) / 1000);
      if (this.timeLimit > 0) {
        this.startTimer();
      }
    }
  },

  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timeLimit -= 1;
        if (this.timeLimit <= 0) {
          clearInterval(this.timerInterval);
        }
      }, 1000);
    },
  },
};
</script>
