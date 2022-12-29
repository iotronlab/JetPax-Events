<template>
  <v-container fluid class="pa-0">
    <section>
      <v-container>
        <v-row no-gutters justify="center" align="center" class="mt-14">
          <v-col cols="12" lg="6" class="pa-1">
            <div style="width: 25vmax">
              <h1 style="font-size: 2vmax">Setup your independent event hassle-free</h1>
              <p>
                Jetpax Event is an independent Event platform for all. From a local artist
                to a corporate company, one can create a hassle free event through our web
                portal.
              </p>
            </div>
          </v-col>
          <v-col class="d-flex justify-center pa-1" cols="12" lg="6">
            <v-btn outlined>LIST YOUR EVENT</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <div>
        <v-container class="grey lighten-5">
          <v-row no-gutters style="height: 53vmax">
            <v-col
              v-for="align in alignments"
              :key="align"
              :align-self="align.align"
              cols="12"
              lg="4"
            >
              <v-card
                class="d-flex flex-column align-center pa-2 rounded ma-5"
                outlined
                tile
                height="20vmax"
                color="white"
                light
              >
                <h1 style="font-size: 1.5vmax">{{ align.title }}</h1>
                <p style="font-size: 1vmax">
                  {{ align.desciption }}
                </p>
                <v-spacer></v-spacer>
                <v-img
                  :src="align.url"
                  class="rounded"
                  height="100px"
                  width="100px"
                ></v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </section>

    <section>
      <v-container class="d-flex flex-column align-center mt-10">
        <h1 style="font-size: 3vmax" class="text-decoration-underline pa-5">Feature</h1>
        <v-row
          v-for="item in featuredata"
          :key="item"
          no-gutters
          justify="center"
          align="center"
          class="mt-14"
        >
          <v-col cols="12" lg="6" class="pa-1 d-flex">
            <v-row>
              <v-col>
                <h2>{{ item[0].name }}</h2>
                <p>
                  {{ item[0].desciption }}
                </p>
              </v-col>
              <v-col>
                <v-img
                  height="12vmax"
                  width="12vmax"
                  :src="item[0].url"
                  class="rounded"
                ></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="6" class="pa-1 d-flex">
            <v-row>
              <v-col>
                <h2>{{ item[1].name }}</h2>
                <p>
                  {{ item[1].desciption }}
                </p>
              </v-col>
              <v-col>
                <v-img
                  height="12vmax"
                  width="12vmax"
                  :src="item[1].url"
                  class="rounded"
                ></v-img>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section>
      <v-container class="my-15">
        <h1 style="font-size: 3vmax" class="text-decoration-underline pa-5 text-center">
          List all kind of Events
        </h1>
        <p class="text-center">
          readable content of a page when looking at its layout. The point of using Lorem
          Ipsum is that it has a more-or-less normal distribution of letters, as opposed
          to using 'Content here any desktop publishing packages and web page editors now
          use Lorem
        </p>
        <v-row>
          <v-col cols="12" lg="3" v-for="item in allKindEvent" :key="item">
            <v-card
              height="14vmax"
              width="18vmax"
              :class="item.borderradius"
              light
              style="
                color: violet;
                background: linear-gradient(
                  129.29deg,
                  #f2467b 17.48%,
                  #8732af 48.51%,
                  #0a4194 81.61%
                );
              "
            >
              <h1 class="ma-4 text-bottom">{{ item.title }}</h1>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    alignments: [
      {
        align: "end",
        title: "01 Setup Your Event",
        desciption:
          "Create and list latest events in town on our extensive platform. Our platform is designed from an organizers' perspective. Create tickets, generate reports and sell event passes.",
        url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
      {
        align: "center",
        title: "02 Ticketing System",
        desciption:
          "Manage and co-ordinate with your audience and get your ticket sales confirmed.",
        url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
      {
        align: "start",
        title: "Track Sales",
        desciption:
          "Export sales report along with guest details for your event day management.",
        url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
      {
        align: "end",
        title: "04 Event Optimazation",
        desciption:
          "Get your event listed and optimized on Google and google based platforms! Potential guests can easily access details of your event on the Internet.",
        url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
      {
        align: "center",
        title: "05 Event Branding",
        desciption:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a.",
        url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
      {
        align: "start",
        title: "06 Easy Event Setup",
        desciption:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a.",
        url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
    ],

    featuredata: [
      [
        {
          name: "Management",
          desciption:
            "Create and manage your Event and guests through a single dashboard and multiple management account access",
          url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
        {
          name: "Customer Data",
          desciption:
            "Access and Export your customer and audience data base for external use.",
          url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
      ],
      [
        {
          name: "Notification",
          desciption:
            " Notify Event details to your guests through email and text message.",
          url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
        {
          name: "Event Safety",
          desciption: "Keep your event safe and sound by specifying safety measures.",
          url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
      ],
      [
        {
          name: "Media ans Gallery",
          desciption:
            "Attract your targeted crowd and engage them with your event through Images and videos.",
          url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
        {
          name: "Payout",
          desciption:
            "Curate your event with us and collect payment within 5 days after an event.",
          url: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        },
      ],
    ],
    allKindEvent: [
      {
        title: "",
        color: "white",
        borderradius: "rounded-tr-xl",
      },
      {
        title: "",
        color:
          "linear-gradient(129.29deg, #F2467B 17.48%, #8732AF 48.51%, #0A4194 81.61%)",
        borderradius: "rounded-bl-xl",
      },
      {
        title: "Venues And Events Organizers",
        color: "white",
        borderradius: "rounded-br-xl",
      },
      {
        title: "Venues And Events Organizers",
        color:
          "linear-gradient(129.29deg, #F2467B 17.48%, #8732AF 48.51%, #0A4194 81.61%)",
        borderradius: "rounded-tr-xl",
      },
      {
        title: "Artists And Creators",
        color:
          "linear-gradient(129.29deg, #F2467B 17.48%, #8732AF 48.51%, #0A4194 81.61%)",
        borderradius: "rounded-tr-xl",
      },
      {
        title: "Venues And Events Organizers",
        color:
          "linear-gradient(129.29deg, #F2467B 17.48%, #8732AF 48.51%, #0A4194 81.61%)",
        borderradius: "rounded-tl-xl",
      },
      {
        title: "",
        color:
          "linear-gradient(129.29deg, #F2467B 17.48%, #8732AF 48.51%, #0A4194 81.61%)",
        borderradius: "rounded-bl-xl",
      },
      {
        title: "Venues And Events Organizers",
        color: "white",
        borderradius: "rounded-tl-xl",
      },
    ],
  }),
};
</script>

<style scoped>
.featurecard {
  width: 4vmax;
  height: 4vmax;
  background-color: white;
}
</style>
