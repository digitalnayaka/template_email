<template>
  <v-container fluid>
    <v-app-bar app color="#22939E" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="back">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <h1 class="text-center">Detail Transaksi</h1>

    <v-card flat>
      <v-container
        fluid
        class="text-center"
        v-if="
          orders.id_mst_pembayaran_status == 1 ||
          orders.id_mst_pembayaran_status == 10
        "
      >
        <v-card flat align="center" color="deep-orange lighten-3">
          <v-avatar size="16" tile>
            <v-img src="/img/error.png"></v-img>
          </v-avatar>

          Selalu waspada terhadap pihak yang tidak bertanggung jawab. Pastikan
          bukti pembayaran yang diupload sudah benar.
        </v-card>

        <h3>Batas Waktu Pembayaran</h3>

        <flip-countdown :deadline="countdown"></flip-countdown>

        <v-card flat color="grey lighten-3">
          Sebelum: {{ orders.expired_at | dateTimeFormat(utc) }}
          {{ timezone }}
        </v-card>
      </v-container>

      <v-divider></v-divider>

      <v-row no-gutters align="center" class="mt-2">
        <v-col cols="12" sm="6">
          <h2 class="text-center">Informasi Tagihan</h2>

          <v-card max-height="500">
            <v-list dense>
              <v-list-item>
                <v-list-item-title>Nomor Order</v-list-item-title>
                <v-list-item-title>: {{ orders.no_order }}</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Status</v-list-item-title>
                <v-list-item-title class="font-weight-black">
                  : {{ orders.pembayaran_status }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Tanggal Order</v-list-item-title>
                <v-list-item-title>
                  : {{ orders.created_at | dateTimeFormat(utc) }}
                  {{ timezone }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item
                v-if="
                  orders.id_mst_pembayaran_status == 6 ||
                  orders.id_mst_pembayaran_status == 11 ||
                  orders.id_mst_pembayaran_status == 12
                "
              >
                <v-list-item-title>Alasan Ditolak</v-list-item-title>
                <v-list-item-title>: {{ orders.note }}</v-list-item-title>
              </v-list-item>

              <v-list-item
                v-if="
                  orders.id_mst_pembayaran_status == 6 ||
                  orders.id_mst_pembayaran_status == 11 ||
                  orders.id_mst_pembayaran_status == 12
                "
              >
                <v-list-item-title>Detail Alasan</v-list-item-title>
                <v-list-item-title class="font-weight-black red--text">
                  : {{ orders.note_detail }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Nama Penjual</v-list-item-title>
                <v-list-item-title
                  >: {{ orders.nama_penjual }}</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Nama Pembeli</v-list-item-title>
                <v-list-item-title
                  >: {{ orders.nama_pembeli }}</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Metode Pembayaran</v-list-item-title>
                <v-list-item-title>: {{ orders.metode }}</v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-title>Total Harga:</v-list-item-title>
                <v-list-item-title class="font-weight-black">
                  Rp
                  {{ Number(orders.total_pembayaran).toLocaleString("id-ID") }}
                </v-list-item-title>
              </v-list-item>
            </v-list>

            <!-- <v-btn
                  class="d-block my-2 pa-2 primary white--text text-center"
                  :to="'/chat/' + orders.id_pembeli"
                  v-if="orders.id_penjual == user.id"
                >Tanya Pembeli</v-btn>

                <v-btn
                  rounded
                  class="d-block my-2 pa-2 orange darken-1 white--text text-center"
                  :to="'/chat/' + orders.id_penjual"
                  v-else
                >Tanya Penjual</v-btn>-->
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="#22939E"
                dark
                :to="'/chat/' + orders.id_pembeli"
                v-if="orders.id_penjual == user.id"
              >
                Tanya Pembeli
              </v-btn>

              <v-btn
                color="#22939E"
                dark
                :to="'/chat/' + orders.id_penjual"
                v-else
              >
                Tanya Penjual
              </v-btn>

              <v-btn color="#22939E" outlined @click.stop="statusOrder = true">
                Lacak
              </v-btn>

              <v-dialog v-model="statusOrder" width="660">
                <v-card>
                  <v-card-title>Status Order</v-card-title>

                  <v-divider></v-divider>

                  <v-timeline dense>
                    <v-timeline-item v-for="item in log" :key="item.id">
                      <div class="d-flex">
                        <div class="flex-column mr-4">
                          <div
                            :class="
                              item.updated_by_type == 1
                                ? 'teal white--text'
                                : item.updated_by_type == 3
                                ? 'orange white--text'
                                : 'grey white--text'
                            "
                          >
                            <div class="mx-2">
                              {{ item.updated_by_type_nama }}
                            </div>
                          </div>

                          <div class="text-right">
                            {{ item.created_at | dateTimeFormat(utc) }}
                            {{ timezone }}
                          </div>
                        </div>

                        <div class="flex-column">
                          <div>{{ item.pembayaran_status }}</div>
                          <div class="text-caption">{{ item.aktivitas }}</div>
                        </div>
                      </div>
                    </v-timeline-item>
                  </v-timeline>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <h2 class="text-center">Informasi Produk</h2>

          <v-card :height="orders.id_mst_order_status == 3 ? 390 : 350">
            <v-list>
              <v-list-item align="center">
                <v-list-item-avatar tile size="100">
                  <v-img :src="getImage(iklan.photo)" contain></v-img>
                </v-list-item-avatar>

                <v-list-item-content align="center">
                  <h3 class="font-weight-bold">
                    {{ iklan.judul }}
                  </h3>

                  <h3 class="teal--text" align="center">
                    Rp {{ Number(orders.harga).toLocaleString("id-ID") }}
                  </h3>

                  <v-btn
                    text
                    color="primary"
                    dark
                    :to="'/iklan/' + orders.id_iklan"
                  >
                    Lihat Iklan
                    <v-icon right>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-list-item-content>
              </v-list-item>

              <v-list-item align="center">
                <v-list-item-title>Jumlah:</v-list-item-title>
                <v-list-item-title>{{ orders.jumlah }} Unit</v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item align="center">
                <v-list-item-title>Total Harga:</v-list-item-title>
                <v-list-item-title class="font-weight-bold">
                  Rp
                  {{ Number(orders.total_pembayaran).toLocaleString("id-ID") }}
                </v-list-item-title>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#22939E"
                dark
                @click="formPenawaran"
                v-if="orders.id_mst_order_status != 3"
              >
                Lihat Form Penawaran</v-btn
              >

              <v-dialog v-model="dialog">
                <v-card v-html="penawaran"></v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <br />

      <div v-if="user.id != orders.id_pembeli">
        <v-alert
          dense
          outlined
          type="error"
          v-if="pengguna.id_type_pinalti == 1"
        >
          <h4>
            Perhatian! Akun <b> {{ pengguna.nama }} </b> sudah melakukan
            pembatalan transaksi sebanyak 1x. Anda tetap dapat melakukan
            konfirmasi atas transaksi ini!
          </h4>
        </v-alert>

        <v-alert
          dense
          outlined
          type="error"
          v-if="pengguna.id_type_pinalti == 2"
        >
          <h4>
            Perhatian! Akun <b> {{ pengguna.nama }} </b> sudah melakukan
            pembatalan transaksi sebanyak 2x. Anda tetap dapat melakukan
            konfirmasi atas transaksi ini!
          </h4>
        </v-alert>
      </div>

      <v-btn
        block
        color="primary"
        class="mt-4"
        @click="konfirmasiPenjual"
        v-if="
          orders.id_mst_pembayaran_status == 10 && orders.id_penjual == user.id
        "
      >
        Konfirmasi
      </v-btn>

      <br />

      <div align="center" v-if="orders.id_mst_pembayaran_status == 1">
        <v-card v-if="accounts.length > 0">
          <h2 align="center">Petunjuk Pembayaran</h2>
          <p>Transfer dapat dilakukan ke salah satu rekening berikut:</p>

          <v-list>
            <v-list-item v-for="item in accounts" :key="item.id">
              <v-list-item-content>
                <v-list-item-avatar tile size="30" align="center">
                  <v-img :src="getImage(item.foto)" contain></v-img>
                </v-list-item-avatar>
                <v-list-item-title>{{ item.bank_name }}</v-list-item-title>

                <v-list-item-subtitle>
                  {{ item.nomor_rekening }}
                </v-list-item-subtitle>

                <v-list-item-subtitle>
                  {{ item.nama_rekening }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </div>

      <v-divider></v-divider>

      <div align="center">
        <div
          v-if="
            orders.id_mst_order_status != 3 &&
            orders.id_mst_pembayaran_status != 10
          "
        >
          <h2 align="center">Bukti Pembayaran</h2>

          <p v-if="orders.id_penjual != user.id">
            Anda wajib melakukan konfirmasi pembayaran agar tiket dapat
            diproses.
          </p>

          <p v-if="orders.id_penjual == user.id">
            Sebelum melakukan konfirmasi, perhatikan baik-baik foto yang
            dikirimkan oleh pembeli.
          </p>

          <image-uploader
            v-model="buktiBayar"
            :quality="0.7"
            :scaleRatio="0.5"
            accept="image/*"
            :preview="false"
            :className="['fileinput', { 'fileinput--loaded': hasImage }]"
            :autoRotate="true"
            outputFormat="blob"
            @input="onFileChange"
            id="foto"
            v-if="
              orders.id_mst_pembayaran_status == 1 &&
              user.id != orders.id_penjual
            "
          >
            <label for="foto" slot="upload-label">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-card
                    flat
                    width="300"
                    height="300"
                    :color="!hasImage ? 'grey lighten-3' : 'transparent'"
                    class="d-flex align-center justify-center"
                    v-on="on"
                  >
                    <v-icon x-large v-if="!hasImage">mdi-file-upload</v-icon>

                    <v-img :src="previewUrl" contain v-else></v-img>
                  </v-card>
                </template>
                <span>Pilih Foto</span>
              </v-tooltip>
            </label>
          </image-uploader>

          <div v-viewer="{ movable: false }">
            <img
              :src="gambar"
              contain
              class="mx-2"
              width="300"
              height="200"
              v-if="orders.id_mst_pembayaran_status > 1"
            />
          </div>

          <p>*Pastikan gambar yang diupload jelas dan terbaca</p>

          <v-divider></v-divider>

          <v-btn
            block
            color="primary"
            class="my-4"
            @click="upload"
            v-if="
              orders.id_mst_pembayaran_status == 1 &&
              orders.id_penjual != user.id
            "
            :disabled="hasImage ? false : true"
          >
            Konfirmasi Pembayaran
          </v-btn>

          <v-btn
            rounded
            dark
            color="#22939E"
            class="my-4"
            @click="dialogKonfirmasi = true"
            v-if="
              orders.id_mst_pembayaran_status == 4 &&
              orders.id_penjual == user.id
            "
          >
            Konfirmasi Pembayaran
          </v-btn>

          <v-dialog v-model="dialogKonfirmasi" width="500" persistent>
            <v-card>
              <v-toolbar dark color="teal darken-3">
                <v-toolbar-title>Konfirmasi Pembayaran</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="dialogKonfirmasi = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-container fluid>
                Apakah Anda yakin ingin melakukan konfirmasi pembayaran berikut?
              </v-container>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="red" dark @click="dialogTolak = true">
                  Tolak
                </v-btn>

                <v-btn color="primary" dark @click="konfirmasi">
                  Konfirmasi
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogTolak" persistent max-width="500px">
            <v-card>
              <v-toolbar dark color="teal darken-3">
                <v-toolbar-title>Tolak Serah Terima</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="dialogTolak = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-select
                v-model="note"
                :items="noteTolak"
                item-text="note"
                item-value="id"
                label="Alasan Pembatalan (Wajib Dipilih)"
                solo
                class="px-2 pt-2"
              ></v-select>

              <v-card-text v-if="note == 1">
                <v-textarea
                  label="Alasan Menolak"
                  v-model="noteDetail"
                  rows="1"
                  auto-grow
                ></v-textarea>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" dark @click="dialogTolak = false">
                  Batalkan
                </v-btn>
                <v-btn color="blue darken-1" dark @click="konfirmasiTolak">
                  Tolak
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- <v-dialog v-model="dialogTerima" persistent max-width="500px">
                <v-card>
                  <v-toolbar dark color="teal darken-3">
                    <v-toolbar-title>Terima Moderasi</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                    <v-btn icon @click="dialogTerima = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="red darken-1" dark @click="dialogTerima = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" dark @click="konfirmasiTerima">Terima</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>-->
        </div>

        <v-btn
          block
          color="teal"
          dark
          to="/product/review"
          v-if="
            orders.id_pembeli == user.id &&
            (orders.id_mst_pembayaran_status == 2 ||
              orders.id_mst_pembayaran_status == 5 ||
              orders.id_mst_pembayaran_status == 11)
          "
        >
          Berikan Ulasan
        </v-btn>

        <div v-if="orders.id_mst_order_status != 3">
          <v-btn
            block
            color="red"
            dark
            @click="dialogBatal = true"
            v-if="
              orders.id_mst_pembayaran_status != 2 &&
              orders.id_mst_pembayaran_status != 3 &&
              orders.id_mst_pembayaran_status != 4
            "
          >
            Batalkan
          </v-btn>

          <v-dialog v-model="dialogBatal" persistent max-width="500px">
            <v-form ref="form" v-model="valid">
              <v-card>
                <v-toolbar dark color="teal darken-3">
                  <v-toolbar-title>Alasan Pembatalan</v-toolbar-title>

                  <v-spacer></v-spacer>

                  <v-btn icon @click="dialogBatal = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>

                <v-select
                  v-model="note"
                  :items="noteTolak"
                  :rules="AlasanRules"
                  item-text="note"
                  item-value="id"
                  label="Alasan Tolak (Wajib Dipilih)"
                  solo
                  class="px-2 pt-2"
                ></v-select>

                <v-textarea
                  label="Alasan Menolak"
                  v-model="noteDetail"
                  rows="1"
                  auto-grow
                  class="mx-4"
                  v-if="note == 1"
                ></v-textarea>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="blue darken-1"
                    class="white--text"
                    @click="batalkan"
                    :disabled="!valid"
                  >
                    Batalkan
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FlipCountdown from "vue2-flip-countdown";
import moment from "moment-timezone";
import ImageUploader from "vue-image-upload-resize";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);

export default {
  name: "detailTransaksi",
  props: ["utc", "timezone"],
  components: { FlipCountdown, ImageUploader },
  data: () => ({
    orders: [],
    iklans: 0,
    countdown: 0,
    statusOrder: false,
    buktiBayar: null,
    previewUrl: "",
    hasImage: false,
    iklan: [],
    foto: "",
    gambar: "",
    penawaran: null,
    dialog: false,
    dialogKonfirmasi: false,
    dialogTolak: false,
    dialogTerima: false,
    dialogBatal: false,
    note: "",
    noteTolak: [],
    noteDetail: "",
    log: [],
    accounts: [],
    AlasanRules: [(v) => !!v || "Anda belum memilih alasan pembatalan"],
    pengguna: [],
    valid: true,
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    async getOrder() {
      await this.axios
        .get("/transaksi/v3/order", {
          params: {
            id: this.$route.params.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.orders = data[0];
          this.iklan = this.orders.iklan;

          this.countdown = moment
            .utc(this.orders.expired_at)
            .format("YYYY-MM-DD HH:mm:ss");

          this.getIklan(this.orders.id_iklan);
          this.getRekening();
          this.logStatus();
          this.getUsers();

          if (
            this.orders.id_mst_pembayaran_status == 4 ||
            this.orders.id_mst_pembayaran_status == 2
          ) {
            this.dtlPembayaran();
          }

          if (
            this.user.id != this.orders.id_pembeli &&
            this.user.id != this.orders.id_penjual
          ) {
            alert("Anda tidak berhak mengakses halaman ini");
            this.$router.push({ path: "/" });
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
    getRekening() {
      this.axios
        .get("/user/v3/user/rekening", {
          params: {
            id_app_user: this.orders.id_penjual,
            limit: 5,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.accounts = data;
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
    getIklan(id) {
      this.axios
        .get("/iklan/v3/iklan_tb_mokas", {
          params: {
            id: id,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.iklans = data.motor_bekas.length;
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
    konfirmasiPenjual() {
      var r = confirm("Lanjutkan untuk proses serah terima?");
      if (r == true) {
        let formData = new FormData();

        formData.set("id", this.orders.id);

        this.axios
          .post("/transaksi/v3/konfirmasi_persetujuan_penjual", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.getOrder();
          })
          .catch((error) => {
            let responses = error.response.data;
            console.log(responses);
          });
      }
    },
    onFileChange() {
      if (!this.buktiBayar) {
        return false;
      }
      if (!this.buktiBayar.type.match("image.*")) {
        return false;
      }

      this.hasImage = true;

      const reader = new FileReader();

      reader.onload = (e) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.buktiBayar);
    },
    upload() {
      let formData = new FormData();

      formData.append("id_pembayaran", this.orders.id_pembayaran);
      formData.append("foto", this.buktiBayar);
      formData.append("created_by_type", 1);
      formData.append("created_by", this.user.id);

      this.axios
        .post("/transaksi/v3/upload_pembayaran", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.getOrder();
          this.dtlPembayaran();
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "success",
            text: responses.api_message,
          });
        });
    },
    konfirmasi() {
      var r = confirm("Yakin ingin mengkonfirmasi pembayaran berikut?");
      if (r == true) {
        let formData = new FormData();

        formData.append("id", this.orders.id);

        this.axios
          .post("/transaksi/v3/konfirmasi_serah_terima", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.getOrder();
            this.dtlPembayaran();
            this.dialogKonfirmasi = false;
            this.dialogTolak = false;
          })
          .catch((error) => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "success",
              text: responses.api_message,
            });
          });
      }
    },
    dtlPembayaran() {
      this.axios
        .get("/transaksi/v3/upload_pembayaran", {
          params: {
            id_pembayaran: this.orders.id_pembayaran,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.foto = data[0].foto;

          this.getGambar();
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
    formPenawaran() {
      this.axios
        .get("/transaksi/v3/form_penawaran?id=" + this.orders.id, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.penawaran = data;
          this.dialog = true;
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
    async getGambar() {
      this.axios
        .get(this.getImage(this.foto), {
          responseType: "arraybuffer",
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          var bytes = new Uint8Array(response.data);
          var binary = bytes.reduce(
            (data, b) => (data += String.fromCharCode(b)),
            ""
          );
          this.gambar = "data:image/jpeg;base64," + btoa(binary);
        });
    },
    detailTolak() {
      this.axios
        .get("/transaksi/v3/mst_pembayaran_note", {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.noteTolak = data;
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
    konfirmasiTolak() {
      var r = confirm("Yakin ingin menolak pembayaran berikut?");
      if (r == true) {
        let formData = new FormData();

        formData.set("id", this.orders.id);
        formData.set("id_app_user", this.user.id);
        formData.set("id_mst_pembayaran_note", this.note);
        formData.set("note_detail", this.noteDetail);

        this.axios
          .post("/transaksi/v3/tolak_serah_terima", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.dialogKonfirmasi = false;
            this.dialogTolak = false;
            this.getOrder();
          })
          .catch((error) => {
            let responses = error.response.data;
            console.log(responses.api_message);
          });
      }
    },
    batalkan() {
      var r = confirm("Yakin ingin membatalkan order berikut?");
      if (r == true) {
        let formData = new FormData();

        formData.append("id", this.orders.id);
        formData.append("id_app_user", this.user.id);
        formData.append("id_mst_pembayaran_note", this.note);
        formData.append("note_detail", this.noteDetail);

        this.axios
          .post("/transaksi/v3/batalkan_pembelian", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.getOrder();
          })
          .catch((error) => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "success",
              text: responses.api_message,
            });
          });
      }
    },
    logStatus() {
      this.axios
        .get("/log/v3/log/transaksi", {
          params: {
            id_order: this.$route.params.id,
            limit: 20,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.log = data;
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
    getUsers() {
      this.axios
        .get("/user/v3/user", {
          params: {
            id: this.orders.id_pembeli,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.pengguna = data[0];
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
  mounted() {
    this.getOrder();
    this.detailTolak();
    this.logStatus();
  },
  created() {
    this.getUsers();
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

<style>
#foto {
  display: none;
}
</style>