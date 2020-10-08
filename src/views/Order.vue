<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <h2>Daftar Penjualan</h2>

    <v-tabs v-model="tab" slider-color="teal" show-arrows>
      <v-tab>Tawar Bersama</v-tab>
      <v-tab>Harga Pas</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="pa-4">
      <v-tab-item>
        <v-chip-group v-model="chip" mandatory active-class="primary--text">
          <div class="d-flex flex-nowrap align-center">
            <h4 class="mr-2">Status</h4>

            <v-chip
              v-for="tag in tags"
              :key="tag.id"
              :value="tag.id"
              @click="tbAktivitas"
            >
              {{ tag.text }}
            </v-chip>
          </div>
        </v-chip-group>

        <v-card class="mb-4" v-for="item in aktivitasTB" :key="item.id">
          <div class="grey lighten-3">
            <div class="mx-2 py-2">
              Tawar Bersama selesai pada:
              {{ item.iklan.tanggal_selesai | dateTimeFormat(utc) }}
              {{ timezone }} |
              <span class="font-weight-bold">({{ item.buyer.nama }})</span>
            </div>
          </div>

          <v-row no-gutters>
            <v-col cols="12" sm="4">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar tile size="70">
                    <v-img :src="getImage(item.iklan.photo)"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">
                      {{ item.iklan.judul }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Tawar Bersama
                      {{ item.iklan.type }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" sm="4">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> Tawaran Terakhir </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ Number(item.iklan.bid).toLocaleString("id-ID") }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" sm="4">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> Jumlah Penawar </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.bidder.length }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>

        <v-pagination
          v-model="page"
          @input="tawarBersama"
          :length="lengthPage"
          :total-visible="5"
        ></v-pagination>
      </v-tab-item>
    </v-tabs-items>

    <!-- <v-data-table
      :headers="headers"
      :items="iklan"
      :search="search"
      hide-default-footer
      :page="page"
      hide-default-header
      headers-length="4"
    >
      <template v-slot:item.id_iklan="{ item }">
        <v-card class="my-4">
          <div class="grey lighten-3">
            <div class="mx-2 py-2">
              Nomor Order: {{ item.id }}
              <span class="font-weight-bold">({{ item.nama_pembeli }})</span>
              {{ item.created_at | dateTimeFormat(utc) }} {{timezone}}
              <span class="ml-4">Batas Respons <span class="orange">1 hari</span></span>
            </div>
          </div>

          <v-row dense>
            <v-col cols="12" sm="4">
          <v-list>
            <v-list-item :to="'/iklan/' + item._source.id">
              <v-list-item-avatar tile size="50">
                <v-img :src="getImage(item._source.photo)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item._source.judul }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          </v-col>
          </v-row>
        </v-card>
      </template>

      <template v-slot:no-data>Belum ada unit terjual.</template>
    </v-data-table> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
import "firebase/firestore";
import { db } from "../main";

export default {
  name: "manage-ads",
  props: ["utc", "timezone"],
  data() {
    return {
      tab: 0,
      chip: Number(this.$route.query.id),
      tags: [
        { id: 0, text: "Semua" },
        { id: 10, text: "Menunggu Persetujuan" },
        { id: 1, text: "Menunggu Pembayaran" },
        { id: 4, text: "Menunggu Verifikasi" },
        { id: 6, text: "Ditolak" },
        { id: 2, text: "Pembayaran Diverifikasi" },
        { id: 5, text: "Dibatalkan" },
        { id: 3, text: "Expired" },
      ],
      search: "",
      value: 0,
      items: [],
      headers: [
        { text: "Info Iklan", value: "id_iklan" },
        // { text: "Jenis Iklan", value: "_source.mst_iklan_jenis" },
        // { text: "Harga", value: "_source.harga_awal" },
        // { text: "Status", value: "_source.mst_iklan_status" },
        // { text: "Actions", value: "actions", sortable: false },
      ],
      tawarBersama: [],
      buyer: [],
      aktivitasTB: [],
      hits: [],
      orders: [],
      iklan: [],
      bidder: [],
      dialog: false,
      valid: true,
      formRules: [(v) => !!v || "Field is required"],
      judul: "",
      deskripsi: "",
      page: 1,
      offset: 0,
      limit: 20,
      total: 0,
      lengthPage: 0,
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAds: "ads/setAds",
    }),
    tbAktivitas() {
      var offset = (this.page - 1) * this.limit;

      var params = new URLSearchParams();
      params.set("id_app_user", this.user.id);
      params.set("id_mst_iklan_status", 3);
      params.append("id_mst_iklan_status", 2);
      if (this.chip > 0) {
        params.set("id_mst_pembayaran_status", this.chip);
      }
      params.set("offset", offset);
      params.set("limit", this.limit);

      var request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/iklan/v3/iklan_tb_aktivitas", request)
        .then((response) => {
          let { data } = response.data;
          this.tawarBersama = data;
          this.getUser();
          for (let i = 0; i < this.tawarBersama.length; i++) {
            this.getBid(this.tawarBersama[i].id);
          }
          this.totalTB = response.data.count;
          this.lengthPageTB = Math.ceil(this.totalTB / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getUser() {
      let params = new URLSearchParams();
      for (let i = 0; i < this.tawarBersama.length; i++) {
        params.append("id", this.tawarBersama[i].id_app_pemenang);
      }
      params.set("limit", this.tawarBersama.length);
      let request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/user/v3/user", request)
        .then((response) => {
          let { data } = response.data;
          this.buyer = data;

          for (let i = 0; i < this.tawarBersama.length; i++) {
            let buyer = this.buyer.filter(
              (item) => item.id == this.tawarBersama[i].id_app_pemenang
            );
            let bidder = this.bidder.filter(
              (item) => item.IdIklan == this.tawarBersama[i].id
            );
            this.aktivitasTB.push({
              iklan: this.tawarBersama[i],
              buyer: buyer[0],
              bidder: bidder,
            });
          }

          this.totalTB = response.data.count;
          this.lengthPageTB = Math.ceil(this.totalTB / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getTB() {
      var offset = (this.page - 1) * this.limit;

      var params = new URLSearchParams();
      params.set("id_app_user", this.user.id);
      params.set("id_mst_iklan_status", 3);
      params.set("id_mst_iklan_status", 2);
      params.set("id_mst_iklan_jenis", 2);
      params.set("search", this.search == null ? "" : this.search);
      params.set("offset", offset);
      params.set("limit", this.limit);

      var request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/search/v3/search", request)
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits;
          this.getOrder();

          this.total = data.hits.total.value;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getOrder() {
      let params = new URLSearchParams();
      for (let i = 0; i < this.hits.length; i++) {
        params.append("id_iklan", this.hits[i]._source.id);
      }
      if (this.chip > 0) {
        params.set("id_mst_pembayaran_status", this.chip);
      }
      let request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/transaksi/v3/order", request)
        .then((response) => {
          let { data } = response.data;
          this.orders = data;
          this.iklan = [];

          for (let i = 0; i < this.hits.length; i++) {
            let id_iklan = this.hits[i]._source.id;
            let order = this.orders.filter((item) => item.id_iklan == id_iklan);
            let now = moment(order[0].created_at);
            let then = moment(order[0].expired_at);
            let diff = moment.duration(moment(then).diff(moment(now)));
            this.getBid(id_iklan);
            this.iklan.push({ ...this.hits[i], ...order[0], diff: diff._data });
          }
        })
        .catch((error) => {
          // let responses = error.response.data;
          console.log(error);
          // console.log(responses);
        });
    },
    getBid(id) {
      db.collection("tawar_bersama")
        .doc("iklan")
        .collection(String(id))
        .orderBy("Bid", "desc")
        .onSnapshot((querySnapshot) => {
          let bidder = [];
          querySnapshot.forEach((doc) => {
            bidder = doc.data();
          });
          this.bidder.push(bidder);
        });
    },
    filter(id) {
      this.$nextTick(() => {
        this.value = id;
        this.getTB();
      });
    },
    getStatus() {
      this.axios
        .get("/iklan/v3/mst_iklan_status")
        .then((response) => {
          let { data } = response.data;
          this.items = data;
          this.items.splice(0, 0, { id: 0, status: "Semua" });
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  created() {
    this.tbAktivitas();
    // this.getTB();
    this.getStatus();
  },
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY, HH:mm");
    },
  },
};
</script>