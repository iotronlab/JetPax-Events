<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters justify="center" align="center" class="glow-purple"
      ><v-col cols="12" lg="4" sm="6"
        ><v-img
          :src="require('@/assets/images/about/iaa-hand.png')"
          max-height="700"
          contain
        ></v-img></v-col
      ><v-col cols="12" lg="6" sm="6" class="pa-4">
        <h1 class="text-h1 text-center my-5">About Us</h1>
        <v-divider class="my-2"></v-divider>
        <h3 class="mb-2 text-body-1">
          Independent Artist Association is an
          <b class="secondary--text">event organizer</b> community of performing
          artists based in Kolkata, India. The growth and development of
          <b class="primary--text">underground artists</b> is the primary focus
          of our organization.
        </h3>
        <h3 class="mt-4 primary--text">Our Contribution</h3>
        <h3 class="text-body-1">
          In India pseudo consumerism is at its height. This kind of mentality
          of enjoying free Music has affected most of the musicians in India.
          Product Piracy is destroying independent music and Intellectual
          Property Rights. Since the beginning, Indian film music has been
          dominant over the community and people have preferred playback
          artists, discouraging independent musicians. Many splendid and
          independent musicians leave their passion due to less exposure and
          revenue generation. Covid 19 Pandemic has affected all the musicians
          and artists. As lockdown started, it prohibited crowd gathering and
          live performances affecting their major source of income. Due to this
          scenario, a group of Local Musicians from Kolkata decided to start the
          movement with the first event on 20.03.2021. We pushed the audience
          into buying passes and attending gigs. As our initiative grew, all our
          members decided to organize monthly events. Our motive is to generate
          sustainable revenue for artists across India. We want to create an
          independent art industry where artists won't have to pay any cut
          money. We have decided to end talent exploitation.
        </h3>
        <h3 class="mt-4 primary--text">How do we Work?</h3>
        <h3 class="text-body-1">
          We have put a consistent effort to uplift the performing art scene of
          Kolkata. Our goal is to organize live events for independent artists
          and provide them with a stage to showcase their talents. We help
          deserving artists to grow and generate regular income. Artists get
          proper exposure through paid shows and selling merchandise. New
          enthusiasts can involve themselves more in Performing Arts, and they
          can afford it to be a profession. We provide equal and fair
          opportunities on our platform to every performing Art.
        </h3>
        <v-btn
          text
          class="mt-4"
          color="accent"
          :to="{ hash: 'team' }"
          @click.native="scrollTo('#team')"
          >our team</v-btn
        >
        <v-btn text class="mt-4 font-weight-bold" color="primary" to="/joinus"
          >join our network</v-btn
        >
      </v-col></v-row
    >
    <section id="artforms" class="glow-pink text-center mt-8 px-1">
      <h1 class="text-h2">Art Forms</h1>
      <v-divider class="my-2"></v-divider>
      <LazyAboutArtForms />
    </section>
    <section id="team" class="glow-red pt-8 px-1">
      <LazyAboutTeam />
    </section>
    <section id="associates" class="mt-8 px-1">
      <LazyAboutAssociates />
    </section>
  </v-container>
</template>
<script>
export default {
  methods: {
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
