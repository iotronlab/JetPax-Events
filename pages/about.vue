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
        <h3 class="mb-2">
          Independent Artist Association is an
          <b class="secondary--text">event organizer</b> based in Kolkata,
          India. The growth and development of
          <b class="primary--text">underground artists</b> is the primary focus
          of our organization.
          <br />
          <br />
          IAA started its journey during the difficult period of the Covid-19
          Pandemic. We have put a consistent effort to uplift the performing art
          scene of Kolkata. Our goal is to organize live events for independent
          artists and provide them with a stage to showcase their talents.
        </h3>
        <h3 class="mt-4 primary--text">Our Motive</h3>
        <h3>
          We help deserving artists to grow and generate regular income. Artists
          get proper exposure through paid shows and selling merchandise. New
          enthusiasts can involve themselves more in Performing Arts, and they
          can afford it to be a profession. We provide equal opportunities and
          platforms to every performing art.
        </h3>
        <v-btn text class="mt-4" color="accent">our team</v-btn>
        <v-btn text class="mt-4 font-weight-bold" color="primary"
          >join our network</v-btn
        >
      </v-col></v-row
    >
    <section class="glow-pink text-center mt-8 px-1" id="artforms">
      <h1 class="text-h2">Art Forms</h1>
      <v-divider class="my-2"></v-divider>
      <LazyAboutArtForms />
    </section>
    <section class="glow-red mt-8 px-1" id="team">
      <h1 class="text-h2 text-center mt-8">Our Team</h1>
      <v-divider class="my-2"></v-divider>
      <LazyAboutTeam />
    </section>
  </v-container>
</template>
<script>
export default {}
</script>
<style>
.glow-purple {
  background-image: radial-gradient(75% 50% at left, #3a1d5e, transparent);
}
.glow-pink {
  background-image: radial-gradient(50% 50% at center, #55004c, transparent);
}
.glow-red {
  background-image: radial-gradient(
    70% 50% at center,
    rgba(208, 20, 31, 0.6),
    transparent
  );
}
</style>
