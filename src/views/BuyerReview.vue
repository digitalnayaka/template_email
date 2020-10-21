<template>
  <v-card flat>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-h4">Penilaian Pembeli</div>

    <v-card flat>
      <v-tabs
        v-model="tab"
        background-color="teal"
        dark
        slider-color="yellow"
        show-arrows
      >
        <v-tab>Inbox Ulasan</v-tab>
        <v-tab>Penilaian Pembeli</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card class="pa-2 my-2" v-for="item in notReview" :key="item.id">
            <v-row no-gutters>
              <v-col cols="12" sm="2" align="center">
                <div class="d-flex align-center justify-space-around">
                  <div v-if="item.ratting_user == 1">
                    <v-icon x-large color="red">
                      mdi-emoticon-angry-outline
                    </v-icon>
                    <div class="text-h5">Kecewa</div>
                  </div>

                  <div v-if="item.ratting_user == 2">
                    <v-icon x-large color="orange">
                      mdi-emoticon-neutral-outline
                    </v-icon>
                    <div class="text-h5">Netral</div>
                  </div>

                  <div v-if="item.ratting_user == 3">
                    <v-icon x-large color="teal">
                      mdi-emoticon-happy-outline
                    </v-icon>
                    <div class="text-h5">Puas</div>
                  </div>

                  <v-divider vertical inset></v-divider>

                  <div class="d-flex align-center">
                    <v-icon x-large color="yellow">mdi-star</v-icon>
                    <div class="text-h3">{{ item.ratting_iklan }}</div>
                  </div>
                </div>

                <div class="mt-2">
                  Oleh <b>{{ item.app_user_name_pembeli }}</b>
                </div>

                <v-list>
                  <v-list-item>
                    <v-list-item-avatar tile size="70">
                      <v-img :src="getImage(item.foto_iklan)" contain></v-img>
                    </v-list-item-avatar>

                    <v-list-item-title>
                      <a :href="'/iklan/' + item.id_iklan">
                        {{ item.judul_iklan }}
                      </a>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" sm="10" class="d-flex">
                <v-divider vertical></v-divider>

                <div class="mx-2 flex-column flex-grow-1">
                  <div>
                    {{ item.review }}
                  </div>

                  <div
                    v-viewer="{ movable: false }"
                    class="d-flex flex-wrap mt-2"
                  >
                    <v-card flat class="mx-1" v-if="item.foto_1 != ''">
                      <img
                        :src="getImage(item.foto_1)"
                        contain
                        width="130"
                        height="80"
                        style="cursor: pointer"
                      />
                    </v-card>

                    <v-card flat class="mx-1" v-if="item.foto_2 != ''">
                      <img
                        :src="getImage(item.foto_2)"
                        contain
                        width="130"
                        height="80"
                        style="cursor: pointer"
                      />
                    </v-card>

                    <v-card flat class="mx-1" v-if="item.foto_3 != ''">
                      <img
                        :src="getImage(item.foto_3)"
                        contain
                        width="130"
                        height="80"
                        style="cursor: pointer"
                      />
                    </v-card>

                    <v-card flat class="mx-1" v-if="item.foto_4 != ''">
                      <img
                        :src="getImage(item.foto_4)"
                        contain
                        width="130"
                        height="80"
                        style="cursor: pointer"
                      />
                    </v-card>

                    <v-card flat class="mx-1" v-if="item.foto_5 != ''">
                      <img
                        :src="getImage(item.foto_5)"
                        contain
                        width="130"
                        height="80"
                        style="cursor: pointer"
                      />
                    </v-card>
                  </div>

                  <br />

                  <b>Balasan Kamu</b>

                  <v-textarea
                    v-model="reply"
                    placeholder="Tulis deskripsi Anda mengenai produk ini..."
                    outlined
                    dense
                    rows="3"
                    no-resize
                    width="500"
                  ></v-textarea>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="teal"
                      class="white--text"
                      :disabled="reply == null ? true : false"
                      @click="sendReply(item)"
                    >
                      Kirim
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <!-- <div>
      <div class="display-1 font-weight-bold text-center">Rating Anda</div>
      <div class="display-1 font-weight-bold text-center">
        4.5 / 5.0
        <v-icon>mdi-star-outline</v-icon>
      </div>
      <br />

      <v-card outlined width="500" height="200">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/profile.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>oleh: xxxx</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon>mdi-star-outline</v-icon>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item-content class="text-center">
            <v-row>
              <v-col cols="6">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-list-item-avatar tile size="100">
                      <v-img src="/img/vario.png"></v-img>
                    </v-list-item-avatar>
                  </v-list-item-title>
                  <v-list-item-title>28 sept 2020</v-list-item-title>
                </v-list-item-content>
              </v-col>

              <v-col cols="6">
                <v-list-item-title class="font-weight-bold">Judul Iklan</v-list-item-title>
                <v-list-item-subtitle>
                  Lorem Ipsum is simply dummy
                  text of the printing and typesetting....
                </v-list-item-subtitle>
                <v-btn outlined color="primary">balas</v-btn>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list>
      </v-card>
    </div> -->
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);

export default {
  name: "buyer-review",
  data: () => ({
    tab: 0,
    review: [],
    notReview: [],
    reply: "",
    page: 0,
    limit: 20,
    total: 0,
    lengthPage: 0,
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    getReview() {
      let offset = (this.page - 1) * this.limit;

      this.axios
        .get("/transaksi/v3/belum_review", {
          params: {
            id_penjual: 80,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.review = data;
          this.rating();

          this.total = response.data.count;
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    rating() {
      // let params = new URLSearchParams();

      // for (let i = 0; i < this.review.length; i++) {
      //   params.append("id_iklan", this.review[i].id_iklan);
      // }

      // let request = {
      //   params: params,
      //   headers: { Authorization: "Bearer " + this.user.token },
      // };

      this.axios
        .get("/transaksi/v3/review", {
          params: {
            id_iklan: 5153,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.notReview = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    sendReply(item) {
      var r = confirm("Yakin dengan ulasan berikut?");
      if (r == true) {
        let formData = new FormData();

        formData.set("id_review", item.id);
        formData.set("id_app_user", this.user.id);
        formData.set("reply", this.reply);

        this.axios
          .post("/transaksi/v3/review_reply", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.getOrder();
          })
          .catch((error) => {
            let responses = error.response.data;
            console.log(responses);
          });
      }
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  created() {
    this.getReview();
  },
};
</script>