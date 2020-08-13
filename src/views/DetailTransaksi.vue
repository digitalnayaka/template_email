<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <v-card class="d-inline-block mx-auto">
        <v-container fluid>
          <h1>Detail Transaksi</h1>

          <v-card flat align="center" color="grey lighten-3">
            <v-avatar size="16" tile>
              <v-img src="/img/error.png"></v-img>
            </v-avatar>Selalu waspada terhadap pihak yang tidak bertanggung jawab. Pastikan bukti pembayaran yang diupload sudah benar.
          </v-card>

          <v-container fluid class="text-center" v-if="orders.id_mst_pembayaran_status == 1">
            <div>Batas Waktu Pembayaran</div>

            <flip-countdown :deadline="countdown"></flip-countdown>

            <v-card
              flat
              color="grey lighten-3"
            >Sebelum: {{ orders.expired_at | dateTimeFormat(utc) }} {{ waktu }}</v-card>
          </v-container>

          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-img :src="getImage(iklan.photo)" contain></v-img>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="font-weight-black">{{ iklan.judul }}</v-list-item-title>

                <v-list-item-subtitle>Jumlah: {{ iklans }} Unit</v-list-item-subtitle>
              </v-list-item-content>

              <v-btn color="primary" :to="'/detail_iklan/' + orders.id_iklan">Lihat Iklan</v-btn>
            </v-list-item>

            <v-btn
              block
              class="my-2 pa-2 primary white--text text-center"
              @click="formPenawaran"
              v-if="orders.id_mst_order_status != 3"
            >Lihat Form Penawaran</v-btn>

            <v-dialog v-model="dialog">
              <v-card v-html="penawaran"></v-card>
            </v-dialog>
          </v-list>

          <v-divider></v-divider>

          <div class="text-left">
            <h2>Informasi Tagihan</h2>

            <v-row dense>
              <v-col cols="6" sm="2">Nomor Order:</v-col>
              <v-col cols="6" sm="10">{{ orders.no_order }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6" sm="2">Tanggal Order:</v-col>
              <v-col cols="6" sm="10">{{ orders.created_at | dateTimeFormat }} WIB</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6" sm="2">Status Tagihan:</v-col>
              <v-col cols="6" sm="10" class="red--text">{{ orders.pembayaran_status }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6" sm="2">Nama Penjual:</v-col>
              <v-col cols="6" sm="10">{{ orders.nama_penjual }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6" sm="2">Total Tagihan:</v-col>
              <v-col
                cols="6"
                sm="10"
              >Rp {{ Number(orders.total_pembayaran).toLocaleString("id-ID") }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6" sm="2">Metode Bayar:</v-col>
              <v-col cols="6" sm="10">{{ orders.metode }}</v-col>
            </v-row>
          </div>

          <v-btn
            class="d-block my-2 pa-2 primary white--text text-center"
            :to="'/chat/' + orders.id_pembeli"
            v-if="orders.id_penjual == user.id"
          >Hubungi Pembeli</v-btn>

          <v-btn
            class="d-block my-2 pa-2 primary white--text text-center"
            :to="'/chat/' + orders.id_penjual"
            v-else
          >Hubungi Penjual</v-btn>

          <v-divider></v-divider>

          <div align="center">
            <div v-if="orders.id_mst_order_status != 3">
              <h5 class="title" align="center">Bukti Pembayaran</h5>
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
                :src="getImage(foto)"
                contain
                class="mx-2"
                width="300"
                height="200"
                v-if="orders.id_mst_pembayaran_status > 1"
              ></v-img>

              <p>*Pastikan gambar yang diupload jelas dan terbaca</p>

              <v-btn
                block
                color="primary"
                @click="upload"
                v-if="orders.id_mst_pembayaran_status == 1 && orders.id_penjual != user.id"
              >Konfirmasi Pembayaran</v-btn>

              <v-btn
                block
                color="teal"
                @click="konfirmasi"
                v-if="orders.id_mst_pembayaran_status == 4 && orders.id_penjual == user.id"
              >Konfirmasi Pembayaran</v-btn>
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
    penawaran: null,
    dialog: false
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    async getOrder() {
      await this.axios
        .get("/transaksi/v1/order", {
          params: {
            id: this.$route.params.id
          },
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response.data;
          this.orders = data[0];
          this.iklan = this.orders.iklan;

          this.countdown = moment
            .utc(this.orders.expired_at)
            .format("YYYY-MM-DD HH:mm:ss");

          this.getIklan(this.orders.id_iklan);

          this.dtlPembayaran();

          if (this.user.id != this.orders.id_pembeli && this.user.id != this.orders.id_penjual) {
            alert("Anda tidak berhak mengakses halaman ini");
            this.$router.push({ path: "/" });
          }
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    getIklan(id) {
      this.axios
        .get("/iklan/v1/iklan_tb_mokas", {
          params: {
            id: id,
            limit: 1
          },
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response.data;
          this.iklans = data.motor_bekas.length;
        })
        .catch(error => {
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

      reader.onload = e => {
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
        .post("/transaksi/v1/upload_pembayaran", formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message
          });
          this.getOrder();
          this.dtlPembayaran();
        })
        .catch(error => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "success",
            text: responses.api_message
          });
        });
    },
    konfirmasi() {
      var r = confirm("Yakin ingin mengkonfirmasi pembayaran berikut?");
      if (r == true) {
        let formData = new FormData();

        formData.append("id", this.orders.id);

        this.axios
          .post("/transaksi/v1/konfirmasi_serah_terima", formData, {
            headers: { Authorization: "Bearer " + this.user.token }
          })
          .then(response => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message
            });
            this.getOrder();
            this.dtlPembayaran();
          })
          .catch(error => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "success",
              text: responses.api_message
            });
          });
      }
    },
    dtlPembayaran() {
      this.axios
        .get("/transaksi/v1/upload_pembayaran", {
          params: {
            id_pembayaran: this.orders.id_pembayaran
          },
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response.data;
          this.foto = data[0].foto;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    formPenawaran() {
      this.axios
        .get("/transaksi/v1/form_penawaran?id=" + this.orders.id, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response;
          this.penawaran = data;
          this.dialog = true;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  mounted() {
    this.getOrder();

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

<style>
#foto {
  display: none;
}
</style>