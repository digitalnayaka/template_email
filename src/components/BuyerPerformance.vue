<template>
  <div>
    <v-row align="center" justify="space-around">
      <!-- <v-col cols="3" sm="3" align="center">
        <div v-if="user.id_type_pinalti !== 3">
          <v-img
            src="/img/icons/akun_blokir_gray.webp"
            width="35"
            contain
          ></v-img>
        </div>

        <div v-else>
          <v-img src="/img/icons/akun_blokir.webp" width="35" contain></v-img>
        </div>

        <h5>Akun diBlokir</h5>
      </v-col>

      <v-col cols="3" sm="3" align="center">
        <div v-if="user.id_type_pinalti == 2">
          <v-img
            src="/img/icons/akun_wanprestasi2.webp"
            width="35"
            contain
          ></v-img>
        </div>

        <div v-else>
          <v-img
            src="/img/icons/akun_wanprestasi2_gray.webp"
            width="35"
            contain
          ></v-img>
        </div>

        <h5>2 kali membatalkan transaksi</h5>
      </v-col>

      <v-col cols="3" sm="3" align="center">
        <div v-if="user.id_type_pinalti == 1">
          <v-img
            src="/img/icons/akun_wanprestasi1.webp"
            width="35"
            contain
          ></v-img>
        </div>

        <div v-else>
          <v-img
            src="/img/icons/akun_wanprestasi1_gray.webp"
            width="35"
            contain
          ></v-img>

          <h5>1 kali membatalkan transaksi</h5>
        </div>
      </v-col>

      <v-col cols="3" sm="3" align="center">
        <div v-if="user.id_type_pinalti !== 0">
          <v-img
            src="/img/icons/akun_aman_gray.webp"
            width="35"
            contain
          ></v-img>
        </div>

        <div v-else>
          <v-img src="/img/icons/akun_aman.webp" width="35" contain></v-img>
        </div>

        <h5>Tidak pernah membatalkan transaksi</h5>
      </v-col> -->

      <div>
        <v-card
          outlined
          class="rounded-lg"
          border="bottom"
          color="green"
          colored-border
          elevation="2"
          v-if="user.id_type_pinalti == 0"
        >
          <v-row>
            <v-col cols="12">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar size="40">
                    <v-img src="/img/icons/akun_aman.webp" contain></v-img>
                  </v-list-item-avatar>
                  <h2>Harap Diperhatikan!</h2>
                </v-list-item>

                <v-list-item>
                  <h4>
                    Akun Anda tidak pernah melakukan pembatalan transaksi.
                    Hindari pembatalan transaksi agar akun anda tidak diblokir
                  </h4>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>
                    Untuk informasi tentang kebijakan, silahkan kunjungi Bantuan
                    disini
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>

        <v-card
          outlined
          class="rounded-lg"
          border="bottom"
          color="deep-orange darken-4"
          colored-border
          elevation="2"
          v-if="user.id_type_pinalti == 1"
        >
          <v-row>
            <v-col cols="12">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar size="40">
                    <v-img
                      src="/img/icons/akun_wanprestasi1.webp"
                      contain
                    ></v-img>
                  </v-list-item-avatar>
                  <h2>Harap Diperhatikan!</h2>
                </v-list-item>

                <v-list-item>
                  <h4>
                    Anda telah melakukan 1x pembatalan transaksi. Hindari
                    melakukan pembatalan transaksi karena dapat mengakibatkan
                    Tiket anda hangus.
                  </h4>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>
                    Untuk informasi tentang kebijakan, silahkan kunjungi Bantuan
                    disini
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>

        <v-card
          outlined
          class="rounded-lg"
          border="bottom"
          color="deep-orange darken-4"
          colored-border
          elevation="2"
          v-if="user.id_type_pinalti == 2"
        >
          <v-row>
            <v-col cols="12">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar size="40">
                    <v-img
                      src="/img/icons/akun_wanprestasi2.webp"
                      contain
                    ></v-img>
                  </v-list-item-avatar>
                  <h2>Harap Diperhatikan!</h2>
                </v-list-item>

                <v-list-item>
                  <h4>
                    Anda telah melakukan 2x pembatalan transaksi. Hindari
                    melakukan pembatalan transaksi karena dapat mengakibatkan
                    akun anda di blokir selama 14 hari.
                  </h4>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>
                    Untuk informasi tentang kebijakan, silahkan kunjungi Bantuan
                    disini
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>

        <v-card
          outlined
          class="rounded-lg"
          border="bottom"
          color="red darken-4"
          colored-border
          elevation="2"
          v-if="user.id_type_pinalti == 3"
        >
          <v-row>
            <v-col cols="12">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar size="40">
                    <v-img src="/img/icons/akun_blokir.webp" contain></v-img>
                  </v-list-item-avatar>
                  <h2>Harap Diperhatikan!</h2>
                </v-list-item>

                <v-list-item>
                  <h4>
                    Anda telah melakukan 3x pembatalan transaksi yang
                    mengakibatkan akun anda di blokir selamanya.
                  </h4>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>
                    Untuk informasi tentang kebijakan, silahkan kunjungi Bantuan
                    disini
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-row>

    <v-row>
      <v-col cols="12">
        Keterangan:

        <ul class="red--text">
          <li>
            <strong> Melakukan 1x pembatalan transaksi </strong>
            <p>
              Anda melakukan pembatalan transaksi 1x yang mengakibatkan Tiket
              anda hangus
            </p>
          </li>

          <li>
            <strong> Melakukan 2x pembatalan transaksi </strong>
            <p>
              Anda melakukan pembatalan transaksi 2x yang mengakibatkan akun
              anda di blokir selama 14 hari
            </p>
          </li>

          <li>
            <strong> Melakukan 3x pembatalan transaksi </strong>
            <p>
              Anda melakukan pembatalan transaksi 3x yang mengakibatkan akun
              anda di blokir selamanya
            </p>
          </li>
        </ul>
      </v-col>

      <v-col cols="6" v-if="user.id_type_pinalti == 3">
        Masa blokir akun Anda berakhir pada:
        <flip-countdown deadline="2021-01-01 00:00:00"></flip-countdown>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FlipCountdown from "vue2-flip-countdown";

export default {
  name: "buyer-performance",
  props: ["user"],
  components: { FlipCountdown },
  data() {
    return {
      pengguna: [],
    };
  },
  methods: {
    getUsers() {
      this.axios
        .get("/user/v3/user", {
          params: {
            id: this.user.id,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.pengguna = data[0];
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
  created() {
    this.getUsers();
  },
};
</script>

<style>
</style>