<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card flat>
      <h1 class="text-center">Detail Transaksi</h1>

      <v-card color="deep-orange lighten-2">
        <div class="d-flex align-center">
          <v-avatar class="ma-3" size="20" tile>
            <v-img src="/img/error.png"></v-img>
          </v-avatar>

          <v-card-text
            >Selalu waspada terhadap pihak yang tidak bertanggung jawab.
            Pastikan bukti pembayaran yang diupload sudah benar.</v-card-text
          >
        </div>
      </v-card>

      <div class="text-center" v-if="orders.id_mst_pembayaran_status == 1">
        <v-card-text>Batas Waktu Pembayaran</v-card-text>

        <flip-countdown
          :deadline="orders.expired_at | countdown(utc)"
        ></flip-countdown>

        <v-card flat color="grey lighten-1"
          >Sebelum: {{ orders.expired_at | dateTimeFormat(utc) }}
          {{ timezone }}</v-card
        >
      </div>

      <v-list subheader>
        <v-subheader>
          <h1>Informasi Tagihan</h1>
        </v-subheader>

        <v-list-item>
          <v-list-item-title>Nomor Order:</v-list-item-title>
          <v-list-item-subtitle class="font-weight-black">{{
            orders.no_order
          }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Tanggal Order:</v-list-item-title>
          <v-list-item-subtitle class="font-weight-black d-flex"
            >{{ orders.created_at | dateTimeFormat(utc) }}
            {{ timezone }}</v-list-item-subtitle
          >
        </v-list-item>

        <v-list-item v-if="orders.id_mst_pembayaran_status == 6">
          <v-list-item-title>Alasan Ditolak:</v-list-item-title>

          <v-list-item-subtitle
            class="font-weight-black d-sm-inline-flex d-flex"
            >{{ orders.note }}</v-list-item-subtitle
          >
        </v-list-item>

        <v-list-item v-if="orders.id_mst_pembayaran_note == 1">
          <v-list-item-title>Detail Alasan:</v-list-item-title>

          <v-list-item-subtitle
            class="font-weight-black d-sm-inline-flex d-flex"
            >{{ orders.note_detail }}</v-list-item-subtitle
          >
        </v-list-item>

        <v-list-item>
          <v-list-item-title
            >Nama
            {{
              orders.id_mst_order_type == 1 ? "Penjual:" : "Pembeli:"
            }}</v-list-item-title
          >
          <v-list-item-subtitle class="font-weight-black">{{
            orders.id_mst_order_type == 1
              ? orders.nama_penjual
              : orders.nama_pembeli
          }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Metode Bayar:</v-list-item-title>
          <v-list-item-subtitle class="font-weight-black">{{
            orders.metode
          }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list subheader>
        <v-subheader v-if="orders.iklan != undefined">
          <h1>Informasi Produk</h1>
        </v-subheader>

        <div class="mx-4" v-if="orders.iklan != undefined">
          {{ orders.iklan.judul }}
        </div>

        <v-list-item>
          <v-list-item-avatar tile size="80">
            <v-img src="/img/icons/ic_tiket.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="d-flex flex-wrap">
              Status:
              <span
                class="font-weight-black orange--text"
                v-if="orders.id_mst_pembayaran_status == 1"
                >{{ orders.pembayaran_status }}</span
              >

              <span
                class="font-weight-black blue--text"
                v-if="orders.id_mst_pembayaran_status == 2"
                >{{ orders.pembayaran_status }}</span
              >

              <span
                class="font-weight-black red--text"
                v-if="orders.id_mst_pembayaran_status == 3"
                >{{ orders.pembayaran_status }}</span
              >

              <span
                class="font-weight-black teal--text"
                v-if="orders.id_mst_pembayaran_status == 4"
                >{{ orders.pembayaran_status }}</span
              >

              <span
                class="font-weight-black red--text"
                v-if="orders.id_mst_pembayaran_status == 5"
                >{{ orders.pembayaran_status }}</span
              >

              <span
                class="font-weight-black red--text"
                v-if="orders.id_mst_pembayaran_status == 6"
                >{{ orders.pembayaran_status }}</span
              >
            </v-list-item-title>

            <v-list-item-title
              >Jumlah: {{ orders.jumlah }} Tiket</v-list-item-title
            >

            <v-list-item-title>
              Total Harga:
              <span class="font-weight-black"
                >Rp
                {{
                  Number(orders.total_pembayaran).toLocaleString("id-ID")
                }}</span
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-container fluid v-if="orders.id_mst_order_type == 2">
        <h2>Tujuan Pembayaran</h2>

        <div>Transfer akan dilakukan ke rekening berikut:</div>

        <v-list>
          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-img :src="getImage(accounts.foto)" contain></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ accounts.bank_name }}</v-list-item-title>
              <v-list-item-subtitle>{{
                accounts.nomor_rekening
              }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{
                accounts.nama_rekening
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div>
          Jika mengalami kendala dalam pembayaran, silahkan kunjungi bantuan.
        </div>

        <v-row>
          <v-col cols="6">
            <v-btn block outlined color="teal" dark to="/bantuan"
              >Bantuan</v-btn
            >
          </v-col>

          <v-col cols="6">
            <v-btn block color="teal" dark>Kirim Pesan</v-btn>
          </v-col>
        </v-row>
      </v-container>

      <v-divider></v-divider>

      <div align="center"
        v-if="orders.id_mst_order_status != 3 && orders.id_mst_order_type == 1"
      >
        <h2>Konfirmasi Pembelian</h2>
        <p>
          Anda wajib melakukan konfirmasi pembelian agar pesanan dapat diproses.
        </p>

        <div align="center">
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
            v-if="orders.id_mst_pembayaran_status == 1"
          >
            <label for="foto" slot="upload-label">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-card
                    flat
                    width="400"
                    height="200"
                    :color="!hasImage ? 'grey lighten-3' : 'transparent'"
                    class="d-flex align-center justify-center"
                    v-on="on"
                  >
                    <v-icon x-large v-if="!hasImage">mdi-file-upload</v-icon>

                    <v-img
                      :src="previewUrl"
                      width="400"
                      height="200"
                      contain
                      v-else
                    ></v-img>
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
            width="500"
            height="300"
            v-if="orders.id_mst_pembayaran_status > 1"
          ></v-img>

          <p>*Pastikan gambar yang diupload jelas dan terbaca</p>
        </div>

        <v-btn
          block
          color="teal"
          class="white--text"
          :disabled="!hasImage"
          @click="upload"
          v-if="orders.id_mst_pembayaran_status == 1"
          >Konfirmasi Pembayaran</v-btn
        >

        <br />

        <v-btn
          block
          color="red"
          dark
          @click="batalkan"
          v-if="orders.id_mst_pembayaran_status == 1"
          >Batalkan</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FlipCountdown from "vue2-flip-countdown";
import moment from "moment-timezone";
import ImageUploader from "vue-image-upload-resize";

export default {
  name: "UploadBukti",
  props: ["utc", "timezone"],
  components: { FlipCountdown, ImageUploader },
  data: () => ({
    orders: [],
    buktiBayar: null,
    accounts: [],
    hasImage: false,
    previewUrl: "",
    foto: null,
    gambar: null,
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    getOrder() {
      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id: this.$route.params.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.orders = data[0];
          this.getRekening();

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
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
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
          params: {
            id_pembayaran: id_pembayaran,
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
    getRekening() {
      this.axios
        .get("/user/v3/user/rekening", {
          params: {
            id_app_user: this.orders.id_penjual,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.accounts = data[0];
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
    this.getOrder();
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