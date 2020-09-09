<template>
  <div class="text-center">
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card class="d-inline-block mx-auto" width="1000">
      <v-card-title>
        <span class="headline">Edit Profile</span>
      </v-card-title>

      <v-card-text>
        <v-list dense>
          <v-list-item>
            <v-list-item-avatar size="100">
              <v-icon x-large v-if="user.photo == ''">mdi-account-circle</v-icon>
              <v-img :src="getImage(user.photo)" contain :key="key" v-else></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-file-input
                outlined
                v-model="photo"
                accept="image/*"
                label="Avatar"
                :rules="formRules"
              ></v-file-input>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-form ref="form" v-model="valid">
          <v-text-field label="Nama Lengkap" v-model="nama" outlined :rules="formRules"></v-text-field>

          <v-text-field label="Nomor Handphone" v-model="nomorHP" outlined readonly></v-text-field>

          <v-text-field label="Nomor Whatsapp" v-model="nomorWA" outlined :rules="waRules"></v-text-field>

          <v-text-field label="Kota" v-model="kota" outlined :rules="kotaRules"></v-text-field>

          <v-text-field
            label="Deskripsi Penjual"
            v-model="deskripsi"
            outlined
            :rules="deskripsiRules"
          ></v-text-field>

          <v-text-field
            label="Alamat Email"
            v-model="email"
            outlined
            :rules="emailRules"
            readonly
            v-if="email != null"
          ></v-text-field>

          <div v-else>
            Alamat Email
            <section id="firebaseui-auth-container"></section>
          </div>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <div class="ma-2">Data anda selalu dirahasiakan dan tidak akan diberikan kepada pihak ketiga</div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn block color="blue darken-1" dark class="mb-2" @click="storeItem">Update</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "edit_profile",
  data() {
    return {
      photo: null,
      key: 0,
      nama: "",
      nomorHP: "",
      nomorWA: "",
      email: "",
      deskripsi: "",
      kota: "",
      valid: true,
      formRules: [(v) => !!v || "Data harus diisi!"],
      waRules: [
        (v) => v.length >= 10 || "Min. 10 karakter",
        (v) => v.length <= 13 || "Maks. 13 karakter",
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
    };
  },
  mounted() {
    var uiConfig = {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          clientId:
            "73051776825-88ohcrej4c2gqsqkn27jc62vdf5n7qkq.apps.googleusercontent.com",
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
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
      setToken: "auth/SET_TOKEN",
    }),
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
    storeItem() {
      let formData = new FormData();

      if (this.photo != null) {
        formData.append("foto", this.photo);
      }
      formData.append("id", this.user.id);
      formData.append("nama", this.nama);
      formData.append("nomor_whatsapp", this.nomorWA);
      formData.append("deskripsi", this.deskripsi);
      formData.append("kota", this.kota);
      this.axios
        .put("/user/v3/user", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.key += 1;
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
    },
  },
  created() {
    this.nama = this.user.nama;
    this.nomorHP = this.user.nomor_hp;
    this.nomorWA = this.user.nomor_whatsapp;
    this.email = this.user.email;
    this.deskripsi = this.user.deskripsi;
    this.kota = this.user.kota === null ? "" : this.user.kota;
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>