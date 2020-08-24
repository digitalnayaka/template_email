<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div>
      <h1 class="text-center">Detail Transaksi</h1>

      <v-card class="mx-auto" max-width="600">
        <v-row>
          <v-col cols="12">
            <v-card color="deep-orange lighten-2">
              <div class="d-flex flex-no-wrap justify-space-between align-center">
                <v-avatar class="ma-3" size="20" tile>
                  <v-img src="/img/error.png"></v-img>
                </v-avatar>

                <div>
                  <v-card-text>Selalu waspada terhadap pihak yang tidak bertanggung jawab. Pastikan bukti pembayaran yang diupload sudah benar.</v-card-text>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <div class="text-center" v-if="orders.id_mst_pembayaran_status == 1">
          <div>Batas Waktu Pembayaran</div>

          <flip-countdown :deadline="orders.expired_at | countdown(utc)"></flip-countdown>

          <v-card
            flat
            color="grey lighten-1"
          >Sebelum: {{ orders.expired_at | dateTimeFormat(utc) }} {{ waktu }}</v-card>
        </div>

        <v-list subheader>
          <v-subheader>
            <h1>Informasi Tagihan</h1>
          </v-subheader>

          <v-list-item>
            <v-list-item-title>Nomor Order:</v-list-item-title>
            <v-list-item-title class="font-weight-black">{{ orders.no_order }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Tanggal Order:</v-list-item-title>
            <v-list-item-title
              class="font-weight-black"
            >{{ orders.created_at | dateTimeFormat(utc) }} {{ waktu }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Dijual Oleh</v-list-item-title>
            <v-list-item-title class="font-weight-black">{{ orders.nama_penjual }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Metode Bayar:</v-list-item-title>
            <v-list-item-title class="font-weight-black">{{ orders.metode }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list subheader>
          <v-subheader v-if="orders.iklan != undefined">
            <h1>{{ orders.iklan.judul }}</h1>
          </v-subheader>
          <v-list-item>
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
            <v-list-item-title
              class="font-weight-black red--text"
              v-if="orders.id_mst_pembayaran_status == 6"
            >Alasan Ditolak: {{ orders.note }}</v-list-item-title>

            <!-- <v-list-item-title v-if="orders.id_mst_pembayaran_status == 6">
                Alasan Ditolak:
                <span
                  class="font-weight-black d-sm-inline-flex d-flex"
                >{{ orders.note }}</span>
            </v-list-item-title>-->
            <v-list-item-title
              class="font-weight-black red--text"
              v-if="orders.id_mst_pembayaran_status == 1"
            >Alasan Ditolak: {{ orders.note_detail }}</v-list-item-title>
            <!-- <v-list-item-title v-if="orders.id_mst_pembayaran_note == 1">
                Detail Alasan:
                <span
                  class="font-weight-black d-sm-inline-flex d-flex"
                >{{ orders.note_detail }}</span>
            </v-list-item-title>-->
          </v-list-item>
             <v-list-item>
            <v-list-item-title>Jumlah:</v-list-item-title>
            <v-list-item-title class="font-weight-black">{{ orders.jumlah }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Total Tagihan:</v-list-item-title>
            <v-list-item-title
              class="font-weight-black red--text"
            >Rp {{ Number(orders.total_pembayaran).toLocaleString("id-ID") }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-content></v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-container fluid v-if="orders.id_mst_pembayaran_status == 1">
          <h2>Petunjuk Pembayaran</h2>

          <div>Transfer dapat dilakukan ke salah satu rekening berikut:</div>
          <div align="center">
            <img src="/img/bank/bca.png" width="60px" height="20px" />
            <h3 class="blue--text text--darken-4">&nbsp;8920008390</h3>
            <h3 class="blue--text text--darken-4">&nbsp;A/N Digital Nayaka Abhinaya</h3>
          </div>
          <div>Mohon transfer sesuai dengan nominal yang tertera.</div>
          <div>Jika mengalami kendala dalam pembayaran, silahkan kunjungi bantuan.</div>
        </v-container>

        <v-container v-if="orders.id_mst_order_status != 3">
          <h2>Bukti Pembayaran</h2>
          <p>Anda wajib melakukan konfirmasi pembayaran agar tiket dapat diproses.</p>

          <div align="center">
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
          </div>

          <v-btn
            block
            color="teal"
            dark
            @click="upload"
            v-if="orders.id_mst_pembayaran_status == 1"
          >Konfirmasi Pembayaran</v-btn>

          <br />

          <v-btn
            block
            color="red"
            dark
            @click="batalkan"
            v-if="orders.id_mst_pembayaran_status == 1"
          >Batalkan</v-btn>
        </v-container>
      </v-card>
    </div>

    <!-- <div class="text-center">
      <v-card class="d-inline-block mx-auto" width="590">
        <v-container fluid>
          <h1>Detail Transaksi</h1>

          <v-card flat align="center" color="grey lighten-3">
            <v-avatar size="16" tile>
              <v-img src="/img/error.png"></v-img>
            </v-avatar>Selalu waspada terhadap pihak yang tidak bertanggung jawab. Pastikan bukti pembayaran yang diupload sudah benar.
          </v-card>

          <v-container
            fluid
            class="text-center"
            v-if="orders.id_mst_pembayaran_status == 1 && orders.id_mst_order_type == 1"
          >
            <div>Batas Waktu Pembayaran</div>

            <flip-countdown :deadline="countdown"></flip-countdown>

            <v-card
              flat
              color="grey lighten-3"
            >Sebelum: {{ orders.expired_at | dateTimeFormat(utc) }} {{ waktu }}</v-card>
          </v-container>

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
              <v-col cols="6">Dijual Oleh:</v-col>
              <v-col cols="6" class="font-weight-black">{{ orders.nama_penjual }}</v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6">Metode Bayar:</v-col>
              <v-col cols="6" class="font-weight-black">{{ orders.metode }}</v-col>
            </v-row>

            <v-row dense v-if="orders.id_mst_pembayaran_status == 5">
              <v-col cols="6">Alasan Ditolak:</v-col>
              <v-col cols="6" class="font-weight-black">{{ orders.note }}</v-col>
            </v-row>

            <v-row dense v-if="orders.id_mst_pembayaran_status == 6">
              <v-col cols="6">Detail Alasan:</v-col>
              <v-col cols="6" class="font-weight-black">{{ orders.note_detail }}</v-col>
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
          </div>

          <div if="orders.id_mst_order_type == 1">
            <v-divider></v-divider>

            <h2 class="text-left">Informasi Produk</h2>

            <v-card class="d-inline-block mx-auto" flat>
            <v-container fluid>
              <v-row justify="space-between" align="center">
                <v-col cols="auto">
                  <h3>Tiket</h3>
                  <v-img height="90" width="90" src="/img/tiket.png"></v-img>
                </v-col>

                <v-col cols="auto" class="pl-0">
                  <v-row class="flex-column ma-0 text-left" dense>
                    <v-col class="px-0">
                      Status Tagihan:
                      <span
                        class="font-weight-black red--text"
                      >{{ orders.pembayaran_status }}</span>
                    </v-col>

                    <v-col class="px-0" v-if="orders.id_mst_pembayaran_status == 6">
                      Alasan Ditolak:
                      <span class="font-weight-black">{{ orders.note }}</span>
                    </v-col>

                    <v-col class="px-0" v-if="orders.id_mst_pembayaran_note == 5">
                      Detail Alasan:
                      <span class="font-weight-black">{{ orders.note_detail }}</span>
                    </v-col>

                    <v-col class="px-0 teal--text">Jumlah: {{ orders.jumlah }} Tiket</v-col>

                    <v-col class="px-0">
                      Total Tagihan:
                      <span
                        class="font-weight-black"
                      >Rp {{ Number(orders.total_pembayaran).toLocaleString("id-ID") }}</span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            </v-card>

            <v-list subheader align="left">
              <v-subheader v-if="orders.iklan != undefined">
                <h1>{{ orders.iklan.judul }}</h1>
              </v-subheader>

              <v-list-item>
                <v-list-item-avatar tile size="80">
                  <v-img src="/img/tiket.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    Status {{ orders.id_mst_order_type == 1 ? "Tagihan" : "Refund" }}:
                    <span
                      class="font-weight-black red--text d-sm-inline-flex d-flex"
                    >{{ orders.pembayaran_status }}</span>
                  </v-list-item-title>

                  <v-list-item-title v-if="orders.id_mst_pembayaran_status == 6">
                    Alasan Ditolak:
                    <span
                      class="font-weight-black d-sm-inline-flex d-flex"
                    >{{ orders.note }}</span>
                  </v-list-item-title>

                  <v-list-item-title v-if="orders.id_mst_pembayaran_note == 1">
                    Detail Alasan:
                    <span
                      class="font-weight-black d-sm-inline-flex d-flex"
                    >{{ orders.note_detail }}</span>
                  </v-list-item-title>

                  <v-list-item-title>
                    Total {{ orders.id_mst_order_type == 1 ? "Tagihan" : "Refund" }}:
                    <span
                      class="font-weight-black d-sm-inline-flex d-flex"
                    >Rp {{ Number(orders.total_pembayaran).toLocaleString("id-ID") }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>

          <div
            align="left"
            v-if="orders.id_mst_pembayaran_status == 1 && orders.id_mst_order_type == 1"
          >
            <v-divider></v-divider>

            <h2>Petunjuk Pembayaran</h2>

            <div>Transfer dapat dilakukan ke salah satu rekening berikut:</div>

            <div>
              <img src="/img/bank/bca.png" width="60px" height="20px" />
              <span class="blue--text text--darken-4">&nbsp;8920008390</span>
              <span class="blue--text text--darken-4">&nbsp;A/N Digital Nayaka Abhinaya</span>
            </div>
            <div>Mohon transfer sesuai dengan nominal yang tertera.</div>
            <div>Jika mengalami kendala dalam pembayaran, silahkan kunjungi bantuan.</div>
          </div>

          <div
            align="left"
            v-if="orders.id_mst_pembayaran_status == 1 && orders.id_mst_order_type == 2"
          >
            <v-divider></v-divider>

            <h2>Tujuan Pembayaran</h2>

          </div>

          <div v-if="orders.id_mst_order_type == 1" align="center">
            <v-divider class="my-2"></v-divider>

            <div v-if="orders.id_mst_order_status != 3">
              <h2>Bukti Pembayaran</h2>
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
                color="teal"
                dark
                @click="upload"
                v-if="orders.id_mst_pembayaran_status == 1"
              >Konfirmasi Pembayaran</v-btn>
              <br />
              <v-btn
                block
                color="red"
                dark
                @click="batalkan"
                v-if="orders.id_mst_pembayaran_status == 1"
              >Batalkan</v-btn>
            </div>
          </div>
        </v-container>
      </v-card>
    </div>-->
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
    hasImage: false,
    previewUrl: "",
    foto: null,
    utc: moment().utcOffset() / 60 - 7,
    waktu: "",
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    async getOrder() {
      await this.axios
        .get("/transaksi/v3/order", {
          headers: { Authorization: "Bearer " + this.user.token },
          params: {
            id: this.$route.params.id,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.orders = data[0];

          if (
            this.orders.id_mst_pembayaran_status == 2 ||
            this.orders.id_mst_pembayaran_status == 4
          ) {
            this.dtlPembayaran(this.orders.id_pembayaran);
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
        });
    },
    upload() {
      let formData = new FormData();

      formData.append("id_pembayaran", this.orders.id_pembayaran);
      formData.append("foto", this.buktiBayar, "Bukti_Bayar.jpg");
      formData.append("created_by_type", 3);
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
          this.dtlPembayaran(this.orders.id_pembayaran);
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
    batalkan() {
      let formData = new FormData();

      formData.append("id", this.orders.id);
      formData.append("id_app_user", this.user.id);
      formData.append("id_mst_pembayaran_note", 1);
      formData.append("note_detail", "Membatalkan Tiket");

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
    },
    dtlPembayaran(id_pembayaran) {
      this.axios
        .get("/transaksi/v3/upload_pembayaran", {
          headers: { Authorization: "Bearer " + this.user.token },
          params: {
            id_pembayaran: id_pembayaran,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.foto = data[0].foto;
        })
        .catch((error) => {
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

      reader.onload = (e) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.buktiBayar);
    },
  },
  created() {
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
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY, HH:mm");
    },
    countdown: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY HH:mm:ss");
    },
  },
};
</script>

<style>
#foto {
  display: none;
}
</style>