<template>
  <v-card flat>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-h4">Penilaian dari Pembeli</div>

    <v-card flat>
      <v-tabs
        v-model="tab"
        background-color="teal"
        dark
        slider-color="yellow"
        show-arrows
        
      >
        <v-tab>Kotak Masuk Penilaian</v-tab>
        <v-tab>Penilaian Pembeli</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card
            outlined
            class="mt-2 mb-4"
            v-for="item in notReview"
            :key="item.id"
          >
            <div class="d-flex justify-space-between grey lighten-3 pa-2">
              <div>
                {{ item.app_user_name_pembeli }}
              </div>
            </div>

            <v-divider></v-divider>

            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar tile size="70">
                      <v-img :src="getImage(item.foto_iklan)" contain></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <a :href="'/iklan/' + item.id_iklan">
                          {{ item.judul_iklan }}
                        </a>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-row no-gutters>
                  <v-col cols="6" align="center">
                    <div>Penilaian <b>Pembeli:</b></div>

                    <div class="d-flex justify-center">
                      <div class="flex-column">
                        <div v-if="item.ratting_user == 1">
                          <v-icon x-large color="red">
                            mdi-emoticon-angry-outline
                          </v-icon>

                          <div>Kecewa</div>
                        </div>

                        <div v-if="item.ratting_user == 2">
                          <v-icon x-large color="orange">
                            mdi-emoticon-neutral-outline
                          </v-icon>

                          <div>Netral</div>
                        </div>

                        <div v-if="item.ratting_user == 3">
                          <v-icon x-large color="teal">
                            mdi-emoticon-happy-outline
                          </v-icon>

                          <div>Puas</div>
                        </div>
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="6" class="d-flex">
                    <v-divider vertical></v-divider>

                    <div class="d-flex mx-2">
                      <div class="flex-column">
                        <div>Rating <b>Pembeli:</b></div>

                        <div class="d-flex align-center">
                          <v-icon x-large color="yellow">mdi-star</v-icon>
                          <div class="text-h3">{{ item.ratting_iklan }}</div>
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12" sm="6" class="d-flex">
                <v-divider vertical></v-divider>

                <div class="ma-2 flex-grow-1">
                  <div>Ulasan <b>Pembeli:</b></div>

                  <div>{{ item.review }}</div>

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

                  <v-btn
                    color="teal"
                    dark
                    small
                    class="mb-2"
                    @click="selected = item"
                    v-if="selected.length == 0"
                  >
                    Balas Ulasan
                  </v-btn>

                  <div v-if="selected.id == item.id">
                    <v-textarea
                      v-model="reply"
                      placeholder="Tulis deskripsi Anda mengenai produk ini..."
                      outlined
                      dense
                      rows="3"
                      no-resize
                    ></v-textarea>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="teal" dark @click="selected = []"
                        >Kembali</v-btn
                      >

                      <v-btn
                        color="teal"
                        class="white--text"
                        :disabled="reply == '' ? true : false"
                        @click="sendReply(item)"
                      >
                        Kirim
                      </v-btn>
                    </v-card-actions>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card
            outlined
            class="mt-2 mb-4"
            v-for="item in ulasanSaya"
            :key="item.id"
          >
            <div class="d-flex justify-space-between grey lighten-3 pa-2">
              <div>
                {{ item.app_user_name_pembeli }}
              </div>
            </div>

            <v-divider></v-divider>

            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar tile size="70">
                      <v-img :src="getImage(item.foto_iklan)" contain></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <a :href="'/iklan/' + item.id_iklan">
                          {{ item.judul_iklan }}
                        </a>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-row no-gutters>
                  <v-col cols="6" align="center">
                    <div>Penilaian <b>Pembeli:</b></div>

                    <div class="d-flex justify-center">
                      <div class="flex-column">
                        <div v-if="item.ratting_user == 1">
                          <v-icon x-large color="red">
                            mdi-emoticon-angry-outline
                          </v-icon>

                          <div>Kecewa</div>
                        </div>

                        <div v-if="item.ratting_user == 2">
                          <v-icon x-large color="orange">
                            mdi-emoticon-neutral-outline
                          </v-icon>

                          <div>Netral</div>
                        </div>

                        <div v-if="item.ratting_user == 3">
                          <v-icon x-large color="teal">
                            mdi-emoticon-happy-outline
                          </v-icon>

                          <div>Puas</div>
                        </div>
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="6" class="d-flex">
                    <v-divider vertical></v-divider>

                    <div class="d-flex mx-2">
                      <div class="flex-column">
                        <div>Rating <b>Pembeli:</b></div>

                        <div class="d-flex align-center">
                          <v-icon x-large color="yellow">mdi-star</v-icon>
                          <div class="text-h3">{{ item.ratting_iklan }}</div>
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12" sm="6" class="d-flex">
                <v-divider vertical></v-divider>

                <div class="ma-2 flex-grow-1">
                  <div>Ulasan <b>Pembeli:</b></div>

                  <div>{{ item.review }}</div>

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

                  <div>Ulasan <b>Saya:</b></div>

                  <div>{{ item.Reply }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
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
    selected: [],
    reply: "",
    ulasanSaya: [],
    page: 1,
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
            id_penjual: this.user.id,
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
      let params = new URLSearchParams();

      for (let i = 0; i < this.review.length; i++) {
        params.append("id_iklan", this.review[i].id_iklan);
      }

      let request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/transaksi/v3/review", request)
        .then((response) => {
          let { data } = response.data;
          this.notReview = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    sendReply() {
      var r = confirm("Yakin dengan ulasan berikut?");
      if (r == true) {
        let formData = new FormData();

        formData.set("id_review", this.selected.id);
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
            window.location.href = "/buyer-review";
          })
          .catch((error) => {
            let responses = error.response.data;
            console.log(responses);
          });
      }
    },
    myReview() {
      let offset = (this.page - 1) * this.limit;

      this.axios
        .get("/transaksi/v3/review", {
          params: {
            id_penjual: this.user.id,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.ulasanSaya = data;

          this.total = response.data.count;
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  created() {
    this.getReview();
    this.myReview();
  },
};
</script>