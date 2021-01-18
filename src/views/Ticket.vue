<template>
  <v-container fluid>
    <v-app-bar app color="#22939E" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div>
      <div class="display-1 font-weight-black text-center">
        Tiket Tawar Bersama
      </div>

      <v-card color="blue lighten-4">
        <div class="d-flex align-center">
          <v-avatar class="ma-3" size="20" tile>
            <v-img src="/img/error.png"></v-img>
          </v-avatar>

          <v-card-text
            ><p>{{ events.deskripsi }}</p>
            <p class="font-weight-bold">
              Informasi mengenai Tiket dapat dilihat
              <a href="/ticket-rules">disini</a>
            </p></v-card-text
          >
        </div>
      </v-card>
    </div>

    <v-row>
      <v-col cols="12" align="center">
        <h2>Total Tiket</h2>
        <h2>{{ tiket.total }}</h2>
      </v-col>
    </v-row>

    <div class="d-flex justify-space-around">
      <div class="text-center">
        <div class="font-weight-bold">Tersedia</div>
        <div>{{ tiket.tersedia }}</div>
      </div>

      <v-divider vertical></v-divider>

      <div class="text-center">
        <div class="font-weight-bold">Terpakai</div>
        <div>{{ tiket.terpakai }}</div>
      </div>

      <v-divider vertical></v-divider>

      <div class="text-center">
        <div class="font-weight-bold">Refund</div>
        <div>{{ tiket.return }}</div>
      </div>

      <v-divider vertical></v-divider>

      <div class="text-center red--text">
        <div class="font-weight-bold">Hangus</div>
        <div>{{ tiket.hangus }}</div>
      </div>

      <v-divider vertical></v-divider>

      <div class="text-center red--text">
        <div class="font-weight-bold">Expired</div>
        <div>{{ tiket.kadaluarsa }}</div>
      </div>
    </div>

    <v-row class="text-center">
      <v-col cols="6">
        <v-avatar tile size="100">
          <v-img src="/img/icons/ic_refund_tiket.png"></v-img>
        </v-avatar>

        <v-btn block color="red" dark to="/refund-ticket" rounded>
          Refund Tiket
        </v-btn>
      </v-col>

      <v-col cols="6">
        <v-avatar tile size="100">
          <v-img src="/img/icons/ic_beli_tiket.png"></v-img>
        </v-avatar>

        <v-btn block color="primary" to="/get-ticket" rounded>
          Dapatkan Tiket
        </v-btn>
      </v-col>
    </v-row>

    <v-tabs v-model="tab" grow show-arrows>
      <v-tab>Daftar Transaksi Tiket</v-tab>
      <v-tab>Tiket Saya</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
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

      <v-tab-item>
        <v-tabs v-model="subTab" grow show-arrows>
          <v-tab>Tersedia</v-tab>
          <v-tab>Dicairkan</v-tab>
          <v-tab>Hangus</v-tab>
          <v-tab>Expired</v-tab>

          <v-tabs-items v-model="subTab">
            <v-tab-item>
              <div v-if="tersedia.length > 0">
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                    v-for="item in tersedia"
                    :key="item.id"
                  >
                    <list-tiket :item="item" />
                  </v-col>
                </v-row>

                <v-pagination
                  v-model="pageTersedia"
                  @input="tiketTersedia"
                  :length="lengthPageTersedia"
                  :total-visible="5"
                ></v-pagination>
              </div>
            </v-tab-item>

            <v-tab-item>
              <div v-if="dicairkan.length > 0">
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                    v-for="item in dicairkan"
                    :key="item.id"
                  >
                    <list-tiket :item="item" />
                  </v-col>
                </v-row>

                <v-pagination
                  v-model="pageDicairkan"
                  @input="tiketDicairkan"
                  :length="lengthPageDicairkan"
                  :total-visible="5"
                ></v-pagination>
              </div>
            </v-tab-item>

            <v-tab-item>
              <div v-if="hangus.length > 0">
                <v-row>
                  <v-col cols="12" sm="4" v-for="item in hangus" :key="item.id">
                    <list-tiket :item="item" />
                  </v-col>
                </v-row>

                <v-pagination
                  v-model="pageHangus"
                  @input="tiketHangus"
                  :length="lengthPageHangus"
                  :total-visible="5"
                ></v-pagination>
              </div>
            </v-tab-item>

            <v-tab-item>
              <div v-if="expired.length > 0">
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                    v-for="item in expired"
                    :key="item.id"
                  >
                    <list-tiket :item="item" />
                  </v-col>
                </v-row>

                <v-pagination
                  v-model="pageExpired"
                  @input="tiketExpired"
                  :length="lengthPageExpired"
                  :total-visible="5"
                ></v-pagination>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "tiket",
  props: ["utc", "timezone"],
  components: {
    TicketTransaction: () =>
      import(
        /* webpackChunkName: "ticket-transaction" */ "@/components/TicketTransaction.vue"
      ),
    ListTiket: () =>
      import(/* webpackChunkName: "list-tiket" */ "@/components/ListTiket.vue"),
  },
  data() {
    return {
      events: [],
      tiket: [],
      used: [],
      tab: 0,
      subTab: 0,
      subTab2: 0,
      tersedia: [],
      dicairkan: [],
      hangus: [],
      expired: [],
      orders: [],
      orderStatus: [],
      group: [],
      refunds: [],
      refundStatus: [],
      group2: [],
      pageTersedia: 1,
      lengthPageTersedia: 0,
      totalTersedia: 0,
      pageDicairkan: 1,
      lengthPageDicairkan: 0,
      totalDicairkan: 0,
      pageHangus: 1,
      lengthPageHangus: 0,
      totalHangus: 0,
      pageExpired: 1,
      lengthPageExpired: 0,
      totalExpired: 0,
      pagePembelian: 1,
      lengthPagePembelian: 0,
      totalPembelian: 0,
      pageRF: 1,
      lengthPageRF: 0,
      totalRF: 0,
      narasiTiket: [],
      limit: 15,
      offset: 0,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    getEvent() {
      this.axios
        .get("/master/v3/mst_event_promo", {
          params: {
            id_modul: 1,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.events = data[0];
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          
        });
    },
    totalTiket() {
      this.axios
        .get("/tiket/v3/total_tiket", {
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
          console.log(responses.api_message);
          
        });
    },
    getTiket() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/bid/v3/iklan_tb_peserta", {
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
    tiketTersedia() {
      var offset = (this.pageTersedia - 1) * this.limit;

      this.axios
        .get("/tiket/v3/tiket", {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 1,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.tersedia = data.data;

          this.totalTersedia = data.count;
          this.lengthPageTersedia = Math.ceil(this.totalTersedia / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          
        });
    },
    tiketDicairkan() {
      var offset = (this.pageDicairkan - 1) * this.limit;

      this.axios
        .get("/tiket/v3/tiket", {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 3,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.dicairkan = data.data;

          this.totalDicairkan = data.count;
          this.lengthPageDicairkan = Math.ceil(
            this.totalDicairkan / this.limit
          );
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          
        });
    },
    tiketHangus() {
      var offset = (this.pageHangus - 1) * this.limit;

      this.axios
        .get("/tiket/v3/tiket", {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 5,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.hangus = data.data;

          this.totalHangus = data.count;
          this.lengthPageHangus = Math.ceil(this.totalHangus / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          
        });
    },
    tiketExpired() {
      var offset = (this.pageExpired - 1) * this.limit;

      this.axios
        .get("/tiket/v3/tiket", {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 2,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.expired = data.data;

          this.totalExpired = data.count;
          this.lengthPageExpired = Math.ceil(this.totalExpired / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          
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
          this.orders = data.data;

          this.totalPembelian = data.count;
          this.lengthPagePembelian =
            this.totalPembelian == 0
              ? 1
              : Math.ceil(this.totalPembelian / this.limit);

          this.orderStatus = [];

          const map = new Map();
          for (const item of this.orders) {
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

            let found = this.orders.filter(
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
          
        });
    },
  },
  created() {
    this.getEvent();
    this.totalTiket();
    this.loadData();
    this.listRefund();
    this.tiketTersedia();
    this.tiketDicairkan();
    this.tiketHangus();
    this.tiketExpired();
  },
};
</script>