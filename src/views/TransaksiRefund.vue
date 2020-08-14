<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- <div class="text-center">
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
    </div>-->

    <div>
      <h1 class="text-center">Detail Transaksi Refund</h1>

      <v-card class="mx-auto" max-width="600">
        <v-row>
          <v-col cols="12">
            <v-card color="deep-orange lighten-2">
              <div class="d-flex flex-no-wrap justify-start align-center">
                <v-avatar class="ma-3" size="20" tile>
                  <v-img src="/img/error.png"></v-img>
                </v-avatar>

                <div>
                  <v-card-text>Selalu waspada terhadap pihak yang tidak bertanggung jawab.</v-card-text>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-list>
          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-img src="/img/tiket.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Tiket Tawar Bersama</v-list-item-title>
              <v-list-item-subtitle>Jumlah: {{ orders.jumlah }} Tiket</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list subheader>
          <v-subheader>
            <h1>Informasi Refund</h1>
          </v-subheader>

          <v-list-item>
            <v-list-item-title>Nomor Order:</v-list-item-title>
            <v-list-item-title class="font-weight-black">{{ orders.no_order }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Tanggal Order:</v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <div
                class="font-weight-black d-flex"
              >{{ orders.created_at | dateTimeFormat(utc) }} {{ waktu }}</div>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Tanggal Refund:</v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <div
                class="font-weight-black d-flex"
              >{{ orders.created_at | dateTimeFormat(utc) }} {{ waktu }}</div>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Status Tagihan:</v-list-item-title>
            <v-list-item-title class="font-weight-black red--text">{{ orders.pembayaran_status }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Nama Pembeli:</v-list-item-title>
            <v-list-item-title class="font-weight-black">{{ orders.nama_pembeli }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Total Refund:</v-list-item-title>
            <v-list-item-title
              class="font-weight-black"
            >Rp {{ Number(orders.total_pembayaran).toLocaleString("id-ID") }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Metode Bayar:</v-list-item-title>
            <v-list-item-title class="font-weight-black">{{ orders.metode }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list subheader>
          <v-subheader>
            <h1>Tujuan Pembayaran</h1>
          </v-subheader>

          <v-list-item>
            <v-list-item-title>Transfer akan dilakukan ke rekening berikut:</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-img src="/img/bank/bca.png" contain v-if="bank.id_mst_bank == 12"></v-img>
              <v-img src="/img/bank/bni.png" contain v-if="bank.id_mst_bank == 3"></v-img>
              <v-img src="/img/bank/bri.png" contain v-if="bank.id_mst_bank == 4"></v-img>
              <v-img src="/img/bank/mandiri.png" contain v-if="bank.id_mst_bank == 2"></v-img>
              <v-img src="/img/bank/permata.png" contain v-if="bank.id_mst_bank == 33"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ bank.bank_name }}</v-list-item-title>
              <v-list-item-subtitle>{{ bank.nomor_rekening }}</v-list-item-subtitle>
              <input type="hidden" id="nomor_rekening" :value="bank.nomor_rekening" />
              <v-list-item-subtitle>{{ bank.nama_rekening }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn class="teal--text" @click="salin" outlined>Salin</v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Jika mengalami kendala dengan penjualan, silahkan kunjungi Bantuan.</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-container fluid>
          <v-btn color="red darken-1" dark block @click="batalkan" v-if="orders.id_mst_pembayaran_status == 1">Batalkan</v-btn>
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
        .get("/transaksi/v1/order", {
          params: {
            id: this.$route.params.id,
            id_mst_order_type: 2,
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
    batalkan() {
      let formData = new FormData();

      formData.append("id", this.orders.id);
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