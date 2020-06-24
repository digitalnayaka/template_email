<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container fluid>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field outlined v-model="judul" label="Judul Iklan" :rules="formRules"></v-text-field>

        <v-text-field outlined v-model="deskripsi" label="Deskripsi Iklan" :rules="formRules"></v-text-field>

        <div class="text-right">
          <v-btn color="primary" :disabled="!valid" @click="updateIklan">Simpan</v-btn>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EditIklan",
  data: () => ({
    valid: true,
    formRules: [v => !!v || "Field is required"],
    hits: [],
    judul: "",
    deskripsi: ""
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    getIklan() {
      this.axios
        .get("/search/v1/search", {
          params: {
            id: this.$route.params.id,
            limit: 1
          }
        })
        .then(response => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits;

          this.judul = hits[0]._source.judul;
          this.deskripsi = hits[0]._source.deskripsi;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    updateIklan() {
      let formData = new FormData();

      formData.append("judul", this.judul.trim());
      formData.append("deskripsi", this.deskripsi.trim());
      formData.append("id", this.$route.params.id);

      if (this.hits[0]._source.id_mst_iklan_jenis == 1) {
        this.axios
          .put("/iklan/v1/iklan_hp_mokas_satuan", formData, {
            headers: { Authorization: "Bearer " + this.user.token }
          })
          .then(response => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message
            });
            this.$router.go(-1);
          })
          .catch(error => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "success",
              text: responses.api_message
            });
          });
      } else {
        this.axios
          .put("/iklan/v1/iklan_tb_mokas_satuan", formData, {
            headers: { Authorization: "Bearer " + this.user.token }
          })
          .then(response => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message
            });
            this.$router.go(-1);
          })
          .catch(error => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "success",
              text: responses.api_message
            });
          });
      }
    }
  },
  created() {
    this.getIklan();
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>