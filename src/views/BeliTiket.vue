<template>
  <div>
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

    <div align="center">
      <h1>Beli Tiket Tawar Bersama</h1>
      <p>Paket Tiket</p>
    </div>

    <!-- <div class="text-center">
      <v-card class="d-inline-block mx-auto">
        <v-container fluid>
          <v-row justify="space-between">
            <v-col cols="auto">
              <v-img height="200" width="200" src="/img/tiket.png"></v-img>
            </v-col>

            <v-col cols="auto" class="text-center pl-0">
              <v-row class="flex-column ma-0">
                <v-col class="px-0">
                  <v-form ref="form" v-model="valid">
                    <v-text-field
                      outlined
                      dense
                      label="Jumlah Pembelian"
                      suffix="Tiket"
                      v-model="qty"
                      v-mask="mask"
                      @keyup="totalHarga"
                      :rules=" [v => !!v || 'Field is required',v => (v && v > 0) || 'Tidak boleh 0']"
                    ></v-text-field>
                  </v-form>
                </v-col>

                <v-col class="px-0">
                  <v-btn class="mx-2" @click="plus(1)">1 Tiket</v-btn>
                  <v-btn class="mx-2" @click="plus(5)">5 Tiket</v-btn>
                  <v-btn class="mx-2" @click="plus(10)">10 Tiket</v-btn>
                </v-col>

                <v-col class="px-0">
                  <v-text-field
                    outlined
                    dense
                    readonly
                    hide-details
                    label="Total Harga"
                    v-model="total"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <div>Setelah anda melakukan pembelian tiket, tiket anda akan masuk dalam waktu maksimal 2x24Jam</div>

          <v-btn block color="primary" @click="storeItem" :loading="loading" :disabled="!valid">Beli Tiket</v-btn>
        </v-container>
      </v-card>
    </div>-->

    <div class="text-center">
      <v-card class="d-inline-block mx-auto" flat>
        <v-card v-for="item in bundles" :key="item.id" class="my-2" @click="addItem(item)">
          <v-list dense>
            <v-list-item>
              <v-list-item-avatar tile size="80">
                <v-img src="/img/tiket.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.judul }}</v-list-item-title>
                <v-list-item-subtitle>Jumlah: {{ item.quantity }} Tiket</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>Harga</v-list-item-title>
                <v-list-item-subtitle>Rp {{ Number(item.total).toLocaleString("id-ID") }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-card>
    </div>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialogbottom-transition"
      persistent
    >
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Your Shopping Cart!</v-toolbar-title>
      </v-toolbar>

      <cart />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mask } from "vue-the-mask";

export default {
  name: "BeliTiket",
  components: {
    Cart: () => import(/* webpackChunkName: "cart" */ "@/components/Cart.vue"),
  },
  directives: { mask },
  data() {
    return {
      qty: 1,
      harga: 0,
      total: 0,
      mask: "###",
      loader: null,
      loading: false,
      valid: true,
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
    plus(qty) {
      this.qty = Number(this.qty) + qty;
      this.totalHarga();
    },
    totalHarga() {
      this.total =
        "Rp " + Number(this.qty * this.harga).toLocaleString("id-ID");
    },
    storeItem() {
      this.loader = "loading";

      let formData = new FormData();

      formData.append("jumlah", this.qty);
      formData.append("id_mst_pembayaran_metode", 1);
      formData.append("id_pembeli", this.user.id);

      this.axios
        .post("/transaksi/v1/order_tiket", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.$router.push({ path: "/upload_bukti/" + data.data.id });
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    bundleTiket() {
      this.axios
        .get("/iklan/v1/iklan_tiket", {
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
  created() {
    this.bundleTiket();
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      countCart: "cart/count",
    }),
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>