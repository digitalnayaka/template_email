<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <!-- <v-btn icon @click="dialog = true">
        <v-badge color="orange" overlap v-if="countCart > 0">
          <template v-slot:badge>
            <span>{{ countCart }}</span>
          </template>

          <v-icon>mdi-cart</v-icon>
        </v-badge>

        <v-icon v-else>mdi-cart</v-icon>
      </v-btn>-->
    </v-app-bar>

    <h1 align="center">Refund Tiket Tawar Bersama</h1>
    <!-- <h5 align="center">Pilih tiket yang akan di refund.</h5> -->

    <div class="text-center">
      <v-card class="d-inline-block mx-auto">
        <v-container fluid>
          <h3 class="text-left">Jumlah Tiket Tersedia:</h3>

          <h3 class="text-right">{{ tersedia }} Tiket</h3>

          <h3 class="text-left">Jumlah Refund:</h3>

          <h3 class="text-right">{{ Number(qty).toLocaleString("id-ID") }} Tiket</h3>

          <!-- <v-row dense>
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
          </v-row>-->

          <!-- <v-row>
            <v-col cols="4">
              <v-btn outlined class="mx-2 red--text" @click="plus(1)">1 Tiket</v-btn>
            </v-col>

            <v-col cols="4">
              <v-btn outlined class="mx-2 red--text" @click="plus(5)">5 Tiket</v-btn>
            </v-col>

            <v-col cols="4">
              <v-btn outlined class="mx-2 red--text" @click="plus(tersedia)">Semua</v-btn>
            </v-col>
          </v-row>-->

          <v-dialog v-model="dialog" fullscreen width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn block dark v-bind="attrs" v-on="on" @click="open">Pilih Tiket Refund</v-btn>
            </template>

            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon dark class="mx-2" @click="getTiket">Refund</v-btn>
            </v-toolbar>

            <v-card>
              <v-container fluid>
                <div class="d-flex justify-space-between">
                  <h3>Pilih tiket yang akan di refund: {{ listRefund.length }} Tiket</h3>
                  <v-checkbox class="my-0 py-0" label="Select All" @click="selectAll"></v-checkbox>
                </div>

                <v-item-group>
                  <v-row>
                    <v-col cols="4" v-for="item in listTersedia" :key="item.id">
                      <v-item v-slot:default="{ active }">
                        <v-card>
                          <v-list>
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-subtitle>Kode Tiket</v-list-item-subtitle>
                                <v-list-item-title>{{ item.code }}</v-list-item-title>
                              </v-list-item-content>

                              <v-list-item-action>
                                <v-checkbox v-model="listRefund" :value="item" :input-value="active"></v-checkbox>
                              </v-list-item-action>
                            </v-list-item>

                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-subtitle>Harga</v-list-item-subtitle>
                                <v-list-item-title
                                  class="teal--text"
                                >Rp {{ Number(item.harga_beli).toLocaleString("id-ID") }}</v-list-item-title>
                              </v-list-item-content>

                              <v-list-item-content>
                                <v-list-item-subtitle>Masa Berlaku</v-list-item-subtitle>
                                <v-list-item-title
                                  class="red--text text-caption"
                                >{{ item.expired_at | dateTimeFormat(utc) }} {{ waktu }}</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-item-group>

                <v-pagination
                  v-model="pageTersedia"
                  @input="tiketTersedia"
                  :length="lengthPageTersedia"
                  :total-visible="5"
                ></v-pagination>
              </v-container>
            </v-card>
          </v-dialog>

          <v-divider class="my-4"></v-divider>

          <h2>Detail Tiket</h2>

          <v-row v-for="(item,i) in groupHarga" :key="i">
            <v-col
              cols="6"
              class="text-left"
            >- {{ item.qty.length }} Tiket x Rp {{ Number(item.harga_beli).toLocaleString("id-ID") }}</v-col>
            <v-col
              cols="6"
              class="text-right"
            >Rp {{ Number(item.qty.length * item.harga_beli).toLocaleString("id-ID") }}</v-col>
          </v-row>

          <h3 class="text-left">Total Refund</h3>

          <h3 class="text-right">Rp {{ Number(total).toLocaleString("id-ID") }}</h3>

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

    <!-- <div v-if="listTersedia.length > 0">
      <v-row justify="center">
        <v-col cols="4">Total Tiket: {{ listTersedia.length }} Tiket</v-col>

        <v-col cols="4">Refund: {{ selected.length }} Tiket</v-col>

        <v-col cols="4">
          <v-checkbox label="Select All" class="my-0 py-0" @click="selectAll"></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="4" v-for="item in listTersedia" :key="item.id">
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>Kode Tiket</v-list-item-subtitle>
                  <v-list-item-title>{{ item.code }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-checkbox v-model="selected" :value="item.id"></v-checkbox>
                </v-list-item-action>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>Harga</v-list-item-subtitle>
                  <v-list-item-title
                    class="teal--text"
                  >Rp {{ Number(item.harga_beli).toLocaleString("id-ID") }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-subtitle>Masa Berlaku</v-list-item-subtitle>
                  <v-list-item-title
                    class="red--text text-caption"
                  >{{ item.expired_at | dateTimeFormat(utc) }} {{ waktu }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-pagination
        v-model="pageTersedia"
        @input="tiketTersedia"
        :length="lengthPageTersedia"
        :total-visible="5"
      ></v-pagination>
    </div>

    <div class="text-center mt-14" v-else>
      <h3>Anda tidak memiliki tiket untuk di refund.</h3>
    </div>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import { mask } from "vue-the-mask";
import moment from "moment-timezone";

export default {
  name: "refund",
  // directives: { mask },
  data: () => ({
    dialog: false,
    mask: "###",
    qty: 0,
    // harga: 0,
    total: 0,
    selected: [],
    listRefund: [],
    dialogRekening: false,
    accounts: [],
    banks: [],
    editedItem: {
      bank_name: "",
      nama_rekening: "",
      nomor_rekening: "",
    },
    defaultItem: {},
    valid: true,
    tiket: [],
    tersedia: 0,
    listTersedia: [],
    groupHarga: [],
    valid2: true,
    pageTersedia: 1,
    lengthPageTersedia: 0,
    totalTersedia: 0,
    limit: 15,
    offset: 0,
    utc: moment().utcOffset() / 60 - 7,
    waktu: "",
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
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
            id_app_user: this.user.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.tersedia = data.tersedia;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    getRekening() {
      this.axios
        .get("/user/v1/user/rekening", {
          params: {
            id_app_user: this.user.id,
            limit: 999,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.accounts = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    getBank() {
      this.axios
        .get("/master/v1/mst_bank")
        .then((response) => {
          let { data } = response.data;
          this.banks = data;
        })
        .catch((error) => {
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
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.getRekening();
          this.close();
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    // totalHarga() {
    //   this.total = Number(this.qty * this.harga).toLocaleString("id-ID");
    //   this.getRefund();
    // },
    // getRefund() {
    //   this.axios
    //     .get("/tiket/v1/tiket", {
    //       params: {
    //         id_app_user: this.user.id,
    //         id_mst_tiket_status: 1,
    //         limit: this.qty,
    //       },
    //       headers: { Authorization: "Bearer " + this.user.token },
    //     })
    //     .then((response) => {
    //       let { data } = response.data;
    //       this.tiket = data;
    //     })
    //     .catch(() => {
    //       this.setAlert({
    //         status: true,
    //         color: "error",
    //         text: "Anda tidak memiliki tiket",
    //       });
    //     });
    // },
    refund() {
      let formData = new FormData();

      for (let index = 0; index < this.listRefund.length; index++) {
        const element = this.listRefund[index].id;
        formData.append("id_tiket", element);
        console.log(element);
      }
      formData.append("id_penjual", this.user.id);
      formData.append("id_app_user_rekening", this.selected);

      this.axios
        .post("/transaksi/v1/pencairan_tiket", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.$router.go(-1);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    tiketTersedia() {
      var offset = (this.pageTersedia - 1) * this.limit;

      this.axios
        .get("/tiket/v1/tiket", {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 1,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.listTersedia = data.data;

          this.totalTersedia = data.count;
          this.lengthPageTersedia = Math.ceil(this.totalTersedia / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    open() {
      this.groupHarga = [];
      this.total = 0;
    },
    getTiket() {
      const map = new Map();
      for (const item of this.listRefund) {
        if (!map.has(item.harga_beli)) {
          map.set(item.harga_beli, true);

          let found = this.listRefund.filter(
            (element) => element.harga_beli == item.harga_beli
          );

          this.groupHarga.push({
            harga_beli: item.harga_beli,
            qty: found,
          });
        }
      }

      for (let index = 0; index < this.groupHarga.length; index++) {
        const element = this.groupHarga[index];
        this.total += element.qty.length * element.harga_beli;
      }

      this.qty = this.listRefund.length;
      // this.total = this.qty * this.harga;
      this.dialog = false;
    },
    selectAll() {
      if (this.listRefund == 0) {
        for (let index = 0; index < this.listTersedia.length; index++) {
          const element = this.listTersedia[index];
          this.listRefund.push(element);
        }
      } else {
        this.listRefund = [];
      }
    },
  },
  created() {
    this.totalTiket();
    this.getRekening();
    this.getBank();
    // this.getRefund();
    this.tiketTersedia();

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