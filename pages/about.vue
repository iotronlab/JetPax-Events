<template>
  <v-container>
    <v-row no-gutters justify="center"
      ><v-col cols="12" lg="4" sm="6"
        ><v-img
          :src="require('@/assets/images/about/poster.jpg')"
        ></v-img></v-col
      ><v-col cols="12" lg="6" sm="6" class="pa-2">
        <h1 class="text-h2">about us</h1>
        <v-divider class="my-2"></v-divider> </v-col
    ></v-row>
    <h1 class="text-h2 text-center mt-8">art forms</h1>
    <v-divider class="my-2"></v-divider>
    <v-row no-gutters justify="center">
      <v-col v-for="(art, i) in artForms" :key="i" cols="12" lg="3" sm="4">
        <v-sheet class="text-center pa-2 fill-height"
          ><h2 class="text-button">
            <strong>{{ art.name }}</strong>
          </h2>
          <v-divider class="my-2"></v-divider>
          <p v-for="(artform, i) in art.children" :key="i" class="text-body-2">
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
