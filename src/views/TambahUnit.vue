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
        <v-stepper-content step="1">
          <v-card>
            <h3>Pilih Foto Motor Anda</h3>

            <v-row class="text-center" dense>
              <v-col cols="12" sm="4" align="center">
                <image-uploader
                  v-model="foto1"
                  :quality="0.7"
                  :scaleRatio="0.5"
                  accept="image/*"
                  :preview="false"
                  :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                  :capture="false"
                  :debug="0"
                  :autoRotate="true"
                  outputFormat="blob"
                  @input="setImage('foto1')"
                  id="foto1"
                >
                  <label for="foto1" slot="upload-label">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-img
                          :src="previewUrl1"
                          contain
                          class="mx-2"
                          width="280"
                          height="200"
                          v-on="on"
                        ></v-img>
                      </template>
                      <span>Pilih Foto</span>
                    </v-tooltip>
                  </label>
                </image-uploader>
                <p>Utama</p>
              </v-col>

              <v-col cols="12" sm="4" align="center">
                <image-uploader
                  v-model="foto2"
                  :quality="0.7"
                  :scaleRatio="0.5"
                  accept="image/*"
                  :preview="false"
                  :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                  :capture="false"
                  :debug="0"
                  :autoRotate="true"
                  outputFormat="blob"
                  @input="setImage('foto2')"
                  id="foto2"
                >
                  <label for="foto2" slot="upload-label">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-img
                          :src="previewUrl2"
                          contain
                          class="mx-2"
                          width="280"
                          height="200"
                          v-on="on"
                        ></v-img>
                      </template>
                      <span>Pilih Foto</span>
                    </v-tooltip>
                  </label>
                </image-uploader>
                <p>Tampak Depan</p>
              </v-col>

              <v-col cols="12" sm="4" align="center">
                <image-uploader
                  v-model="foto3"
                  :quality="0.7"
                  :scaleRatio="0.5"
                  accept="image/*"
                  :preview="false"
                  :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                  :capture="false"
                  :debug="0"
                  :autoRotate="true"
                  outputFormat="blob"
                  @input="setImage('foto3')"
                  id="foto3"
                >
                  <label for="foto3" slot="upload-label">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-img
                          :src="previewUrl3"
                          contain
                          class="mx-2"
                          width="280"
                          height="200"
                          v-on="on"
                        ></v-img>
                      </template>
                      <span>Pilih Foto</span>
                    </v-tooltip>
                  </label>
                </image-uploader>
                <p>Tampak Samping</p>
              </v-col>

              <v-col cols="12" sm="6" align="center">
                <image-uploader
                  v-model="foto4"
                  :quality="0.7"
                  :scaleRatio="0.5"
                  accept="image/*"
                  :preview="false"
                  :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                  :capture="false"
                  :debug="0"
                  :autoRotate="true"
                  outputFormat="blob"
                  @input="setImage('foto4')"
                  id="foto4"
                >
                  <label for="foto4" slot="upload-label">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-img
                          :src="previewUrl4"
                          contain
                          class="mx-2"
                          width="280"
                          height="200"
                          v-on="on"
                        ></v-img>
                      </template>
                      <span>Pilih Foto</span>
                    </v-tooltip>
                  </label>
                </image-uploader>
                <p>Tampak Atas</p>
              </v-col>

              <v-col cols="12" sm="6" align="center">
                <image-uploader
                  v-model="foto5"
                  :quality="0.7"
                  :scaleRatio="0.5"
                  accept="image/*"
                  :preview="false"
                  :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                  :capture="false"
                  :debug="0"
                  :autoRotate="true"
                  outputFormat="blob"
                  @input="setImage('foto5')"
                  id="foto5"
                >
                  <label for="foto5" slot="upload-label">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-img
                          :src="previewUrl5"
                          contain
                          class="mx-2"
                          width="280"
                          height="200"
                          v-on="on"
                        ></v-img>
                      </template>
                      <span>Pilih Foto</span>
                    </v-tooltip>
                  </label>
                </image-uploader>
                <p>Detail</p>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :disabled="countRules.length >= 5 ? false : true"
                @click="e1 = 2"
              >Selanjutnya</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="form" v-model="valid1">
            <h3>Pilih Tipe Motor Anda</h3>

            <v-container fluid>
              <v-row align="center" dense>
                <v-col cols="6" sm="2" align="center">
                  <v-card>
                    <v-img :src="previewUrl1" contain width="300" height="150"></v-img>
                    <v-chip small left color="red" text-color="white">Utama</v-chip>
                  </v-card>
                </v-col>

                <v-col cols="6" sm="2" align="center">
                  <v-card>
                    <v-img :src="previewUrl2" contain width="300" height="150"></v-img>
                    <v-chip small left color="red" text-color="white">Depan</v-chip>
                  </v-card>
                </v-col>

                <v-col cols="6" sm="2" align="center">
                  <v-card>
                    <v-img :src="previewUrl3" contain width="300" height="150"></v-img>
                    <v-chip small left color="red" text-color="white">Samping</v-chip>
                  </v-card>
                </v-col>

                <v-col cols="6" sm="2" align="center">
                  <v-card>
                    <v-img :src="previewUrl4" contain width="300" height="150"></v-img>
                    <v-chip small left color="red" text-color="white">Atas</v-chip>
                  </v-card>
                </v-col>

                <v-col cols="6" sm="2" align="center">
                  <v-card>
                    <v-img :src="previewUrl5" contain width="300" height="150"></v-img>
                    <v-chip small left color="red" text-color="white">Detail</v-chip>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>

            <v-card>
              <v-autocomplete
                outlined
                v-model="merk"
                :items="brands"
                item-text="merk"
                item-value="id"
                clearable
                label="Pilih Merk Motor"
                @change="getTipe"
                @click:clear="clear"
                :rules="formRules"
              ></v-autocomplete>

              <v-autocomplete
                outlined
                v-model="tahun"
                :items="years"
                item-text="tahun"
                item-value="tahun"
                clearable
                label="Tahun Motor"
                :search-input="String(tahun)"
                :disabled="disableTahun"
                :rules="formRules"
              ></v-autocomplete>

              <v-autocomplete
                outlined
                v-model="tipe"
                :items="tipes"
                item-text="type"
                item-value="id"
                clearable
                label="Tipe Motor"
                :search-input="String(tipe)"
                :disabled="disableTipe"
                :rules="formRules"
              ></v-autocomplete>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="e1 = 1">Sebelumnya</v-btn>
                <v-btn color="primary" :disabled="!valid1" @click="e1 = 3">Selanjutnya</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-form ref="form" v-model="valid2">
            <v-card flat>
              <h3>Isi Detail Motor Anda</h3>

              <v-text-field outlined v-model="warna" label="Warna Motor" :rules="warnaRules"></v-text-field>

              <v-autocomplete
                outlined
                v-model="odometer"
                :items="odo"
                item-text="range"
                item-value="id"
                clearable
                label="Odometer"
                :rules="formRules"
                suffix="KM"
              ></v-autocomplete>

              <v-text-field
                outlined
                v-model="cc"
                label="Kapasitas Mesin"
                :rules="formRules"
                suffix="CC"
                v-mask="mask"
              ></v-text-field>

              <v-autocomplete
                outlined
                v-model="transmisi"
                :items="trans"
                item-text="transmisi"
                item-value="id"
                clearable
                label="Transmisi Motor"
                :rules="formRules"
              ></v-autocomplete>

              <v-autocomplete
                outlined
                v-model="jenis"
                :items="jenis_motor"
                item-text="jenis"
                item-value="id"
                clearable
                label="Jenis Motor"
                :rules="formRules"
              ></v-autocomplete>

              <br />

              <h3>Detail Dokumen Motor</h3>

              <v-text-field
                outlined
                v-model="nopol"
                label="Nomor Polisi"
                maxlength="9"
                :rules="nopolRules"
              ></v-text-field>

              <v-text-field outlined v-model="lokasi" label="Lokasi Unit" :rules="lokasiRules"></v-text-field>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Lembar Pajak Ada</v-list-item-title>
                    <v-list-item-subtitle>Anda memiliki lembar Surat Ketetapan Pajak untuk motor berikut</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-switch v-model="pajak" input-value="true" color="success"></v-switch>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item v-if="pajak">
                  <v-list-item-content>
                    <v-menu
                      ref="menu"
                      v-model="menu1"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="tglPajak"
                          label="Tanggal Selesai Pajak"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>

                      <v-date-picker v-model="tglPajak">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(tglPajak)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Lembar STNK Ada</v-list-item-title>
                    <v-list-item-subtitle>Anda memiliki lembar Surat Tanda Nomor Kendaraan untuk motor berikut</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-switch v-model="stnk" input-value="true" color="success"></v-switch>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item v-if="stnk">
                  <v-list-item-content>
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="tglSTNK"
                          label="Tanggal Selesai STNK"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>

                      <v-date-picker v-model="tglSTNK">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(tglSTNK)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Lembar BPKB Ada</v-list-item-title>
                    <v-list-item-subtitle>Anda memiliki Buku Pemilik Kendaraan Bermotor (BPKB) untuk motor berikut</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-switch v-model="bpkb" input-value="true" color="success"></v-switch>
                  </v-list-item-action>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Deskripsi Unit</v-list-item-title>
                    <v-list-item-subtitle>Opsional</v-list-item-subtitle>
                    <v-list-item-subtitle>Deskripsikan unit anda secara singkat dan jelas.</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-switch v-model="desc" input-value="true" color="success"></v-switch>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item v-if="desc">
                  <v-list-item-content>
                    <v-text-field
                      outlined
                      v-model="deskripsi"
                      label="Contoh: Jual unit motor saya"
                      :rules="descRules"
                      :counter="350"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Kode Barcode</v-list-item-title>
                    <v-list-item-subtitle>Opsional</v-list-item-subtitle>
                    <v-list-item-subtitle>Anda dapat memasukan kode barcode untuk mempermudah pencarian unit anda.</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-switch v-model="scan" input-value="true" color="success"></v-switch>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item v-if="scan">
                  <v-list-item-content>
                    <v-text-field outlined v-model="barcode" label="Contoh: 1234xxx"></v-text-field>

                    <p class="error">{{ error }}</p>

                    <!-- <StreamBarcodeReader @decode="onDecode" @error="onInit"></StreamBarcodeReader> -->
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="e1 = 2">Sebelumnya</v-btn>
              <v-btn
                color="primary"
                :disabled="valid1 == valid2 ? false : true"
                @click="storeItem"
                :loading="loading"
              >Simpan</v-btn>
            </v-card-actions>
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mask } from "vue-the-mask";
import ImageUploader from "vue-image-upload-resize";
// import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
  name: "TambahUnit",
  components: {
    ImageUploader
    // StreamBarcodeReader
  },
  directives: { mask },
  beforeRouteLeave(to, from, next) {
    if (this.submit == false) {
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
      clearable: false,
      brands: [],
      merk: "",
      currentYear: new Date().toISOString().substr(0, 4),
      years: [],
      tahun: "",
      disableTahun: true,
      disableTipe: true,
      tipes: [],
      tipe: "",
      foto1: null,
      previewUrl1: "/img/icons/thumbnail/utama.png",
      foto2: null,
      previewUrl2: "/img/icons/thumbnail/depan.png",
      foto3: null,
      previewUrl3: "/img/icons/thumbnail/samping.png",
      foto4: null,
      previewUrl4: "/img/icons/thumbnail/atas.png",
      foto5: null,
      previewUrl5: "/img/icons/thumbnail/detail.png",
      odo: [],
      odometer: "",
      mask: "###",
      cc: "",
      trans: [],
      transmisi: "",
      jenis_motor: [],
      jenis: "",
      warna: "",
      nopol: "",
      lokasi: "",
      tahap2: false,
      tahap3: false,
      pajak: false,
      stnk: false,
      bpkb: false,
      menu1: false,
      menu2: false,
      tglPajak: null,
      tglSTNK: null,
      desc: false,
      deskripsi: "",
      scan: false,
      barcode: "",
      countRules: [],
      formRules: [v => !!v || "Kelengkapan harus diisi"],
      nopolRules: [
        v => !!v || "Nomor polisi harus diisi",
        v => v.length <= 9 || "Max 9 characters"
      ],
      warnaRules: [
        v => !!v || "Warna harus diisi",
        v => v.length >= 4 || "Min 4 characters",
        v => v.length <= 15 || "Max 15 characters"
      ],
      lokasiRules: [
        v => !!v || "Lokasi harus diisi",
        v => v.length >= 4 || "Min 4 characters",
        v => v.length <= 30 || "Max 30 characters"
      ],
      descRules: [
        v => !!v || "deskripsi harus diisi",
        v => v.length >= 2 || "Min 2 characters",
        v => v.length <= 350 || "Max 350 characters"
      ],
      valid1: true,
      valid2: true,
      hasImage: false,
      image: null,
      loader: null,
      loading: false,
      result: "",
      error: "",
      submit: false
    };
  },

  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    setImage(file) {
      this.hasImage = true;
      this.image = file;
      this.onFileChange(file);
    },
    clear() {
      this.$nextTick(() => (this.tahun = null));
      this.$nextTick(() => (this.tipe = null));
      this.disableTahun = true;
      this.disableTipe = true;
      this.countRules.splice(-3, 3);
    },
    getMerk() {
      this.axios
        .get("/produk/v3/mst_motor_merk")
        .then(response => {
          let { data } = response.data;
          this.brands = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getTahun() {
      //   let tahun = this.currentYear - i;
      //   this.years.push(tahun);
      this.axios
        .get("/produk/v3/mst_motor_type_tahun", {
          params: {
            id_mst_motor_merk: this.merk
          }
        })
        .then(response => {
          let { data } = response.data;
          this.years = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getTipe() {
      this.axios
        .get("/produk/v3/mst_motor_type", {
          params: {
            id_mst_motor_merk: this.merk
          }
        })
        .then(response => {
          let { data } = response.data;
          this.tipes = data;
          this.countRules.push(this.merk);
          this.disableTahun = false;
          this.disableTipe = false;
          this.getTahun();
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getOdoMeter() {
      this.axios
        .get("/produk/v3/mst_odometer")
        .then(response => {
          let { data } = response.data;
          this.odo = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getTransmisi() {
      this.axios
        .get("/produk/v3/mst_motor_transmisi")
        .then(response => {
          let { data } = response.data;
          this.trans = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getJenis() {
      this.axios
        .get("/produk/v3/mst_motor_jenis")
        .then(response => {
          let { data } = response.data;
          this.jenis_motor = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    onFileChange(foto) {
      if (
        !this.foto1 &&
        !this.foto2 &&
        !this.foto3 &&
        !this.foto4 &&
        !this.foto5
      ) {
        return false;
      }
      if (
        !this.foto1.type.match("image.*") &&
        !this.foto2.type.match("image.*") &&
        !this.foto3.type.match("image.*") &&
        !this.foto4.type.match("image.*") &&
        !this.foto5.type.match("image.*")
      ) {
        return false;
      }
      const reader = new FileReader();
      if (foto == "foto1") {
        reader.onload = e => {
          this.previewUrl1 = e.target.result;
        };
        reader.readAsDataURL(this.foto1);
        this.countRules.push(this.foto1);
      }
      if (foto == "foto2") {
        reader.onload = e => {
          this.previewUrl2 = e.target.result;
        };
        reader.readAsDataURL(this.foto2);
        this.countRules.push(this.foto2);
      }
      if (foto == "foto3") {
        reader.onload = e => {
          this.previewUrl3 = e.target.result;
        };
        reader.readAsDataURL(this.foto3);
        this.countRules.push(this.foto3);
      }
      if (foto == "foto4") {
        reader.onload = e => {
          this.previewUrl4 = e.target.result;
        };
        reader.readAsDataURL(this.foto4);
        this.countRules.push(this.foto4);
      }
      if (foto == "foto5") {
        reader.onload = e => {
          this.previewUrl5 = e.target.result;
        };
        reader.readAsDataURL(this.foto5);
        this.countRules.push(this.foto5);
      }
    },
    storeItem() {
      this.submit = true;

      this.loader = "loading";

      let formData = new FormData();

      formData.append("foto_1", this.foto1, "Utama.jpg");
      formData.append("foto_2", this.foto2, "Tampak_Depan.jpg");
      formData.append("foto_3", this.foto3, "Tampak_Samping.jpg");
      formData.append("foto_4", this.foto4, "Tampak_Atas.jpg");
      formData.append("foto_5", this.foto5, "Detail.jpg");
      formData.append("id_mst_motor_merk", this.merk);
      formData.append("tahun", this.tahun);
      formData.append("id_mst_motor_type", this.tipe);
      formData.append("warna", this.warna.toUpperCase().trim());
      formData.append("id_mst_odometer", this.odometer);
      formData.append("cc", this.cc.trim());
      formData.append("id_mst_motor_transmisi", this.transmisi);
      formData.append("id_mst_motor_jenis", this.jenis);
      formData.append("nomor_polisi", this.nopol.toUpperCase().trim());
      formData.append("lokasi", this.lokasi.toUpperCase().trim());
      formData.append("lembar_pajak", this.pajak);
      if (this.tglPajak != null) {
        formData.append("tgl_pajak", this.tglPajak);
      }
      formData.append("lembar_stnk", this.stnk);
      if (this.tglSTNK != null) {
        formData.append("tgl_stnk", this.tglSTNK);
      }
      formData.append("lembar_bpkb", this.bpkb);
      formData.append("kepemilikan_pertama", false);
      formData.append("deskripsi", this.deskripsi);
      formData.append("barcode", this.barcode);
      formData.append("id_app_user", this.user.id);

      this.axios
        .post("/produk/v3/unit_mokas", formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message
          });
          this.$router.push({ path: "/garasi" });
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    onDecode(result) {
      this.barcode = result;
      alert(result);
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    }
  },
  created() {
    this.getMerk();
    // this.getTahun();
    this.getOdoMeter();
    this.getTransmisi();
    this.getJenis();
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  }
};
</script>

<style>
#foto1 {
  display: none;
}
#foto2 {
  display: none;
}
#foto3 {
  display: none;
}
#foto4 {
  display: none;
}
#foto5 {
  display: none;
}

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
.error {
  font-weight: bold;
  color: red;
}
</style>