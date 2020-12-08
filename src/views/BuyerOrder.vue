<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <h2>Daftar Transaksi</h2>

    <v-tabs
      v-model="tab"
      background-color="blue-grey"
      dark
      slider-color="teal"
      show-arrows
    >
      <v-tab>Tawar Bersama</v-tab>
      <v-tab>Tiket</v-tab>
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
              @click="filterStatus"
            >
              <v-img
                :src="tag.img"
                contain
                width="30"
                height="30"
                class="mr-1"
              ></v-img>
              {{ tag.text }}
              <span class="ml-1" v-if="tag.id == chip">
                ({{ orders.length }})
              </span>
            </v-chip>
          </div>
        </v-chip-group>

        <v-card
          outlined
          class="mt-2 mb-4 rounded-lg"
          color="blue-grey lighten-5"
          v-for="item in orders"
          :key="item.id"
          :to="'/detail-transaksi/' + item.id"
        >
          <v-row dense class="mx-2">
            <v-col cols="6">
              <div>{{ item.nama_penjual }}</div>
            </v-col>

            <v-col cols="6" align="right">
              <div
                class="orange--text font-weight-bold"
                v-if="item.id_mst_pembayaran_status == 1"
              >
                {{ item.pembayaran_status }}
              </div>
              <div
                class="green--text font-weight-bold"
                v-if="item.id_mst_pembayaran_status == 2"
              >
                {{ item.pembayaran_status }}
              </div>
              <div
                class="red--text font-weight-bold"
                v-if="item.id_mst_pembayaran_status == 3"
              >
                {{ item.pembayaran_status }}
              </div>
              <div
                class="orange--text font-weight-bold"
                v-if="item.id_mst_pembayaran_status == 4"
              >
                {{ item.pembayaran_status }}
              </div>
              <div
                class="red--text font-weight-bold"
                v-if="item.id_mst_pembayaran_status == 6"
              >
                {{ item.pembayaran_status }}
              </div>
              <div
                class="orange--text font-weight-bold"
                v-if="item.id_mst_pembayaran_status == 10"
              >
                {{ item.pembayaran_status }}
              </div>
              <div
                class="red--text font-weight-bold"
                v-if="item.id_mst_pembayaran_status == 11"
              >
                {{ item.pembayaran_status }}
              </div>
              <div
                class="red--text font-weight-bold"
                v-if="item.id_mst_pembayaran_status == 12"
              >
                {{ item.pembayaran_status }}
              </div>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row dense align="center">
            <v-col cols="10" sm="6">
              <v-list color="blue-grey lighten-5">
                <v-list-item>
                  <v-list-item-avatar tile size="100">
                    <v-img :src="getImage(item.iklan.photo)" contain></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-subtitle>Tawar Bersama</v-list-item-subtitle>

                    <v-list-item-title class="font-weight-bold">
                      <a :href="'/iklan/' + item.id_iklan">{{
                        item.iklan.judul
                      }}</a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" sm="6">
              <v-list  color="blue-grey lighten-5">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Tawaran Anda</v-list-item-subtitle>

                    <v-list-item-title class="font-weight-bold">
                      Rp
                      {{
                        Number(item.total_pembayaran).toLocaleString("id-ID")
                      }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="teal" dark :to="'/chat/' + item.id_penjual">
              Hubungi Penjual
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-pagination
          v-model="page"
          @input="filterStatus"
          :length="lengthPage"
          :total-visible="5"
        ></v-pagination>
      </v-tab-item>

      <v-tab-item>
        <v-tabs v-model="subTab2" grow>
          <v-tab>Tiket Didapat</v-tab>
          <v-tab>Refund Tiket</v-tab>

          <v-tab-item>
            <div v-if="group.length > 0">
              <ticket-transaction
                :group="group"
                :utc="utc"
                :timezone="timezone"
                type="pembelian"
              />

              <v-pagination
                v-model="pagePembelian"
                @input="loadData"
                :length="lengthPagePembelian"
                :total-visible="5"
              ></v-pagination>
            </div>
          </v-tab-item>

          <v-tab-item>
            <div v-if="group2.length > 0">
              <ticket-transaction
                :group="group2"
                :utc="utc"
                :timezone="timezone"
                type="refund"
              />

              <v-pagination
                v-model="pageRF"
                @input="listRefund"
                :length="lengthPageRF"
                :total-visible="5"
              ></v-pagination>
            </div>
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
// import "firebase/firestore";
// import { db } from "../main";

export default {
  name: "buyer-order",
  props: ["utc", "timezone"],
  components: {
    TicketTransaction: () =>
      import(
        /* webpackChunkName: "ticket-transaction" */ "@/components/TicketTransaction.vue"
      ),
  },
  data() {
    return {
      tab: Number(this.$route.query.tab),
      chip: Number(this.$route.query.id),
      tags: [
        { id: 0, img: "/img/icons/semua.webp", text: "Semua" },
        {
          id: 10,
          img: "/img/icons/menunggu_persetujuan.webp",
          text: "Menunggu Persetujuan",
        },
        {
          id: 1,
          img: "/img/icons/menunggu_pembayaran.webp",
          text: "Menunggu Pembayaran",
        },
        {
          id: 4,
          img: "/img/icons/menunggu_verifikasi.webp",
          text: "Menunggu Verifikasi",
        },
        { id: 6, img: "/img/icons/ditolak.webp", text: "Ditolak" },
        {
          id: 2,
          img: "/img/icons/pembayaran_diverifikasi.webp",
          text: "Pembayaran Diverifikasi",
        },
        { id: 5, img: "/img/icons/dibatalkan.webp", text: "Dibatalkan" },
        { id: 3, img: "/img/icons/expired.webp", text: "Expired" },
      ],
      orders: [],
      page: 1,
      offset: 0,
      limit: 20,
      total: 0,
      lengthPage: 0,
      subTab2: 0,
      pagePembelian: 1,
      lengthPagePembelian: 0,
      totalPembelian: 0,
      tickets: [],
      orderStatus: [],
      group: [],
      pageRF: 1,
      lengthPageRF: 0,
      totalRF: 0,
      refunds: [],
      refundStatus: [],
      group2: [],
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAds: "ads/setAds",
    }),
    getTransaksi() {
      let offset = (this.page - 1) * this.limit;

      let params = new URLSearchParams();
      params.set("id_pembeli", this.user.id);
      params.set("id_mst_order_jenis_iklan", 2);
      if (this.chip > 0) {
        params.set("id_mst_pembayaran_status", this.chip);
      }
      params.set("offset", offset);
      params.set("limit", this.limit);

      let request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/transaksi/v3/order", request)
        .then((response) => {
          let { data } = response.data;
          this.orders = data;

          this.total = response.data.count;
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
        });
    },
    filterStatus() {
      this.$nextTick(() => {
        this.getTransaksi();
      });
    },
    loadData() {
      var offset = (this.pagePembelian - 1) * this.limit;

      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_pembeli: this.user.id,
            id_penjual: 1,
            id_mst_order_type: 1,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.tickets = data.data;

          this.totalPembelian = data.count;
          this.lengthPagePembelian =
            this.totalPembelian == 0
              ? 1
              : Math.ceil(this.totalPembelian / this.limit);

          this.orderStatus = [];

          const map = new Map();
          for (const item of this.tickets) {
            if (!map.has(item.id_mst_pembayaran_status)) {
              map.set(item.id_mst_pembayaran_status, true);
              this.orderStatus.push({
                id_mst_pembayaran_status: item.id_mst_pembayaran_status,
                pembayaran_status: item.pembayaran_status,
              });
            }
          }

          this.group = [];

          for (let index = 0; index < this.orderStatus.length; index++) {
            const id_mst_pembayaran_status = this.orderStatus[index]
              .id_mst_pembayaran_status;
            const pembayaran_status = this.orderStatus[index].pembayaran_status;

            let found = this.tickets.filter(
              (element) =>
                element.id_mst_pembayaran_status == id_mst_pembayaran_status
            );
            this.group.push({
              id_mst_pembayaran_status: id_mst_pembayaran_status,
              pembayaran_status: pembayaran_status,
              found,
            });
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
        });
    },
    listRefund() {
      var offset = (this.pageRF - 1) * this.limit;

      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_penjual: this.user.id,
            id_pembeli: 1,
            id_mst_order_type: 2,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.refunds = data.data;

          this.totalRF = data.count;
          this.lengthPageRF =
            this.totalRF == 0 ? 1 : Math.ceil(this.totalRF / this.limit);

          const map = new Map();
          for (const item of this.refunds) {
            if (!map.has(item.id_mst_pembayaran_status)) {
              map.set(item.id_mst_pembayaran_status, true);
              this.refundStatus.push({
                id_mst_pembayaran_status: item.id_mst_pembayaran_status,
                pembayaran_status: item.pembayaran_status,
              });
            }
          }

          for (let index = 0; index < this.refundStatus.length; index++) {
            const id_mst_pembayaran_status = this.refundStatus[index]
              .id_mst_pembayaran_status;
            const pembayaran_status = this.refundStatus[index]
              .pembayaran_status;

            let found = this.refunds.filter(
              (element) =>
                element.id_mst_pembayaran_status == id_mst_pembayaran_status
            );
            this.group2.push({
              id_mst_pembayaran_status: id_mst_pembayaran_status,
              pembayaran_status: pembayaran_status,
              found,
            });
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  created() {
    this.getTransaksi();
    this.loadData();
    this.listRefund();
  },
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY, HH:mm");
    },
  },
};
</script>