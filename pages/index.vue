<template>
  <v-container fluid class="pa-0"
    ><section class="mt-n16"><IndexAnimation /></section>
    <v-row
      no-gutters
      style="position: absolute; top: 0; width: 100%"
      class="text-center"
      justify="center"
      ><v-col cols="12" lg="5" class="mt-16 px-2">
        <h1
          class="text-uppercase mb-4"
          style="letter-spacing: 4px; font-size: 20px"
        >
          Independent Artist Association
        </h1>

        <h2 class="text-h1 mb-6">For the Artists, By the Artists.</h2>
        <h3 class="mb-4">
          Independent Artist Association is a community that believes in equal
          and fair opportunities for all performing artists.
        </h3>
        <v-btn class="mt-1" outlined large disabled
          ><strong>Upcoming events</strong></v-btn
        >
        <v-btn class="mt-1" outlined large to="joinus"
          ><strong>Join Our Network</strong></v-btn
        >
      </v-col>
    </v-row>
    <LazyIndexMentions class="mt-8" />
  </v-container>
</template>
