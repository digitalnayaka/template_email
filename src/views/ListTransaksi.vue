<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <h1>Daftar Transaksi Tiket Tawar Bersama</h1>

    <v-tabs background-color="teal" color="white" grow>
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab>Pembelian</v-tab>
      <v-tab>Refund</v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card color="basil" flat>
            <v-card-text>
              <v-row dense>
                <v-col
                  cols="12"
                  class="ma-0 pa-0"
                  v-for="item in group"
                  :key="item.id_mst_pembayaran_status"
                >
                  <h3>{{ item.pembayaran_status }}</h3>

                  <v-card
                    class="mx-2 mb-4"
                    outlined
                    v-for="subItem in item.found"
                    :key="subItem.id"
                    :to="'/upload_bukti/' + subItem.id"
                  >
                    <v-toolbar dense flat v-if="subItem.id_mst_pembayaran_status != 1">
                      <div>Nomor Order:</div>

                      <v-spacer></v-spacer>

                      <div class="red--text">{{ subItem.no_order }}</div>
                    </v-toolbar>

                    <v-toolbar dense flat v-else>
                      <div>Bayar Sebelum:</div>

                      <v-spacer></v-spacer>

                      <div
                        class="red--text"
                      >{{ subItem.expired_at | dateTimeFormat(utc) }} {{ waktu }}</div>
                    </v-toolbar>

                    <v-list class="pa-0">
                      <v-list-item>
                        <v-list-item-avatar rounded size="80">
                          <v-img src="/img/tiket.png"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>Tiket Tawar Bersama</v-list-item-title>

                          <v-list-item-subtitle
                            class="teal--text"
                          >Jumlah Pembelian: {{ subItem.jumlah }} Tiket</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-title>Total Pembayaran</v-list-item-title>

                          <v-list-item-subtitle>Rp {{ Number(subItem.total_pembayaran).toLocaleString("id-ID") }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <div
                      class="d-block pa-2 amber darken-1 white--text text-center"
                      v-if="subItem.id_mst_pembayaran_status == 1"
                    >Menunggu pembayaran</div>

                    <div
                      class="d-block pa-2 blue darken-1 white--text text-center"
                      v-if="subItem.id_mst_pembayaran_status == 2"
                    >Pembayaran Diverifikasi</div>

                    <div
                      class="d-block pa-2 red accent-2 white--text text-center"
                      v-if="subItem.id_mst_pembayaran_status == 3"
                    >Expired</div>

                    <div
                      class="d-block pa-2 teal accent-4 white--text text-center"
                      v-if="subItem.id_mst_pembayaran_status == 4"
                    >Menunggu Verifikasi</div>

                    <div
                      class="d-block pa-2 red accent-2 white--text text-center"
                      v-if="subItem.id_mst_pembayaran_status == 5"
                    >Dibatalkan</div>

                    <div
                      class="d-block pa-2 red accent-2 white--text text-center"
                      v-if="subItem.id_mst_pembayaran_status == 6"
                    >Ditolak</div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card color="basil" flat>
            <v-card-text>
              <v-row dense>
                <v-col
                  cols="12"
                  class="ma-0 pa-0"
                  v-for="item in group2"
                  :key="item.id_mst_pembayaran_status"
                >
                  <h3>{{ item.pembayaran_status }}</h3>

                  <v-card
                    class="mx-2 mb-4"
                    outlined
                    v-for="subItem in item.found"
                    :key="subItem.id"
                    :to="'/transaksi_refund/' + subItem.id"
                  >
                    <v-toolbar dense flat v-if="subItem.id_mst_pembayaran_status != 1">
                      <div>Nomor Order:</div>

                      <v-spacer></v-spacer>

                      <div class="red--text">{{ subItem.no_order }}</div>
                    </v-toolbar>

                    <v-toolbar dense flat v-else>
                      <div>Bayar Sebelum:</div>

                      <v-spacer></v-spacer>

                      <div
                        class="red--text"
                      >{{ subItem.expired_at | dateTimeFormat(utc) }} {{ waktu }}</div>
                    </v-toolbar>

                    <v-list class="pa-0">
                      <v-list-item>
                        <v-list-item-avatar rounded size="80">
                          <v-img src="/img/tiket.png"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>Tiket Tawar Bersama</v-list-item-title>

                          <v-list-item-subtitle class="teal--text">Jumlah Pembelian: Tiket</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-title>Total Pembayaran</v-list-item-title>
                          <v-list-item-subtitle>Rp 0</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <div
                      class="d-block pa-2 amber darken-1 white--text text-center"
                      v-if="subItem.id_mst_pembayaran_status == 1"
                    >Menunggu pembayaran</div>

                    <div
                      class="d-block pa-2 blue darken-1 white--text text-center"
                      v-if="subItem.id_mst_pembayaran_status == 2"
                    >Pembayaran Diverifikasi</div>

                    <div
                      class="d-block pa-2 red accent-2 white--text text-center"
                      v-if="subItem.id_mst_pembayaran_status == 3"
                    >Expired</div>

                    <div
                      class="d-block pa-2 teal accent-4 white--text text-center"
                      v-if="subItem.id_mst_pembayaran_status == 4"
                    >Menunggu Verifikasi</div>

                    <div
                      class="d-block pa-2 red accent-2 white--text text-center"
                      v-if="subItem.id_mst_pembayaran_status == 6"
                    >Ditolak</div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <v-pagination v-model="page" @input="loadData" :length="lengthPage" :total-visible="5"></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment-timezone";

export default {
  name: "ListTransaksi",
  data() {
    return {
      search: "",
      orders: [],
      orderStatus: [],
      group: [],
      tab: null,
      refunds: [],
      refundStatus: [],
      group2: [],
      page: 1,
      lengthPage: 0,
      limit: 20,
      offset: 0,
      total: 0,
      utc: moment().utcOffset() / 60 - 7,
      waktu: ""
    };
  },
  methods: {
    loadData() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/transaksi/v1/order", {
          headers: { Authorization: "Bearer " + this.user.token },
          params: {
            id_pembeli: this.user.id,
            offset: offset,
            limit: this.limit
          }
        })
        .then(response => {
          let { data } = response.data;
          this.orders = data;
          this.total = response.data.count;
          this.lengthPage = Math.ceil(this.total / this.limit);

          this.orderStatus = [];

          const map = new Map();
          for (const item of this.orders) {
            if (!map.has(item.id_mst_pembayaran_status)) {
              map.set(item.id_mst_pembayaran_status, true);
              this.orderStatus.push({
                id_mst_pembayaran_status: item.id_mst_pembayaran_status,
                pembayaran_status: item.pembayaran_status
              });
            }
          }

          this.group = [];

          for (let index = 0; index < this.orderStatus.length; index++) {
            const id_mst_pembayaran_status = this.orderStatus[index]
              .id_mst_pembayaran_status;
            const pembayaran_status = this.orderStatus[index].pembayaran_status;

            let found = this.orders.filter(
              element =>
                element.id_mst_pembayaran_status == id_mst_pembayaran_status
            );
            this.group.push({
              id_mst_pembayaran_status: id_mst_pembayaran_status,
              pembayaran_status: pembayaran_status,
              found
            });
          }
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    listRefund() {
      this.axios
        .get("/transaksi/v1/pencairan_tiket", {
          params: {
            id_penjual: this.user.id,
            limit: this.limit
          }
        })
        .then(response => {
          let { data } = response.data;
          this.refunds = data;

          const map = new Map();
          for (const item of this.refunds) {
            if (!map.has(item.id_mst_pembayaran_status)) {
              map.set(item.id_mst_pembayaran_status, true);
              this.refundStatus.push({
                id_mst_pembayaran_status: item.id_mst_pembayaran_status,
                pembayaran_status: item.pembayaran_status
              });
            }
          }

          for (let index = 0; index < this.refundStatus.length; index++) {
            const id_mst_pembayaran_status = this.refundStatus[index]
              .id_mst_pembayaran_status;
            const pembayaran_status = this.refundStatus[index]
              .pembayaran_status;

            let found = this.refunds.filter(
              element =>
                element.id_mst_pembayaran_status == id_mst_pembayaran_status
            );
            this.group2.push({
              id_mst_pembayaran_status: id_mst_pembayaran_status,
              pembayaran_status: pembayaran_status,
              found
            });
          }
        })
        .catch(error => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_meesage
          });
        });
    }
  },
  created() {
    this.loadData();
    this.listRefund();

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
        .format("DD MMM YYYY HH:mm");
    }
  }
};
</script>