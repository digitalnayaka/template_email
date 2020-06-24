<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <v-card class="d-inline-block mx-auto">
        <v-container fluid>
          <h1>Detail Transaksi</h1>

          <v-card flat align="center" color="grey lighten-3">
            <v-avatar size="16" tile>
              <v-img src="/img/error.png"></v-img>
            </v-avatar>Selalu waspada terhadap pihak yang tidak bertanggung jawab. Pastikan bukti pembayaran yang diupload sudah benar.
          </v-card>

          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-img :src="getImage(hits.photo)" contain></v-img>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ hits.judul }}</v-list-item-title>

                <v-list-item-subtitle
                  class="red--text"
                >Harga Akhir: Rp {{ Number(iklan.bid_tertinggi).toLocaleString("id-ID") }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "tb_selesai",
  data: () => ({
    hits: [],
    iklan: []
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    getDtlIklan() {
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
          this.hits = hits[0]._source;

          this.getTB();
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getTB() {
      this.axios
        .get("/bid/v1/iklan_tb_peserta", {
          params: {
            id_app_user: this.user.id,
            id_iklan: this.$route.params.id
          }
        })
        .then(response => {
          let { data } = response.data;
          this.iklan = data[0];
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  created() {
    this.getDtlIklan();
  }
};
</script>