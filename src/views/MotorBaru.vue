<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <h2>Motor Baru</h2>

      <h3>Untuk sementara fitur berikut belum tersedia</h3>

      <v-card class="d-inline-block mx-auto">
        <v-img src="/img/icons/banner iklan favorit.png"></v-img>
      </v-card>
    </div>
  </div>
</template>