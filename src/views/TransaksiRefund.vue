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
          <h1>Detail Refund</h1>

          <v-card flat align="center" color="grey lighten-3">
            <v-avatar size="16" tile>
              <v-img src="/img/error.png"></v-img>
            </v-avatar>Selalu waspada terhadap pihak yang tidak bertanggung jawab.
          </v-card>
          <div class="text-left">
            <h2>Informasi Refund</h2>

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

            <v-row dense>
              <v-col cols="6">Nama Penjual:</v-col>
              <v-col cols="6" class="font-weight-black">{{ orders.nama_penjual }}</v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6">Total Refund:</v-col>
              <v-col
                cols="6"
                class="font-weight-black"
                v-if="orders.total_pembayaran > 0"
              >Rp {{ orders.total_pembayaran.toLocaleString("id-ID") }}</v-col>
              <v-col cols="6" class="font-weight-black">Rp {{ orders.total_pembayaran }}</v-col>
            </v-row>

            <v-row dense>
              <v-col cols="6">Metode Bayar:</v-col>
              <v-col cols="6" class="font-weight-black">{{ orders.metode }}</v-col>
            </v-row>
          </div>
          <div class="text-left">
            <v-row dense>
              <v-col cols="6">
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
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>

          <v-divider></v-divider>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";

export default {
  name: "refund_tiket",
  data: () => ({
    orders: [],
    bank: [],
    utc: moment().utcOffset() / 60 - 7,
    waktu: "",
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    async getOrder() {
      await this.axios
        .get("/transaksi/v1/pencairan_tiket", {
          headers: { Authorization: "Bearer " + this.user.token },
          params: {
            id: this.$route.params.id,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.orders = data[0];
          this.getBank(
            this.orders.id_app_user_rekening,
            this.orders.id_penjual
          );
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getBank(id, user) {
      this.axios
        .get("/user/v1/user/rekening", {
          headers: { Authorization: "Bearer " + this.user.token },
          params: {
            id: id,
            id_app_user: user,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.bank = data[0];
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    salin() {
      let testingCodeToCopy = document.querySelector("#nomor_rekening");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        document.execCommand("copy");
        this.setAlert({
          status: true,
          color: "success",
          text: "Nomor rekening berhasil disalin",
        });
      } catch (err) {
        this.setAlert({
          status: true,
          color: "error",
          text: "Oops, unable to copy",
        });
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
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
  },
};
</script>

<style>
#foto {
  display: none;
}
</style>