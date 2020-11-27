<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      color="teal"
      dark
      v-if="$vuetify.breakpoint.smAndUp || isHome"
    >
      <v-toolbar-title style="width: 230" class="ml-0 mr-2 pl-4">
        <a href="/">
          <v-img src="/img/logo-tulisan.png" width="200" contain></v-img>
        </a>
      </v-toolbar-title>

      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Cari"
        :slot="$vuetify.breakpoint.xsOnly ? 'extension' : 'default'"
        @click="setDialogComponent('search')"
      ></v-text-field>

      <div class="d-flex" v-if="guest">
        <v-btn
          rounded
          outlined
          :x-small="$vuetify.breakpoint.xsOnly ? true : false"
          class="mx-2"
          @click="setDialogComponent('login')"
          >Masuk</v-btn
        >

        <v-btn
          rounded
          :x-small="$vuetify.breakpoint.xsOnly ? true : false"
          color="green accent-4"
          @click="setDialogComponent('daftar')"
          >Daftar</v-btn
        >
      </div>

      <div class="d-flex align-center" v-else>
        <v-menu
          :open-on-hover="$vuetify.breakpoint.xsOnly ? false : true"
          :close-on-content-click="content"
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn large icon v-bind="attrs" v-on="on" class="mr-2">
              <v-badge color="orange" overlap v-if="countNotif > 0">
                <template v-slot:badge>
                  <span>{{
                    countNotif +
                    buyerOrders.menunggu_persetujuan +
                    buyerOrders.menunggu_pembayaran +
                    buyerOrders.menunggu_verifikasi +
                    ticketOrders.menunggu_pembayaran +
                    ticketOrders.menunggu_verifikasi
                  }}</span>
                </template>

                <v-icon>mdi-bell-outline</v-icon>
              </v-badge>

              <v-icon v-else>mdi-bell-outline</v-icon>
            </v-btn>
          </template>

          <v-card width="330">
            <v-card flat to="/notification">
              <v-card-title>
                <div class="d-flex align-center">
                  Notifikasi
                  <v-chip class="ml-2" color="red" dark small>
                    {{ countNotif }}
                  </v-chip>
                </div>
                <v-spacer></v-spacer>
                <v-icon>mdi-chevron-right</v-icon>
              </v-card-title>
            </v-card>

            <v-divider></v-divider>

            <v-tabs
              v-model="tab2"
              grow
              slider-color="teal"
              @change="content = false"
            >
              <v-tab class="text-caption">Tawar Bersama</v-tab>
              <v-tab class="text-caption">Tiket</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab2">
              <v-tab-item>
                <v-card flat>
                  <div class="d-flex justify-space-between">
                    <v-card-subtitle class="font-weight-bold"
                      >Pembeli</v-card-subtitle
                    >
                    <v-card-subtitle class="font-weight-bold">
                      <a href="/buy/order?id=0">Semua</a>
                    </v-card-subtitle>
                  </div>

                  <div class="d-flex justify-space-around">
                    <v-btn icon href="/buy/order?id=10">
                      <v-badge
                        color="red"
                        overlap
                        v-if="buyerOrders.menunggu_persetujuan > 0"
                      >
                        <template v-slot:badge>
                          <span>{{ buyerOrders.menunggu_persetujuan }}</span>
                        </template>

                        <img
                          src="/img/icons/menunggu_persetujuan.webp"
                          width="30"
                          height="30"
                          alt="menunggu persetujuan"
                        />
                      </v-badge>

                      <img
                        src="/img/icons/menunggu_persetujuan.webp"
                        width="30"
                        height="30"
                        alt="menunggu persetujuan"
                        v-else
                      />
                    </v-btn>

                    <v-btn icon href="/buy/order?id=1">
                      <v-badge
                        color="red"
                        overlap
                        v-if="buyerOrders.menunggu_pembayaran > 0"
                      >
                        <template v-slot:badge>
                          <span>{{ buyerOrders.menunggu_pembayaran }}</span>
                        </template>

                        <img
                          src="/img/icons/menunggu_pembayaran.webp"
                          width="30"
                          height="30"
                          alt="menunggu pembayaran"
                        />
                      </v-badge>

                      <img
                        src="/img/icons/menunggu_pembayaran.webp"
                        width="30"
                        height="30"
                        alt="menunggu pembayaran"
                        v-else
                      />
                    </v-btn>

                    <v-btn icon href="/buy/order?id=4">
                      <v-badge
                        color="red"
                        overlap
                        v-if="buyerOrders.menunggu_verifikasi > 0"
                      >
                        <template v-slot:badge>
                          <span>{{ buyerOrders.menunggu_verifikasi }}</span>
                        </template>

                        <img
                          src="/img/icons/menunggu_verifikasi.webp"
                          width="30"
                          height="30"
                          alt="pembayaran diverifikasi"
                        />
                      </v-badge>

                      <img
                        src="/img/icons/menunggu_verifikasi.webp"
                        width="30"
                        height="30"
                        alt="menunggu diverifikasi"
                        v-else
                      />
                    </v-btn>
                  </div>

                  <div
                    class="d-flex justify-space-around text-center text-caption"
                  >
                    <div>Menunggu Persetujuan</div>
                    <div>Menunggu Pembayaran</div>
                    <div>Menunggu Verifikasi</div>
                  </div>

                  <v-divider class="mt-2"></v-divider>

                  <div class="d-flex justify-space-between">
                    <v-card-subtitle class="font-weight-bold"
                      >Penjual</v-card-subtitle
                    >
                    <v-card-subtitle class="font-weight-bold">
                      <a href="/sell/order?id=0">Semua</a>
                    </v-card-subtitle>
                  </div>

                  <div class="d-flex justify-space-around">
                    <v-btn icon href="/sell/order?id=10">
                      <v-badge
                        color="red"
                        overlap
                        v-if="sellerOrders.menunggu_persetujuan > 0"
                      >
                        <template v-slot:badge>
                          <span>{{ sellerOrders.menunggu_persetujuan }}</span>
                        </template>

                        <img
                          src="/img/icons/menunggu_persetujuan.webp"
                          width="30"
                          height="30"
                          alt="menunggu persetujuan"
                        />
                      </v-badge>

                      <img
                        src="/img/icons/menunggu_persetujuan.webp"
                        width="30"
                        height="30"
                        alt="menunggu persetujuan"
                        v-else
                      />
                    </v-btn>

                    <v-btn icon href="/sell/order?id=1">
                      <v-badge
                        color="red"
                        overlap
                        v-if="sellerOrders.menunggu_pembayaran > 0"
                      >
                        <template v-slot:badge>
                          <span>{{ sellerOrders.menunggu_pembayaran }}</span>
                        </template>

                        <img
                          src="/img/icons/menunggu_pembayaran.webp"
                          width="30"
                          height="30"
                          alt="menunggu pembayaran"
                        />
                      </v-badge>

                      <img
                        src="/img/icons/menunggu_pembayaran.webp"
                        width="30"
                        height="30"
                        alt="menunggu pembayaran"
                        v-else
                      />
                    </v-btn>

                    <v-btn icon href="/sell/order?id=4">
                      <v-badge
                        color="red"
                        overlap
                        v-if="sellerOrders.menunggu_verifikasi > 0"
                      >
                        <template v-slot:badge>
                          <span>{{ sellerOrders.menunggu_verifikasi }}</span>
                        </template>

                        <img
                          src="/img/icons/menunggu_verifikasi.webp"
                          width="30"
                          height="30"
                          alt="menunggu verifikasi"
                        />
                      </v-badge>

                      <img
                        src="/img/icons/menunggu_verifikasi.webp"
                        width="30"
                        height="30"
                        alt="menunggu verifikasi"
                        v-else
                      />
                    </v-btn>
                  </div>

                  <div
                    class="d-flex justify-space-around text-center text-caption"
                  >
                    <div>Menunggu Persetujuan</div>
                    <div>Menunggu Pembayaran</div>
                    <div>Menunggu Verifikasi</div>
                  </div>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card flat>
                  <div class="d-flex justify-space-between">
                    <v-card-subtitle class="font-weight-bold"
                      >Pembelian</v-card-subtitle
                    >
                    <v-card-subtitle class="font-weight-bold">
                      <a href="/buy/order?id=0&tab=1">Semua</a>
                    </v-card-subtitle>
                  </div>

                  <div class="d-flex justify-space-around">
                    <v-btn icon href="/buy/order?id=1&tab=1">
                      <v-badge
                        color="red"
                        overlap
                        v-if="ticketOrders.menunggu_pembayaran > 0"
                      >
                        <template v-slot:badge>
                          <span>{{ ticketOrders.menunggu_pembayaran }}</span>
                        </template>

                        <img
                          src="/img/icons/menunggu_pembayaran.webp"
                          width="30"
                          height="30"
                          alt="menunggu pembayaran"
                        />
                      </v-badge>

                      <img
                        src="/img/icons/menunggu_pembayaran.webp"
                        width="30"
                        height="30"
                        alt="menunggu pembayaran"
                        v-else
                      />
                    </v-btn>

                    <v-btn icon href="/buy/order?id=4&tab=1">
                      <v-badge
                        color="red"
                        overlap
                        v-if="ticketOrders.menunggu_verifikasi > 0"
                      >
                        <template v-slot:badge>
                          <span>{{ ticketOrders.menunggu_verifikasi }}</span>
                        </template>

                        <img
                          src="/img/icons/menunggu_verifikasi.webp"
                          width="30"
                          height="30"
                          alt="pembayaran diverifikasi"
                        />
                      </v-badge>

                      <img
                        src="/img/icons/menunggu_verifikasi.webp"
                        width="30"
                        height="30"
                        alt="menunggu diverifikasi"
                        v-else
                      />
                    </v-btn>
                  </div>

                  <div
                    class="d-flex justify-space-around text-center text-caption"
                  >
                    <div>Menunggu Pembayaran</div>
                    <div>Menunggu Verifikasi</div>
                  </div>
                </v-card>
              </v-tab-item>
            </v-tabs-items>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="red" dark small @click="signOut">
                <v-icon left>mdi-logout</v-icon>Keluar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-menu
          :open-on-hover="$vuetify.breakpoint.xsOnly ? false : true"
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn large icon v-bind="attrs" v-on="on">
              <v-badge
                color="orange"
                overlap
                v-if="chats.length + review.length > 0"
              >
                <template v-slot:badge>
                  <span>{{ chats.length + review.length }}</span>
                </template>

                <v-icon>mdi-email</v-icon>
              </v-badge>

              <v-icon v-else>mdi-email</v-icon>
            </v-btn>
          </template>

          <v-card width="150">
            <v-list dense>
              <v-list-item to="/chat-list">
                <v-list-item-subtitle>Chat</v-list-item-subtitle>

                <v-list-item-action v-if="chats.length > 0">
                  <v-avatar color="red" size="25">
                    <span class="white--text">{{ chats.length }}</span>
                  </v-avatar>
                </v-list-item-action>
              </v-list-item>

              <v-list-item href="/product/review">
                <v-list-item-subtitle>Penilaian</v-list-item-subtitle>

                <v-list-item-action v-if="review.length > 0">
                  <v-avatar color="red" size="25">
                    <span class="white--text">{{ review.length }}</span>
                  </v-avatar>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-menu
          :open-on-hover="$vuetify.breakpoint.xsOnly ? false : true"
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn large text v-bind="attrs" v-on="on">
              <!-- <v-avatar size="32" item>
                <v-img
                  src="/img/profile.png"
                  contain
                  v-if="user.photo == null"
                ></v-img>
                <v-img :src="getImage(user.photo)" alt="Avatar" v-else></v-img>
              </v-avatar> -->
              <v-icon> mdi-menu </v-icon>
              <span class="text-caption mx-2">
                <!-- {{ user.nama.split(" ", 1)[0] }} -->
                Menu
              </span>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item to="/account/edit">
                <v-list-item-avatar>
                  <v-img
                    src="/img/profile.png"
                    contain
                    v-if="user.photo == null"
                  ></v-img>
                  <v-img
                    :src="getImage(user.photo)"
                    alt="Avatar"
                    v-else
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ user.nama }}</v-list-item-title>
                  <v-list-item-subtitle v-if="user.id_mst_user_type == 2">
                    {{ user.user_type }} User
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-row no-gutters>
              <v-col cols="6">
                <v-list dense>
                  <v-list-item href="/garasi/manage-unit">
                    <v-list-item-subtitle>Garasi</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item href="/toko/manage-ads">
                    <v-list-item-subtitle>Iklan</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item to="/garasi/add-unit">
                    <v-list-item-subtitle>Tambah Unit</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item to="/toko/add-ads">
                    <v-list-item-subtitle>Tambah Iklan</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="6" class="d-flex">
                <v-divider vertical></v-divider>

                <v-list dense>
                  <v-list-item href="/buy/order?id=0">
                    <v-list-item-subtitle> Transaksi </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item to="/favorite">
                    <v-list-item-subtitle> Favorit </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item href="/activity/buyer">
                    <v-list-item-subtitle>
                      Aktivitas Pembeli
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item href="/activity/seller">
                    <v-list-item-subtitle>
                      Aktivitas Penjual
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <!-- <v-tabs
              v-model="tab"
              grow
              slider-color="teal"
              @change="content = false"
            >
              <v-tab class="text-caption">Penjualan</v-tab>
              <v-tab class="text-caption">Aktivitas</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-row no-gutters>
                  <v-col cols="6">
                    <v-list dense>
                      <v-list-item
                        to="/garasi/add-unit"
                        @click="content = true"
                      >
                        <v-list-item-subtitle>Tambah Unit</v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item
                        href="/garasi/manage-unit"
                        @click="content = true"
                      >
                        <v-list-item-subtitle>Garasi</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-col>

                  <v-col cols="6">
                    <v-list dense>
                      <v-list-item to="/toko/add-ads" @click="content = true">
                        <v-list-item-subtitle
                          >Tambah Iklan</v-list-item-subtitle
                        >
                      </v-list-item>

                      <v-list-item
                        href="/toko/manage-ads"
                        @click="content = true"
                      >
                        <v-list-item-subtitle
                          >Daftar Iklan</v-list-item-subtitle
                        >
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-tab-item>

              <v-tab-item>
                <v-row no-gutters>
                  <v-col cols="6">
                    <v-list dense>
                      <v-list-item
                        href="/activity/buyer"
                        @click="content = true"
                      >
                        <v-list-item-subtitle>Pembeli</v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item
                        href="/activity/seller"
                        @click="content = true"
                      >
                        <v-list-item-subtitle>Penjual</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-col>

                  <v-col cols="6">
                    <v-list dense>
                      <v-list-item
                        href="/product/review"
                        @click="content = true"
                      >
                        <v-list-item-subtitle>Ulasan</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items> -->

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="red" dark small @click="signOut">
                <v-icon left>mdi-logout</v-icon>Keluar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <alert />

    <keep-alive>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialogbottom-transition"
        persistent
      >
        <component
          :is="currentComponent"
          :utc="utc"
          :timezone="waktu"
          @closed="setDialogStatus"
        ></component>
      </v-dialog>
    </keep-alive>

    <v-main>
      <v-container fluid>
        <v-slide-y-transition>
          <router-view :utc="utc" :timezone="waktu"></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>

    <v-footer>
      <Footer />
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
import VueGeolocation from "vue-browser-geolocation";
import "firebase/firestore";
import { db } from "./main";
import Vue from "vue";

