<template>
  <v-card flat>
    <v-app-bar app color="#22939E" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step :key="`${n}-step`" :complete="e1 > n" :step="n"
            >Tahap {{ n }}</v-stepper-step
          >
          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card>
            <v-card-title>Pilih Foto Motor Anda</v-card-title>

            <div class="d-flex flex-wrap justify-space-around text-center">
              <div v-for="item in list" :key="item.id">
                <image-uploader
                  v-model="item.foto"
                  :quality="0.7"
                  :scaleRatio="0.5"
                  accept="image/*"
                  :preview="false"
                  :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                  :autoRotate="true"
                  outputFormat="blob"
                  @input="setImage('foto' + item.id)"
                  :id="'foto' + item.id"
                >
                  <label :for="'foto' + item.id" slot="upload-label">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-img
                          :src="item.previewUrl"
                          contain
                          :width="$vuetify.breakpoint.xsOnly ? 130 : 190"
                          :height="$vuetify.breakpoint.xsOnly ? 130 : 190"
                          v-on="on"
                        ></v-img>
                      </template>
                      <span>Pilih Foto</span>
                    </v-tooltip>
                  </label>
                </image-uploader>
                {{ item.label }}
              </div>
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="#22939E"
                :disabled="countRules.length >= 5 ? false : true"
                @click="e1 = 2"
                >Selanjutnya</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <v-card-title>Pilih Tipe Motor Anda</v-card-title>

            <div
              class="d-flex flex-nowrap justify-space-between text-center mb-4"
              style="overflow-x: auto"
            >
              <v-card flat v-for="item in list" :key="item.id" class="mx-2">
                <v-img
                  :src="item.previewUrl"
                  contain
                  width="170"
                  height="170"
                ></v-img>
                <v-chip small left color="red" dark>{{ item.label }}</v-chip>
              </v-card>
            </div>

            <v-form ref="form" v-model="valid1">
              <v-autocomplete
                v-model="merk"
                label="Pilih Merk Motor"
                outlined
                dense
                :items="brands"
                item-text="merk"
                item-value="id"
                clearable
                @change="getTipe"
                @click:clear="clear"
                :rules="formRules"
              ></v-autocomplete>

              <v-autocomplete
                v-model="tahun"
                label="Tahun Motor"
                outlined
                dense
                :items="years"
                item-text="tahun"
                item-value="tahun"
                clearable
                :disabled="disableTahun"
                :rules="formRules"
              ></v-autocomplete>

              <v-autocomplete
                v-model="tipe"
                label="Tipe Motor"
                outlined
                dense
                :items="tipes"
                item-text="type"
                item-value="id"
                clearable
                :disabled="disableTipe"
                :rules="formRules"
              ></v-autocomplete>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" @click="e1 = 1">Sebelumnya</v-btn>
                <v-btn color="#22939E" :disabled="!valid1" @click="e1 = 3"
                  >Selanjutnya</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-form ref="form" v-model="valid2">
            <v-card>
              <v-card-title>Isi Detail Motor Anda</v-card-title>

              <v-text-field
                v-model="warna"
                label="Warna Motor"
                outlined
                dense
                :rules="warnaRules"
              ></v-text-field>

              <v-autocomplete
                v-model="odometer"
                label="Odometer"
                outlined
                dense
                :items="odo"
                item-text="range"
                item-value="id"
                clearable
                :rules="formRules"
                suffix="KM"
              ></v-autocomplete>

              <v-text-field
                v-model="cc"
                label="Kapasitas Mesin"
                outlined
                dense
                :rules="formRules"
                suffix="CC"
                v-mask="mask"
              ></v-text-field>

              <v-autocomplete
                v-model="transmisi"
                label="Transmisi Motor"
                outlined
                dense
                :items="trans"
                item-text="transmisi"
                item-value="id"
                clearable
                :rules="formRules"
              ></v-autocomplete>

              <v-autocomplete
                v-model="jenis"
                label="Jenis Motor"
                outlined
                dense
                :items="jenis_motor"
                item-text="jenis"
                item-value="id"
                clearable
                :rules="formRules"
              ></v-autocomplete>

              <v-card-title>Detail Dokumen Motor</v-card-title>

              <v-text-field
                v-model="nopol"
                label="Nomor Polisi"
                outlined
                dense
                maxlength="9"
                :rules="nopolRules"
              ></v-text-field>

              <v-text-field
                v-model="lokasi"
                label="Lokasi Unit"
                outlined
                dense
                :rules="lokasiRules"
              ></v-text-field>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Lembar Pajak Ada</v-list-item-title>
                    <v-list-item-subtitle
                      >Anda memiliki lembar Surat Ketetapan Pajak untuk motor
                      berikut</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-switch
                      v-model="pajak"
                      input-value="true"
                      color="#22939E"
                    ></v-switch>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item v-if="pajak">
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
                        outlined
                        dense
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>

                    <v-date-picker v-model="tglPajak">
                      <v-spacer></v-spacer>
                      <v-btn text color="red" @click="menu = false"
                        >Batalkan</v-btn
                      >
                      <v-btn
                        text
                        color="#22939E"
                        @click="$refs.menu.save(tglPajak)"
                        >Simpan</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Lembar STNK Ada</v-list-item-title>
                    <v-list-item-subtitle
                      >Anda memiliki lembar Surat Tanda Nomor Kendaraan untuk
                      motor berikut</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-switch
                      v-model="stnk"
                      input-value="true"
                      color="#22939E"
                    ></v-switch>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item v-if="stnk">
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
                        outlined
                        dense
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>

                    <v-date-picker v-model="tglSTNK">
                      <v-spacer></v-spacer>
                      <v-btn text color="red" @click="menu = false"
                        >Batalkan</v-btn
                      >
                      <v-btn
                        text
                        color="#22939E"
                        @click="$refs.menu.save(tglSTNK)"
                        >Simpan</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Lembar BPKB Ada</v-list-item-title>
                    <v-list-item-subtitle
                      >Anda memiliki Buku Pemilik Kendaraan Bermotor (BPKB)
                      untuk motor berikut</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-switch
                      v-model="bpkb"
                      input-value="true"
                      color="#22939E"
                    ></v-switch>
                  </v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Deskripsi Unit</v-list-item-title>
                    <v-list-item-subtitle>Opsional</v-list-item-subtitle>
                    <v-list-item-subtitle
                      >Deskripsikan unit anda secara singkat dan
                      jelas.</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-switch
                      v-model="desc"
                      input-value="true"
                      color="#22939E"
                    ></v-switch>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item v-if="desc">
                  <v-textarea
                    v-model="deskripsi"
                    label="Contoh: Jual unit motor saya"
                    outlined
                    dense
                    auto-grow
                    rows="1"
                    :counter="350"
                    :rules="descRules"
                  ></v-textarea>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Kode Barcode</v-list-item-title>
                    <v-list-item-subtitle>Opsional</v-list-item-subtitle>
                    <v-list-item-subtitle
                      >Anda dapat memasukan kode barcode untuk mempermudah
                      pencarian unit anda.</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-switch
                      v-model="scan"
                      input-value="true"
                      color="success"
                    ></v-switch>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item v-if="scan">
                  <v-text-field
                    v-model="barcode"
                    label="Contoh: 1234xxx"
                    outlined
                    dense
                  ></v-text-field>
                </v-list-item>
              </v-list>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" @click="e1 = 2">Sebelumnya</v-btn>
                <v-btn
                  color="#22939E"
                  :disabled="valid1 == valid2 ? false : true"
                  @click="storeItem"
                  :loading="loading"
                  >Simpan</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mask } from "vue-the-mask";
