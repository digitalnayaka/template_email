<template>
  <v-card flat>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-h4">Ulasan Penjualan</div>

    <v-card flat color="">
      <v-tabs
        v-model="tab"
        background-color="teal"
        dark
        slider-color="yellow"
        show-arrows
      >
        <v-tab>Kotak Masuk Ulasan</v-tab>
        <!-- <v-tab>Ulasan Penjualan</v-tab> -->
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card
          color="light-green lighten-5"
            outlined
            class="mt-2 mb-4"
            v-for="item in notReview"
            :key="item.id"
          >
            <v-row no-gutters>
              <v-col cols="12" sm="2">
                <div class="pa-2" align="center">
                  <v-img
                    :src="getImage(item.foto_iklan)"
                    contain
                    max-width="250"
                    max-height="150"
                  ></v-img>

                  <a :href="'/iklan/' + item.id_iklan">
                    {{ item.judul_iklan }}
                  </a>
                </div>
              </v-col>

              <v-col cols="12" sm="10" class="d-flex" color="">
                <v-divider vertical></v-divider>

                <div class="flex-column flex-grow-1" >
                  <v-list color="light-green lighten-5">
                    <v-list-item>
                      <v-list-item-avatar tile>
                        <v-icon v-if="item.app_user_foto_pembeli == ''">
                          mdi-account-circle
                        </v-icon>

                        <v-img
                          :src="getImage(item.app_user_foto_pembeli)"
                          v-else
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.app_user_name_pembeli }}
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          <span class="cyan pa-1 white--text text-caption mr-1">
                            Pembeli
                          </span>

                          <v-icon color="red" v-if="item.ratting_user == 1">
                            mdi-emoticon-angry-outline
                          </v-icon>

                          <v-icon color="orange" v-if="item.ratting_user == 2">
                            mdi-emoticon-neutral-outline
                          </v-icon>

                          <v-icon color="teal" v-if="item.ratting_user == 3">
                            mdi-emoticon-happy-outline
                          </v-icon>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <div class="mx-4">
                    <v-icon
                      color="yellow"
                      v-for="n in item.ratting_iklan"
                      :key="n"
                    >
                      mdi-star
                    </v-icon>

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
                  </div>

                  <v-divider></v-divider>

                  <div v-if="item.Reply == null">
                    <v-btn
                      color="teal"
                      dark
                      small
                      class="ma-4"
                      @click="selected = item"
                      v-if="selected.length == 0"
                    >
                      Balas Ulasan
                    </v-btn>

                    <div class="ma-4" v-if="selected.id == item.id">
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

                  <div v-else>
                    <v-list color="light-green lighten-5">
                      <v-list-item>
                        <v-list-item-avatar tile>
                          <v-icon v-if="item.app_user_foto_penjual == ''">
                            mdi-account-circle
                          </v-icon>

                          <v-img
                            :src="getImage(item.app_user_foto_penjual)"
                            v-else 
                          ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.app_user_name_penjual }}
                          </v-list-item-title>

                          <v-list-item-subtitle>
                            <span
                              class="red pa-1 white--text text-caption mr-1"
                            >
                              Penjual
                            </span>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <div class="mx-4 mb-2">
                      {{ item.Reply[0].reply }}
                    </div>
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
            <v-row no-gutters>
              <v-col cols="12" sm="2">
                <div class="pa-2" align="center">
                  <v-img
                    :src="getImage(item.foto_iklan)"
                    contain
                    max-width="250"
                    max-height="150" 
                  ></v-img>

                  <a :href="'/iklan/' + item.id_iklan">
                    {{ item.judul_iklan }}
                  </a>
                </div>
              </v-col>

              <v-col cols="12" sm="10" class="d-flex">
                <v-divider vertical></v-divider>

                <div class="flex-column flex-grow-1">
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar tile>
                        <v-icon v-if="item.app_user_foto_pembeli == ''">
                          mdi-account-circle
                        </v-icon>

                        <v-img
                          :src="getImage(item.app_user_foto_pembeli)"
                          v-else
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.app_user_name_pembeli }}
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          <span class="cyan pa-1 white--text text-caption mr-1">
                            Pembeli
                          </span>

                          <v-icon color="red" v-if="item.ratting_user == 1">
                            mdi-emoticon-angry-outline
                          </v-icon>

                          <v-icon color="orange" v-if="item.ratting_user == 2">
                            mdi-emoticon-neutral-outline
                          </v-icon>

                          <v-icon color="teal" v-if="item.ratting_user == 3">
                            mdi-emoticon-happy-outline
                          </v-icon>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <div class="mx-4">
                    <v-icon
                      color="yellow"
                      v-for="n in item.ratting_iklan"
                      :key="n"
                    >
                      mdi-star
                    </v-icon>

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
                  </div>

                  <v-divider></v-divider>

                  <div v-if="item.Reply != null">
                    <v-list>
                      <v-list-item>
                        <v-list-item-avatar tile>
                          <v-icon v-if="item.app_user_foto_penjual == ''">
                            mdi-account-circle
                          </v-icon>

                          <v-img
                            :src="getImage(item.app_user_foto_penjual)"
                            v-else
                          ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.app_user_name_penjual }}
                          </v-list-item-title>

                          <v-list-item-subtitle>
                            <span
                              class="red pa-1 white--text text-caption mr-1"
                            >
                              Penjual
                            </span>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <div class="mx-4 mb-2">
                      {{ item.Reply[0].reply }}
                    </div>
                  </div>
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
import moment from "moment-timezone";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);

export default {
  name: "buyer-review",
  props: ["utc", "timezone"],
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
          this.notReview = data;

          this.total = response.data.count;
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
        });
    },
    rating() {
      let params = new URLSearchParams();

      for (let i = 0; i < this.review.length; i++) {
        params.append("id_iklan", this.review[i].id_iklan);
      }
      params.set("Reply", null);

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
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
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
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
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
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY, HH:mm");
    },
  },
};
</script>