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

          <v-card class="d-inline-block mx-auto" flat>
            <v-container>
              <v-row justify="space-between">
                <v-col cols="auto">
                  <v-img height="80" width="80" src="/img/tiket.png"></v-img>
                </v-col>

                <v-col cols="auto" class="pl-0">
                  <v-row class="flex-column ma-0 text-left" dense>
                    <v-col class="px-0">
                      <h3>Tiket</h3>
                    </v-col>

                    <v-col class="px-0">Jumlah: {{ orders.jumlah }} Tiket</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>

          <v-divider></v-divider>

          <div class="text-left">
            <h2>Informasi Tagihan</h2>

            <v-row dense>
              <v-col cols="6">Nomor Order:</v-col>
              <v-col cols="6" class="font-weight-black">{{ orders.no_order }}</v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6">Tanggal Order:</v-col>
              <v-col
                cols="6"
                class="font-weight-black"
              >{{ orders.created_at | dateTimeFormat }} {{ waktu }}</v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6">Status Tagihan:</v-col>
              <v-col cols="6" class="font-weight-black red--text">{{ orders.pembayaran_status }}</v-col>
            </v-row>

            <v-row dense v-if="orders.id_mst_pembayaran_status == 5">
              <v-col cols="6">Alasan Ditolak:</v-col>
              <v-col cols="6" class="font-weight-black">{{ orders.note }}</v-col>
            </v-row>

            <v-row dense v-if="orders.id_mst_pembayaran_status == 5">
              <v-col cols="6">Detail Alasan:</v-col>
              <v-col cols="6" class="font-weight-black">{{ orders.note_detail }}</v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6">Nama Penjual:</v-col>
              <v-col cols="6" class="font-weight-black">{{ orders.nama_penjual }}</v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6">Total Tagihan:</v-col>
              <v-col
                cols="6"
                class="font-weight-black"
                v-if="orders.total_pembayaran > 0"
              >Rp {{ orders.total_pembayaran.toLocaleString("id-ID") }}</v-col>
              <v-col cols="6" class="font-weight-black" v-else>Rp {{ orders.total_pembayaran }}</v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6">Metode Bayar:</v-col>
              <v-col cols="6" class="font-weight-black">{{ orders.metode }}</v-col>
            </v-row>
          </div>

          <v-divider></v-divider>

          <div v-if="orders.id_mst_pembayaran_status == 1">
            <h5 class="title" align="center">Petunjuk Pembayaran</h5>
            <p>Transfer dapat dilakukan ke salah satu rekening berikut:</p>
            <p>Jika mengalami kendala dalam pembayaran, silahkan kunjungi bantuan.</p>
          </div>

          <v-divider></v-divider>

          <div v-if="orders.id_mst_order_type == 1" align="center">
            <div v-if="orders.id_mst_order_status != 3">
              <h5 class="title" align="center">Bukti Pembayaran</h5>
              <p>Anda wajib melakukan konfirmasi pembayaran agar tiket dapat diproses.</p>

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
                v-if="orders.id_mst_pembayaran_status == 1"
              >
                <label for="foto" slot="upload-label">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-card
                        flat
                        width="500"
                        height="300"
                        :color="!hasImage ? 'grey lighten-3' : 'transparent'"
                        class="d-flex align-center justify-center"
                        v-on="on"
                      >
                        <v-icon x-large v-if="!hasImage">mdi-file-upload</v-icon>

                        <v-img :src="previewUrl" width="500" height="300" contain v-else></v-img>
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
                width="500"
                height="300"
                v-if="orders.id_mst_pembayaran_status > 1"
              ></v-img>

              <p>*Pastikan gambar yang diupload jelas dan terbaca</p>

              <v-btn
                block
                color="primary"
                @click="upload"
                v-if="orders.id_mst_pembayaran_status == 1"
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
  name: "UploadBukti",
  components: { FlipCountdown, ImageUploader },
  data: () => ({
    orders: [],
    buktiBayar: null,
    previewUrl: "",
    foto: null,
    countdown: "",
    utc: moment().utcOffset() / 60 - 7,
    waktu: "",
    accounts: [],
    hasImage: false
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    async getOrder() {
      await this.axios
        .get("/transaksi/v1/order", {
          headers: { Authorization: "Bearer " + this.user.token },
          params: {
            id: this.$route.params.id
          }
        })
        .then(response => {
          let { data } = response.data;
          this.orders = data[0];
          this.countdown = moment
            .utc(this.orders.expired_at)
            .format("YYYY-MM-DD HH:mm:ss");

          this.dtlPembayaran();

          if (
            this.user.id != this.orders.id_pembeli &&
            this.user.id != this.orders.id_penjual
          ) {
            alert("Anda tidak berhak mengakses halaman ini");
            this.$router.push({ path: "/" });
          }
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
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
    getRekening() {
      this.axios
        .get("/user/v1/user/rekening", {
          params: {
            id_app_user: this.user.id,
            id: this.orders.id_app_user_rekening,
            limit: 999
          }
        })
        .then(response => {
          let { data } = response.data;
          this.accounts = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    dtlPembayaran() {
      this.axios
        .get("/transaksi/v1/upload_pembayaran", {
          headers: { Authorization: "Bearer " + this.user.token },
          params: {
            id_pembayaran: this.orders.id_pembayaran
          }
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
    }
  },
  created() {
    this.getOrder();
    this.getRekening();
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
        .format("DD MMM YYYY, HH:mm");
    }
  }
};
</script>

<style>
#foto {
  display: none;
}
</style>