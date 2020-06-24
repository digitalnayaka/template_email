<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <h1 align="center">Beli Tiket Tawar Bersama</h1>

    <div class="text-center">
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mask } from "vue-the-mask";

export default {
  name: "BeliTiket",
  directives: { mask },
  data() {
    return {
      qty: 1,
      harga: 0,
      total: 0,
      mask: "###",
      loader: null,
      loading: false,
      valid: true
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set"
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
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message
          });
          this.$router.push({ path: "/upload_bukti/" + data.data.id });
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses);
        });
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  created() {}
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