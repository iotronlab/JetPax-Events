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
          <br />
          <br />
          IAA started its journey during the difficult period of the Covid-19
          Pandemic. We have put a consistent effort to uplift the performing art
          scene of Kolkata. Our goal is to organize live events for independent
          artists and provide them with a stage to showcase their talents.
          Covid-19 Pandemic has affected all the musicians and the artists. As
          lockdown started, it harmed crowd gathering and affected the live
          performances. These were their major source of income. Due to this
          scenario, a group of Local Musicians from Kolkata decided to join the
          movement. It started with a small initiative from 20.03.2021. We
          decided to end talent exploitation. And pushed the mass in buying
          passes and attending gigs. During the initiative, all members decided
          to organize monthly events. Our motive is to generate sustainable
          revenue for the artists across India. We created an independent art
          industry where artists won't pay any cut money.
        </h3>
        <h3 class="mt-4 primary--text">Our Contribution</h3>
        <h3 class="text-body-1">
          We help deserving artists to grow and generate regular income. Artists
          get proper exposure through paid shows and selling merchandise. New
          enthusiasts can involve themselves more in Performing Arts, and they
          can afford it to be a profession. We provide equal opportunities and
          platforms to every performing art.
        </h3>
        <h3 class="mt-4 primary--text">How do we Work?</h3>
        <h3 class="text-body-1">
          In India pseudo consumerism is at its height. This kind of mentality
          of enjoying free Music has affected most of the musicians in India.
          Product Piracy is destroying independent music and Intellectual
          Property Rights. Since the beginning, Indian film music has been
          dominant over the community and people have compromised with such
          dominance. Many splendid and independent musicians leave their passion
          due to less exposure and revenue generation. Covid 19 Pandemic attack
          has affected all the musicians and the artists. As lockdown started,
          it harmed crowd gathering and affected the live performances. These
          were their major source of income.
        </h3>
        <v-btn text class="mt-4" color="accent">our team</v-btn>
        <v-btn text class="mt-4 font-weight-bold" color="primary"
          >join our network</v-btn
        >
      </v-col></v-row
    >
    <section id="artforms" class="glow-pink text-center mt-8 px-1">
      <h1 class="text-h2">Art Forms</h1>
      <v-divider class="my-2"></v-divider>
      <LazyAboutArtForms />
    </section>
    <section id="team" class="glow-red mt-8 px-1">
      <h1 class="text-h2 text-center mt-8">Our Team</h1>
      <v-divider class="my-2"></v-divider>
      <LazyAboutTeam />
    </section>
  </v-container>
</template>
<script>
export default {}
</script>
