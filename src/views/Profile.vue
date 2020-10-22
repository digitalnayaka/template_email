<template>
  <v-card>
    <v-app-bar app color="teal" dark class="d-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-tabs v-model="tab" slider-color="teal" show-arrows>
      <v-tab>Biodata Diri</v-tab>
      <v-tab>Info Penjual</v-tab>
      <v-tab>Rekening Bank</v-tab>
      <v-tab>Pesan Otomatis</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="pa-4">
      <v-tab-item>
        <biodata-diri :user="user" />
      </v-tab-item>

      <v-tab-item>
        <info-penjual :user="user" />
      </v-tab-item>

      <v-tab-item>
        <rekening-bank :user="user" />
      </v-tab-item>

      <v-tab-item>
        <pesan-otomatis :user="user" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "profile",
  components: {
    BiodataDiri: () =>
      import(
        /* webpackChunkName: "biodata-diri" */ "@/components/BiodataDiri.vue"
      ),
    InfoPenjual: () =>
      import(
        /* webpackChunkName: "info-penjual" */ "@/components/InfoPenjual.vue"
      ),
    RekeningBank: () =>
      import(
        /* webpackChunkName: "rekening-bank" */ "@/components/RekeningBank.vue"
      ),
    PesanOtomatis: () =>
      import(
        /* webpackChunkName: "pesan-otomatis" */ "@/components/PesanOtomatis.vue"
      ),
  },
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

<style>
</style>