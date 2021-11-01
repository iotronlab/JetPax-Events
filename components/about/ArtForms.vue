<template>
  <v-col cols="12" md="9" class="card-glass rounded-xl mx-auto">
    <v-row no-gutters justify="center">
      <v-col v-for="(art, i) in artForms" :key="i" cols="12" lg="3" sm="4">
        <h2 class="text-button">
          <strong>{{ art.name }}</strong>
        </h2>
        <v-divider class="my-2"></v-divider>
        <p v-for="(artform, l) in art.children" :key="l" class="text-body-1">
          {{ artform }}
        </p>
      </v-col>
    </v-row>
  </v-col>
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

