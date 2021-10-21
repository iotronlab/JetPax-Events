<template>
  <v-container>
    <v-row no-gutters justify="center"
      ><v-col cols="12" lg="4" sm="6"
        ><v-img
          :src="require('@/assets/images/about/iaa-hand.png')"
          max-height="700"
          contain
        ></v-img></v-col
      ><v-col cols="12" lg="6" sm="6" class="pa-2">
        <h1 class="text-h1 text-center">About Us</h1>
        <v-divider class="my-2"></v-divider>
        <h3 class="mb-2">
          Independent Artist Association is an
          <b class="secondary--text">event organizer</b> based in Kolkata,
          India. The growth and development of
          <b class="primary--text">underground artists</b> are the primary focus
          of our organization.
          <br />
          <br />
          IAA started its journey during the difficult period of the Covid-19
          Pandemic. We have put a consistent effort to uplift the performing art
          scene of Kolkata. Our goal is to organize live events for independent
          artists and provide them with a stage to showcase their talents.
        </h3>
        <h3>
          <b class="primary--text">Our Motive</b>
          <br />
          We help deserving artists to grow and generate regular income. Artists
          get proper exposure through paid shows and selling merchandise. New
          enthusiasts can involve themselves more in Performing Arts, and they
          can afford it to be a profession. We provide equal opportunities and
          platforms to every performing art.
        </h3>
      </v-col></v-row
    >
    <h1 class="text-h2 text-center mt-8">Art Forms</h1>
    <v-divider class="my-2"></v-divider>
    <v-row no-gutters justify="center">
      <v-col v-for="(art, i) in artForms" :key="i" cols="12" lg="3" sm="4">
        <v-sheet class="text-center pa-2 fill-height"
          ><h2 class="text-button">
            <strong>{{ art.name }}</strong>
          </h2>
          <v-divider class="my-2"></v-divider>
          <p v-for="(artform, l) in art.children" :key="l" class="text-body-1">
            {{ artform }}
          </p>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      artForms: [
        {
          name: 'Music',
          children: [
            'Solo performance',
            'Band performance',
            'Group performance',
            'Instrumental performance',
          ],
        },
        {
          name: 'Literature',
          children: ['Elocution', 'Poetry (General and Slam)', 'Short stories'],
        },
        {
          name: 'Films and Drama',
          children: [
            'Stand Up Comedy',
            'Street play',
            'Theatres',
            'Short Films',
            'Feature Films',
          ],
        },
      ],
    }
  },
}
</script>
