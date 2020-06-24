<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="display-1 font-weight-bold text-center">Pesan Otomatis</div>

    <div class="text-center">
      <v-card class="d-inline-block mx-auto">
        <v-container>
          <v-card-text>
            <div>Pesan berikut akan otomatis dikirimkan kepada pemenang dari iklan tawar bersama yang Anda pasang.</div>
            <div>Jika Anda belum melakukan kustomisasi, kami akan mengirimkan pesan default.</div>
          </v-card-text>

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

          <v-btn block color="teal" :disabled="!valid" @click="save">Simpan</v-btn>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "templateChat",
  data() {
    return {
      template:
        "Selamat kamu sudah memenangkan Iklan Tawar Bersama. Yuk segera hubungi kami :)",
      chat: "",
      rules: [
        v => !!v || "Field is required",
        v => v.length <= 300 || "Max 300 characters"
      ],
      valid: true
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    getTemplate() {
      this.axios
        .get("/user/v1/user/template_chat", {
          params: {
            id_app_user: this.user.id
          }
        })
        .then(response => {
          let { data } = response.data;
          this.chat = data.chat;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);

          this.chat = this.template;
        });
    },
    save() {
      let formData = new FormData();

      formData.append("id_app_user", this.user.id);
      formData.append("chat", this.chat);

      this.axios
        .post("/user/v1/user/template_chat", formData, {
          headers: { Authorization: "Bearer " + this.user.token }
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
    }
  },
  created() {
    this.getTemplate();
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>