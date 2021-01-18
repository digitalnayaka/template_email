<template>
  <div>
    <v-app-bar app color="#22939E" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <div>
        <v-btn icon to="/notifikasi" class="mr-0">
          <v-badge color="orange" overlap v-if="countNotif > 0">
            <template v-slot:badge>
              <span>{{ countNotif }}</span>
            </template>

            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
          <v-icon v-else>mdi-bell-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-chat-outline</v-icon>
        </v-btn>
        <v-btn icon to="/iklan_favorit">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

 
    <v-tabs v-model="tab" grow show-arrows dark background-color="blue accent-4">
      <v-tab>Pembeli</v-tab>
      <v-tab>Penjual</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-tabs v-model="subTab2" grow dark background-color="cyan darken-1">
          <v-tab>Semua</v-tab>
          <v-tab>Menunggu Konfirmasi</v-tab>
          <v-tab>Menunggu Pembayaran</v-tab>
          <v-tab-item>
            <div>
              <v-card flat>
                <h3 class="ma-2">test</h3>

                <v-card class="mx-2 mb-4">
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar rounded size="80">
                        <v-img src="/img/tiket.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Tiket Tawar Bersama</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-card>
            </div>
          </v-tab-item>

          <v-tab-item>
            <div>
              <v-card flat>
                <h3 class="ma-2">hadhajsd}</h3>

                <v-card class="mx-2 mb-4">ahahah</v-card>
              </v-card>
            </div>
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subTab: 0,
      subTab2: 0,
      group: [],
    };
  },
};
</script>