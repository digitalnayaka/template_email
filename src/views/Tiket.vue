<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon to="/tiket_saya">
        <v-icon>mdi-ticket</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <div class="display-1 font-weight-black">Tiket Tawar Bersama</div>
      <div>Untuk Iklan Tawar Bersama yang diiklankan oleh penjual terverifikasi, Anda membutuhkan tiket ini untuk bisa mengikuti iklan tersebut.</div>
    </div>

    <v-row dense>
      <v-col cols="12" align="center">
        <h4>Total Tiket</h4>
        {{ tiket.total }}
      </v-col>
    </v-row>

    <v-row dense class="text-center">
      <v-col cols="3">
        <h5>Tersedia</h5>
        {{ tiket.tersedia }}
      </v-col>

      <v-col cols="3">
        <h5>Terpakai</h5>
        {{ tiket.terpakai }}
      </v-col>

      <v-col cols="3">
        <h5>Refund</h5>
        {{ tiket.return }}
      </v-col>

      <v-col cols="3" class="red--text">
        <h5>Hangus</h5>
        {{ tiket.hangus }}
      </v-col>
    </v-row>

    <v-row dense class="text-center">
      <v-col cols="4" sm="4" xs="4">
        <v-card dark color="transparent" to="/beli_tiket">
          <v-img src="/img/beli-tiket.png"></v-img>
          <v-btn block small color="primary">Beli Tiket</v-btn>
        </v-card>
      </v-col>

      <v-col cols="4" sm="4" xs="4">
        <v-card dark color="transparent" to="/refund_tiket">
          <v-img class="center_image" src="/img/refund-tiket.png"></v-img>
          <v-btn block small color="red">Refund Tiket</v-btn>
        </v-card>
      </v-col>

      <v-col cols="4" sm="4" xs="4">
        <v-card dark color="transparent" to="/list_transaksi">
          <v-img class="center_image" src="/img/list-transaksi.png"></v-img>
          <v-btn block small color="amber darken-1">Daftar Transaksi</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <h3 class="mt-2">Daftar Pemakaian Tiket</h3>

    <div v-if="used.length > 0">
      <v-card
        v-for="item in used"
        :key="item.id_iklan"
        :to="item.id_mst_pembayaran_status == 0 ? '/detail_iklan/' + item.id_iklan : '/detail_transaksi/' + item.id_order"
        class="my-4"
      >
        <v-toolbar dense flat>
          <div>Tawar Bersama selesai pada:</div>

          <v-spacer></v-spacer>

          <div class="red--text">{{ item.tanggal_selesai | dateTimeFormat(utc) }} {{ waktu }}</div>
        </v-toolbar>

        <v-list class="pa-0">
          <v-list-item>
            <v-list-item-avatar rounded size="80">
              <v-img :src="getImage(item.photo)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.judul }}</v-list-item-title>
              <v-list-item-subtitle
                class="teal--text"
              >{{ item.jenis }} {{ item.type }} {{ item.type_tb }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title>Tawaran Terakhir</v-list-item-title>
              <v-list-item-subtitle
                style="color: black"
              >Rp {{ Number(item.bid_tertinggi).toLocaleString("id-ID") }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <div
            class="d-block pa-2 yellow darken-1 white--text text-center"
            v-if="item.id_mst_status_pemenang == 1"
          >{{ item.deskripsi_status }}</div>
          <div
            class="d-block pa-2 red accent-2 white--text text-center"
            v-if="item.id_mst_status_pemenang == 2"
          >
            <div v-if="item.id_mst_pembayaran_status == 3">{{ item.pembayaran_status }}</div>
            <div v-else>{{ item.deskripsi_status }}</div>
          </div>
          <div
            class="d-block pa-2 red accent-2 white--text text-center"
            v-if="item.id_mst_status_pemenang == 3"
          >{{ item.deskripsi_status }}</div>
          <div
            class="d-block pa-2 red accent-2 white--text text-center"
            v-if="item.id_mst_status_pemenang == 4"
          >{{ item.deskripsi_status }}</div>
        </v-list>
      </v-card>
    </div>

    <v-pagination
      v-model="page"
      @input="getTiket"
      :length="lengthPage"
      :total-visible="5"
      v-if="used.length > 0"
    ></v-pagination>

    <div align="center" v-else>
      <h3>Tidak ada data</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment-timezone";

export default {
  name: "tiket",
  data() {
    return {
      tiket: [],
      used: [],
      page: 1,
      lengthPage: 0,
      limit: 20,
      offset: 0,
      total: 0,
      utc: moment().utcOffset() / 60 - 7,
      waktu: "",
    };
  },
  methods: {
    totalTiket() {
      this.axios
        .get("/tiket/v1/total_tiket", {
          params: {
            id_app_user: this.user.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.tiket = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    getTiket() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/bid/v1/iklan_tb_peserta", {
          params: {
            id_app_user: this.user.id,
            use_tiket: true,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.used = data;
          this.total = response.data.count;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
  },
  created() {
    this.totalTiket();
    this.getTiket();

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