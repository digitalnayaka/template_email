<template>
  <div>
    <v-app-bar app color="teal" dark>
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
            <h3>Pilih Jenis Iklan</h3>

            <v-list v-for="item in jenisIklan" :key="item.id">
              <v-list-item @click="id == undefined ? step2(item.id) : stepSkip(item.id)">
                <v-list-item-avatar tile size="50">
                  <v-img :src="item.icon" contain></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="body-1">{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.desc }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>
            </v-list>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card flat>
              <v-card-title>
                <v-btn icon color="primary" @click="e1 = 1">
                  <v-icon large>mdi-arrow-left-circle</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <h3>Pilih Unit Motor</h3>

                <v-spacer></v-spacer>

                <div v-if="selectedIklan == 3 && selected.length > 1">
                  <v-btn icon color="primary" @click="e1 = 3">
                    <v-icon large>mdi-arrow-right-circle</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
            </v-card>

            <v-text-field
              hide-details
              flat
              autofocus
              label="Search"
              prepend-inner-icon="mdi-magnify"
              v-model="keyword"
              @keyup.enter="getUnitMokas"
            ></v-text-field>

            <v-list>
              <v-list-item-group v-model="selected" :multiple="multiple">
                <template v-for="item in unitMokas">
                  <v-list-item
                    :key="item.id"
                    :value="item"
                    @click="selectUnit(item)"
                    color="indigo"
                  >
                    <template v-slot:default="{ active }">
                      <v-list-item-avatar tile size="80">
                        <v-img :src="getImage(item.foto_1)" contain></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title v-html="item.type"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.nomor_polisi"></v-list-item-subtitle>
                        <v-list-item-subtitle v-html="item.tahun"></v-list-item-subtitle>
                        <v-divider></v-divider>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-icon v-if="!active" color="grey lighten-1">mdi-star</v-icon>
                        <v-icon v-else color="yellow">mdi-star</v-icon>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>

              <v-divider></v-divider>
            </v-list>

            <v-pagination
              v-model="page"
              @input="getUnitMokas"
              :length="lengthPage"
              :total-visible="5"
            ></v-pagination>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card flat>
              <h3>Isi Detail Iklan Anda</h3>

              <v-text-field
                outlined
                v-model="judul_iklan"
                label="Judul Iklan"
                :counter="70"
                :rules="judulRules"
              ></v-text-field>

              <v-row>
                <v-col cols="12" :sm="selectedIklan == 3 ? 12 : 8">
                  <v-text-field
                    outlined
                    v-model="deskripsi_iklan"
                    label="Deksripsi Iklan"
                    :counter="350"
                    :rules="descRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" class="text-right" v-if="selectedIklan < 3">
                  <v-btn
                    color="teal"
                    @click="deskripsi_iklan = selected.deskripsi"
                  >Gunakan deskripsi unit</v-btn>
                </v-col>
              </v-row>

              <div v-if="selectedIklan == 3" class="mb-4">
                <div>Thumbnail Iklan</div>

                <v-sheet class="mx-auto" v-if="selected.length > 0">
                  <v-slide-group show-arrows mandatory v-model="thumbnail">
                    <v-slide-item
                      v-for="(item,index) in selected"
                      :key="index"
                      v-slot:default="{ active, toggle }"
                      :value="item.foto_1"
                    >
                      <v-card
                        class="px-2 mx-2"
                        :color="active ? 'primary' : ''"
                        dark
                        @click="toggle"
                      >
                        <v-card>
                          <v-img :src="getImage(item.foto_1)" height="200" width="200" contain></v-img>
                        </v-card>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>
              </div>

              <v-divider></v-divider>

              <h3>Informasi Harga</h3>
              <v-text-field
                outlined
                v-model="amount"
                :label="selectedIklan == 1 ? 'Harga' : 'Harga Awal'"
                :rules="amountRules"
                :counter="11"
                v-money="money"
              ></v-text-field>

              <div v-if="selectedIklan != 1">
                <div class="subtitle-1">Kelipatan Tawaran</div>
                <v-item-group v-model="kelipatan" mandatory>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-item v-slot:default="{ active, toggle }" value="50000">
                          <v-card
                            :color="active ? 'primary' : ''"
                            class="d-flex align-center"
                            dark
                            @click="toggle"
                          >
                            <div class="text-center">
                              <v-card-title>Rp 50.000</v-card-title>
                            </div>
                            <v-scroll-y-transition>
                              <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-item v-slot:default="{ active, toggle }" value="100000">
                          <v-card
                            :color="active ? 'primary' : ''"
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
                            :color="active ? 'primary' : ''"
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
                  </v-container>
                </v-item-group>

                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Gunakan Tiket</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-switch v-model="tiket" input-value="true" color="success"></v-switch>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>

                <v-row dense>
                  <v-col cols="6">
                    <div>Tanggal Mulai</div>
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

                  <v-col cols="6">
                    <div>Tanggal Selesai</div>
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
            </v-card>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="id == undefined ? e1 = 2 : e1 = 1">Sebelumnya</v-btn>
              <v-btn color="primary" :disabled="!valid" @click="storeItem">Simpan</v-btn>
            </v-card-actions>
          </v-stepper-content>
        </v-form>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import DatetimePicker from "vuetify-datetime-picker";
import moment from "moment-timezone";
import { VMoney } from "v-money";
import VueGeolocation from "vue-browser-geolocation";
Vue.use(DatetimePicker, VueGeolocation);

