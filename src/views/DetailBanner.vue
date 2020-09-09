<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <div class="display-1 font-weight-bold">Detail Banner</div>
      <br />

      <v-card align="center" class="d-inline-block mx-auto">
        <v-list>
          <v-row dense>
            <v-col cols="12">
              <v-carousel cycle hide-delimiters height="300">
                <v-carousel-item
                  v-for="(item,index) in banners"
                  :key="index"
                  :src="getImage(item.src)"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                  cycle
                  hide-delimiter-background
                  show-arrows-on-hover
                  contain
                ></v-carousel-item>
              </v-carousel>
              
            </v-col>
          </v-row>
        </v-list>
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