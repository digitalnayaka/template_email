<template>
<nav>
  <v-container fluid>
    <div class="d-flex d-sm-none">
      <v-app-bar app color="teal" dark>
        <v-btn icon @click.stop="$router.go(-1)">
          <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
    </div>

    <v-navigation-drawer v-model="drawer" app clipped>
      <template v-slot:prepend>
        <v-list two-line>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="getImage(user.photo)" alt="Avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ user.nama }}</v-list-item-title>
              <v-list-item-subtitle v-if="user.id_mst_user_type == 2">{{ user.user_type }} User</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item-group v-model="menu" color="primary">
          <v-list-item to="/account/edit">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Profil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/chat-list">
            <v-list-item-icon>
              <v-icon>mdi-chat-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Chat</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.route">
            <v-list-item-content>
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-slide-y-transition>
      <router-view :utc="utc" :timezone="timezone"></router-view>
    </v-slide-y-transition>
  </v-container>
</nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "account",
  props: ["utc", "timezone"],
  data: () => ({
    drawer: true,
    menu: 0,
    items: [
      {
        icon: "mdi-garage",
        title: "Unit",
        items: [
          { title: "Tambah Unit", route: "/garasi/add-unit" },
          { title: "Daftar Unit", route: "/garasi/manage-unit" },
        ],
      },
      {
        icon: "mdi-store",
        title: "Iklan",
        items: [
          { title: "Tambah Iklan", route: "/toko/add-ads" },
          { title: "Daftar Iklan", route: "/toko/manage-ads" },
        ],
      },
      {
        icon: "mdi-clipboard-text",
        title: "Penjualan",
        items: [
          { title: "Informasi Penjual", route: "/toko/info" },
          { title: "List Penjualan", route: "/toko/add-ads" },
          { title: "Report", route: "/report" },
        ],
      },
      {
        icon: "mdi-emoticon",
        title: "Kata Pembeli",
        items: [
          { title: "Ulasan", route: "/toko/review" },
          { title: "Komplain", route: "/toko/manage-ads" },
        ],
      },
      {
        icon: "mdi-help",
        title: "Tentang SiMotor",
        items: [
          { title: "Tentang SiMotor", route: "/about" },
          { title: "Bantuan", route: "/bantuan" },
        ],
      },
    ],
  }),
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
  },
  created() {},
};
</script>

