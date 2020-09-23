<template>
  <v-card>
    <v-toolbar dark color="teal">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-container fluid>
      <v-form ref="form" v-model="valid">
        <div align="center">
          <v-card width="330" class="pa-5 mt-16">
            <div v-if="phoneDisplay">
              <h2>Masuk</h2>

              <v-text-field
                v-model="phone"
                :rules="phoneRules"
                label="Nomor Handphone"
                prepend-inner-icon="mdi-phone"
                outlined
                v-mask="mask"
                @keyup.enter="logincheck"
                autofocus
              ></v-text-field>

              <v-text-field v-model="phone" outlined v-bind:style="{ display: 'none' }"></v-text-field>

              <v-btn block color="teal" :disabled="!valid" @click="logincheck">Selanjutnya</v-btn>

              <div class="d-flex align-center pt-5">
                <v-divider></v-divider>

                <span>atau masuk dengan</span>

                <v-divider></v-divider>
              </div>

              <section id="firebaseui-auth-container"></section>Belum punya akun SiMotor?
              <a @click="setDialogComponent('daftar')">Daftar</a>
            </div>

            <div v-if="otpDisplay">
              <h2>Kode OTP</h2>

              <v-text-field
                v-model="otp"
                required
                :rules="otpRules"
                maxlength="6"
                @keyup.enter="login"
                autofocus
              ></v-text-field>

              <v-text-field v-model="otp" outlined v-bind:style="{ display: 'none' }"></v-text-field>

              <p v-if="countdown">
                Tidak menerima kode?
                Tunggu
                <countdown ref="countdown" :time="60 * 1000" @end="countdown = !countdown">
                  <template slot-scope="props">{{ props.seconds }} Detik.</template>
                </countdown>
              </p>

              <p v-else>
                Tidak menerima kode?
                <a @click="resend">Resend</a>
              </p>

              <v-btn block color="primary" @click="login" :disabled="!valid">Submit</v-btn>

              <br />

              <p @click="ubah">
                Bukan nomor Anda?
                <a>Ubah</a>
              </p>
            </div>
          </v-card>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mask } from "vue-the-mask";
import { mapGetters, mapActions } from "vuex";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import Vue from "vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
Vue.component(VueCountdown.name, VueCountdown);

export default {
  name: "login",
  directives: { mask },
  data() {
    return {
      phone: "",
      phoneRules: [
        (v) => !!v || "Nomor HP wajib diisi (Min 10, Max 13)",
        (v) => v && v.length >= 10,
      ],
      otpRules: [
        (v) => !!v || "OTP is required",
        (v) => (v && v.length == 6) || "OTP harus 6 digit",
        (v) => /^\d+$/.test(v) || "Numbers Only",
      ],
      mask: "#############",
      valid: true,
      phoneDisplay: true,
      otpDisplay: false,
      otp: "",
      countdown: true,
    };
  },

  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
      setToken: "auth/SET_TOKEN",
      setDialogStatus: "dialog/setStatus",
      setDialogComponent: "dialog/setComponent",
    }),
    logincheck() {
      let formData = new FormData();

      formData.append("nomor_hp", this.phone);

      this.axios
        .post("/user/v3/user/logincheck", formData)
        .then(() => {
          this.phoneDisplay = false;
          this.otpDisplay = true;
          this.otpRequest();
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
    async otpRequest() {
      let formData = new FormData();
      formData.append("nomor_hp", this.phone);

      await this.axios.post("/user/v3/user/otprequest", formData);
    },
    resend() {
      this.otpRequest();
      this.countdown = !this.countdown;
    },
    ubah() {
      this.otpDisplay = false;
      this.phoneDisplay = true;
      this.otp = "";
    },
    async login() {
      let formData = new FormData();

      formData.append("nomor_hp", this.phone);
      formData.append("id_token", this.otp);
      formData.append("id_one_signal", this.$root.$children[0].notif);

      await this.axios
        .post("/user/v3/user/login", formData)
        .then((response) => {
          let { data } = response.data;
          this.setAuth(data[0]);
          this.setToken(data[0].token);
          window.localStorage.setItem("user", JSON.stringify(data[0]));
          window.localStorage.setItem("token", data[0].token);
          this.setAlert({
            status: true,
            color: "success",
            text: "Selamat Datang " + this.user.nama,
          });
          this.close();
          this.phone = "";
          this.otp = "";
          this.otpDisplay = false;
          this.phoneDisplay = true;
          this.$root.$children[0].getModules();
          this.$root.$children[0].getNotif();
          // this.$router.go("/");
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
    googleLogin(tokenGoogle, email) {
      let formData = new FormData();

      formData.append("id_token", tokenGoogle);
      formData.append("email", email);
      formData.append("id_one_signal", this.$root.$children[0].notif);

      this.axios
        .post("/user/v3/user/login", formData)
        .then((response) => {
          let { data } = response.data;
          this.setAuth(data[0]);
          this.setToken(data[0].token);
          window.localStorage.setItem("user", JSON.stringify(data[0]));
          window.localStorage.setItem("token", data[0].token);
          this.setAlert({
            status: true,
            color: "success",
            text: "Selamat Datang " + this.user.nama,
          });
          this.close();
          this.$root.$children[0].getModules();
          this.$root.$children[0].getNotif();
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
    close() {
      this.$emit("closed", false);
    },
  },
  mounted() {
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
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      dialogStatus: "dialog/status",
      currentComponent: "dialog/component",
    }),
    dialog: {
      get() {
        return this.dialogStatus;
      },
      set(value) {
        this.setDialogStatus(value);
      },
    },
  },
};
</script>