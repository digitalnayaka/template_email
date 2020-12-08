<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- <v-card align="center">
      <v-card-title class="text-h4" align="center">{{ banners.nama }}</v-card-title>

      <v-img :src="getImage(banners.foto)" height="250" contain></v-img>

      <v-card-text class="text-justify text-center">
        {{ banners.deskripsi }}
      </v-card-text>
    </v-card> -->
    <v-container fluid class="text-center">
      <v-card class="mx-auto rounded-lg" color="cyan lighten-5">
        <h2>{{ banners.nama }}</h2>

        <v-img :src="getImage(banners.foto)" height="350" contain></v-img>
        <v-card-text class="font-weight-regular text-justify text-center">
          {{ banners.deskripsi }}
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "detail_banner",
  data: () => ({
    banners: [],
  }),
  methods: {
    showBanners() {
      this.axios
        .get("/master/v3/mst_banner", {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.banners = data[0];
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
        });
    },
  },
  created() {
    this.showBanners();
  },
};
</script>