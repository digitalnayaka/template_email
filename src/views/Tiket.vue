<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <div class="display-1 font-weight-black">Tiket Tawar Bersama</div>
      <v-col cols="12">
        <v-card color="blue lighten-4">
          <div class="d-flex flex-no-wrap justify-space-between align-center">
            <v-avatar class="ma-3" size="20" tile>
              <v-img src="/img/error.png"></v-img>
            </v-avatar>

            <div>
              <v-card-text>
                Dikarenakan masih dalam periode promo, kami membuat harga
                tiket menjadi Rp.0, untuk itu Anda perlu mengupload identitas diri Anda sebagai ganti bukti transfer.
                Kami akan tetap menjaga privasi Anda dan ingin menjamin jaminan agar Anda serius dalam melakukan penawaran iklan Tawar Bersama.
                Dan tiket ini sebagai deposit/setoran yang dapat anda tarik kembali (refund).
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
      <!-- <div>Untuk Iklan Tawar Bersama yang diiklankan oleh penjual terverifikasi, Anda membutuhkan tiket ini untuk bisa mengikuti iklan tersebut.</div> -->
    </div>

    <v-row>
      <v-col cols="12" align="center">
        <h2>Total Tiket</h2>
        <h2>{{ tiket.total }}</h2>
      </v-col>
    </v-row>
  

    <v-row class="text-center">
      <v-col cols="2.99">
        <h5>Tersedia</h5>
        {{ tiket.tersedia }}
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="3">
        <h5>Terpakai</h5>
        {{ tiket.terpakai }}
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="3">
        <h5>Refund</h5>
        {{ tiket.return }}
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="3" class="red--text">
        <h5>Hangus</h5>
        {{ tiket.hangus }}
      </v-col>
    </v-row>
  <v-divider vertical></v-divider>
    <v-row class="text-center">
      <v-col cols="6">
        <!-- <v-card dark color="transparent" to="/refund_tiket" max-width="400">
          <v-img class="center_image" src="/img/refund-tiket.png" max-width="400"></v-img>
          <v-btn block color="red" dark to="/refund_tiket">Refund Tiket</v-btn>
        </v-card>-->
        <v-list-item-avatar tile size="80">
          <v-img src="/img/icons/ic_refund_tiket.png"></v-img>
        </v-list-item-avatar>
        <v-btn block color="red" dark to="/refund_tiket" rounded>Refund Tiket</v-btn>
      </v-col>
      <v-col cols="6">
        <!-- <v-card dark color="transparent" to="/beli_tiket" max-width="400">
          <v-img src="/img/icons/ic_beli_tiket.png" max-width="400"></v-img>
           <v-btn block color="primary" to="/beli_tiket" rounded>Dapatkan Tiket</v-btn>
        </v-card>-->
        <v-list-item-avatar tile size="80">
          <v-img src="/img/icons/ic_beli_tiket.png"></v-img>
        </v-list-item-avatar>
        <v-btn block color="primary" to="/dapatkan_tiket" rounded>Dapatkan Tiket</v-btn>
      </v-col>

      <!-- <v-col cols="4" sm="4" xs="4">
        <v-card dark color="transparent" to="/list_transaksi">
          <v-img class="center_image" src="/img/list-transaksi.png"></v-img>
          <v-btn block small color="amber darken-1">Daftar Transaksi</v-btn>
        </v-card>
      </v-col>-->
    </v-row>

    <!-- <h3 class="mt-2">Daftar Pemakaian Tiket</h3>

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
    </div>-->

    <v-tabs v-model="tab" grow show-arrows>
      <v-tab>Daftar Transaksi Tiket</v-tab>
      <v-tab>Tiket Saya</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-tabs v-model="subTab2" grow @change="changeTab">
          <v-tab>Tiket Didapat</v-tab>
          <v-tab>Refund Tiket</v-tab>

          <v-tab-item>
            <div v-if="group.length > 0">
              <v-card flat v-for="item in group" :key="item.id_mst_pembayaran_status">
                <h3 class="ma-2">{{ item.pembayaran_status }}</h3>

                <v-card
                  class="mx-2 mb-4"
                  v-for="subItem in item.found"
                  :key="subItem.id"
                  :to="'/upload_bukti/' + subItem.id"
                >
                  <div
                    class="d-flex justify-space-between mx-2 pt-2"
                    v-if="subItem.id_mst_pembayaran_status != 1"
                  >
                    <div class="font-weight-medium">Nomor Order:</div>
                    <div class="red--text">{{ subItem.no_order }}</div>
                  </div>

                  <div class="d-flex justify-space-between mx-2 pt-2" v-else>
                    <div class="font-weight-medium">Bayar Sebelum:</div>
                    <div
                      class="red--text"
                    >{{ subItem.expired_at | dateTimeFormat(utc) }} {{ waktu }}</div>
                  </div>

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
              </v-card>

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
              <!-- <v-row dense>
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
              </v-row>-->

              <v-card flat v-for="item in group2" :key="item.id_mst_pembayaran_status">
                <h3 class="ma-2">{{ item.pembayaran_status }}</h3>

                <v-card
                  class="mx-2 mb-4"
                  v-for="subItem in item.found"
                  :key="subItem.id"
                  :to="'/transaksi_refund/' + subItem.id"
                >
                  <div
                    class="d-flex justify-space-between mx-2 pt-2"
                    v-if="subItem.id_mst_pembayaran_status != 1"
                  >
                    <div class="font-weight-medium">Nomor Order:</div>
                    <div class="red--text">{{ subItem.no_order }}</div>
                  </div>

                  <div class="d-flex justify-space-between mx-2 pt-2" v-else>
                    <div class="font-weight-medium">Bayar Sebelum:</div>
                    <div
                      class="red--text"
                    >{{ subItem.expired_at | dateTimeFormat(utc) }} {{ waktu }}</div>
                  </div>

                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar rounded size="80">
                        <v-img src="/img/tiket.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Tiket Tawar Bersama</v-list-item-title>

                        <v-list-item-subtitle
                          class="teal--text"
                        >Jumlah Penjualan: {{ subItem.jumlah }} Tiket</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-content>
                        <v-list-item-title>Total Pencairan</v-list-item-title>

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
                    v-if="subItem.id_mst_pembayaran_status == 6"
                  >Ditolak</div>
                </v-card>
              </v-card>

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
        <v-tabs v-model="subTab" grow show-arrows @change="changeTab">
          <v-tab>Tersedia</v-tab>
          <v-tab>Dicairkan</v-tab>
          <v-tab>Hangus</v-tab>
          <v-tab>Expired</v-tab>

          <v-tabs-items v-model="subTab">
            <v-tab-item>
              <div v-if="tersedia.length > 0">
                <v-row>
                  <v-col cols="12" sm="4" v-for="item in tersedia" :key="item.id">
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
                  <v-col cols="12" sm="4" v-for="item in dicairkan" :key="item.id">
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
                  <v-col cols="12" sm="4" v-for="item in expired" :key="item.id">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment-timezone";

export default {
  name: "tiket",
  components: {
    ListTiket: () =>
      import(/* webpackChunkName: "list-tiket" */ "@/components/ListTiket.vue"),
  },
  data() {
    return {
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
      limit: 15,
      offset: 0,
      utc: moment().utcOffset() / 60 - 7,
      waktu: "",
    };
  },
  methods: {
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
          console.log(responses);
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
          console.log(responses);
        });
    },
    loadData() {
      var offset = (this.pagePembelian - 1) * this.limit;

      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_pembeli: this.user.id,
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
    changeTab() {
      if (this.subTab2 == 1) {
        if (this.refunds.length == 0) {
          this.listRefund();
        }
      }
      if (this.subTab == 1) {
        if (this.dicairkan.length == 0) {
          this.tiketDicairkan();
        }
      }
      if (this.subTab == 2) {
        if (this.hangus.length == 0) {
          this.tiketHangus();
        }
      }
      if (this.subTab == 3) {
        if (this.expired.length == 0) {
          this.tiketExpired();
        }
      }
    },
  },
  created() {
    this.totalTiket();
    this.loadData();
    this.tiketTersedia();
    // this.getTiket();

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