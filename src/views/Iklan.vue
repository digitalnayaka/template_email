<template>
  <v-container fluid>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="back">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-breadcrumbs :items="breadcrumbs" class="pa-0 d-none d-sm-flex">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-row>
      <v-col cols="12" sm="6">
        <v-carousel cycle hide-delimiter-background height="300">
          <v-carousel-item
            v-for="(item,index) in carousels"
            :key="index"
            :src="getImage(item.src)"
            reverse-transition="fade-transition"
            transition="fade-transition"
            contain
          ></v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="12" sm="6">
        <div class="d-flex align-center" v-if="seller.id_mst_user_type == 2">
          <img src="/img/verified.png" width="15px" height="15px" alt="verified" />
          <span class="ml-1 teal--text text-subtitle-2">Verified Seller</span>
        </div>

        <div class="text-h5 font-weight-bold">{{ iklan.judul }}</div>

        <div class="d-flex align-center text-caption text-sm-body-2">
          <span>3.5</span>
          <star-rating
            :rating="3.5"
            read-only
            :show-rating="false"
            :round-start-rating="false"
            :star-size="20"
            inline
          ></star-rating>
          <v-icon>mdi-circle-medium</v-icon>
          <span>{{ iklan.log_iklan_view }}x Dilihat</span>
        </div>

        <v-divider class="mt-2"></v-divider>

        <v-row class="font-weight-bold text-subtitle-1 text-sm-h5">
          <v-col cols="3">
            <div class="blue-grey--text">Harga</div>
          </v-col>

          <v-col cols="6" class="orange--text">
            <div
              v-if="iklan.id_mst_iklan_jenis == 1"
            >Rp {{ Number(hits.harga).toLocaleString('id-ID') }}</div>

            <!-- <div v-else>
              <div
                v-if="liveBid.length == 0"
              >Rp {{ Number(hits.harga_awal).toLocaleString('id-ID') }}</div>

              <div v-else>Rp {{ Number(hits.harga_awal).toLocaleString('id-ID') }}</div>
            </div>-->
          </v-col>

          <v-col cols="3" class="text-right">
            <div v-if="iklan.id_mst_iklan_jenis == 1">
              <img src="/img/icons/hargapas.png" width="100" height="25" />
            </div>

            <!-- <div v-else>
              <img
                src="/img/icons/harga_awal.png"
                width="100"
                height="25"
                v-if="liveBid.length == 0"
              />
              <img src="/img/icons/harga_sekarang.png" width="100" height="25" v-else />
            </div>-->
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-row>
          <v-col cols="6">
            <v-btn color="primary" block outlined>
              <v-icon left>mdi-phone</v-icon>Hubungi
            </v-btn>
          </v-col>

          <v-col cols="6">
            <v-btn color="primary" block outlined to="/pesan/1">
              <v-icon left>mdi-message</v-icon>Pesan
            </v-btn>
          </v-col>
        </v-row>

        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-list two-line>
      <v-list-item>
        <v-list-item-avatar size="50">
          <v-icon x-large v-if="seller.photo == 'null'">mdi-account-circle</v-icon>
          <v-img :src="getImage(seller.photo)" v-else></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            <div class="d-flex align-center">
              <v-avatar size="16" item>
                <v-img src="/img/verified.png" alt="verified"></v-img>
              </v-avatar>
              <span class="mx-1">{{ seller.nama }}</span>
            </div>
          </v-list-item-title>
          <v-list-item-subtitle>Penjual</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-tabs v-model="tab" color="teal" slider-color="teal" show-arrows>
      <v-tab>Deskripsi</v-tab>
      <v-tab>Detail Iklan</v-tab>
      <v-tab v-if="iklan.id_mst_iklan_jenis == 2">Info Tawar Bersama</v-tab>
      <v-tab v-if="iklan.id_mst_iklan_jenis == 2">Penawaran</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>{{ iklan.deskripsi }}</v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-row v-if="hits.id_mst_iklan_type == 1">
          <v-col cols="12" sm="6">
            <v-list dense subheader>
              <v-subheader class="text-h6">Detail Motor</v-subheader>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_id_iklan.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>ID Motor</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].id }}</v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_merek.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Merk</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].merk }}</v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_tipe.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Tipe</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].type }}</v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_tahun.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Tahun</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].tahun }}</v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_odometer.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Odometer</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].odometer }} KM</v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_warna.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Warna</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].warna }}</v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_cc_mesin.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>CC Mesin</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].odometer }} CC</v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_transmisi.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Transmisi</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].transmisi }}</v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_jenis_motor.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Jenis Motor</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].jenis_motor }}</v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_lokasi_samsat.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Samsat</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].lokasi_samsat }}</v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_lokasi.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Lokasi</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].lokasi }}</v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" sm="6">
            <v-list dense subheader>
              <v-subheader class="text-h6">Kelengkapan Dokumen</v-subheader>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_stnk.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>STNK</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].lembar_stnk ? "ADA" : "TIDAK" }}</v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_lembar_pajak.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Lembar Pajak</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].lembar_pajak ? "ADA" : "TIDAK" }}</v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_bpkb.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>BPKB</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>{{ dtlUnits[0].lembar_bpkb ? "ADA" : "TIDAK" }}</v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <div v-else>
          <v-row>
            <v-col cols="12" sm="6">
              <v-list dense subheader>
                <v-subheader class="text-h6">Informasi Paket Motor</v-subheader>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/icon_jenis_motor.png"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Jumlah Motor</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action
                    v-if="iklan.motor_bekas != undefined"
                  >{{ iklan.motor_bekas.length }}</v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/icon_lokasi.png"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Lokasi Motor</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>{{ dtlUnits[0].lokasi }}</v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/icon_list.png"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Daftar Paket Motor:</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" sm="3" lg="2" v-for="(item,i) in motorBekas" :key="i">
              <v-card :to="'/detail_unit/' + item.id">
                <v-img :src="getImage(item.foto_1)" height="230" contain></v-img>

                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.merk }} {{ item.type }}</v-list-item-title>
                      <v-list-item-subtitle>{{ item.tahun }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StarRating from "vue-star-rating";

export default {
  name: "detail-iklan",
  components: { StarRating },
  data: () => ({
    hits: [],
    title: "",
    breadcrumbs: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Mokas",
        disabled: false,
        href: "/category/mokas",
      },
    ],
    iklan: [],
    unitIds: [],
    dtlUnits: [],
    carousels: [],
    seller: [],
    tab: 0,
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    getHits() {
      this.axios
        .get("/search/v3/search", {
          params: {
            id: this.adsID,
            limit: 1,
          },
        })
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits[0]._source;
          this.title = this.hits.judul;
          this.breadcrumbs.push(
            {
              text: this.hits.mst_iklan_jenis,
              disabled: false,
              href: "/category/mokas?jenis=" + this.hits.id_mst_iklan_jenis,
            },
            {
              text: this.hits.judul,
              disabled: true,
            }
          );
          if (this.hits.id_mst_iklan_jenis === 1) {
            this.getHP(this.hits.id);
          } else {
            this.getTB(this.hits.id);
          }
          this.getUser(this.hits.id_app_user);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getHP(id) {
      this.axios
        .get("/iklan/v3/iklan_hp_mokas", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.iklan = data;
          this.unitIds = this.iklan.motor_bekas;
          this.getUnit();
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getTB(id) {
      this.axios
        .get("/iklan/v3/iklan_tb_mokas", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.iklan = data;
          this.unitIds = this.iklan.motor_bekas;
          this.getUnit();
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getUnit() {
      let params = new URLSearchParams();
      for (let i = 0; i < this.unitIds.length; i++) {
        const e = this.unitIds[i].id_motor_bekas;
        params.append("id", e);
      }
      params.set("limit", this.unitIds.length);

      var request = {
        params: params,
      };

      this.axios
        .get("/produk/v3/unit_mokas", request)
        .then((response) => {
          let { data } = response.data;
          this.dtlUnits = data;
          if (this.hits.id_mst_iklan_type === 1) {
            let foto1 = this.dtlUnits[0].foto_1;
            let foto2 = this.dtlUnits[0].foto_2;
            let foto3 = this.dtlUnits[0].foto_3;
            let foto4 = this.dtlUnits[0].foto_4;
            let foto5 = this.dtlUnits[0].foto_5;
            this.carousels.push(
              { src: foto1 },
              { src: foto2 },
              { src: foto3 },
              { src: foto4 },
              { src: foto5 }
            );
          } else {
            for (let i = 0; i < this.dtlUnits.length; i++) {
              const e = this.dtlUnits[i].foto_1;
              this.carousels.push({ src: e });
            }
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getUser(id) {
      this.axios
        .get("/user/v3/user", {
          params: {
            id: id,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.seller = data[0];
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      guest: "auth/guest",
      adsID: "ads/adsID",
    }),
  },
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = this.title;
      },
    },
  },
  created() {
    this.$nextTick(() => {
      this.getHits();
    });
  },
};
</script>

<style>
</style>