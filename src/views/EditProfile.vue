<template>
  <div class="text-center">
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card class="d-inline-block mx-auto">
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

          <v-text-field
            label="Alamat Email"
            v-model="email"
            outlined
            :rules="emailRules"
            v-if="user.email != null"
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
      valid: true,
      formRules: [v => !!v || "Field is required"],
      waRules: [
        v => v.length >= 10 || "Min 10 characters",
        v => v.length <= 13 || "Max 13 characters"
      ],
      emailRules: [
        v => !!v || "Field is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  mounted() {
    var uiConfig = {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      signInFlow: "popup",
      callbacks: {
        signInSuccessWithAuthResult: authResult => {
          if (authResult) {
            this.googleLogin(authResult.user._lat, authResult.user.email);
            console.log(authResult.user);
          }
          return false;
        }
      }
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
      setToken: "auth/SET_TOKEN"
    }),
    async googleLogin(token, email) {
      let formData = new FormData();

      formData.append("email", email);
      formData.append("id_token", token);
      formData.append("id", this.user.id);

      await this.axios
        .put("/user/v3/user", formData, {
          headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message
          });
        })
        .catch(error => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message
          });
        });
    },
    storeItem() {
      let formData = new FormData();

      if (this.photo != null) {
        formData.append("foto", this.photo);
      }
      formData.append("nama", this.nama);
      formData.append("nomor_whatsapp", this.nomorWA);
      formData.append("id", this.user.id);

      this.axios
        .put("/user/v3/user", formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response;
          this.key += 1;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message
          });
          this.setAuth(data.data[0]);
          window.localStorage.setItem("user", JSON.stringify(data.data[0]));
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
  },
  created() {
    this.nama = this.user.nama;
    this.nomorHP = this.user.nomor_hp;
    this.nomorWA = this.user.nomor_whatsapp;
    this.email = this.user.email;
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>