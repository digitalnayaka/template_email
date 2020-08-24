<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-carousel cycle height="300">
          <v-carousel-item
            v-for="(item,index) in banners"
            :key="index"
            :src="getImage(item.src)"
            reverse-transition="fade-transition"
            transition="fade-transition"
            cycle
            hide-delimiter-background
            show-arrows-on-hover
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    banners: []
  }),
  methods: {
    showBanners() {
      this.axios
        .get("/master/v3/mst_banner", {
          params: {
            limit: 4
          }
        })
        .then(response => {
          let { data } = response.data;

          for (let index = 0; index < data.length; index++) {
            const element = data[index].foto;
            this.banners.push({ src: element });
          }
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    }
  },
  created() {
    this.showBanners();
  }
};
</script>
