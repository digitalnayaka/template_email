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
            contain
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

    <v-divider class="mt-4"></v-divider>

    <v-container fluid>
      <div align="center">
        <h2>Tawar Bersama Berlangsung</h2>

        <p>Ikuti Tawar Bersama berikut!</p>
      </div>

      <v-flex v-for="item in tbberlangsung" :key="item._source.id" xs6 sm6>
        <v-card
          :to="item._source.id_mst_iklan_type != 2 ? '/detail_iklan/' + item._source.id : '/detail_paket/' +  item._source.id"
        >
          <v-img :src="getImage(item._source.photo)" contain>
            <v-card-title>
              <v-chip small left color="red" text-color="white">{{ item._source.mst_iklan_jenis }}</v-chip>
              <v-chip small left color="orange" text-color="white">{{ item._source.mst_iklan_type }}</v-chip>
              <v-chip
                small
                left
                color="green"
                text-color="white"
                v-if="item._source.is_verified == true"
              >Tiket</v-chip>
            </v-card-title>
          </v-img>

          <v-list dense class="ma-0 pa-0">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-black">{{ item._source.judul }}</v-list-item-title>

                <v-list-item-subtitle v-if="item._source.harga == null">Harga awal</v-list-item-subtitle>
                <v-list-item-subtitle v-else>Harga</v-list-item-subtitle>
                <v-list-item-subtitle
                  style="color:red"
                  v-if="item._source.harga == null"
                >Rp {{ Number(item._source.harga_awal).toLocaleString('id-ID') }}</v-list-item-subtitle>
                <v-list-item-subtitle
                  style="color:red"
                  v-else
                >Rp {{ Number(item._source.harga).toLocaleString('id-ID') }}</v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-avatar size="16" item>
                    <v-img src="/img/verified.png" alt="verified"></v-img>
                  </v-avatar>
                  {{ item._source.app_user }}
                </v-list-item-subtitle>

                <v-list-item-subtitle v-if="item._source.id_mst_iklan_jenis == 2">
                  <v-icon small>mdi-calendar</v-icon>
                  {{ item._source.tanggal_mulai | dateTimeFormat(utc) }} {{ waktu }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>

      <div align="center">
        <v-btn dark color="teal" to="/category/mokas?tb=berlangsung">Lihat Semua</v-btn>
      </div>
    </v-container>

    <v-divider></v-divider>

    <div class="d-inline-block container mx-auto" align="center">
      <v-row justify="center" align="center">
        <v-col class="col-md-4 col-lg-4 col-sm-4">
          <v-img src="img/app-min.png" width="280" contain></v-img>
        </v-col>

        <v-col class="col-lg-6 col-md-6 col-sm-6">
          <div class="container">
            <div class="section-title" align="center">
              <v-img align="center" src="img/mobilehand.png" width="92"></v-img>

              <h2>Apa itu SiMotor?</h2>

              <p class="text-justify">
                Sepeda motor sudah menjadi gaya hidup atau lifestyle masyarakat di Indonesia, benar nggak?
                Oleh karena itu, kebutuhan akan sepeda motor juga meningkat dan kamu pasti ingin motor yang bagus dan berkualitas kan?
                Disinilah SiMotor hadir sebagai jawaban. Beli motor jadi semakin mudah, cepat, dan berkualitas.
              </p>

              <v-card class="d-inline-block mx-auto" align="center">
                <v-container fluid>
                  <v-img src="img/banner.png" width="600" height="150" contain></v-img>
                  <h4>Download aplikasi SiMotor yang tersedia di Android.</h4>

                  <a
                    href="https://play.google.com/store/apps/details?id=com.digitalnetworkasia.simotorbeta"
                    target="_blank"
                  >
                    <v-img
                      src="img/playstore.png"
                      width="162"
                      href="https://play.google.com/store/apps/details?id=com.digitalnetworkasia.simotorbeta"
                      target="_blank"
                    ></v-img>
                  </a>
                </v-container>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="container mx-auto">
      <div class="section-title" align="center">
        <v-img src="img/icon.png" width="92"></v-img>

        <h4>Apa aja fitur unggulan SiMotor?</h4>

        <h2>Fitur SiMotor</h2>

        <v-row justify="center" align="center">
          <div class="container">
            <v-col class="col-md-6 col-lg-6 col-sm-6">
              <h2>Harga Pas</h2>
              <v-img src="img/harga pas.png" width="120"></v-img>

              <p class="text-justify">
                Harga pas berguna banget untuk kamu yang nggak mau ribet menawar unit.
                Kamu hanya perlu memilih unit motor yang kamu butuhkan lalu segera hubungi penjual iklan unit tersebut.
              </p>
            </v-col>
          </div>

          <v-col class="col-lg-6 col-md-6 col-sm-6">
            <div class="container">
              <h2>Tawar Bersama</h2>

              <v-img src="img/tawar bersama (paketan).png" width="120"></v-img>

              <p
                class="text-justify"
              >Keuntungan Tawar Bersama (TB) adalah kamu dapat melakukan penawaran sehingga harga yang kamu dapat sesuai dengan isi dompet.</p>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <h5 class="text-center">2020 © Digital Network Asia. All Rights Reserved.</h5>
  </div>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "Home",
  data: () => ({
    banners: [],
    categories: [],
    jadwal: [],
    tbberlangsung: [],
    utc: moment().utcOffset() / 60 - 7,
    waktu: ""
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
    },
    TBBerlangsung() {
      this.axios
        .get("/search/v1/search", {
          params: {
            id_mst_iklan_status: 1,
            sort: "tanggal_mulai",
            limit: 4,
            offset: 0,
            tb_berlangsung: true
          }
        })
        .then(response => {
          let data = response.data;
          let { hits } = data.hits;
          this.tbberlangsung = hits;
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
    this.TBBerlangsung();
    if (this.utc == 0) {
      this.waktu = "WIB";
    }
    if (this.utc == 1) {
      this.waktu = "WITA";
    }
    if (this.utc == 2) {
      this.waktu = "WIT";
    }
  },
  filters: {
    dateFormat: date => {
      return moment.utc(date).format("DD MMM YYYY");
    },
    dateTimeFormat: (date, utc) => {
      return moment
        .utc(date)
        .add(utc, "h")
        .format("DD MMM, HH:mm");
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
  height: 180;
  margin-bottom: 20;
  width: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>