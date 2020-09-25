<template>
  <v-container fluid>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step :key="`${n}-step`" :complete="e1 > n" :step="n">Tahap {{ n }}</v-stepper-step>
          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-form ref="form" v-model="valid">
          <v-stepper-content step="1">
            <v-card>
              <v-card-title>Pilih Jenis Iklan</v-card-title>

              <v-list :three-line="$vuetify.breakpoint.xsOnly ? true : false">
                <div v-for="item in jenisIklan" :key="item.id">
                  <v-list-item @click="id == undefined ? step2(item.id) : stepSkip(item.id)">
                    <v-list-item-avatar tile size="50">
                      <v-img :src="item.icon" contain></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ item.desc }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider>
                </div>
              </v-list>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card>
              <div class="d-flex justify-space-between align-center">
                <v-btn icon color="primary" @click="e1 = 1">
                  <v-icon large>mdi-arrow-left-circle</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-card-title>Pilih Unit Motor</v-card-title>

                <v-spacer></v-spacer>

                <v-btn
                  icon
                  color="primary"
                  @click="e1 = 3"
                  v-if="selectedIklan == 3 && selected.length > 1"
                >
                  <v-icon large>mdi-arrow-right-circle</v-icon>
                </v-btn>
              </div>

              <v-text-field
                v-model="keyword"
                label="Search"
                hide-details
                flat
                autofocus
                outlined
                dense
                prepend-inner-icon="mdi-magnify"
                @keyup.enter="getUnitMokas"
              ></v-text-field>

              <v-list :three-line="$vuetify.breakpoint.xsOnly ? true : false">
                <v-list-item-group v-model="selected" :multiple="multiple">
                  <template v-for="(item,i) in unitMokas">
                    <v-list-item
                      :key="item.id"
                      :value="item"
                      @click="selectUnit(item)"
                      color="indigo"
                    >
                      <template v-slot:default="{ active }">
                        <v-list-item-avatar tile size="50">
                          <v-img :src="getImage(item.foto_1)" contain></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title v-html="item.type"></v-list-item-title>
                          <v-list-item-subtitle v-html="item.nomor_polisi"></v-list-item-subtitle>
                          <v-list-item-subtitle v-html="item.tahun"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-icon v-if="!active" color="grey lighten-1" large>mdi-star</v-icon>
                          <v-icon v-else color="yellow" large>mdi-star</v-icon>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                    <v-divider :key="i"></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>

              <v-pagination
                v-model="page"
                @input="getUnitMokas"
                :length="lengthPage"
                :total-visible="5"
              ></v-pagination>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card>
              <v-card-title>Isi Detail Iklan Anda</v-card-title>

              <v-text-field
                v-model="judul_iklan"
                label="Judul Iklan"
                outlined
                dense
                :counter="70"
                :rules="judulRules"
              ></v-text-field>

              <v-row>
                <v-col cols="12" :sm="selectedIklan == 3 ? 12 : 8">
                  <v-textarea
                    v-model="deskripsi_iklan"
                    label="Deksripsi Iklan"
                    outlined
                    dense
                    auto-grow
                    rows="1"
                    :counter="350"
                    :rules="descRules"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" sm="4" class="text-right" v-if="selectedIklan < 3">
                  <v-btn
                    color="teal"
                    dark
                    small
                    class="mt-1"
                    @click="setDeskripsi"
                  >Gunakan deskripsi unit</v-btn>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-card-title>Informasi Harga</v-card-title>

              <v-text-field
                v-model="amount"
                :label="selectedIklan == 1 ? 'Harga' : 'Harga Awal'"
                outlined
                dense
                :rules="amountRules"
                maxlength="11"
                v-money="money"
              ></v-text-field>

              <div v-if="selectedIklan != 1">
                <div class="text-h6">Kelipatan Tawaran</div>

                <v-item-group v-model="kelipatan" mandatory>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-item v-slot:default="{ active, toggle }" value="50000">
                        <v-card :color="active ? 'teal' : ''" dark @click="toggle">
                          <v-card-title>Rp 50.000</v-card-title>

                          <v-scroll-y-transition>
                            <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
                          </v-scroll-y-transition>
                        </v-card>
                      </v-item>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-item v-slot:default="{ active, toggle }" value="100000">
                        <v-card
                          :color="active ? 'teal' : ''"
                          class="d-flex align-center"
                          dark
                          @click="toggle"
                        >
                          <v-card-title>Rp 100.000</v-card-title>
                          <v-scroll-y-transition>
                            <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
                          </v-scroll-y-transition>
                        </v-card>
                      </v-item>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-item v-slot:default="{ active, toggle }" value="150000">
                        <v-card
                          :color="active ? 'teal' : ''"
                          class="d-flex align-center"
                          dark
                          @click="toggle"
                        >
                          <v-card-title>Rp 150.000</v-card-title>
                          <v-scroll-y-transition>
                            <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
                          </v-scroll-y-transition>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-item-group>

                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Gunakan Tiket</v-list-item-title>
                      <v-list-item-subtitle>Isikan jumlah iklan tiket, minimal 1 Tiket</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-switch
                        v-model="tiket"
                        input-value="true"
                        color="success"
                        @change="useTiket"
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item v-if="tiket">
                    <v-text-field
                      v-model="jumlahtiket"
                      label="Jumlah Tiket"
                      outlined
                      dense
                      :autofocus="tiket ? true : false"
                      :rules="jumlahRules"
                      v-mask="mask"
                    ></v-text-field>
                  </v-list-item>
                </v-list>

                <v-row>
                  <v-col cols="12" sm="6">
                    <div>Tanggal Mulai Tawar Bersama</div>

                    <v-datetime-picker
                      v-model="tglMulaiTB"
                      @input="dateTimeRange"
                      :textFieldProps="suffix"
                      :timePickerProps="{format:'24hr'}"
                    >
                      <template slot="dateIcon">
                        <v-icon>mdi-calendar</v-icon>
                      </template>

                      <template slot="timeIcon">
                        <v-icon>mdi-clock</v-icon>
                      </template>

                      <template slot="actions" slot-scope="{ parent }">
                        <v-btn color="success darken-1" @click="parent.okHandler">OK</v-btn>
                      </template>
                    </v-datetime-picker>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <div>Tanggal Selesai Tawar Bersama</div>

                    <v-datetime-picker
                      v-model="tglSelesaiTB"
                      :datePickerProps="datePickerProps"
                      :textFieldProps="textFieldProps"
                      :timePickerProps="{format:'24hr'}"
                      @input="checkDateTB"
                    >
                      <template slot="dateIcon">
                        <v-icon>mdi-calendar</v-icon>
                      </template>

                      <template slot="timeIcon">
                        <v-icon>mdi-clock</v-icon>
                      </template>

                      <template slot="actions" slot-scope="{ parent }">
                        <v-btn color="success darken-1" @click="parent.okHandler">OK</v-btn>
                      </template>
                    </v-datetime-picker>
                  </v-col>
                </v-row>
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal" dark @click="id == undefined ? e1 = 2 : e1 = 1">Sebelumnya</v-btn>
                <v-btn
                  color="teal"
                  class="white--text"
                  :disabled="!valid"
                  @click="storeItem"
                  :loading="loading"
                >Iklankan</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-form>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import DatetimePicker from "vuetify-datetime-picker";
