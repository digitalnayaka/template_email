<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card>
      <v-card-title class="text-h4">{{ banners.nama }}</v-card-title>

      <v-img :src="getImage(banners.foto)" height="250" contain></v-img>

      <v-card-text>
        {{ banners.deskripsi }}
      </v-card-text>
    </v-card>
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
        });
    },
  },
  created() {
    this.showBanners();
  },
};
</script>