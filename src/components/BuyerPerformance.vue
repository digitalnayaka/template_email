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
          flat
          height="100%"
          color="green lighten-5"
          v-if="user.id_type_pinalti == 0"
        >
          <v-container fluid>
            <v-layout column>
              <v-flex
                ><v-list-item-avatar size="40">
                  <v-img src="/img/icons/akun_aman.webp" contain></v-img>
                </v-list-item-avatar>
                Harap Diperhatikan!</v-flex
              >
              <v-flex>
                <h4>
                  Akun Anda tidak pernah melakukan pembatalan transaksi. Hindari
                  pembatalan transaksi agar akun anda tidak diblokir
                </h4>
              </v-flex>
              <br/>
              <v-flex xs2 class="subtitle">
                <h5>
                  Untuk informasi tentang kebijakan, silahkan kunjungi
                  <a href="/bantuan"> Bantuan disini </a>
                </h5>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card
          flat
          height="100%"
          color="red lighten-5"
          v-if="user.id_type_pinalti == 1"
        >
          <v-container fluid>
            <v-layout column>
              <v-flex
                ><v-list-item-avatar size="40">
                  <v-img
                    src="/img/icons/akun_wanprestasi1.webp"
                    contain
                  ></v-img>
                </v-list-item-avatar>
                Harap Diperhatikan!</v-flex
              >
              <v-flex>
                <h4>
                  Anda telah melakukan 1x pembatalan transaksi yang
                  mengakibatkan tiket anda hangus. Hindari melakukan pembatalan
                  transaksi agar akun Anda tidak diblokir.
                </h4>
              </v-flex>
               <br/>
              <v-flex xs2 class="subtitle">
                <h5>
                  Untuk informasi tentang kebijakan, silahkan kunjungi
                  <a href="/bantuan"> Bantuan disini </a>
                </h5>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card
          flat
          height="100%"
          color="red lighten-5"
          v-if="user.id_type_pinalti == 2"
        >
          <v-container fluid>
            <v-layout column>
              <v-flex
                ><v-list-item-avatar size="40">
                  <v-img
                    src="/img/icons/akun_wanprestasi2.webp"
                    contain
                  ></v-img>
                </v-list-item-avatar>
                Harap Diperhatikan!</v-flex
              >
              <v-flex>
                <h4>
                  Anda telah melakukan 2x pembatalan transaksi yang
                  mengakibatkan akun anda tidak dapat mengikuti tawar bersama
                  selama 14 hari. Hindari melakukan pembatalan transaksi agar
                  akun Anda tidak diblokir.
                </h4>
                <v-col cols="12" v-if="user.id_type_pinalti == 2">
                  Masa blokir akun Anda berakhir pada:
                  <flip-countdown
                    deadline="2021-01-01 00:00:00"
                  ></flip-countdown>
                </v-col>
              </v-flex>
               <br/>
              <v-flex xs2 class="subtitle">
                <h5>
                  Untuk informasi tentang kebijakan, silahkan kunjungi
                  <a href="/bantuan"> Bantuan disini </a>
                </h5>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card
          flat
          height="100%"
          color="red lighten-5"
          v-if="user.id_type_pinalti == 3"
        >
          <v-container fluid>
            <v-layout column>
              <v-flex
                ><v-list-item-avatar size="40">
                  <v-img src="/img/icons/akun_blokir.webp" contain></v-img>
                </v-list-item-avatar>
                Harap Diperhatikan!</v-flex
              >
              <v-flex>
                <h4>
                  Anda telah melakukan 3x pembatalan transaksi yang
                  mengakibatkan akun anda di blokir selamanya.
                </h4>
              </v-flex>
               <br/>
              <v-flex xs2 class="subtitle">
                <h5>
                  Untuk informasi tentang kebijakan, silahkan kunjungi
                  <a href="/bantuan"> Bantuan disini </a>
                </h5>
              </v-flex>
            </v-layout>
          </v-container>
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
};
</script>

<style>
</style>