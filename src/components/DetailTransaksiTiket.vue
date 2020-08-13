<template>
  <v-container fluid>
    <div class="text-center" v-if="item.id_mst_pembayaran_status == 1">
      <div>Batas Waktu Pembayaran</div>

      <flip-countdown :deadline="item.expired_at | countdown(utc)"></flip-countdown>

      <v-card
        flat
        color="grey lighten-1"
      >Sebelum: {{ item.expired_at | dateTimeFormat(utc) }} {{ waktu }}</v-card>
    </div>

    <v-list subheader>
      <v-subheader>
        <h1>Informasi Tagihan</h1>
      </v-subheader>

      <v-list-item>
        <v-list-item-title>Nomor Order:</v-list-item-title>
        <v-list-item-title class="font-weight-black">{{ item.no_order }}</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Tanggal Order:</v-list-item-title>
        <v-list-item-title
          class="font-weight-black"
        >{{ item.created_at | dateTimeFormat(utc) }} {{ waktu }}</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Dijual Oleh:</v-list-item-title>
        <v-list-item-title class="font-weight-black">{{ item.nama_penjual }}</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Metode Bayar:</v-list-item-title>
        <v-list-item-title class="font-weight-black">{{ item.metode }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list subheader>
      <v-subheader v-if="item.iklan != undefined">
        <h1>{{ item.iklan.judul }}</h1>
      </v-subheader>

      <v-list-item>
        <v-list-item-avatar tile size="80">
          <v-img src="/img/tiket.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            Status Tagihan:
            <span
              class="font-weight-black red--text d-sm-inline-flex d-flex"
            >{{ item.pembayaran_status }}</span>
          </v-list-item-title>

          <v-list-item-title v-if="item.id_mst_pembayaran_status == 6">
            Alasan Ditolak:
            <span class="font-weight-black d-sm-inline-flex d-flex">{{ item.note }}</span>
          </v-list-item-title>

          <v-list-item-title v-if="item.id_mst_pembayaran_note == 1">
            Detail Alasan:
            <span
              class="font-weight-black d-sm-inline-flex d-flex"
            >{{ item.note_detail }}</span>
          </v-list-item-title>

          <v-list-item-title>
            Total Tagihan:
            <span
              class="font-weight-black d-sm-inline-flex d-flex"
            >Rp {{ Number(item.total_pembayaran).toLocaleString("id-ID") }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-container fluid v-if="item.id_mst_pembayaran_status == 1 && item.id_mst_order_type == 1">
      <h2>Petunjuk Pembayaran</h2>

      <div>Transfer dapat dilakukan ke salah satu rekening berikut:</div>
      <div>
        <img src="/img/bank/bca.png" width="60px" height="20px" />
        <span class="blue--text text--darken-4">&nbsp;8920008390</span>
        <span class="blue--text text--darken-4">&nbsp;A/N Digital Nayaka Abhinaya</span>
      </div>
      <div>Mohon transfer sesuai dengan nominal yang tertera.</div>
      <div>Jika mengalami kendala dalam pembayaran, silahkan kunjungi bantuan.</div>
    </v-container>

    <v-divider></v-divider>

    <v-container v-if="item.id_mst_order_status != 3">
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
          v-if="item.id_mst_pembayaran_status == 1"
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
          v-if="item.id_mst_pembayaran_status > 1"
        ></v-img>

        <p>*Pastikan gambar yang diupload jelas dan terbaca</p>
      </div>

      <v-btn
        block
        color="teal"
        dark
        @click="upload"
        v-if="item.id_mst_pembayaran_status == 1"
      >Konfirmasi Pembayaran</v-btn>

      <br />

      <v-btn
        block
        color="red"
        dark
        @click="batalkan"
        v-if="item.id_mst_pembayaran_status == 1"
      >Batalkan</v-btn>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
import FlipCountdown from "vue2-flip-countdown";
import ImageUploader from "vue-image-upload-resize";

export default {
  name: "detail-transaksi-tiket",
  props: ["item", "foto"],
  components: { FlipCountdown, ImageUploader },
  data: () => ({
    buktiBayar: null,
    hasImage: false,
    previewUrl: "",
    utc: moment().utcOffset() / 60 - 7,
    waktu: "",
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    upload() {
      let formData = new FormData();

      formData.append("id_pembayaran", this.item.id_pembayaran);
      formData.append("foto", this.buktiBayar);
      formData.append("created_by_type", 1);
      formData.append("created_by", this.user.id);

      this.axios
        .post("/transaksi/v1/upload_pembayaran", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.$parent.$parent.getOrder();
          this.$parent.$parent.dtlPembayaran(this.item.id_pembayaran);
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

      formData.append("id", this.item.id);
      formData.append("id_app_user", this.user.id);
      formData.append("id_mst_pembayaran_note", 1);
      formData.append("note_detail", "Membatalkan Tiket");

      this.axios
        .post("/transaksi/v1/batalkan_pembelian", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.$parent.$parent.getOrder();
          // this.$parent.$parent.dtlPembayaran(this.item.id_pembayaran);
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
    tes() {
      this.$parent.$parent.dtlPembayaran(this.item.id_pembayaran);
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
  mounted() {
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