export default {
  name: "tambah_iklan",
  directives: { money: VMoney },
  beforeRouteLeave(to, from, next) {
    if (!this.submit) {
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
      judul_iklan: "",
      judulRules: [
        v => !!v || "judul iklan harus diisi",
        v => v.length >= 2 || "Min 2 characters",
        v => v.length <= 70 || "Min 70 characters"
      ],
      deskripsi_iklan: "",
      descRules: [
        v => !!v || "deskripsi unit harus diisi",
        v => v.length >= 2 || "Min 2 characters",
        v => v.length <= 350 || "Min 350 characters"
      ],
      money: {
        precision: 0,
        thousands: ".",
        masked: true
      },
      amount: 0,
      amountRules: [
        v => v != 0 || "Field is required",
        v => v.length <= 11 || "Max 11 characters"
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
      formRules: [v => !!v || "Field is required"],
      tbDateRules: [],
      valid: true,
      submit: false,
      utc: moment().utcOffset() / 60 - 7,
      suffix: {},
      waktu: "",
      thumbnail: "",
      page: 1,
      lengthPage: 0,
      limit: 10,
      offset: 0,
      total: 0
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    getJenisIklan() {
      this.axios
        .get("/setup/v1/show_iklan", {
          params: {
            limit: this.user.id_mst_user_type == 1 ? 1 : 3
          }
        })
        .then(response => {
          let { data } = response.data;
          this.jenisIklan = data;
        })
        .catch(error => {
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
        .get("/produk/v1/unit_mokas", {
          params: {
            id_app_user: this.user.id,
            id_mst_motor_bekas_status: 1,
            search: this.keyword,
            offset: offset,
            limit: this.limit
          }
        })
        .then(response => {
          let { data } = response.data;
          this.unitMokas = data;

          this.total = response.data.count;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch(error => {
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
    dateTimeRange() {
      this.tglMulaiTB = moment(this.tglMulaiTB).format("YYYY-MM-DD HH:mm");
      this.tglSelesaiTB = this.tglMulaiTB;

      let maxdate = moment(this.tglMulaiTB)
        .add(7, "d")
        .format("YYYY-MM-DD");

      this.datePickerProps = {
        min: this.tglMulaiTB,
        max: maxdate
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

      if (this.utc == 0) {
        this.waktu = "WIB";
      }
      if (this.utc == 1) {
        this.waktu = "WITA";
      }
      if (this.utc == 2) {
        this.waktu = "WIT";
      }

      if (check == true) {
        this.textFieldProps = {
          rules: [
            h < 0 || "Tanggal Selesai harus lebih besar dari Tanggal Mulai",
            m < 0 || "Tanggal Selesai harus lebih besar dari Tanggal Mulai"
          ],
          suffix: this.waktu
        };
      } else {
        this.textFieldProps = {
          rules: [],
          suffix: this.waktu
        };
      }
    },
    watchLocation() {
      this.$getLocation({
        enableHighAccuracy: true
      }).then(coordinates => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
      });
    },
    storeItem() {
      var r = confirm("Apakah Anda Yakin!");
      if (r == true) {
        this.submit = true;

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
            .post("/iklan/v1/iklan_hp_mokas_satuan", formData, {
              headers: { Authorization: "Bearer " + this.user.token }
            })
            .then(response => {
              let { data } = response;
              this.setAlert({
                status: true,
                color: "success",
                text: data.api_message
              });
              this.$router.push({ path: "/iklan" });
            })
            .catch(error => {
              let responses = error.response.data;
              this.setAlert({
                status: true,
                color: "error",
                text: responses.api_message
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

          this.axios
            .post("/iklan/v2/iklan_tb_mokas_satuan", formData, {
              headers: { Authorization: "Bearer " + this.user.token }
            })
            .then(response => {
              let { data } = response;
              this.setAlert({
                status: true,
                color: "success",
                text: data.api_message
              });
              this.$router.push({ path: "/iklan" });
            })
            .catch(error => {
              let responses = error.response.data;
              this.setAlert({
                status: true,
                color: "error",
                text: responses.api_message
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
          formData.append("photo", this.thumbnail);
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

          this.axios
            .post("/iklan/v2/iklan_tb_mokas_paketan", formData, {
              headers: { Authorization: "Bearer " + this.user.token }
            })
            .then(response => {
              let { data } = response;
              this.setAlert({
                status: true,
                color: "success",
                text: data.api_message
              });
              this.$router.push({ path: "/iklan" });
            })
            .catch(error => {
              let responses = error.response.data;
              this.setAlert({
                status: true,
                color: "error",
                text: responses.api_message
              });
            });
        }
      }
    }
  },
  created() {
    this.getJenisIklan();
    this.getUnitMokas();
    this.watchLocation();
    this.dateTimeRange();
    if (this.utc == 0) {
      this.suffix = { suffix: "WIB" };
    }
    if (this.utc == 1) {
      this.suffix = { suffix: "WITA" };
    }
    if (this.utc == 2) {
      this.suffix = { suffix: "WIT" };
    }
    if (this.id != "") {
      this.axios
        .get("/produk/v1/unit_mokas", {
          params: {
            id: this.id,
            id_app_user: this.user.id,
            id_mst_motor_bekas_status: 1,
            limit: 1
          }
        })
        .then(response => {
          let { data } = response.data;
          this.selected = data[0];
          this.selectedUnit = data[0];
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
  }
};
</script>