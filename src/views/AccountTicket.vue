<template>
  <v-card flat>
    <v-app-bar app color="#22939E" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-row>
      <v-col cols="12" sm="4">
        <v-card outlined align="center" class="mx-2">
          <v-img
            src="/img/icons/ic_tiket.png"
            width="100"
            height="100"
            contain
          ></v-img>

          <div class="font-weight-bold">(jumlah tiket) Tersedia</div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="8">
        <v-card outlined class="mx-2">
          <div class="d-flex align-center">
            <v-card-title>Pesanan Anda</v-card-title>

            <v-btn color="#0277BD" right text dark>
              Lihat Riwayat Pesanan
              <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
            </v-btn>
          </div>

          <div align="center">
            <v-row>
              <v-col cols="4">
                <v-icon>mdi-cart</v-icon>
              </v-col>

              <v-col cols="4">
                <v-icon>mdi-cart</v-icon>
              </v-col>

              <v-col cols="4">
                <v-icon>mdi-cart</v-icon>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">Status</v-col>
              <v-col cols="4">Status</v-col>
              <v-col cols="4">Status</v-col>
            </v-row>
          </div>
        </v-card>

        <v-card outlined class="ma-2">
          <div class="d-flex align-center">
            <v-card-title>Rating Anda adalah (jumlah)</v-card-title>

            <v-btn color="#0277BD" right text dark>
              Lihat Semua
              <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
            </v-btn>
          </div>

          <v-list-item-content class="text-center">
            <v-row>
              <v-col cols="4">Oleh : (nama_user)</v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-card-text>
                  ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                  porta tortor eget massa dignissim pulvinar. Fusce turpis eros,
                  congue ac pharetra quis, auctor in dolor. Duis a risus id nisl
                  ultrices pharetra non eget purus. Mauris vitae odio neque.
                  Aenean interdum massa in sem consequat, efficitur tempor
                  sapien facilisis. Vivamus fermentum ornare ante, a
                  sollicitudin metus mattis elementum. Donec tempus mi mauris,
                  nec dapibus ipsum posuere nec.
                </v-card-text>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "profile",
  data: () => ({
    tab: 0,
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  created() {},
};
</script>