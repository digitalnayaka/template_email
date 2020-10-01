<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-tabs background-color="teal" dark grow>
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab>Berlangsung</v-tab>
      <v-tab>Selesai</v-tab>

      <v-tab-item>
        <v-card
          v-for="item in berlangsung"
          :key="item.id_iklan"
          :to="'/detail_iklan/' + item.id_iklan"
          class="my-4"
        >
          <v-toolbar dense flat>
            <div>Tawar Bersama selesai pada:</div>

            <v-spacer></v-spacer>

            <div class="red--text">{{ item.tanggal_selesai | dateTimeFormat(utc) }} {{ waktu }}</div>
          </v-toolbar>

          <v-list>
            <v-list-item>
              <v-list-item-avatar rounded size="80">
                <v-img :src="getImage(item.photo)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-black">{{ item.judul }}</v-list-item-title>

                <v-list-item-subtitle
                  class="teal--text"
                >Tawar Bersama {{ item.type }} {{ item.type_tb }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title v-if="item.id_mst_status_pemenang == 1">Tawaran anda</v-list-item-title>

                <v-list-item-title v-if="item.id_mst_status_pemenang == 3">Tawaran saat ini</v-list-item-title>

                <v-list-item-subtitle>Rp {{ Number(item.bid_tertinggi).toLocaleString("id-ID") }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <div
            class="d-block pa-2 amber darken-1 white--text text-center"
            v-if="item.id_mst_status_pemenang == 1"
          >{{item.deskripsi_status}}</div>

          <div
            class="d-block pa-2 red darken-1 white--text text-center"
            v-if="item.id_mst_status_pemenang == 3"
          >{{item.deskripsi_status}}</div>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card
          v-for="item in selesai"
          :key="item.id_iklan"
          :to="item.id_order == 0 ? '/tawar_bersama_selesai/' + item.id_iklan : '/detail-transaksi/' + item.id_order"
          class="my-4"
        >
          <v-toolbar dense flat>
            <div>Tawar Bersama selesai pada:</div>

            <v-spacer></v-spacer>

            <div class="red--text">{{ item.tanggal_selesai | dateTimeFormat(utc) }} {{ waktu }}</div>
          </v-toolbar>

          <v-list>
            <v-list-item>
              <v-list-item-avatar rounded size="80">
                <v-img :src="getImage(item.photo)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-black">{{ item.judul }}</v-list-item-title>

                <v-list-item-subtitle
                  class="teal--text"
                >{{ item.jenis }} {{ item.type }} {{ item.type_tb }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>Tawaran Terakhir</v-list-item-title>

                <v-list-item-subtitle>Rp {{ Number(item.bid_tertinggi).toLocaleString("id-ID") }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <div v-if="item.id_mst_status_pemenang == 2">
            <div
              class="d-block pa-2 amber darken-2 white--text text-center"
              v-if="item.id_mst_pembayaran_status == 1"
            >{{ item.pembayaran_status }}</div>

            <div
              class="d-block pa-2 blue darken-2 white--text text-center"
              v-else-if="item.id_mst_pembayaran_status == 4"
            >{{ item.pembayaran_status }} Penjual</div>

            <div
              class="d-block pa-2 teal accent-4 white--text text-center"
              v-else-if="item.id_mst_pembayaran_status == 2"
            >{{ item.pembayaran_status }}</div>

            <div
              class="d-block pa-2 red darken-1 white--text text-center"
              v-else
            >{{ item.pembayaran_status }}</div>
          </div>

          <div v-if="item.id_mst_status_pemenang == 4">
            <div
              class="d-block pa-2 red darken-1 white--text text-center"
              v-if="item.id_mst_pembayaran_status == 0"
            >{{ item.deskripsi_status }}</div>
          </div>
        </v-card>

        <v-pagination v-model="page" @input="getTBSelesai" :length="lengthPage" :total-visible="5"></v-pagination>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment-timezone";

export default {
  name: "aktivitas_tb",
  data() {
    return {
      berlangsung: [],
      selesai: [],
      utc: moment().utcOffset() / 60 - 7,
      waktu: "",
      page: 1,
      lengthPage: 0,
      limit: 20,
      offset: 0,
      total: 0,
    };
  },
  methods: {
    getTBBerlangsung() {
      this.axios
        .get("/bid/v3/iklan_tb_peserta", {
          params: {
            id_app_user: this.user.id,
            id_mst_iklan_status: 1,
            id_mst_iklan_jenis: 2,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.berlangsung = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getTBSelesai() {
      var offset = (this.page - 1) * this.limit;

      var params = new URLSearchParams();

      params.append("id_app_user", this.user.id);
      params.append("id_mst_iklan_status", 2);
      params.append("id_mst_iklan_status", 3);
      params.append("id_mst_iklan_status", 4);
      params.append("id_mst_iklan_status", 6);
      params.append("id_mst_iklan_status", 9);
      params.append("id_mst_iklan_jenis", 2);
      params.append("offset", offset);
      params.append("limit", this.limit);

      var request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/bid/v3/iklan_tb_peserta", request)
        .then((response) => {
          let { data } = response.data;
          this.selesai = data;

          this.total = response.data.count;
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
  },

  created() {
    this.getTBBerlangsung();
    this.getTBSelesai();

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
      user: "auth/user",
    }),
  },
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY, HH:mm");
    },
  },
};
</script>