import moment from "moment-timezone";
import { VMoney } from "v-money";
import VueGeolocation from "vue-browser-geolocation";
import { mask } from "vue-the-mask";
Vue.use(DatetimePicker, VueGeolocation);

export default {
  name: "add-ads",
  props: ["utc", "timezone"],
  directives: { money: VMoney, mask },
  beforeRouteLeave(to, from, next) {
    if (this.judul_iklan != "") {
      const answer = window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  data() {
    return {
      e1: 1,
      steps: 3,
      id: this.$route.query.id,
      jenisIklan: [],
      multiple: false,
      unitMokas: [],
      selected: [],
      keyword: "",
      selectedIklan: [],
      selectedUnit: 0,
      jumlahtiket: 0,
      mask: "#",
      jumlahRules: [
        (v) => v.length >= 1 || "Min 1 Tiket",
        (v) => v.length <= 9 || "Max 9 Tiket",
      ],
      judul_iklan: "",
      judulRules: [
        (v) => !!v || "judul iklan harus diisi",
        (v) => v.length >= 2 || "Min 2 characters",
        (v) => v.length <= 70 || "Min 70 characters",
      ],
      deskripsi_iklan: "",
      descRules: [
        (v) => !!v || "deskripsi unit harus diisi",
        (v) => v.length >= 2 || "Min 2 characters",
        (v) => v.length <= 350 || "Min 350 characters",
      ],
      money: {
        precision: 0,
        thousands: ".",
        masked: true,
      },
      amount: 0,
      amountRules: [
        (v) => v != 0 || "Field is required",
        (v) => v.length <= 11 || "Max 11 characters",
      ],
      price: 0,
      kelipatan: "",
      lat: 0,
      lng: 0,
      tiket: false,
      menu1: false,
      tglMulaiTB: moment().format("YYYY-MM-DD HH:mm"),
      datePickerProps: {},
      textFieldProps: {},
      menu2: false,
      tglSelesaiTB: null,
      formRules: [(v) => !!v || "Field is required"],
      tbDateRules: [],
      valid: true,
      suffix: { suffix: this.timezone },
      thumbnail: "",
      page: 1,
      lengthPage: 0,
      limit: 10,
      offset: 0,
      total: 0,
      loader: null,
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAds: "ads/setAds",
    }),
    getJenisIklan() {
      this.axios
        .get("/setup/v3/show_iklan", {
          params: {
            limit: this.user.id_mst_user_type == 1 ? 1 : 3,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.jenisIklan = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    step2(item) {
      this.selectedIklan = item;
      if (item == 3) {
        this.multiple = true;
      } else {
        this.multiple = false;
      }
      this.e1 = 2;
    },
    stepSkip(item) {
      this.selectedIklan = item;
      if (item == 3) {
        this.multiple = true;
        this.e1 = 2;
      } else {
        this.e1 = 3;
      }
    },
    getUnitMokas() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/produk/v3/unit_mokas", {
          params: {
            id_app_user: this.user.id,
            id_mst_motor_bekas_status: 1,
            search: this.keyword,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.unitMokas = data;

          this.total = response.data.count;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    selectUnit(item) {
      if (this.multiple == false) {
        this.selectedUnit = item;
        this.e1 = 3;
      }
    },
    setDeskripsi() {
      if (this.selected.deskripsi != null) {
        this.deskripsi_iklan = this.selected.deskripsi;
      }
    },
    dateTimeRange() {
      this.tglMulaiTB = moment(this.tglMulaiTB).format("YYYY-MM-DD HH:mm");
      this.tglSelesaiTB = this.tglMulaiTB;

      let maxdate = moment(this.tglMulaiTB).add(7, "d").format("YYYY-MM-DD");

      this.datePickerProps = {
        min: this.tglMulaiTB,
        max: maxdate,
      };
    },
    checkDateTB() {
      this.tglSelesaiTB = moment(this.tglSelesaiTB).format("YYYY-MM-DD HH:mm");
      let check = moment(this.tglSelesaiTB).isBefore(this.tglMulaiTB);
      var x = moment(this.tglSelesaiTB);
      var y = moment(this.tglMulaiTB);
      var duration = moment.duration(x.diff(y));
      var h = duration._data.hours;
      var m = duration._data.minutes;

      if (check == true) {
        this.textFieldProps = {
          rules: [
            h < 0 || "Tanggal Selesai harus lebih besar dari Tanggal Mulai",
            m < 0 || "Tanggal Selesai harus lebih besar dari Tanggal Mulai",
          ],
          suffix: this.timezone,
        };
      } else {
        this.textFieldProps = {
          rules: [],
          suffix: this.timezone,
        };
      }
    },
    useTiket() {
      if (this.tiket) {
        this.jumlahtiket = "1";
      } else {
        this.jumlahtiket = 0;
      }
    },
    watchLocation() {
      this.$getLocation({
        enableHighAccuracy: true,
      }).then((coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
      });
    },
    storeItem() {
      var r = confirm("Apakah Anda Yakin!");
      if (r == true) {
        this.submit = true;

        this.loader = "loading";

        let formData = new FormData();

        if (this.selectedIklan == 1) {
          let amount1 = String(this.amount).replace(".", "");
          let amount2 = String(amount1).replace(".", "");
          formData.append("selectedIklan", this.selectedIklan);
          formData.append("id_motor_bekas", this.selectedUnit.id);
          formData.append("photo", this.selectedUnit.foto_1);
          formData.append("judul", this.judul_iklan.trim());
          formData.append("deskripsi", this.deskripsi_iklan.trim());
          formData.append("harga", amount2);
          formData.append("latitude", this.lat);
          formData.append("longitude", this.lng);
          formData.append("id_app_user", this.user.id);

          this.axios
            .post("/iklan/v3/iklan_hp_mokas_satuan", formData, {
              headers: { Authorization: "Bearer " + this.user.token },
            })
            .then((response) => {
              let { data } = response;
              this.setAlert({
                status: true,
                color: "success",
                text: data.api_message,
              });
              this.setAds(data.data.id);
              let urlSeller = this.user.nama.toLowerCase().replaceAll(" ", "-");
              let urlJudul = data.data.judul.toLowerCase().replaceAll(" ", "-");
              this.$router.push("/produk/" + urlSeller + "/" + urlJudul);
            })
            .catch((error) => {
              let responses = error.response.data;
              this.setAlert({
                status: true,
                color: "error",
                text: responses.api_message,
              });
            });
        }

        if (this.selectedIklan == 2) {
          let amount1 = String(this.amount).replace(".", "");
          let amount2 = String(amount1).replace(".", "");
          formData.append("selectedIklan", this.selectedIklan);
          formData.append("id_motor_bekas", this.selectedUnit.id);
          formData.append("photo", this.selectedUnit.foto_1);
          formData.append("judul", this.judul_iklan);
          formData.append("deskripsi", this.deskripsi_iklan);
          formData.append("harga_awal", amount2);
          formData.append("kelipatan", this.kelipatan);
          formData.append(
            "tanggal_mulai",
            moment(this.tglMulaiTB)
              .tz("Asia/Jakarta")
              .format("YYYY-MM-DD HH:mm:ss")
          );
          formData.append(
            "tanggal_selesai",
            moment(this.tglSelesaiTB)
              .tz("Asia/Jakarta")
              .format("YYYY-MM-DD HH:mm:ss")
          );
          formData.append("latitude", this.lat);
          formData.append("longitude", this.lng);
          formData.append("is_verified", this.tiket);
          formData.append("id_mst_type_tb", 1);
          formData.append("id_app_user", this.user.id);
          formData.append("jumlah_tiket", this.jumlahtiket);

          this.axios
            .post("/iklan/v3/iklan_tb_mokas_satuan", formData, {
              headers: { Authorization: "Bearer " + this.user.token },
            })
            .then((response) => {
              let { data } = response;
              this.setAlert({
                status: true,
                color: "success",
                text: data.api_message,
              });
              this.setAds(data.data.id);
              let urlSeller = this.user.nama.toLowerCase().replaceAll(" ", "-");
              let urlJudul = data.data.judul.toLowerCase().replaceAll(" ", "-");
              this.$router.push("/produk/" + urlSeller + "/" + urlJudul);
            })
            .catch((error) => {
              let responses = error.response.data;
              this.setAlert({
                status: true,
                color: "error",
                text: responses.api_message,
              });
            });
        }

        if (this.selectedIklan == 3) {
          var i = 0;

          let amount1 = String(this.amount).replace(".", "");
          let amount2 = String(amount1).replace(".", "");

          formData.append("selectedIklan", this.selectedIklan);
          for (i = 0; i < this.selected.length; i++) {
            formData.append("id_motor_bekas", this.selected[i].id);
          }
          formData.append("judul", this.judul_iklan);
          formData.append("deskripsi", this.deskripsi_iklan);
          formData.append("harga_awal", amount2);
          formData.append("kelipatan", this.kelipatan);
          formData.append(
            "tanggal_mulai",
            moment(this.tglMulaiTB)
              .tz("Asia/Jakarta")
              .format("YYYY-MM-DD HH:mm:ss")
          );
          formData.append(
            "tanggal_selesai",
            moment(this.tglSelesaiTB)
              .tz("Asia/Jakarta")
              .format("YYYY-MM-DD HH:mm:ss")
          );
          formData.append("latitude", this.lat);
          formData.append("longitude", this.lng);
          formData.append("is_verified", this.tiket);
          formData.append("id_mst_type_tb", 1);
          formData.append("id_app_user", this.user.id);
          formData.append("jumlah_tiket", this.jumlahtiket);

          this.axios
            .post("/iklan/v3/iklan_tb_mokas_paketan", formData, {
              headers: { Authorization: "Bearer " + this.user.token },
            })
            .then((response) => {
              let { data } = response;
              this.setAlert({
                status: true,
                color: "success",
                text: data.api_message,
              });
              this.setAds(data.data.id);
              let urlSeller = this.user.nama.toLowerCase().replaceAll(" ", "-");
              let urlJudul = data.data.judul.toLowerCase().replaceAll(" ", "-");
              this.$router.push("/produk/" + urlSeller + "/" + urlJudul);
            })
            .catch((error) => {
              let responses = error.response.data;
              this.setAlert({
                status: true,
                color: "error",
                text: responses.api_message,
              });
            });
        }
      }
    },
  },
  created() {
    this.getJenisIklan();
    this.getUnitMokas();
    this.watchLocation();
    this.dateTimeRange();
    if (this.id != "") {
      this.axios
        .get("/produk/v3/unit_mokas", {
          params: {
            id: this.id,
            id_app_user: this.user.id,
            id_mst_motor_bekas_status: 1,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.selected = data[0];
          this.selectedUnit = data[0];
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      adsID: "ads/adsID",
    }),
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>