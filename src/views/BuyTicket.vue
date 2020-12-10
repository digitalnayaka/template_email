<template>
  <v-container fluid>
    <div class="d-flex d-sm-none">
      <v-app-bar app color="teal" dark>
        <v-btn icon @click.stop="$router.go(-1)">
          <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="dialog = true">
          <v-badge color="orange" overlap v-if="countCart > 0">
            <template v-slot:badge>
              <span>{{ countCart }}</span>
            </template>

            <v-icon>mdi-cart</v-icon>
          </v-badge>

          <v-icon v-else>mdi-cart</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
  
    <div align="center">
      
      <div class="text-h5 text-sm-h4">Dapatkan Tiket Tawar Bersama</div>
      <div>Silahkan pilih paket yang tersedia</div>
    </div>

    <v-row>
      <v-col cols="12" sm="4" v-for="item in bundles" :key="item.id">
        <v-card @click="addItem(item)">
          <v-list>
            <v-list-item>
              <v-list-item-avatar tile size="80">
                <v-img src="/img/icons/ic_tiket.webp"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.judul }}</v-list-item-title>
                <v-list-item-subtitle
                  >Jumlah: {{ item.quantity }} Tiket</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text>Harga</v-list-item-action-text>
                Rp {{ Number(item.harga).toLocaleString("id-ID") }} /Tiket
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-btn block color="teal" dark>Pilih</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialogbottom-transition"
      persistent
    >
      <v-toolbar dark color="teal">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Pembelian Tiket</v-toolbar-title>
      </v-toolbar>

      <cart />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BeliTiket",
  components: {
    Cart: () => import(/* webpackChunkName: "cart" */ "@/components/Cart.vue"),
  },
  data() {
    return {
      bundles: [],
      dialog: false,
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      addCart: "cart/add",
      setCart: "cart/set",
    }),
    bundleTiket() {
      this.axios
        .get("/iklan/v3/iklan_tiket", {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.bundles = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    addItem(item) {
      this.addCart(item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.setCart([]);
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      countCart: "cart/count",
    }),
  },
  created() {
    this.bundleTiket();
  },
};
</script>