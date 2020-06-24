<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <h1 align="center">Refund Tiket Tawar Bersama</h1>

    <div class="text-center">
      <v-card class="d-inline-block mx-auto">
        <v-container fluid>
          <h3 class="text-left">Jumlah Tiket Tersedia:</h3>

          <h3 class="text-right">{{ tersedia }} Tiket</h3>

          <h3 class="text-left">Jumlah Refund:</h3>

          <v-row dense>
            <v-spacer></v-spacer>

            <v-col cols="4" sm="3">
              <v-form ref="form" v-model="valid2">
                <v-text-field
                  outlined
                  dense
                  suffix="Tiket"
                  v-model="qty"
                  v-mask="mask"
                  @keyup="totalHarga"
                  :rules=" [v => !!v || 'Field is required',v => (v && v > 0) || 'Tidak boleh 0', v => v <= tersedia || 'Tiket lebih']"
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-btn outlined class="mx-2 red--text" @click="plus(1)">1 Tiket</v-btn>
            </v-col>

            <v-col cols="4">
              <v-btn outlined class="mx-2 red--text" @click="plus(5)">5 Tiket</v-btn>
            </v-col>

            <v-col cols="4">
              <v-btn outlined class="mx-2 red--text" @click="plus(tersedia)">Semua</v-btn>
            </v-col>
          </v-row>

          <v-divider class="my-2"></v-divider>

          <h2>Detail Tiket</h2>

          <v-row dense v-if="qty > 0">
            <v-col cols="6" class="text-left">- {{ qty }} Tiket x Rp {{ harga }}</v-col>
            <v-col cols="6" class="text-right">Rp {{ total }}</v-col>
          </v-row>

          <h3 class="text-left">Total Refund</h3>

          <h3 class="text-right">Rp {{ total }}</h3>

          <v-divider class="my-2"></v-divider>

          <h2>Detail Rekening</h2>

          <v-list v-if="accounts.length > 0">
            <v-list-item v-for="item in accounts" :key="item.id">
              <v-list-item-icon>
                <v-card
                  width="70"
                  dark
                  color="primary"
                  class="pa-2"
                  v-if="item.id_mst_bank == 2"
                >MNDR</v-card>

                <v-card width="70" dark color="orange" class="pa-2" v-if="item.id_mst_bank == 3">BNI</v-card>

                <v-card width="70" dark color="indigo" class="pa-2" v-if="item.id_mst_bank == 4">BRI</v-card>

                <v-card width="70" dark color="blue" class="pa-2" v-if="item.id_mst_bank == 12">BCA</v-card>

                <v-card
                  width="70"
                  dark
                  color="green"
                  class="pa-2"
                  v-if="item.id_mst_bank == 33"
                >PRMT</v-card>
              </v-list-item-icon>

              <v-list-item-content class="text-left">
                <v-list-item-title>{{ item.bank_name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.nomor_rekening }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ item.nama_rekening }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-radio-group v-model="selected" column>
                  <v-radio :value="item.id"></v-radio>
                </v-radio-group>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <h3 v-else>Tidak ada Rekening</h3>

          <v-dialog v-model="dialogRekening" persistent max-width="650px">
            <v-card height="380px">
              <v-toolbar dark color="teal darken-3">
                <v-toolbar-title>Tambah Rekening</v-toolbar-title>

                <div class="flex-grow-1"></div>
                <v-btn icon dark @click="dialogRekening = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-row dense>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.bank_name"
                        :items="banks"
                        item-value="id"
                        item-text="bank_name"
                        :rules="[v => !!v || 'Field is required']"
                        label="Pilih Nama Bank"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.nama_rekening"
                        :counter="20"
                        :rules="[v => !!v || 'Field is required']"
                        label="Nama Pemilik Rekening"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.nomor_rekening"
                        :counter="20"
                        :rules="[v => !!v || 'Field is required', v => /^\d+$/.test(v) || 'Numbers Only']"
                        label="Nomor Rekening"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" dark class="mb-2" align="right" @click="save">Simpan</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn block class="ma-2" color="primary" @click="dialogRekening = true">Tambah Rekening</v-btn>

          <h6
            class="my-3"
          >Setelah anda melakukan penjualan tiket, uang anda akan masuk dalam waktu maksimal 2x24jam</h6>

          <v-btn
            class="my-3"
            color="primary"
            @click="refund"
            :disabled="selected == '' || !valid2 ? true : false"
          >Refund</v-btn>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mask } from "vue-the-mask";

export default {
  name: "refund",
  directives: { mask },
  data: () => ({
    mask: "###",
    qty: 0,
    harga: 0,
    total: 0,
    selected: "",
    dialogRekening: false,
    accounts: [],
    banks: [],
    editedItem: {
      bank_name: "",
      nama_rekening: "",
      nomor_rekening: ""
    },
    defaultItem: {},
    valid: true,
    tiket: [],
    tersedia: 0,
    valid2: true
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    plus(qty) {
      if (qty >= this.tersedia) {
        this.qty = this.tersedia;
      } else {
        this.qty = Number(this.qty) + qty;
      }

      this.totalHarga();
    },
    totalTiket() {
      this.axios
        .get("/tiket/v1/total_tiket", {
          params: {
            id_app_user: this.user.id
          }
        })
        .then(response => {
          let { data } = response.data;
          this.tersedia = data.tersedia;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    getRekening() {
      this.axios
        .get("/user/v1/user/rekening", {
          params: {
            id_app_user: this.user.id,
            limit: 999
          }
        })
        .then(response => {
          let { data } = response.data;
          this.accounts = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    getBank() {
      this.axios
        .get("/master/v1/mst_bank")
        .then(response => {
          let { data } = response.data;
          this.banks = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    close() {
      this.dialogRekening = false;

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      }, 300);
    },
    save() {
      let formData = new FormData();

      formData.append("id_mst_bank", this.editedItem.bank_name);
      formData.append("nama_rekening", this.editedItem.nama_rekening.trim());
      formData.append("nomor_rekening", this.editedItem.nomor_rekening.trim());
      formData.append("id_app_user", this.user.id);

      this.axios
        .post("/user/v1/user/rekening", formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message
          });
          this.getRekening();
          this.close();
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    totalHarga() {
      this.total = Number(this.qty * this.harga).toLocaleString("id-ID");
      this.getRefund();
    },
    getRefund() {
      this.axios
        .get("/tiket/v1/tiket", {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 1,
            limit: this.qty
          }
        })
        .then(response => {
          let { data } = response.data;
          this.tiket = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    refund() {
      let formData = new FormData();

      for (let index = 0; index < this.tiket.length; index++) {
        const element = this.tiket[index].id;
        formData.append("id_tiket", element);
      }
      formData.append("id_penjual", this.user.id);
      formData.append("id_app_user_rekening", this.selected);

      this.axios
        .post("/transaksi/v1/pencairan_tiket", formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message
          });
          this.$router.go(-1);
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses);
        });
    }
  },
  created() {
    this.totalTiket();
    this.getRekening();
    this.getBank();
    this.getRefund();
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>