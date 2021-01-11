<template>
  <v-card flat>
    <v-card-title>Pesan Otomatis</v-card-title>

    <v-card-text>
      <div>Pesan berikut akan otomatis dikirimkan kepada pemenang dari iklan tawar bersama yang Anda pasang.</div>
      <div>Jika Anda belum melakukan kustomisasi, kami akan mengirimkan pesan default.</div>

      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="chat"
          :rules="rules"
          counter="300"
          filled
          label="Pesan Default"
          hint="*Nama Iklan akan muncul diakhir kalimat"
          persistent-hint
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn block color="teal" class="white--text" :disabled="!valid" @click="save">Simpan</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "pesan-otomatis",
  props: ["user"],
  data: () => ({
    template:
      "Selamat kamu sudah memenangkan Iklan Tawar Bersama. Yuk segera hubungi kami :)",
    chat: "",
    rules: [
      (v) => !!v || "Field is required",
      (v) => v.length <= 300 || "Max 300 characters",
    ],
    valid: true,
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
      setToken: "auth/SET_TOKEN"
    }),
    getTemplate() {
      this.axios
        .get("/user/v3/user/template_chat", {
          params: {
            id_app_user: this.user.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.chat = data.chat;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          

          this.chat = this.template;
        });
    },
    save() {
      let formData = new FormData();

      formData.set("id_app_user", this.user.id);
      formData.set("chat", this.chat);

      this.axios
        .post("/user/v3/user/template_chat", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
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
  },
  created() {
    this.getTemplate();
  },
};
</script>