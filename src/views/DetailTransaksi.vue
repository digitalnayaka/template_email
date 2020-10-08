<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="back">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div align="center">
      <v-card class="d-inline-block mx-auto">
        <v-container fluid>
          <h1>Detail Transaksi</h1>

          <v-card flat align="center" color="grey lighten-3">
            <v-avatar size="16" tile>
              <v-img src="/img/error.png"></v-img>
            </v-avatar>Selalu waspada terhadap pihak yang tidak bertanggung jawab. Pastikan bukti pembayaran yang diupload sudah benar.
          </v-card>

          <v-container fluid class="text-center" v-if="orders.id_mst_pembayaran_status == 1">
            <h2>Batas Waktu Pembayaran</h2>

            <flip-countdown :deadline="countdown"></flip-countdown>

            <v-card
              flat
              color="grey lighten-3"
            >Sebelum: {{ orders.expired_at | dateTimeFormat(utc) }} {{ waktu }}</v-card>
          </v-container>

          <v-divider></v-divider>

          <v-layout row wrap>
            <v-flex xs12 md6 lg6>
              <h2 class="text-center">Informasi Tagihan</h2>
              <v-card width="500" height="400" align="left">
                <v-container fluid>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>Nomor Order:</v-list-item-title>
                      <v-list-item-title>{{ orders.no_order }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Status:</v-list-item-title>
                      <v-list-item-title
                        class="font-weight-black orange--text"
                        v-if="orders.id_mst_pembayaran_status == 1"
                      >{{ orders.pembayaran_status }}</v-list-item-title>

                      <v-list-item-title
                        class="font-weight-black blue--text"
                        v-if="orders.id_mst_pembayaran_status == 2"
                      >{{ orders.pembayaran_status }}</v-list-item-title>

                      <v-list-item-title
                        class="font-weight-black red--text"
                        v-if="orders.id_mst_pembayaran_status == 3"
                      >{{ orders.pembayaran_status }}</v-list-item-title>

                      <v-list-item-title
                        class="font-weight-black teal--text"
                        v-if="orders.id_mst_pembayaran_status == 4"
                      >{{ orders.pembayaran_status }}</v-list-item-title>

                      <v-list-item-title
                        class="font-weight-black red--text"
                        v-if="orders.id_mst_pembayaran_status == 5"
                      >{{ orders.pembayaran_status }}</v-list-item-title>

                      <v-list-item-title
                        class="font-weight-black red--text"
                        v-if="orders.id_mst_pembayaran_status == 6"
                      >{{ orders.pembayaran_status }}</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-title>Tanggal Order:</v-list-item-title>
                      <v-list-item-title>{{ orders.created_at | dateTimeFormat }} WIB</v-list-item-title>
                    </v-list-item>

                    <!-- <v-list-item>
                <v-list-item-title>Status Tagihan:</v-list-item-title>

                <v-list-item-title
                  class="font-weight-black orange--text"
                  v-if="orders.id_mst_pembayaran_status == 1"
                >{{ orders.pembayaran_status }}</v-list-item-title>
                <v-list-item-title
                  class="font-weight-black blue--text"
                  v-if="orders.id_mst_pembayaran_status == 2"
                >{{ orders.pembayaran_status }}</v-list-item-title>
                <v-list-item-title
                  class="font-weight-black red--text"
                  v-if="orders.id_mst_pembayaran_status == 3"
                >{{ orders.pembayaran_status }}</v-list-item-title>
                <v-list-item-title
                  class="font-weight-black teal--text"
                  v-if="orders.id_mst_pembayaran_status == 4"
                >{{ orders.pembayaran_status }}</v-list-item-title>
                <v-list-item-title
                  class="font-weight-black red--text"
                  v-if="orders.id_mst_pembayaran_status == 5"
                >{{ orders.pembayaran_status }}</v-list-item-title>
                <v-list-item-title
                  class="font-weight-black red--text"
                  v-if="orders.id_mst_pembayaran_status == 6"
                >{{ orders.pembayaran_status }}</v-list-item-title>
                    </v-list-item>-->

                    <v-list-item v-if="orders.id_mst_pembayaran_status == 6">
                      <v-list-item-title>Alasan Ditolak:</v-list-item-title>
                      <v-list-item-title>{{ orders.note}}</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="orders.id_mst_pembayaran_note == 1">
                      <v-list-item-title>Detail Alasan:</v-list-item-title>
                      <v-list-item-title class="font-weight-black red--text">{{ orders.note_detail}}</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-title>Nama Penjual:</v-list-item-title>
                      <v-list-item-title>{{ orders.nama_penjual }}</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-title>Metode Pembayaran:</v-list-item-title>
                      <v-list-item-title>{{ orders.metode }}</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-title>Total Harga:</v-list-item-title>
                      <v-list-item-title>
                        <h3
                          class="font-weight-black"
                        >Rp {{ Number(orders.total_pembayaran).toLocaleString("id-ID") }}</h3>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-container>
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
                    :to="'/chat/' + orders.id_pembeli"
                    v-if="orders.id_penjual == user.id"
                    class="primary darken-1 white--text"
                  >Tanya Pembeli</v-btn>
                  <v-btn
                    :to="'/chat/' + orders.id_penjual"
                    class="orange darken-1 white--text"
                    v-else
                  >Tanya Penjual</v-btn>
                  <v-btn color="primary">Lihat Detail</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex xs12 md6 lg6>
              <h2 class="text-center">Informasi Produk</h2>

              <v-card width="500" height="400" align="left">
                <v-container fluid>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        <v-img :src="getImage(iklan.photo)" contain width="150" height="150"></v-img>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-list-item-action>
                          <v-btn color="#0277BD" :to="'/iklan/' + orders.id_iklan" text dark>
                            Lihat Iklan
                            <v-icon>mdi-arrow-right</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item-subtitle>
                      <br />
                    </v-list-item>
                    <v-list-item align="center">
                      <v-list-item-title class="font-weight-black">{{ iklan.judul }}</v-list-item-title>
                    </v-list-item>

                    <v-list-item align="center">
                      <v-list-item-title>Jumlah:</v-list-item-title>
                      <v-list-item-title>{{ orders.jumlah }} Unit</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item align="center">
                      <v-list-item-title>Total Harga:</v-list-item-title>
                      <v-list-item-title>
                        <h3>Rp {{ Number(orders.total_pembayaran).toLocaleString("id-ID") }}</h3>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>

                  <v-card-actions >
                    <v-spacer></v-spacer>
                    <v-btn
                      class="teal darken-1 white--text"
                      @click="formPenawaran"
                      v-if="orders.id_mst_order_status != 3"
                    >Lihat Form Penawaran</v-btn>

                    <v-dialog v-model="dialog">
                      <v-card v-html="penawaran"></v-card>
                    </v-dialog>
                  </v-card-actions>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
          <div align="center">
            <div v-if="orders.id_mst_order_status != 3">
              <h2 align="center">Bukti Pembayaran</h2>
              <p
                v-if="orders.id_penjual != user.id"
              >Anda wajib melakukan konfirmasi pembayaran agar tiket dapat diproses.</p>
              <p
                v-if="orders.id_penjual == user.id"
              >Sebelum melakukan konfirmasi, perhatikan baik-baik foto yang dikirimkan oleh pembeli.</p>

              <image-uploader
                v-model="buktiBayar"
                :quality="0.7"
                :scaleRatio="0.5"
                accept="image/*"
                :preview="false"
                :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                :capture="false"
                :debug="0"
                :autoRotate="true"
                outputFormat="blob"
                @input="onFileChange"
                id="foto"
                v-if="orders.id_mst_pembayaran_status == 1 && user.id != orders.id_penjual"
              >
                <label for="foto" slot="upload-label">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-card
                        flat
                        width="300"
                        height="200"
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

              <v-img
                :src="gambar"
                contain
                class="mx-2"
                width="300"
                height="200"
                v-if="orders.id_mst_pembayaran_status > 1"
              ></v-img>

              <p>*Pastikan gambar yang diupload jelas dan terbaca</p>

              <v-divider></v-divider>

              <v-btn
                rounded
                color="primary"
                @click="upload"
                v-if="orders.id_mst_pembayaran_status == 1 && orders.id_penjual != user.id"
                :disabled="hasImage ? false : true"
              >Konfirmasi Pembayaran</v-btn>

              <v-btn
                rounded
                dark
                color="teal"
                @click="dialogKonfirmasi = true"
                v-if="orders.id_mst_pembayaran_status == 4 && orders.id_penjual == user.id"
              >Konfirmasi Pembayaran</v-btn>

              <v-dialog v-model="dialogKonfirmasi" width="250" persistent>
                <v-card>
                  <v-container fluid>Yakin ingin mengkonfirmasi pembayaran berikut?</v-container>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" dark @click="dialogTolak = true">Tolak</v-btn>
                    <v-btn color="primary" dark @click="konfirmasi">Konfirmasi</v-btn>
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
                    label="Alasan Tolak (Wajib Dipilih)"
                    solo
                    class="px-2 pt-2"
                  ></v-select>

                  <v-card-text v-if="note == 1">
                    <v-textarea label="Alasan Menolak" v-model="noteDetail" rows="1" auto-grow></v-textarea>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" dark @click="dialogTolak = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" dark @click="konfirmasiTolak">Tolak</v-btn>
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
          </div>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FlipCountdown from "vue2-flip-countdown";
import moment from "moment-timezone";
import ImageUploader from "vue-image-upload-resize";

export default {
  name: "detailTransaksi",
  components: { FlipCountdown, ImageUploader },
  data: () => ({
    orders: [],
    iklans: 0,
    countdown: 0,
    utc: moment().utcOffset() / 60 - 7,
    waktu: "",
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
    note: "",
    noteTolak: [],
    noteDetail: "",
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

          this.dtlPembayaran();

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
          console.log(responses);
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
          console.log(responses);
        });
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
          })
          .catch((error) => {
            let responses = error.response.data;
            console.log(responses.api_message);
          });
      }
    },
  },
  mounted() {
    this.getOrder();
    this.detailTolak();

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

<style>
#foto {
  display: none;
}
</style>