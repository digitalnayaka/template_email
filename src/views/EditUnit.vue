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
          <v-stepper-step :key="`${n}-step`" :complete="e1 > n" :step="n" editable>Tahap {{ n }}</v-stepper-step>
          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-form ref="form" v-model="valid">
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
                    :debug="2"
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
                    :debug="2"
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
                    :debug="2"
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
                    :debug="2"
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
                    :debug="2"
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
                <v-btn color="primary" @click="e1 = 2">Selanjutnya</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <h3>Pilih Tipe Motor Anda</h3>

            <v-container fluid>
              <v-row dense>
                <v-col cols="2" align="center">
                  <v-card>
                    <v-img
                      :src="getImage(unitMokas.foto_1)"
                      contain
                      class="mx-2"
                      v-if="foto1 == null"
                    ></v-img>

                    <v-img :src="previewUrl1" contain v-else></v-img>

                    <v-chip small left color="red" text-color="white">Utama</v-chip>
                  </v-card>
                </v-col>

                <v-col cols="2" align="center">
                  <v-card>
                    <v-img
                      :src="getImage(unitMokas.foto_2)"
                      contain
                      class="mx-2"
                      v-if="foto2 == null"
                    ></v-img>

                    <v-img :src="previewUrl2" contain v-else></v-img>

                    <v-chip small left color="red" text-color="white">Depan</v-chip>
                  </v-card>
                </v-col>

                <v-col cols="2" align="center">
                  <v-card>
                    <v-img
                      :src="getImage(unitMokas.foto_3)"
                      contain
                      class="mx-2"
                      v-if="foto3 == null"
                    ></v-img>

                    <v-img :src="previewUrl3" contain v-else></v-img>

                    <v-chip small left color="red" text-color="white">Samping</v-chip>
                  </v-card>
                </v-col>

                <v-col cols="2" align="center">
                  <v-card>
                    <v-img
                      :src="getImage(unitMokas.foto_4)"
                      contain
                      class="mx-2"
                      v-if="foto4 == null"
                    ></v-img>

                    <v-img :src="previewUrl4" contain v-else></v-img>

                    <v-chip small left color="red" text-color="white">Atas</v-chip>
                  </v-card>
                </v-col>

                <v-col cols="2" align="center">
                  <v-card>
                    <v-img
                      :src="getImage(unitMokas.foto_5)"
                      contain
                      class="mx-2"
                      v-if="foto5 == null"
                    ></v-img>

                    <v-img :src="previewUrl5" contain v-else></v-img>
                    
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
                :search-input="String(merk)"
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
                @change="setTahun"
                :search-input="String(tahun)"
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
                @change="setTipe"
                :search-input="String(tipe)"
                :rules="formRules"
              ></v-autocomplete>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="e1 = 1">Sebelumnya</v-btn>
                <v-btn color="primary" @click="e1 = 3">Selanjutnya</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
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
                    <v-list-item-title>
                      <v-menu
                        ref="menu1"
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
                          <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu1.save(tglPajak)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-list-item-title>
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
                    <v-list-item-title>
                      <v-menu
                        ref="menu2"
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
                          <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu2.save(tglSTNK)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-list-item-title>
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
                    <v-list-item-title>
                      <v-text-field
                        outlined
                        v-model="deskripsi"
                        label="Contoh: Jual unit motor saya"
                        :rules="descRules"
                        :counter="350"
                      ></v-text-field>
                    </v-list-item-title>
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
                    <v-list-item-title>
                      <v-text-field outlined v-model="barcode" label="Contoh: 1234xxx"></v-text-field>

                      <p class="error">{{ error }}</p>

                      <StreamBarcodeReader @decode="onDecode" @error="onInit"></StreamBarcodeReader>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="e6 = 2">Sebelumnya</v-btn>
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
import { mask } from "vue-the-mask";
import ImageUploader from "vue-image-upload-resize";
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
  name: "EditUnit",
  components: {
    ImageUploader,
    StreamBarcodeReader
  },
  directives: { mask },
  data() {
    return {
      e1: 1,
      steps: 3,
      id: this.$route.params.id,
      unitMokas: [],
      dokumen: [],
      brands: [],
      merk: {},
      currentYear: new Date().toISOString().substr(0, 4),
      years: [],
      tahun: {},
      disableTahun: true,
      disableTipe: true,
      tipes: [],
      tipe: {},
      foto1: null,
      previewUrl1: "",
      foto2: null,
      previewUrl2: "",
      foto3: null,
      previewUrl3: "",
      foto4: null,
      previewUrl4: "",
      foto5: null,
      previewUrl5: "",
      odo: [],
      odometer: "",
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
      formRules: [v => !!v || "Field is required"],
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
      valid: true,
      hasImage: false,
      image: null,
      result: "",
      error: ""
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
    loadData() {
      this.axios
        .get("/produk/v3/unit_mokas", {
          params: {
            id: this.id,
            limit: 1
          }
        })
        .then(response => {
          let { data } = response.data;
          this.unitMokas = data[0];

          this.getTahun(this.unitMokas.id_motor_merk);
          this.getTipe(this.unitMokas.id_motor_merk);

          this.previewUrl1 = this.getImage(this.unitMokas.foto_1);
          this.previewUrl2 = this.getImage(this.unitMokas.foto_2);
          this.previewUrl3 = this.getImage(this.unitMokas.foto_3);
          this.previewUrl4 = this.getImage(this.unitMokas.foto_4);
          this.previewUrl5 = this.getImage(this.unitMokas.foto_5);
          this.merk = {
            id: this.unitMokas.id_motor_merk,
            merk: this.unitMokas.merk
          };
          this.tahun = { tahun: this.unitMokas.tahun };
          this.tipe = {
            id: this.unitMokas.id_motor_type,
            type: this.unitMokas.type
          };
          this.warna = this.unitMokas.warna;
          this.odometer = {
            id: this.unitMokas.id_mst_odometer,
            odometer: this.unitMokas.odometer
          };
          this.cc = this.unitMokas.cc;
          this.transmisi = {
            id: this.unitMokas.id_mst_motor_transmisi,
            transmisi: this.unitMokas.transmisi
          };
          this.jenis = {
            id: this.unitMokas.id_mst_motor_jenis,
            jenis: this.unitMokas.jenis_motor
          };
          this.nopol = this.unitMokas.nomor_polisi.trim();
          this.stnk = this.unitMokas.lembar_stnk;
          this.pajak = this.unitMokas.lembar_pajak;
          this.bpkb = this.unitMokas.lembar_bpkb;
          this.lokasi = this.unitMokas.lokasi;
          this.deskripsi = this.unitMokas.deskripsi;
          this.desc = this.deskripsi != null ? true : false;
          this.tglPajak = this.unitMokas.tanggal_pajak.substr(0, 10);
          this.tglSTNK = this.unitMokas.tanggal_stnk.substr(0, 10);

          let stnk = this.unitMokas.lembar_stnk;
          let bpkb = this.unitMokas.lembar_bpkb;
          let pajak = this.unitMokas.lembar_pajak;
          if (stnk == true) {
            this.dokumen.push(stnk);
          }
          if (bpkb == true) {
            this.dokumen.push(bpkb);
          }
          if (pajak == true) {
            this.dokumen.push(pajak);
          }
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    clear() {
      // this.$nextTick(() => (this.merk = ""));
      this.$nextTick(() => (this.tahun = ""));
      this.$nextTick(() => (this.tipe = ""));
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
    getTahun(data) {
      // var i = 0;
      // for (i = 0; i < 10; i++) {
      //   let tahun = this.currentYear - i;
      //   this.years.push(tahun);
      // }
      this.axios
        .get("/produk/v3/mst_motor_type_tahun", {
          params: {
            id_mst_motor_merk: data
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
    getTipe(data) {
      this.axios
        .get("/produk/v3/mst_motor_type", {
          params: {
            id_mst_motor_merk: data
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
    setTahun() {
      this.countRules.push(this.tahun);
    },
    setTipe() {
      this.countRules.push(this.tipe);
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
    setOdo() {
      this.countRules.push(this.odometer);
    },
    setTransmisi() {
      this.countRules.push(this.transmisi);
    },
    setJenis() {
      this.countRules.push(this.jenis);
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
      let formData = new FormData();

      formData.append("id", this.id);
      if(this.foto1 == null){
        formData.append("foto_1", this.foto1);
      } else {
        formData.append("foto_1", this.foto1, "Utama.jpg");
      }

      if(this.foto2 == null){
        formData.append("foto_2", this.foto2);
      } else {
        formData.append("foto_2", this.foto2, "Tampak_Depan.jpg");
      }

      if(this.foto3 == null){
        formData.append("foto_3", this.foto3);
      } else {
        formData.append("foto_3", this.foto3, "Tampak_Samping.jpg");
      }

      if(this.foto4 == null){
        formData.append("foto_4", this.foto4);
      } else {
        formData.append("foto_4", this.foto4, "Tampak_Atas.jpg");
      }

      if(this.foto5 == null){
        formData.append("foto_5", this.foto5);
      } else {
        formData.append("foto_5", this.foto5, "Detail.jpg");
      }
      
      // formData.append("foto_2", this.foto2, "Tampak_Depan.jpg");
      // formData.append("foto_3", this.foto3, "Tampak_Samping.jpg");
      // formData.append("foto_4", this.foto4, "Tampak_Atas.jpg");
      // formData.append("foto_5", this.foto5, "Detail.jpg");
      formData.append(
        "id_mst_motor_merk",
        typeof this.merk == "number" ? this.merk : this.merk.id
      );
      formData.append(
        "tahun",
        typeof this.tahun == "number" ? this.tahun : this.tahun.tahun
      );
      formData.append(
        "id_mst_motor_type",
        typeof this.tipe == "number" ? this.tipe : this.tipe.id
      );
      formData.append("warna", this.warna.toUpperCase());
      formData.append(
        "id_mst_odometer",
        typeof this.odometer == "number" ? this.odometer : this.odometer.id
      );
      formData.append("cc", this.cc);
      formData.append(
        "id_mst_motor_transmisi",
        typeof this.transmisi == "number" ? this.transmisi : this.transmisi.id
      );
      formData.append(
        "id_mst_motor_jenis",
        typeof this.jenis == "number" ? this.jenis : this.jenis.id
      );
      formData.append("nomor_polisi", this.nopol.toUpperCase());
      formData.append("lokasi", this.lokasi.toUpperCase());
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
        .put("/produk/v3/unit_mokas", formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response.data;
          console.log(data);
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Saved"
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
  mounted() {
    this.loadData();
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
</style>