import ImageUploader from "vue-image-upload-resize";

export default {
  name: "add-unit",
  components: { ImageUploader },
  directives: { mask },
  beforeRouteLeave(to, from, next) {
    if (this.countRules.length > 0 && this.valid2 == false) {
      const answer = window.confirm(
        "Apakah Anda yakin ingin meninggalkan halaman ini? Data yang Anda masukkan belum disimpan!"
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
      list: [
        {
          id: 1,
          foto: null,
          previewUrl: "/img/icons/thumbnail/utama.png",
          label: "Utama",
        },
        {
          id: 2,
          foto: null,
          previewUrl: "/img/icons/thumbnail/depan.png",
          label: "Depan",
        },
        {
          id: 3,
          foto: null,
          previewUrl: "/img/icons/thumbnail/samping.png",
          label: "Samping",
        },
        {
          id: 4,
          foto: null,
          previewUrl: "/img/icons/thumbnail/atas.png",
          label: "Atas",
        },
        {
          id: 5,
          foto: null,
          previewUrl: "/img/icons/thumbnail/detail.png",
          label: "Detail",
        },
      ],
      brands: [],
      merk: "",
      years: [],
      tahun: "",
      disableTahun: true,
      disableTipe: true,
      tipes: [],
      tipe: "",
      warna: "",
      odo: [],
      odometer: "",
      mask: "###",
      cc: "",
      trans: [],
      transmisi: "",
      jenis_motor: [],
      jenis: "",
      nopol: "",
      lokasi: "",
      pajak: false,
      tglPajak: null,
      stnk: false,
      tglSTNK: null,
      bpkb: false,
      menu1: false,
      menu2: false,
      desc: false,
      deskripsi: "",
      scan: false,
      barcode: "",
      countRules: [],
      formRules: [(v) => !!v || "Kelengkapan harus diisi"],
      nopolRules: [
        (v) => !!v || "Nomor polisi harus diisi",
        (v) => v.length <= 9 || "Max 9 characters",
      ],
      warnaRules: [
        (v) => !!v || "Warna harus diisi",
        (v) => v.length >= 4 || "Min 4 characters",
        (v) => v.length <= 15 || "Max 15 characters",
      ],
      lokasiRules: [
        (v) => !!v || "Lokasi harus diisi",
        (v) => v.length >= 4 || "Min 4 characters",
        (v) => v.length <= 30 || "Max 30 characters",
      ],
      descRules: [
        (v) => !!v || "deskripsi harus diisi",
        (v) => v.length >= 2 || "Min 2 characters",
        (v) => v.length <= 350 || "Max 350 characters",
      ],
      valid1: true,
      valid2: true,
      hasImage: false,
      image: null,
      loader: null,
      loading: false,
    };
  },

  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    setImage(file) {
      this.hasImage = true;
      this.image = file;
      this.onFileChange(file);
    },
    onFileChange(foto) {
      const reader = new FileReader();

      if (foto == "foto1") {
        reader.onload = (e) => {
          this.list[0].previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.list[0].foto);
        this.countRules.push(this.list[0].foto);
      }
      if (foto == "foto2") {
        reader.onload = (e) => {
          this.list[1].previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.list[1].foto);
        this.countRules.push(this.list[1].foto);
      }
      if (foto == "foto3") {
        reader.onload = (e) => {
          this.list[2].previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.list[2].foto);
        this.countRules.push(this.list[2].foto);
      }
      if (foto == "foto4") {
        reader.onload = (e) => {
          this.list[3].previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.list[3].foto);
        this.countRules.push(this.list[3].foto);
      }
      if (foto == "foto5") {
        reader.onload = (e) => {
          this.list[4].previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.list[4].foto);
        this.countRules.push(this.list[4].foto);
      }
    },
    getMerk() {
      this.axios
        .get("/produk/v3/mst_motor_merk")
        .then((response) => {
          let { data } = response.data;
          this.brands = data;
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
    getTahun() {
      this.axios
        .get("/produk/v3/mst_motor_type_tahun", {
          params: {
            id_mst_motor_merk: this.merk,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.years = data;
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
    getTipe() {
      if (this.merk !== undefined) {
        this.axios
          .get("/produk/v3/mst_motor_type", {
            params: {
              id_mst_motor_merk: this.merk,
            },
          })
          .then((response) => {
            let { data } = response.data;
            this.tipes = data;
            this.countRules.push(this.merk);
            this.disableTahun = false;
            this.disableTipe = false;
            this.getTahun();
          })
          .catch((error) => {
            let responses = error.response.data;
            console.log(responses.api_message);
          });
      }
    },
    clear() {
      this.$nextTick(() => (this.tahun = null));
      this.$nextTick(() => (this.tipe = null));
      this.disableTahun = true;
      this.disableTipe = true;
      this.countRules.splice(-3, 3);
    },
    getOdoMeter() {
      this.axios
        .get("/produk/v3/mst_odometer")
        .then((response) => {
          let { data } = response.data;
          this.odo = data;
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
    getTransmisi() {
      this.axios
        .get("/produk/v3/mst_motor_transmisi")
        .then((response) => {
          let { data } = response.data;
          this.trans = data;
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
    getJenis() {
      this.axios
        .get("/produk/v3/mst_motor_jenis")
        .then((response) => {
          let { data } = response.data;
          this.jenis_motor = data;
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
    storeItem() {
      this.submit = true;

      this.loader = "loading";

      let formData = new FormData();

      formData.append("foto_1", this.list[0].foto, "Utama.jpg");
      formData.append("foto_2", this.list[1].foto, "Tampak_Depan.jpg");
      formData.append("foto_3", this.list[2].foto, "Tampak_Samping.jpg");
      formData.append("foto_4", this.list[3].foto, "Tampak_Atas.jpg");
      formData.append("foto_5", this.list[4].foto, "Detail.jpg");
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
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.$router.push("/garasi/manage-unit");
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
  created() {
    this.getMerk();
    this.getOdoMeter();
    this.getTransmisi();
    this.getJenis();
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
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