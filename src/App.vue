<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      width="270"
      src="/img/gradient2.png"
      height="100%"
      dark
    >
      <div class="pa-2" v-if="guest">
        <v-btn dark block color="teal" class="mb-1" @click="setDialogComponent('login')">
          <v-icon left>mdi-lock</v-icon>Masuk
        </v-btn>

        <v-btn block color="success" @click="setDialogComponent('daftar')">
          <v-icon left>mdi-account</v-icon>Daftar
        </v-btn>
      </div>

      <div v-else>
        <v-list dense>
          <v-list-item>
            <v-list-item-avatar size="80">
              <v-img src="/img/profile.png" contain v-if="user.photo == null"></v-img>
              <v-img :src="getImage(user.photo)" contain v-else></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ user.nama }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
      </div>

      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon left>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list-group v-for="item in menus" :key="item.id" :prepend-icon="item.module_icon" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.module_name"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="subItem in item.menu" :key="subItem.id" :to="subItem.menu_route">
          <v-list-item-content>
            <v-list-item-title v-text="subItem.menu_name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon left v-text="subItem.menu_icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <v-list>
        <v-list-item to="/report" v-if="!guest && user.id_mst_user_type != 1">
          <v-list-item-icon>
            <v-icon left>mdi-book-open-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Report</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append v-if="!guest">
        <div class="pa-2">
          <v-btn block color="red" dark @click="signOut">
            <v-icon left>mdi-lock</v-icon>Keluar
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <alert />

    <v-app-bar app color="teal" dark v-if="isHome">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-img src="img/logo-tulisan.png" width="150px" contain></v-img>
      </v-toolbar-title>

      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Cari"
        class="hidden-sm-and-down"
        @click="setDialogComponent('search')"
        contain
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

      <v-btn icon to="/notifikasi">
        <v-badge color="orange" overlap v-if="countNotif.length > 0">
          <template v-slot:badge>
            <span>{{ countNotif.length }}</span>
          </template>

          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
        <v-icon v-else>mdi-bell-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <keep-alive>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialogbottom-transition">
        <component :is="currentComponent" @closed="setDialogStatus"></component>
      </v-dialog>
    </keep-alive>

    <v-main>
      <v-container fluid>
        <v-slide-y-transition>
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
      import(/* webpackChunkName: "daftar" */ "@/components/Daftar.vue")
  },
  data: () => ({
    drawer: true,
    menus: [],
    countNotif: [],
    notif: ""
  }),
  methods: {
    ...mapActions({
      setAuth: "auth/set",
      setToken: "auth/SET_TOKEN",
      setAlert: "alert/set",
      setDialogStatus: "dialog/setStatus",
      setDialogComponent: "dialog/setComponent"
    }),
    getModules() {
      this.axios
        .get("/setup/v1/drawer", {
          params: {
            user_id: this.guest == true ? 0 : this.user.id
          }
        })
        .then(response => {
          let { data } = response.data;
          this.menus = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getNotif() {
      if (!this.guest) {
        this.axios
          .get("/log/v1/log/notifikasi", {
            params: {
              id_user: this.user.id,
              limit: 999
            }
          })
          .then(response => {
            let { data } = response.data;

            this.countNotif = [];

            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              if (element.is_read == false) {
                this.countNotif.push(element.id);
              }
            }
          })
          .catch(error => {
            let responses = error.response;
            let data = responses.data;
            this.setAlert({
              status: true,
              color: "error",
              text: data.api_message
            });
          });
      }
    },
    oneSignal() {
      let OneSignal = window.OneSignal || [];

      OneSignal.push(() => {
        OneSignal.init({
          appId: "9af3274a-447f-482f-bca6-ec68dc143418",
          subdomainName: "simotorweb.os.tc"
        });
      });

      OneSignal.push(() => {
        OneSignal.on("subscriptionChange", isSubscribed => {
          // console.log("The user's subscription state is now:", isSubscribed);
          if (isSubscribed) {
            this.$router.go("/");
          }
        });
      });
    },
    geolocation() {
      this.$getLocation({
        enableHighAccuracy: true
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
          text: "Logout successfully"
        });
        this.getModules();
        this.countNotif = [];
        this.$router.push({ path: "/" });
      }
    }
  },
  created() {
    this.getModules();
    this.oneSignal();
    this.geolocation();
    this.getNotif();

    let OneSignal = window.OneSignal || [];
    OneSignal.getUserId(userId => {
      console.log("OneSignal User ID: " + userId);
      if (userId != null) {
        this.notif = userId + "[web]";
      }
    });
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      guest: "auth/guest",
      dialogStatus: "dialog/status",
      currentComponent: "dialog/component"
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
      }
    }
  }
};
</script>

<style>
.a {
  color: black;
}
</style>