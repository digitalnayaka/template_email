<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-tabs v-model="tab" grow>
      <v-tab>Daftar Transaksi Tiket</v-tab>
      <v-tab>Tiket Saya</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-tabs v-model="subTab2" grow>
          <v-tab>Pembelian</v-tab>
          <v-tab>Refund</v-tab>

          <v-tab-item>
            <div v-if="group.length > 0">
              <v-row>
                <v-col cols="12" v-for="item in group" :key="item.id_mst_pembayaran_status">
                  <h3 class="ma-2">{{ item.pembayaran_status }}</h3>

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

                    <v-list>
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

              <v-pagination
                v-model="pagePembelian"
                @input="loadData"
                :length="lengthPagePembelian"
                :total-visible="5"
              ></v-pagination>
            </div>
          </v-tab-item>

          <v-tab-item>
            <div>
              <v-row dense>
                <v-col cols="12" v-for="item in group2" :key="item.id_mst_pembayaran_status">
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

                    <v-list>
                      <v-list-item>
                        <v-list-item-avatar rounded size="80">
                          <v-img src="/img/tiket.png"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>Tiket Tawar Bersama</v-list-item-title>

                          <v-list-item-subtitle class="teal--text">Jumlah Pembelian: 1 Tiket</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-title>Total Pembayaran</v-list-item-title>
                          <v-list-item-subtitle>Rp {{ Number(subItem.harga).toLocaleString("id-ID") }}</v-list-item-subtitle>
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
        <v-tabs v-model="subTab" grow>
          <v-tab>Tersedia</v-tab>
          <v-tab>Dicairkan</v-tab>
          <v-tab>Hangus</v-tab>
          <v-tab>Expired</v-tab>

          <v-tabs-items v-model="subTab">
            <v-tab-item>
              <div v-if="tersedia.length > 0">
                <v-row>
                  <v-col cols="12" sm="4" v-for="item in tersedia" :key="item.id">
                    <v-card>
                      <v-card-subtitle class="pb-0">Kode Tiket</v-card-subtitle>
                      <v-card-title class="py-0">{{ item.code }}</v-card-title>

                      <v-list>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-subtitle>Harga</v-list-item-subtitle>
                            <v-list-item-title
                              class="teal--text"
                            >Rp {{ Number(item.harga_beli).toLocaleString("id-ID") }}</v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-list-item-action-text>Masa Berlaku</v-list-item-action-text>
                            <div
                              class="red--text"
                            >{{ item.expired_at | dateTimeFormat(utc) }} {{ waktu }}</div>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
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
                  <v-col cols="12" sm="4" v-for="item in dicairkan" :key="item.id">
                    <v-card>
                      <v-card-subtitle class="pb-0">Kode Tiket</v-card-subtitle>
                      <v-card-title class="py-0">{{ item.code }}</v-card-title>

                      <v-list>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-subtitle>Harga</v-list-item-subtitle>
                            <v-list-item-title
                              class="teal--text"
                            >Rp {{ Number(item.harga_beli).toLocaleString("id-ID") }}</v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-list-item-action-text>Masa Berlaku</v-list-item-action-text>
                            <div
                              class="red--text"
                            >{{ item.expired_at | dateTimeFormat(utc) }} {{ waktu }}</div>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
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
                    <v-card>
                      <v-card-subtitle class="pb-0">Kode Tiket</v-card-subtitle>
                      <v-card-title class="py-0">{{ item.code }}</v-card-title>

                      <v-list>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-subtitle>Harga</v-list-item-subtitle>
                            <v-list-item-title
                              class="teal--text"
                            >Rp {{ Number(item.harga_beli).toLocaleString("id-ID") }}</v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-list-item-action-text>Masa Berlaku</v-list-item-action-text>
                            <div
                              class="red--text"
                            >{{ item.expired_at | dateTimeFormat(utc) }} {{ waktu }}</div>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
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
              <div v-if="terpakai.length > 0">
                <v-row>
                  <v-col cols="12" sm="4" v-for="item in terpakai" :key="item.id">
                    <v-card>
                      <v-card-subtitle class="pb-0">Kode Tiket</v-card-subtitle>
                      <v-card-title class="py-0">{{ item.code }}</v-card-title>

                      <v-list>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-subtitle>Harga</v-list-item-subtitle>
                            <v-list-item-title
                              class="teal--text"
                            >Rp {{ Number(item.harga_beli).toLocaleString("id-ID") }}</v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-list-item-action-text>Masa Berlaku</v-list-item-action-text>
                            <div
                              class="red--text"
                            >{{ item.expired_at | dateTimeFormat(utc) }} {{ waktu }}</div>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>

                <v-pagination
                  v-model="pageTerpakai"
                  @input="tiketTerpakai"
                  :length="lengthPageTerpakai"
                  :total-visible="5"
                ></v-pagination>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";

export default {
  name: "BeliTiket",
  data() {
    return {
      tab: 1,
      subTab: 0,
      subTab2: 0,
      tersedia: [],
      terpakai: [],
      dicairkan: [],
      hangus: [],
      orders: [],
      orderStatus: [],
      group: [],
      refunds: [],
      refundStatus: [],
      group2: [],
      pageTersedia: 1,
      lengthPageTersedia: 0,
      totalTersedia: 0,
      pageTerpakai: 1,
      lengthPageTerpakai: 0,
      totalTerpakai: 0,
      pageDicairkan: 1,
      lengthPageDicairkan: 0,
      totalDicairkan: 0,
      pageHangus: 1,
      lengthPageHangus: 0,
      totalHangus: 0,
      pagePembelian: 1,
      lengthPagePembelian: 0,
      totalPembelian: 0,
      pageRF: 1,
      lengthPageRF: 0,
      totalRF: 0,
      limit: 20,
      offset: 0,
      utc: moment().utcOffset() / 60 - 7,
      waktu: "",
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
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
          console.log(responses);
        });
    },
    tiketTerpakai() {
      var offset = (this.pageTerpakai - 1) * this.limit;

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
          this.terpakai = data.data;

          this.totalTerpakai = data.count;
          this.lengthPageTerpakai = Math.ceil(this.totalTerpakai / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
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
          console.log(responses);
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
          console.log(responses);
        });
    },
    loadData() {
      var offset = (this.pagePembelian - 1) * this.limit;

      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_pembeli: this.user.id,
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
        .get("/transaksi/v3/pencairan_tiket", {
          params: {
            id_penjual: this.user.id,
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
    this.tiketTersedia();
    this.tiketTerpakai();
    this.tiketDicairkan();
    this.tiketHangus();
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
      user: "auth/user",
    }),
  },
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY HH:mm");
    },
  },
};
</script>