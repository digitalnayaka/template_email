<template>
  <v-card>
    <v-container fluid>
      <div v-if="countCart === 0">
        <v-alert outlined color="warning" icon="mdi-cart-off"
          >Anda belum memilih tiket!</v-alert
        >
      </div>

      <v-list v-if="countCart > 0">
        <template v-for="(item, index) in carts">
          <v-list-item :key="'cart' + index">
            <v-list-item-avatar tile size="80">
               <v-img src="/img/icons/ic_tiket.webp"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.judul }}</v-list-item-title>
              <v-list-item-subtitle
                >Jumlah: {{ item.qty }} Tiket</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text>Harga Satuan</v-list-item-action-text>
              Rp {{ Number(item.price).toLocaleString("id-ID") }}
            </v-list-item-action>

            <!-- <v-list-item-content>
              <v-list-item-title>Quantity</v-list-item-title>
              <v-list-item-subtitle>
                <span style="float:right">
                  <v-btn icon small rounded depressed @click.stop="removeCart(item)">
                    <v-icon dark color="error">mdi-minus-circle</v-icon>
                  </v-btn>
                  {{ item.quantity }}
                  <v-btn icon small rounded depressed @click.stop="addCart(item)">
                    <v-icon dark color="success">mdi-plus-circle</v-icon>
                  </v-btn>
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>-->
          </v-list-item>
        </template>
      </v-list>

      <v-card>
        <v-card-text>
          <v-layout wrap>
            <v-flex pa-1 xs6>
              Total Harga* ({{ totalQuantity }} items)
              <br />
              <span class="title"
                >Rp. {{ totalPrice.toLocaleString("id-ID") }}</span
              >
            </v-flex>

            <v-flex pa-1 xs6 text-right align-self-center>
              <v-btn
                dark
                color="#22939E"
                @click="dialog = true"
                :loading="loading"
                :disabled="totalQuantity == 0"
              >
                <v-icon>mdi-cart-arrow-right</v-icon>&nbsp; Dapatkan
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>

      <div class="ma-2">
        <!-- <div class="red--text">
          (*Total harga akan ditambah 3 digit angka unik. Lakukan pembayaran
          sesuai dengan nominal yang tertera.)
        </div> -->

        <div>
          Setelah Anda melakukan konfirmasi pembayaran, tiket Anda akan masuk dalam waktu
          2x24 jam.
        </div>
      </div>

      <v-dialog v-model="dialog" width="500" persistent>
        <v-card>
          <v-container fluid
            ><h3>Dapatkan Tiket Tawar Bersama</h3>
            <v-card-subtitle class="font-weight-bold red--text" >
              Masa berlaku tiket adalah 3 bulan dari tanggal pembelian tiket.
            </v-card-subtitle>
            <v-card-text>Apakah Anda yakin membeli paket ini?</v-card-text>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text dark @click="dialog = false">Batalkan</v-btn>
            <v-btn color="#22939E" text dark @click="buy" :loading="loading"
              >Lanjutkan</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "cart",
  data() {
    return {
      loader: null,
      loading: false,
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      carts: "cart/carts",
      countCart: "cart/count",
      totalPrice: "cart/totalPrice",
      totalQuantity: "cart/totalQuantity",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      addCart: "cart/add",
      removeCart: "cart/remove",
      setCart: "cart/set",
    }),
    buy() {
      this.loader = "loading";

      let formData = new FormData();

      formData.append("jumlah", this.carts[0].qty);
      formData.append("id_mst_pembayaran_metode", 1);
      formData.append("id_pembeli", this.user.id);
      formData.append("id_iklan", this.carts[0].id);

      this.axios
        .post("/transaksi/v3/order_tiket", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.setCart([]);
          this.$router.push({ path: "/upload-bukti/" + data.data.id });
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
    checkout() {
      this.close();
      this.$router.push({ path: "/checkout" });
    },
    close() {
      this.$emit("closed", false);
      this.setCart([]);
    },
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