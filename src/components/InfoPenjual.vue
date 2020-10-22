<template>
  <div>
    <h3>Umum</h3>

    <v-row dense>
      <v-col cols="12" sm="8">
        <h5>Informasi Umum</h5>

        <v-textarea
          placeholder="Masukan informasi umum"
          outlined
          dense
          rows="3"
          no-resize
        ></v-textarea>
      </v-col>

      <v-col cols="12" sm="8">
        <h5>Slogan</h5>

        <v-text-field
          clearable
          v-model="slogan"
          placeholder="Masukkan Slogan Anda"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>

    <h3>Tambahkan Catatan</h3>

    <v-row dense>
      <v-col cols="12" sm="8">
        <h5>Judul Catatan</h5>

        <v-text-field
          clearable
          v-model="catatan.judul"
          placeholder="Masukkan Judul Catatan"
          outlined
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="8">
        <h5>Isi Catatan</h5>

        <v-textarea
          v-model="catatan.deskripsi"
          placeholder="Masukan isi catatan"
          outlined
          dense
          rows="3"
          no-resize
        ></v-textarea>
      </v-col>
    </v-row>

    <h3>Tambahkan Kebijakan Penjual</h3>

    <v-row dense>
      <v-col cols="12" sm="8">
        <h5>Judul Kebijakan</h5>

        <v-text-field
          clearable
          v-model="first"
          placeholder="Masukkan Judul Kebijakan"
          outlined
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="8">
        <h5>Isi Kebijakan</h5>

        <v-textarea
          v-model="reply"
          placeholder="Masukan isi kebijakan"
          outlined
          dense
          rows="3"
          no-resize
        ></v-textarea>
      </v-col>
    </v-row>

    <v-btn block color="primary" @click="simpan">Simpan</v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "info-penjual",
  props: ["user"],
  data: () => ({
    slogan: "",
    catatan: [],
    judul: "",
    deskripsi: "",
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    getSlogan() {
      this.axios
        .get("/user/v3/user/slogan_penjual", {
          params: {
            id_app_user: this.user.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.slogan = data[0].slogan;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    postSlogan() {
      let formData = new FormData();

      formData.set("id_app_user", this.user.id);
      formData.set("slogan", this.slogan);

      this.axios
        .post("/user/v3/user/slogan_penjual", formData, {
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
          console.log(responses.api_message);
        });
    },
    getCatatan() {
      this.axios
        .get("/user/v3/user/catatan_penjual", {
          params: {
            id_app_user: this.user.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.catatan = data[0];
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    postCatatan() {
      let formData = new FormData();

      formData.set("id_app_user", this.user.id);
      formData.set("judul", this.catatan.judul);
      formData.set("deskripsi", this.catatan.deskripsi);
      formData.set("type_catatan", 1);

      this.axios
        .post("/user/v3/user/catatan_penjual", formData, {
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
          console.log(responses.api_message);
        });
    },
    simpan() {
      this.postSlogan();
      this.postCatatan();
    },
  },
  created() {
    this.getSlogan();
    this.getCatatan();
  },
};
</script>