<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <div class="display-1 font-weight-bold">Judul</div>
      <br />

      <v-card outlined tile class="ma-0" color="#B7E1DF">
        <v-img width="500" height="300"></v-img>

        <h3>Deskripsi:</h3>
      {{banners.name}} 
        <p>hasbfajsfb</p>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    banners: [],
  }),
  methods: {
    showBanners() {
      this.axios
        .get("/master/v3/mst_banner", {
          params: {
            limit: 5,
          },
        })
        .then((response) => {
          let { data } = response.data;

          for (let index = 0; index < data.length; index++) {
            const element = data[index].foto;
            this.banners.push({ src: element });
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
  },

  created() {
    this.showBanners();
  },
};
</script>