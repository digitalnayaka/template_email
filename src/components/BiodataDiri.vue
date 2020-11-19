<template>
  <v-row>
    <v-col cols="12" sm="4">
      <v-card outlined width="800" class="pa-2 rounded-lg">
        <v-img :src="getImage(user.photo)" contain></v-img>
        <v-file-input
          id="fileid"
          label="File input"
          v-model="photo"
          accept="image/*"
          outlined
          dense
          class="d-none"
          @change="saveData('foto', photo)"
        ></v-file-input>

        <div class="text-center">
          <v-btn id="buttonid" block small class="mt-4" @click="uploadAvatar"
            >Pilih Foto</v-btn
          >
        </div>

        <v-card-text class="text-caption"
          >Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</v-card-text
        >
      </v-card>
    </v-col>

    <v-col cols="12" sm="8">
      <v-card outlined width="800" class="pa-2 rounded-lg">
        <div class="font-weight-bold">Ubah Biodata Diri</div>

        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="5">Nama</v-col>
            <v-col cols="7">
              <div v-if="!ubahNama">
                :
                {{ user.nama }}
                <a href="javascript:void(0)" @click="ubahNama = true">
                  <v-icon>mdi-pencil</v-icon>
                </a>
              </div>

              <div v-else>
                <v-text-field
                  v-model="formNama"
                  outlined
                  dense
                  append-icon="mdi-content-save"
                  append-outer-icon="mdi-close"
                  @click:append-outer="ubahNama = false"
                  @click:append="saveData('nama', formNama)"
                  :rules="namaRules"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">Nomor Handphone</v-col>
            <v-col cols="7">: {{ user.nomor_hp }}</v-col>
          </v-row>

          <v-row>
            <v-col cols="5">Nomor Whatsapp</v-col>
            <v-col cols="7">
              <div v-if="!ubahWA">
                :
                {{ user.nomor_whatsapp }}
                <a href="javascript:void(0)" @click="ubahWA = true">
                  <v-icon>mdi-pencil</v-icon>
                </a>
              </div>

              <div v-else>
                <v-text-field
                  v-model="formNomorWA"
                  outlined
                  dense
                  append-icon="mdi-content-save"
                  append-outer-icon="mdi-close"
                  @click:append-outer="ubahWA = false"
                  @click:append="saveData('nomor_whatsapp', formNomorWA)"
                  :rules="waRules"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">Kota</v-col>
            <v-col cols="7">
              <div v-if="!ubahKota">
                :
                {{ user.kota }}
                <a href="javascript:void(0)" @click="ubahKota = true">
                  <v-icon>mdi-pencil</v-icon>
                </a>
              </div>

              <div v-else>
                <v-text-field
                  v-model="formKota"
                  outlined
                  dense
                  append-icon="mdi-content-save"
                  append-outer-icon="mdi-close"
                  @click:append-outer="ubahKota = false"
                  @click:append="saveData('kota', formKota)"
                  :rules="kotaRules"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">Deskripsi</v-col>
            <v-col cols="7">
              <div v-if="!ubahDeskripsi">
                :
                {{ user.deskripsi }}
                <a href="javascript:void(0)" @click="ubahDeskripsi = true">
                  <v-icon>mdi-pencil</v-icon>
                </a>
              </div>

              <div v-else>
                <v-text-field
                  v-model="formDeskripsi"
                  outlined
                  dense
                  append-icon="mdi-content-save"
                  append-outer-icon="mdi-close"
                  @click:append-outer="ubahDeskripsi = false"
                  @click:append="saveData('deskripsi', formDeskripsi)"
                  :rules="deskripsiRules"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">Email</v-col>

            <v-col cols="7">
              <div v-if="formEmail !== null">: {{ user.email }}</div>

              <div v-else>
                <section id="firebaseui-auth-container"></section>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card>

      <br />
    </v-col>
    <v-tabs
      v-model="tab"
      background-color="teal darken-3"
      dark
      slider-color="yellow"
      show-arrows
      class="mt-2"
    >
      <v-tab>Performa Penjual</v-tab>
      <v-tab>Performa Pembeli</v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <div class="text-h5">Rating Penjual</div>
        </v-tab-item>
        <v-tab-item>
          <div class="text-h5 text-center font-weight-bold">
            Performa Pembeli
          </div>
          <v-divider> </v-divider>

          <v-row justify="space-around">
            <v-col cols="3" sm="3" align="center">
              <div v-if="user.id_type_pinalti !== 3">
                <v-img
                  src="/img/icons/akun_blokir_gray.webp"
                  width="35"
                  contain
                ></v-img>
              </div>
              <div v-if="user.id_type_pinalti == 3">
                <v-img
                  src="/img/icons/akun_blokir.webp"
                  width="35"
                  contain
                ></v-img>
              </div>
              <h5>Akun diBlokir</h5>
            </v-col>

            <v-col cols="3" sm="3" align="center">
              <div v-if="user.id_type_pinalti == 2">
                <v-img
                  src="/img/icons/akun_wanprestasi2.webp"
                  width="35"
                  contain
                ></v-img>
              </div>
              <div v-if="user.id_type_pinalti !== 2">
                <v-img
                  src="/img/icons/akun_wanprestasi2_gray.webp"
                  width="35"
                  contain
                ></v-img>
              </div>
              <h5>Wanprestasi 2</h5>
            </v-col>

            <v-col cols="3" sm="3" align="center">
              <div v-if="user.id_type_pinalti == 1">
                <v-img
                  src="/img/icons/akun_wanprestasi1.webp"
                  width="35"
                  contain
                ></v-img>

                <h5>Wanprestasi 1</h5>
              </div>
              <div v-if="user.id_type_pinalti !== 1">
                <v-img
                  src="/img/icons/akun_wanprestasi1_gray.webp"
                  width="35"
                  contain
                ></v-img>

                <h5>Wanprestasi 1</h5>
              </div>
            </v-col>

            <v-col cols="3" sm="3" align="center">
              <div v-if="user.id_type_pinalti !== 0">
                <v-img
                  src="/img/icons/akun_aman_gray.webp"
                  width="35"
                  contain
                ></v-img>
              </div>
              <div v-if="user.id_type_pinalti == 0">
                <v-img
                  src="/img/icons/akun_aman.webp"
                  width="35"
                  contain
                ></v-img>
              </div>
              <h5>Akun Aman</h5>
            </v-col>
            <div>
            <v-alert dense type="success" v-if="user.id_type_pinalti == 0">
             Selamat!! Anda Pembeli <strong>TERPERCAYA,</strong> tingkatkan terus transaksi Anda!
            </v-alert>
             <v-alert dense  type="warning" v-if="user.id_type_pinalti == 1">
             Oops!! Anda terdeteksi melakukan <strong>1 Kali WANPRESTASI,</strong> Mohon maaf, tiket untuk iklan Anda hangus.
            </v-alert>
             <v-alert dense  type="warning" v-if="user.id_type_pinalti == 2">
              Oops!! Anda terdeteksi melakukan <strong>2 Kali WANPRESTASI,</strong> Mohon maaf, akun Anda tidak bisa ikut Tawar Bersama.
            </v-alert>
             <v-alert dense  type="error" v-if="user.id_type_pinalti == 3">
              Oops!! Anda terdeteksi melakukan <strong>3 Kali WANPRESTASI,</strong> Mohon maaf, akun Anda diBlokir sampai batas waktu yang ditentukan.
            </v-alert>
            </div>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "biodata-diri",
  props: ["user"],
  data: () => ({
    ubahNama: false,
    tab: 0,
    ubahWA: false,
    ubahKota: false,
    ubahDeskripsi: false,
    photo: null,
    formNama: "",
    formNomorHP: "",
    formNomorWA: "",
    formEmail: "",
    formDeskripsi: "",
    avg: [],
    ulasanSaya: [],
    formKota: "",
    namaRules: [(v) => !!v || "Nama harus diisi!"],
    waRules: [
      (v) => v.length >= 10 || "Min. 10 karakter",
      (v) =>
        /^[+]?[(]?[0-9]{3,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{1,8}$/im.test(v) ||
        "Nomor hp varus valid",
    ],
    deskripsiRules: [
      (v) => v.length >= 15 || "Min. 15 karakter",
      (v) => v.length <= 150 || "Maks. 150 karakter",
    ],
    kotaRules: [
      (v) => v.length >= 4 || "Min. 4 karakter",
      (v) => v.length <= 60 || "Maks. 60 karakter",
    ],
    emailRules: [
      (v) => !!v || "Data harus diisi!",
      (v) => /.+@.+/.test(v) || "E-mail harus valid",
    ],
    valid: true,
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
      setToken: "auth/SET_TOKEN",
    }),
    uploadAvatar() {
      document.getElementById("fileid").click();
    },
    sellerInfo() {
      this.axios
        .get("/user/v3/user", {
          params: {
            id: this.id_app_user,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.appuser = data[0];
          this.myReview();
          this.reviewAvg();
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    saveData(param, value) {
      if (this.valid) {
        let formData = new FormData();

        formData.append(param, value);
        formData.append("id", this.user.id);

        this.axios
          .put("/user/v3/user", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            if (param === "nama") this.ubahNama = false;
            if (param === "nomor_whatsapp") this.ubahWA = false;
            if (param === "kota") this.ubahKota = false;
            if (param === "deskripsi") this.ubahDeskripsi = false;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.setAuth(data.data[0]);
            window.localStorage.setItem("user", JSON.stringify(data.data[0]));
          })
          .catch((error) => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "error",
              text: responses.api_message,
            });
          });
      } else {
        this.setAlert({
          status: true,
          color: "error",
          text: "Terdapat kesalahan pengisian",
        });
      }
    },
    googleLogin(tokenGoogle, email) {
      let formData = new FormData();

      formData.append("email", email);
      formData.append("id_token", tokenGoogle);
      formData.append("id", this.user.id);

      this.axios
        .put("/user/v3/user", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.email = email;
          this.setAuth(data.data[0]);
          window.localStorage.setItem("user", JSON.stringify(data.data[0]));
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
        });
    },
    myReview() {
      let offset = (this.page - 1) * this.limit;

      this.axios
        .get("/transaksi/v3/review", {
          params: {
            id_penjual: this.appuser.id,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.ulasanSaya = data;

          this.total = response.data.count;
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    reviewAvg() {
      this.axios
        .get("/transaksi/v3/review_avg", {
          params: {
            id_penjual: this.appuser.id,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.avg = data[0];
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
  },

  created() {
    this.formNama = this.user.nama;
    this.formNomorHP = this.user.nomor_hp;
    this.formNomorWA = this.user.nomor_whatsapp;
    this.formEmail = this.user.email;
    this.formDeskripsi = this.user.deskripsi;
    this.formKota = this.user.kota === null ? "" : this.user.kota;
    this.sellerInfo();
  },
  mounted() {
    if (this.user.email === "") {
      var uiConfig = {
        signInOptions: [
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          },
        ],
        signInFlow: "popup",
        callbacks: {
          signInSuccessWithAuthResult: (authResult) => {
            if (authResult) {
              var user = authResult.user;
              var credential = authResult.credential;
              this.googleLogin(credential.idToken, user.email);
            }
            return false;
          },
        },
      };
      var ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  },
};
</script>

<style scoped>
a {
  color: teal;
  text-decoration: none;
}

a:hover {
  color: red;
}
</style>