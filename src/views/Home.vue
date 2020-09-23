<template>
  <v-container fluid>
    <v-carousel cycle hide-delimiters height="280">
      <v-carousel-item
        v-for="(item,index) in banners"
        :key="index"
        :src="getImage(item.foto)"
        reverse-transition="fade-transition"
        transition="fade-transition"
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        contain
      ></v-carousel-item>
    </v-carousel>

    <v-row>
      <v-col cols="3" align="center" v-for="item in categories" :key="item.id">
        <v-card :to="'/category/'+ item.category_route" flat>
          <v-img :src="item.category_image" width="100" height="100" contain></v-img>
        </v-card>

        <h5>{{ item.category_name }}</h5>
      </v-col>
    </v-row>

    <v-container fluid class="text-center">
      <h2>Jadwal Tawar Bersama</h2>

      <div class="scrolling-wrapper-flexbox mx-2" v-if="jadwal.length > 0">
        <v-card
          class="card ma-2"
          v-for="(item,index) in jadwal"
          contain
          :key="index"
          :to="{ 
            path: '/list-lelang/' + item.nama,
            query: { tgl: item.date.substr(0,10) } 
          }"
        >
          <v-list>
            <v-list-item>
              <v-list-item-avatar size="70">
                <v-icon x-large v-if="item.photo == 'null'">mdi-account-circle</v-icon>
                <v-img :src="getImage(item.photo)" v-else></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-btn small color="teal" dark rounded>
                  <v-list-item-title>{{ item.date | dateFormat }}</v-list-item-title>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-avatar size="16" v-if="item.id_mst_user_type == 2">
            <v-img src="/img/verified.png" alt="verified"></v-img>
          </v-avatar>

          <span class="font-weight-bold">{{ item.nama }}</span>

          <div>{{ item.total_iklan }} Iklan Tayang</div>
        </v-card>
      </div>

      <div v-else>
        <p class="display-2">Tidak ada data</p>
      </div>

      <v-btn
        dark
        color="teal"
        to="/jadwal"
        :small="$vuetify.breakpoint.xsOnly ? true : false"
        class="mt-4"
      >Jadwal Tawar Bersama Selengkapnya</v-btn>
    </v-container>

    <v-divider class="my-2"></v-divider>

    <div class="text-center">
      <h2>Tawar Bersama Berlangsung</h2>

      <div>Ikuti Tawar Bersama berikut!</div>
    </div>

    <v-row v-if="tbBerlangsung.length > 0">
      <v-col
        cols="6"
        sm="3"
        lg="2"
        class="pa-0"
        v-for="item in tbBerlangsung"
        :key="item._source.id"
      >
        <list-iklan :item="item" :utc="utc" :timezone="timezone" />
      </v-col>

      <v-col cols="12" align="center">
        <v-btn dark color="teal" :to="{ path: '/category/mokas', query: { tb: true } }">Lihat Semua</v-btn>
      </v-col>
    </v-row>

    <v-row justify="center" v-else>
      <p class="display-2">Tidak ada data</p>
    </v-row>

    <v-divider class="mt-4"></v-divider>

    <v-row justify="center">
      <v-col cols="12" sm="6" align="center">
        <v-img src="/img/app-min.png" width="280" contain></v-img>
      </v-col>

      <v-col cols="12" sm="6" align="center">
        <v-img src="/img/mobilehand.png" width="92" contain></v-img>

        <h2>Apa itu SiMotor?</h2>

        <div class="text-justify">
          Sepeda motor sudah menjadi gaya hidup atau lifestyle masyarakat di Indonesia, benar nggak?
          Oleh karena itu, kebutuhan akan sepeda motor juga meningkat dan kamu pasti ingin motor yang bagus dan berkualitas kan?
          Disinilah SiMotor hadir sebagai jawaban. Beli motor jadi semakin mudah, cepat, dan berkualitas.
        </div>

        <v-card class="d-inline-block mx-auto">
          <v-container fluid>
            <v-img src="/img/banner.png" contain></v-img>
            <h4>Download aplikasi SiMotor yang tersedia di Android.</h4>

            <a
              href="https://play.google.com/store/apps/details?id=com.digitalnetworkasia.simotorbeta"
              target="_blank"
            >
              <v-img
                src="/img/playstore.png"
                width="162"
                href="https://play.google.com/store/apps/details?id=com.digitalnetworkasia.simotorbeta"
                target="_blank"
              ></v-img>
            </a>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-container fluid>
      <div align="center">
        <v-img src="/img/icon.png" width="90"></v-img>

        <h4>Apa aja fitur unggulan SiMotor?</h4>

        <h2>Fitur SiMotor</h2>

        <v-row>
          <v-col cols="12" sm="6">
            <h2>Harga Pas</h2>

            <v-img src="/img/harga pas.png" width="120" contain></v-img>

            <div class="text-justify">
              Harga pas berguna banget untuk kamu yang nggak mau ribet menawar unit.
              Kamu hanya perlu memilih unit motor yang kamu butuhkan lalu segera hubungi penjual iklan unit tersebut.
            </div>
          </v-col>

          <v-col cols="12" sm="6">
            <h2>Tawar Bersama</h2>

            <v-img src="/img/tawar bersama (paketan).png" width="120" contain></v-img>

            <div
              class="text-justify"
            >Keuntungan Tawar Bersama (TB) adalah kamu dapat melakukan penawaran sehingga harga yang kamu dapat sesuai dengan isi dompet.</div>
          </v-col>
        </v-row>

        <h5>2020 © Digital Nayaka Abhinaya. All Rights Reserved.</h5>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "Home",
  props: ["utc", "timezone"],
  components: {
    ListIklan: () =>
      import(/* webpackChunkName: "list_iklan" */ "@/components/ListIklan.vue"),
  },
  data: () => ({
    banners: [],
    categories: [],
    jadwal: [],
    tbBerlangsung: [],
  }),
  methods: {
    showBanners() {
      this.axios
        .get("/master/v3/mst_banner")
        .then((response) => {
          let { data } = response.data;
          this.banners = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    showCategories() {
      this.axios
        .get("/setup/v3/category")
        .then((response) => {
          let { data } = response.data;
          this.categories = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    jadwalLelang() {
      this.axios
        .get("/iklan/v3/iklan_jadwal_tb", {
          params: {
            id_mst_iklan_status: 1,
            limit: 20,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.jadwal = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    TBBerlangsung() {
      this.axios
        .get("/search/v3/search", {
          params: {
            id_mst_iklan_status: 1,
            sort: "tanggal_mulai",
            limit: this.$vuetify.breakpoint.lg ? 6 : 4,
            offset: 0,
            tb_berlangsung: true,
          },
        })
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.tbBerlangsung = hits;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
  },
  created() {
    this.showBanners();
    this.showCategories();
    this.jadwalLelang();
    this.TBBerlangsung();
  },
  filters: {
    dateFormat: (date) => {
      return moment.utc(date).format("DD MMM YYYY");
    },
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM, HH:mm");
    },
  },
};
</script>

<style scoped>
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.scrolling-wrapper-flexbox {
  height: 180;
  margin-bottom: 20;
  width: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>
