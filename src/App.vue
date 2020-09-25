<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      color="teal"
      dark
      v-if="$vuetify.breakpoint.smAndUp || isHome"
    >
      <v-toolbar-title style="width: 230px" class="ml-0 pl-4">
        <a href="/">
          <v-img src="/img/logo-tulisan.png" width="200" contain></v-img>
        </a>
      </v-toolbar-title>

      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
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
        <!-- <v-btn icon>
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn> -->

        <v-btn icon to="/notification">
          <v-badge color="orange" overlap v-if="countNotif > 0">
            <template v-slot:badge>
              <span>{{ countNotif }}</span>
            </template>

            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
          <v-icon v-else>mdi-bell-outline</v-icon>
        </v-btn>

        <v-menu
          :open-on-hover="$vuetify.breakpoint.xsOnly ? false : true"
          :close-on-content-click="content"
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn large text v-bind="attrs" v-on="on">
              <v-avatar size="32px" item>
                <v-img :src="getImage(user.photo)" alt="Avatar"></v-img>
              </v-avatar>
              <span class="text-caption mx-2">{{
                user.nama.split(" ", 1)[0]
              }}</span>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item to="/account/edit">
                <v-list-item-avatar>
                  <v-img :src="getImage(user.photo)" alt="Avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ user.nama }}</v-list-item-title>
                  <v-list-item-subtitle v-if="user.id_mst_user_type == 2"
                    >{{ user.user_type }} User</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-tabs
              v-model="tab"
              grow
              slider-color="teal"
              @change="content = false"
            >
              <v-tab class="text-caption">Toko</v-tab>
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
                        to="/garasi/manage-unit"
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
                        to="/toko/manage-ads"
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
            </v-tabs-items>

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

    <v-btn bottom color="white" dark fab fixed right to="/bantuan">
      <v-img
        to="/bantuan"
        src="/img/icons/ic_bantuan.png"
        width="50"
        height="50"
        contain
      ></v-img>
    </v-btn>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
import VueGeolocation from "vue-browser-geolocation";
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
  },
  data: () => ({
    countNotif: 0,
    content: false,
    tab: 0,
    utc: moment().utcOffset() / 60 - 7,
    waktu: "",
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
    geolocation() {
      this.$getLocation({
        enableHighAccuracy: true,
      });
    },
    getNotif() {
      if (!this.guest) {
        this.axios
          .get("/log/v3/log/notifikasi", {
            params: {
              id_user: this.user.id,
              is_read: false,
              limit: 1,
            },
          })
          .then((response) => {
            let { data } = response;
            this.countNotif = data.count;
          })
          .catch((error) => {
            let responses = error.response;
            let data = responses.data;
            this.setAlert({
              status: true,
              color: "error",
              text: data.api_message,
            });
          });
      }
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
        this.countNotif = [];
      }
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
  created() {
    this.timezone();
    this.geolocation();
    this.getNotif();
  },
};
</script>