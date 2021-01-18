<template>
  <v-container fluid>
    <v-app-bar app color="#22939E" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-h4 mb-2">Aktivitas Penjual</div>

    <v-tabs background-color="#22939E" dark grow>
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab>Berlangsung</v-tab>
      <v-tab>Riwayat</v-tab>

      <v-tab-item>
        <v-card v-for="item in occur" :key="item.id_iklan" class="mb-4">
          <v-card flat :to="'/iklan/' + item.id_iklan">
            <v-toolbar dense flat color="grey lighten-3" class="red--text">
              <div>Berlangsung:</div>

              <v-spacer></v-spacer>

              <div>
                <countdown :time="item.countdown" :transform="transform">
                  <template slot-scope="props">
                    {{ props.days }} : {{ props.hours }} : {{ props.minutes }} :
                    {{ props.seconds }}
                  </template>
                </countdown>
              </div>
            </v-toolbar>

            <v-row align="center" no-gutters>
              <v-col cols="12" sm="6">
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar tile size="80">
                      <v-img :src="getImage(item.photo)"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-subtitle>
                        Tawar Bersama {{ item.type }}
                      </v-list-item-subtitle>

                      <v-list-item-title class="teal--text font-weight-bold">
                        {{ item.judul }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" sm="6">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.status_all.status_aktivitas }}
                      </v-list-item-title>

                      <!-- <v-list-item-subtitle>
                        Rp
                        {{ Number(item.bid_tertinggi).toLocaleString("id-ID") }}
                      </v-list-item-subtitle> -->
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>

            <v-divider></v-divider>
          </v-card>

          <v-row align="center" no-gutters>
            <v-col cols="12" sm="6">
              <div
                class="pa-2 text-center teal--text"
                v-if="item.id_mst_status_pemenang == 1"
              >
                {{ item.status_all.status_aktivitas }}
              </div>

              <div
                class="pa-2 text-center red--text"
                v-if="item.id_mst_status_pemenang == 3"
              >
                {{ item.status_all.status_aktivitas }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-text-field
          outlined
          dense
          hide-details
          flat
          label="Search"
          v-model="keyword"
          @keyup.enter="getTBSelesai"
          autofocus
          clearable
          @click:clear="clear"
          class="my-2"
        >
          <template v-slot:append>
            <v-menu top :offset-y="true">
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-filter</v-icon>
              </template>

              <v-list dense>
                <v-list-item-group color="primary" mandatory>
                  <v-list-item @click="doFilter(null)">
                    <v-list-item-icon>
                      <v-icon>mdi-eye</v-icon>
                    </v-list-item-icon>

                    <v-list-item-subtitle class="text-caption">
                      Semua
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item @click="doFilter(true)">
                    <v-list-item-icon>
                      <v-icon>mdi-cash</v-icon>
                    </v-list-item-icon>

                    <v-list-item-subtitle class="text-caption">
                      Ada pemenang
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item @click="doFilter(false)">
                    <v-list-item-icon>
                      <v-icon>mdi-cash-remove</v-icon>
                    </v-list-item-icon>

                    <v-list-item-subtitle class="text-caption">
                      Tidak ada pemenang
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </template>
        </v-text-field>

        <v-card v-for="item in selesai" :key="item.id_iklan" class="mb-4">
          <v-card
            flat
            :to="
              item.id_order == 0
                ? '/tb-selesai/' + item.id
                : '/iklan/' + item.id
            "
          >
            <v-toolbar dense flat color="grey lighten-3" class="red--text">
              <div>Selesai Pada:</div>

              <v-spacer></v-spacer>

              <div>
                {{ item.tanggal_selesai | dateTimeFormat(utc) }} {{ timezone }}
              </div>
            </v-toolbar>

            <v-row align="center" no-gutters>
              <v-col cols="12" sm="6">
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar tile size="80">
                      <v-img :src="getImage(item.photo)"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-subtitle>
                        Tawar Bersama {{ item.type }}
                      </v-list-item-subtitle>

                      <v-list-item-title class="teal--text font-weight-bold">
                        {{ item.judul }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" sm="6">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.bid == 0 ? "Tidak ada penawaran" : "Penawaran terakhir" }}
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        Rp
                        {{ Number(item.bid).toLocaleString("id-ID") }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>

            <v-divider></v-divider>
          </v-card>

          <v-row align="center" no-gutters>
            <v-col cols="12" sm="6">
              <div
                class="pa-2 text-center red--text"
                v-if="item.id_mst_status_pemenang == 2"
              >
                {{ item.status_all.status_aktivitas }}
              </div>

              <div
                class="pa-2 text-center teal--text"
                v-if="item.id_mst_status_pemenang == 1"
              >
                {{ item.status_all.status_aktivitas }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <v-btn
                block
                outlined
                color="teal"
                dark
                @click="chat(item)"
                v-if="item.id_mst_status_pemenang == 1"
              >
                Hubungi Pembeli
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-pagination
          v-model="page"
          @input="getTBSelesai"
          :length="lengthPage"
          :total-visible="5"
        ></v-pagination>
      </v-tab-item>

      <!-- <v-tab-item>
        <v-card
          v-for="item in selesai"
          :key="item.id_iklan"
          :to="
            item.id_order == 0
              ? '/tb-selesai/' + item.id_iklan
              : '/detail-transaksi/' + item.id_order
          "
          class="my-4"
        >
          <v-toolbar dense flat>
            <div>Tawar Bersama selesai pada:</div>

            <v-spacer></v-spacer>

            <div class="red--text">
              
            </div>
          </v-toolbar>

          <v-list>
            <v-list-item>
              <v-list-item-avatar rounded size="80">
                <v-img :src="getImage(item.photo)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-black">{{
                  item.judul
                }}</v-list-item-title>

                <v-list-item-subtitle class="teal--text"
                  >{{ item.jenis }} {{ item.type }}
                  {{ item.type_tb }}</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>Tawaran Terakhir</v-list-item-title>

                <v-list-item-subtitle
                  >Rp
                  {{
                    Number(item.bid_tertinggi).toLocaleString("id-ID")
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <div v-if="item.id_mst_status_pemenang == 2">
            <div
              class="d-block pa-2 amber darken-2 white--text text-center"
              v-if="item.id_mst_pembayaran_status == 1"
            >
              {{ item.pembayaran_status }}
            </div>

            <div
              class="d-block pa-2 blue darken-2 white--text text-center"
              v-else-if="item.id_mst_pembayaran_status == 4"
            >
              {{ item.pembayaran_status }} Penjual
            </div>

            <div
              class="d-block pa-2 teal accent-4 white--text text-center"
              v-else-if="item.id_mst_pembayaran_status == 2"
            >
              {{ item.pembayaran_status }}
            </div>

            <div
              class="d-block pa-2 red darken-1 white--text text-center"
              v-else
            >
              {{ item.pembayaran_status }}
            </div>
          </div>

          <div v-if="item.id_mst_status_pemenang == 4">
            <div
              class="d-block pa-2 red darken-1 white--text text-center"
              v-if="item.id_mst_pembayaran_status == 0"
            >
              {{ item.deskripsi_status }}
            </div>
          </div>
        </v-card>

        <v-pagination
          v-model="page"
          @input="getTBSelesai"
          :length="lengthPage"
          :total-visible="5"
        ></v-pagination>
      </v-tab-item> -->
    </v-tabs>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
import Vue from "vue";
import VueCountdown from "@chenfengyuan/vue-countdown";

Vue.component(VueCountdown.name, VueCountdown);

export default {
  name: "seller-activity",
  props: ["utc", "timezone"],
  data() {
    return {
      berlangsung: [],
      occur: [],
      countdown: null,
      sheet: false,
      minBid: 0,
      penawaran: 0,
      bid: 0,
      liveBid: [],
      selected: [],
      selesai: [],
      keyword: "",
      filter: null,
      show: false,
      page: 1,
      lengthPage: 0,
      limit: 20,
      offset: 0,
      total: 0,
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    getTBBerlangsung() {
      this.axios
        .get("/iklan/v3/aktivitas_penjual_berlangsung", {
          params: {
            id_app_user: this.user.id,
            limit: 20,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.berlangsung = data;

          if (this.berlangsung.length > 0) {
            for (let i = 0; i < this.berlangsung.length; i++) {
              let now = new Date(this.berlangsung[i].server_time);
              now.setDate(now.getDate() - 1);
              let d = new Date(this.berlangsung[i].tanggal_selesai);
              d.setDate(d.getDate() - 1);
              let countdown = d - now;

              this.occur.push({ ...this.berlangsung[i], countdown: countdown });
            }
          }
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
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        // Adds leading zero
        const digits = value < 10 ? `0${value}` : value;

        props[key] = `${digits}`;
      });

      return props;
    },
    getTBSelesai() {
      var offset = (this.page - 1) * this.limit;

      var params = new URLSearchParams();

      params.set("id_app_user", this.user.id);
      if (this.keyword != "") {
        params.set("search", this.keyword);
      }
      if (this.filter != null) {
        params.set("pemenang", this.filter);
      }
      params.set("offset", offset);
      params.set("limit", this.limit);

      var request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/iklan/v3/aktivitas_penjual_riwayat", request)
        .then((response) => {
          let { data } = response.data;
          this.selesai = data;

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
    doFilter(status) {
      this.filter = status;
      this.getTBSelesai();
    },
    clear() {
      this.keyword = "";
      this.getTBSelesai();
    },
    chat(item) {
      this.$router.push("/chat/" + item.id_app_pemenang);
    },
  },
  created() {
    this.getTBBerlangsung();
    this.getTBSelesai();
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY, HH:mm");
    },
  },
};
</script>