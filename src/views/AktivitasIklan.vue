<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-tabs background-color="teal" dark grow>
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab>Tawar Bersama</v-tab>
      <v-tab>Harga Pas</v-tab>

      <v-tab-item>
        <div align="center" v-if="tawarBersama.length == 0">
          <h2>Tidak ada data</h2>

          <p>Silahkan ikuti salah satu iklan Tawar Bersama yang ada</p>
        </div>

        <div v-else>
          <v-card
            v-for="item in tawarBersama"
            :key="item.id_iklan"
            :to="item.id_mst_pembayaran_status == 0 ? '/detail_iklan/' + item.id : '/detail_transaksi/' + item.id_order"
            class="my-4"
          >
            <v-toolbar dense flat>
              <div>Tawar Bersama selesai pada:</div>

              <v-spacer></v-spacer>

              <div class="red--text">{{ item.tanggal_selesai | dateTimeFormat(utc) }} {{ waktu }}</div>
            </v-toolbar>

            <v-list>
              <v-list-item>
                <v-list-item-avatar tile size="80">
                  <v-img :src="getImage(item.photo)" contain></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="font-weight-black">{{ item.judul }}</v-list-item-title>

                  <v-list-item-subtitle
                    class="teal--text"
                  >Tawar Bersama {{ item.type }} {{ item.type_tb }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-content v-if="item.id_mst_iklan_status == 1">
                  <v-list-item-title>Tawar Bersama belum mulai</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content v-if="item.id_order != 0">
                  <v-list-item-title>Tawaran terakhir</v-list-item-title>

                  <v-list-item-subtitle
                    class="blue--text"
                  >Rp {{ Number(item.bid).toLocaleString("id-ID") }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-content v-else>
                  <v-list-item-title v-if="item.bid == 0">Belum ada penawar</v-list-item-title>

                  <v-list-item-title v-if="item.id_mst_iklan_status == 6">Tawar Bersama selesai</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <div v-if="item.id_mst_iklan_status == 8">
              <div
                class="d-block pa-2 teal accent-4 white--text text-center"
              >{{ item.mst_iklan_status }}</div>
            </div>

            <div v-if="item.id_mst_iklan_status == 3">
              <div
                class="d-block pa-2 yellow darken-2 white--text text-center"
                v-if="item.id_mst_pembayaran_status == 1"
              >{{ item.pembayaran_status }} Pemenang</div>

              <div
                class="d-block pa-2 blue darken-2 white--text text-center"
                v-if="item.id_mst_pembayaran_status == 4"
              >{{ item.pembayaran_status }} Anda</div>
            </div>

            <div v-if="item.id_mst_iklan_status == 6">
              <div
                class="d-block pa-2 green accent-4 white--text text-center"
                v-if="item.id_mst_pembayaran_status == 0"
              >{{ item.mst_iklan_status }}</div>

              <div
                class="d-block pa-2 red accent-2 white--text text-center"
                v-if="item.id_mst_pembayaran_status == 3"
              >{{ item.pembayaran_status }}</div>
            </div>

            <div v-if="item.id_mst_iklan_status == 2">
              <div
                class="d-block pa-2 green accent-4 white--text text-center"
                v-if="item.id_mst_pembayaran_status == 2"
              >{{ item.pembayaran_status }}</div>
            </div>
          </v-card>
        </div>

        <!-- <v-pagination v-model="page" @input="getTB" :length="lengthPageTB" :total-visible="5"></v-pagination> -->
      </v-tab-item>

      <v-tab-item>
        <v-card
          v-for="item in hargaPas"
          :key="item._source.id"
          :to="'/detail_iklan/' + item._source.id"
          class="my-4"
        >
          <v-list>
            <v-list-item>
              <v-list-item-avatar rounded size="80">
                <v-img :src="getImage(item._source.photo)" contain></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-black">{{ item._source.judul }}</v-list-item-title>

                <v-list-item-subtitle class="teal--text">Harga Pas Satuan</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <div
            class="d-block pa-2 teal accent-4 white--text text-center"
          >{{ item._source.mst_iklan_status }}</div>
        </v-card>

        <v-pagination v-model="page" @input="getHP" :length="lengthPageHP" :total-visible="5"></v-pagination>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment-timezone";

export default {
  name: "aktivitas_iklan",
  data() {
    return {
      tawarBersama: [],
      hargaPas: [],
      page: 1,
      lengthPageTB: 0,
      lengthPageHP: 0,
      limit: 20,
      offset: 0,
      totalTB: 0,
      totalHP: 0,
      utc: moment().utcOffset() / 60 - 7,
      waktu: ""
    };
  },
  methods: {
    getTB() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/iklan/v1/iklan_tb_aktivitas", {
          params: {
            id_app_user: this.user.id,
            offset: offset,
            limit: this.limit
          }
        })
        .then(response => {
          let { data } = response.data;
          this.tawarBersama = data;
          this.totalTB = response.data.count;
          this.lengthPageTB = Math.ceil(this.totalTB / this.limit);
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getHP() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/search/v1/search", {
          params: {
            id_app_user: this.user.id,
            id_mst_iklan_jenis: 1,
            offset: offset,
            limit: this.limit
          }
        })
        .then(response => {
          let data = response.data;
          let { hits } = data.hits;
          this.hargaPas = hits;
          this.totalHP = data.hits.total.value;
          this.lengthPageHP = Math.ceil(this.totalHP / this.limit);
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    }
  },
  created() {
    this.getTB();
    this.getHP();

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
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment
        .utc(date)
        .add(utc, "h")
        .format("DD MMM YYYY, HH:mm");
    }
  }
};
</script>