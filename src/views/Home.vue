<template>
  <v-container fluid>
    <v-app-bar app color="teal" dark class="d-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-carousel cycle hide-delimiters height="280">
      <v-carousel-item
        v-for="(item, index) in banners"
        :key="index"
        :src="getImage(item.foto)"
        reverse-transition="fade-transition"
        transition="fade-transition"
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        contain
        :to="'/detail-banner/' + item.id"
      ></v-carousel-item>
    </v-carousel>

    <v-row>
      <v-col cols="6" align="center" v-for="item in categories" :key="item.id">
        <v-card flat :to="'/category/' + item.route">
          <v-img
            :src="item.image"
            width="500"
            height="150"
            contain
            class="rounded-lg"
          ></v-img>
          <h4>{{ item.name }}</h4>
        </v-card>
      </v-col>
    </v-row>

    <v-card color="teal lighten-4">
      <v-container fluid class="text-center">
        <h2>Jadwal Tawar Bersama</h2>
        <div>Jangan lewatkan Iklan Tawar Bersama berikut!</div>

        <div class="scrolling-wrapper-flexbox mx-2" v-if="jadwal.length > 0">
          <v-card
            class="card ma-2 rounded-xl"
            v-for="(item, index) in jadwal"
            contain
            :key="index"
            :to="{
              path: '/list-tb/' + item.nama,
              query: { tgl: item.date.substr(0, 10) },
            }"
          >
            <v-list>
              <v-list-item>
                <v-list-item-avatar size="70">
                  <v-icon x-large v-if="item.photo == 'null'"
                    >mdi-account-circle</v-icon
                  >
                  <v-img :src="getImage(item.photo)" v-else></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-btn small color="teal" dark rounded>
                    <v-list-item-title>{{
                      item.date | dateFormat
                    }}</v-list-item-title>
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
          >Jadwal Tawar Bersama Selengkapnya</v-btn
        >
      </v-container>
    </v-card>
    <!-- <v-divider class="my-2"></v-divider> -->

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
        <v-btn
          dark
          color="teal"
          :to="{ path: '/category/mokas', query: { tb: true } }"
          >Lihat Semua</v-btn
        >
      </v-col>
    </v-row>

    <v-row justify="center" v-else>
      <p class="display-2">Tidak ada data</p>
    </v-row>

    <v-divider class="my-2"></v-divider>

    <v-card color="teal lighten-4 text-center" flat class="rounded-lg">
      <v-container fluid>
        <h2>Artikel Terbaru</h2>
        <div>Yuk cek artikel terbaru di SiMotor</div>
        <br />
        <v-row align="center" dense>
          <v-col
            cols="6"
            sm="6"
            lg="2"
            v-for="item in artikel"
            :key="item.id"
          >
            <v-card
              flat
              class="rounded-lg"
              href="http://devlmu.com:333/"
              target="_blank"
              width="300"
            >
              <div align="center">
                <v-img
                  class="rounded-lg"
                  align="center"
                  width="300"
                  height="200"
                  :src="getThumb(item.cover_image)"
                ></v-img>
              </div>

              <v-list class="ma-0 pa-0">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >Tanggal:
                      {{ item.publish_date | dateFormat }}</v-list-item-title
                    >
                    <!-- <v-list-item-subtitle> By: </v-list-item-subtitle> -->
                    <v-list-item-title class="font-weight-black">
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <v-btn
          dark
          color="teal"
          href="http://devlmu.com:333/"
          target="_blank"
          class="mt-4"
          >Lihat Semua Artikel</v-btn
        >
      </v-container>
    </v-card>
    <v-row justify="center">
      <v-col cols="12" sm="6" align="center">
        <v-img src="/img/app-min.webp" width="280" contain></v-img>
      </v-col>

      <v-col cols="12" sm="6" align="center">
        <v-img src="/img/mobilehand.webp" width="92" contain></v-img>

        <h2>Apa itu SiMotor?</h2>

        <div class="text-justify">
          Sepeda motor sudah menjadi gaya hidup atau lifestyle masyarakat di
          Indonesia, benar nggak? Oleh karena itu, kebutuhan akan sepeda motor
          juga meningkat dan kamu pasti ingin motor yang bagus dan berkualitas
          kan? Disinilah SiMotor hadir sebagai jawaban. Beli motor jadi semakin
          mudah, cepat, dan berkualitas.
        </div>

        <v-card class="d-inline-block mx-auto">
          <v-container fluid>
            <v-img src="/img/banner.webp" contain></v-img>
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
    <v-divider> </v-divider>
    <v-container fluid>
      <div align="center">
        <v-img src="/img/logo-sm.webp" width="90"></v-img>

        <h4>Apa aja fitur unggulan SiMotor?</h4>

        <h2>Fitur SiMotor</h2>

        <v-row>
          <v-col cols="12" sm="6">
            <h2>Harga Pas</h2>

            <v-img src="/img/hargapas.webp" width="120" contain></v-img>

            <div class="text-justify">
              Harga pas berguna banget untuk kamu yang nggak mau ribet menawar
              unit. Kamu hanya perlu memilih unit motor yang kamu butuhkan lalu
              segera hubungi penjual iklan unit tersebut.
            </div>
          </v-col>

          <v-col cols="12" sm="6">
            <h2>Tawar Bersama</h2>

            <v-img
              src="/img/tawar bersama (paketan).webp"
              width="120"
              contain
            ></v-img>

            <div class="text-justify">
              Keuntungan Tawar Bersama (TB) adalah kamu dapat melakukan
              penawaran sehingga harga yang kamu dapat sesuai dengan isi dompet.
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-btn bottom color="pink" dark fab fixed right to="/bantuan">
      <v-img
        to="/bantuan"
        src="/img/icons/bantuan.png"
        width="100"
        height="100"
        contain
      ></v-img>
    </v-btn>
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
    categories: [
      {
        id: 1,
        image: "/img/mokas2.webp",
        name: "Motor Bekas",
        route: "mokas",
      },
      // {
      //   id: 2,
      //   image: "/img/icons/motorbaru.png",
      //   name: "Motor Baru",
      //   route: "motor_baru",
      // },
      {
        id: 3,
        image: "/img/tiket_tb.webp",
        name: "Tiket Tawar Bersama",
        route: "ticket",
      },
      // {
      //   id: 4,
      //   image: "/img/icons/bengkel.png",
      //   name: "Bengkel",
      //   route: "bengkel",
      // },
    ],
    jadwal: [],
    tbBerlangsung: [],
    artikel: [],
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
    artikelBerita() {
      this.axios
        .get("/produk/v3/berita/umum", {
          params: {
            limit: 6,
            offset: 0,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.artikel = data;
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
    // this.showCategories();
    this.jadwalLelang();
    this.artikelBerita();
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
