<template>
  <div>
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

    <v-row>
      <v-col cols="3" align="center" v-for="category in categories" :key="category.id">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card :to="'/category/'+ category.category_route" flat>
              <v-img
                :src="category.category_image"
                width="100"
                height="100"
                class="white--text align-end"
                v-on="on"
                contain
              ></v-img>
            </v-card>
          </template>

          <span>{{ category.category_name }}</span>
        </v-tooltip>

        <h5>{{ category.category_name }}</h5>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" align="center">
        <h2>Jadwal Tawar Bersama</h2>

        <div class="scrolling-wrapper-flexbox mx-2" v-if="jadwal.length > 0">
          <v-card
            class="card ma-2"
            v-for="(item,index) in jadwal"
            :key="index"
            :to="'/list_lelang/' + item.id_app_user + '?tgl=' + item.date.substr(0,10)"
          >
            <v-card dark color="teal">{{ item.total_iklan }} Iklan</v-card>

            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-icon color="teal">mdi-calendar</v-icon>
                  <v-list-item-title>{{ item.date | dateFormat }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar size="70">
                  <v-icon x-large v-if="item.photo == 'null'">mdi-account-circle</v-icon>
                  <v-img :src="getImage(item.photo)" v-else contain></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-avatar size="16" v-if="item.id_mst_user_type == 2">
              <v-img src="/img/verified.png" alt="verified"></v-img>
            </v-avatar>
            <span class="font-weight-bold">{{ item.nama }}</span>
          </v-card>
        </div>

        <div v-else>
          <p class="display-2">Tidak ada data</p>
          <p>Tidak ada jadwal tawar bersama di tanggal ini</p>
        </div>

        <div align="center">
          <v-btn dark color="teal" to="/jadwal">Jadwal Tawar Bersama Selengkapnya</v-btn>
        </div>
      </v-col>
    </v-row>
    <br />
    <v-divider></v-divider>
    <v-card align="center">
      <v-col cols="12" align="center">
        <v-row>
          <div class="container">
            <div class="section-title">
              <img src="img/mobilehand.png" width="92px" />

              <h4>Download aplikasi SiMotor yang tersedia di Android.</h4>
              <img
                href="https://play.google.com/store/apps/details?id=com.digitalnetworkasia.simotorbeta"
                src="img/playstore.png"
                width="162px"
              />
            </div>
          </div>
        </v-row>
      </v-col>
    </v-card>
    <v-card align="center">
      <p>2020 © Digital Network Asia. All Rights Reserved.</p>
    </v-card>
  </div>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "Home",
  data: () => ({
    banners: [],
    categories: [],
    jadwal: []
  }),
  methods: {
    showBanners() {
      this.axios
        .get("/master/v2/mst_banner", {
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
    },
    showCategories() {
      this.axios
        .get("/setup/v1/category")
        .then(response => {
          let { data } = response.data;
          this.categories = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    jadwalLelang() {
      this.axios
        .get("/iklan/v2/iklan_jadwal_tb", {
          params: {
            id_mst_iklan_status: 1,
            limit: 999
          }
        })
        .then(response => {
          let { data } = response.data;
          this.jadwal = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    }
  },
  created() {
    this.showBanners();
    this.showCategories();
    this.jadwalLelang();
  },
  filters: {
    dateFormat: date => {
      return moment.utc(date).format("DD MMM YYYY");
    }
  }
};
</script>

<style scoped>
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.scrolling-wrapper-flexbox {
  height: 180px;
  margin-bottom: 20px;
  width: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>