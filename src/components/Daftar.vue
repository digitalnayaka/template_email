<template>
  <v-card>
    <v-toolbar dark color="teal">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Daftar</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-container fluid>
      <v-form ref="form" v-model="valid">
        <div align="center">
          <v-card :width="phoneDisplay ? 600 : 330" class="pa-5">
            <div v-if="phoneDisplay">
              <h2>Daftarkan diri Anda</h2>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nama Lengkap"
                prepend-inner-icon="mdi-account"
                outlined
                counter="35"
                :maxlength="35"
              ></v-text-field>

              <v-text-field
                v-model="phone"
                :rules="phoneRules"
                label="Phone Number"
                prepend-inner-icon="mdi-phone"
                outlined
                v-mask="mask"
              ></v-text-field>
              <v-btn block color="teal" :disabled="!valid" @click="signupcheck">Daftar</v-btn>
              <v-card-subtitle>
                Dengan mendaftar, Anda telah menyetujui
                <a
                  href="http://simotor.id/#/syaratketentuan/"
                  target="_new"
                >syarat ketentuan</a> dan
                <a href="http://simotor.id/#/kebijakan/" target="_new">kebijakan privasi SiMotor</a>
              </v-card-subtitle>
            </div>

            <div v-if="otpDisplay">
              <h2>Kode OTP</h2>
              <v-text-field v-model="otp" name="otp" required :rules="otpRules" maxlength="6"></v-text-field>
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

              <v-btn block color="primary" @click="daftar" :disabled="!valid">Verifikasi</v-btn>

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
import Vue from "vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
Vue.component(VueCountdown.name, VueCountdown);

export default {
  name: "daftar",
  directives: { mask },
  data() {
    return {
      name: "",
      phone: "",
      nameRules: [
        v => !!v || "Nama Lengkap wajib diisi",
        v => v.length >= 2 || "Min 2 karakter",
        v => v.length <= 35 || "Max 35 karakter"
      ],
      phoneRules: [
        v => !!v || "Nomor Handphone wajib diisi (Min 10, Max 13)",
        v => v && v.length >= 10
      ],
      otpRules: [
        v => !!v || "OTP is required",
        v => (v && v.length == 6) || "OTP harus 6 digit"
      ],
      mask: "#############",
      valid: true,
      phoneDisplay: true,
      otpDisplay: false,
      otp: "",
      countdown: true
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
      setToken: "auth/SET_TOKEN"
    }),
    end() {
      this.countdown = !this.countdown;
    },
    resend() {
      this.otpRequest();
      this.countdown = !this.countdown;
    },
    signupcheck() {
      let formData = new FormData();

      formData.append("nomor_hp", this.phone);

      this.axios
        .post("/user/v1/user/signupcheck", formData)
        .then(response => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message
          });
          this.phoneDisplay = false;
          this.otpDisplay = true;
          this.otpRequest();
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
    otpRequest() {
      let formData = new FormData();

      formData.append("nomor_hp", this.phone);

      this.axios
        .post("/user/v1/user/otprequest", formData)
        .then(() => {})
        .catch(error => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message
          });
        });
    },
    daftar() {
      let formData = new FormData();

      formData.append("nama", this.name);
      formData.append("nomor_hp", this.phone);
      formData.append("id_token", this.otp);
      formData.append("id_mst_user_type", 1);

      this.axios
        .post("/user/v1/user", formData)
        .then(response => {
          let { data } = response.data;
          this.setAuth(data[0]);
          this.setToken(data[0].token);
          window.localStorage.setItem("user", JSON.stringify(data[0]));
          window.localStorage.setItem("token", data[0].token);
          this.setAlert({
            status: true,
            color: "success",
            text: "Selamat Datang " + this.user.nama
          });
          this.userRoles(data[0].id);
          this.close();
          this.phone = "";
          this.otp = "";
          this.otpDisplay = false;
          this.phoneDisplay = true;
          // this.$router.go("/");
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
    userRoles(id) {
      let formData = new FormData();

      formData.append("user_id", id);
      formData.append("role_id", 2);
      formData.append("created_by", id);

      this.axios.post("/setup/v1/user_roles", formData);
    },
    ubah() {
      this.otpDisplay = false;
      this.phoneDisplay = true;
    },
    close() {
      this.$emit("closed", false);
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>