Vue.use(VueGeolocation);

export default {
  name: "App",
  components: {
    Alert: () =>
      import(/* webpackChunkName: "alert" */ "@/components/Alert.vue"),
    Search: () =>
      import(/* webpackChunkName: "search" */ "@/components/Search.vue"),
    Login: () =>
      import(/* webpackChunkName: "login" */ "@/components/Login.vue"),
    Daftar: () =>
      import(/* webpackChunkName: "daftar" */ "@/components/Daftar.vue"),
    Footer: () =>
      import(/* webpackChunkName: "footer" */ "@/components/Footer.vue"),
  },
  data: () => ({
    countNotif: 0,
    chats: [],
    review: [],
    buyerOrders: {
      menunggu_persetujuan: 0,
      menunggu_pembayaran: 0,
      menunggu_verifikasi: 0,
    },
    sellerOrders: {
      menunggu_persetujuan: 0,
      menunggu_pembayaran: 0,
      menunggu_verifikasi: 0,
    },
    ticketOrders: {
      menunggu_pembayaran: 0,
      menunggu_verifikasi: 0,
    },
    content: false,
    tab: 0,
    tab2: 0,
    utc: moment().utcOffset() / 60 - 7,
    waktu: "",
    notif: "",
    now: new Date(),
    aa: []
  }),
  methods: {
    ...mapActions({
      setAuth: "auth/set",
      setToken: "auth/SET_TOKEN",
      setAlert: "alert/set",
      setDialogStatus: "dialog/setStatus",
      setDialogComponent: "dialog/setComponent",
      setAds: "ads/setAds",
    }),
    timezone() {
      if (this.utc == 0) {
        this.waktu = "WIB";
      }
      if (this.utc == 1) {
        this.waktu = "WITA";
      }
      if (this.utc == 2) {
        this.waktu = "WIT";
      }
    },
    oneSignal() {
      let OneSignal = window.OneSignal || [];

      OneSignal.push(() => {
        OneSignal.init({
          appId: "9af3274a-447f-482f-bca6-ec68dc143418",
          notifyButton: {
            enable: true,
          },
        });

        OneSignal.on("subscriptionChange", (isSubscribed) => {
          console.log("The user's subscription state is now:", isSubscribed);
          if (isSubscribed) {
            window.location.href = "/";
          }
        });

        OneSignal.getUserId().then((userId) => {
          console.log("OneSignal User ID:", userId);
          this.notif = userId + "[web]";
        });
      });
    },
    geolocation() {
      this.$getLocation({
        enableHighAccuracy: true,
      });
    },
    getNotif() {
      this.axios
        .get("/log/v3/log/notifikasi", {
          params: {
            id_user: this.user.id,
            is_read: false,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.countNotif = data.count;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getChats() {
      db.collection("chat")
        .doc(String(this.user.id))
        .collection("user_messages")
        .where("Seen", "==", false)
        .onSnapshot((querySnapshot) => {
          let messages = [];
          querySnapshot.forEach((doc) => {
            messages.push(doc.data());
          });
          this.chats = messages;
        });
    },
    getReview() {
      this.axios
        .get("/transaksi/v3/belum_review", {
          params: {
            id_pembeli: this.user.id,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.review = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    menungguPersetujuanB() {
      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_pembeli: this.user.id,
            id_mst_order_jenis_iklan: 2,
            id_mst_pembayaran_status: 10,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.buyerOrders.menunggu_persetujuan = data.count;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    menungguPembayaranB() {
      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_pembeli: this.user.id,
            id_mst_order_jenis_iklan: 2,
            id_mst_pembayaran_status: 1,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.buyerOrders.menunggu_pembayaran = data.count;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    menungguVerifikasiB() {
      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_pembeli: this.user.id,
            id_mst_order_jenis_iklan: 2,
            id_mst_pembayaran_status: 4,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.buyerOrders.menunggu_verifikasi = data.count;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    menungguPersetujuanS() {
      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_penjual: this.user.id,
            id_mst_order_jenis_iklan: 2,
            id_mst_pembayaran_status: 10,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.sellerOrders.menunggu_persetujuan = data.count;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    menungguPembayaranS() {
      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_penjual: this.user.id,
            id_mst_order_jenis_iklan: 2,
            id_mst_pembayaran_status: 1,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.sellerOrders.menunggu_pembayaran = data.count;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    menungguVerifikasiS() {
      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_penjual: this.user.id,
            id_mst_order_jenis_iklan: 2,
            id_mst_pembayaran_status: 4,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.sellerOrders.menunggu_verifikasi = data.count;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    menungguPembayaranT() {
      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_pembeli: this.user.id,
            id_mst_order_jenis_iklan: 1,
            id_mst_pembayaran_status: 1,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.ticketOrders.menunggu_pembayaran = data.count;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    menungguVerifikasiT() {
      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_pembeli: this.user.id,
            id_mst_order_jenis_iklan: 1,
            id_mst_pembayaran_status: 4,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.ticketOrders.menunggu_verifikasi = data.count;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    signOut(e) {
      var r = confirm("Apakah anda yakin akan keluar?");
      if (r == true) {
        this.drawer = false;
        e.stopPropagation();
        this.setAuth(null);
        this.setToken(null);
        window.localStorage.setItem("user", null);
        window.localStorage.setItem("token", null);
        this.setAlert({
          status: true,
          color: "success",
          text: "Logout successfully",
        });
        window.location.href = "/";
        // this.countNotif = [];
      }
    },
    async getBid() {
      await db.collection("tawar_bersama")
        .doc("iklan")
        .collection("5323")
        .onSnapshot((querySnapshot) => {
          let a = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            a.push(doc.data());
          });
          this.aa = a;
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      guest: "auth/guest",
      dialogStatus: "dialog/status",
      currentComponent: "dialog/component",
      adsID: "ads/adsID",
    }),
    isHome() {
      return this.$route.path === "/";
    },
    dialog: {
      get() {
        return this.dialogStatus;
      },
      set(value) {
        this.setDialogStatus(value);
      },
    },
    breakpoint: {
      get() {
        return this.$vuetify.breakpoint;
      },
    },
  },
  async created() {
    this.timezone();
    this.oneSignal();
    this.geolocation();
    await this.getBid()
    if (!this.guest) {
      this.getNotif();
      this.getChats();
      this.getReview();
      this.menungguPersetujuanB();
      this.menungguPembayaranB();
      this.menungguVerifikasiB();
      this.menungguPersetujuanS();
      this.menungguPembayaranS();
      this.menungguVerifikasiS();
      this.menungguPembayaranT();
      this.menungguVerifikasiT();

      if (this.now.getTime() > this.user.expiry) {
        this.setAuth(null);
        this.setToken(null);
        window.localStorage.setItem("user", null);
        window.localStorage.setItem("token", null);
        window.location.href = "/";
      }
    }
  },
};
</script>

<style scooped>
a:link,
a:visited {
  color: teal;
  text-decoration: none;
}
</style>