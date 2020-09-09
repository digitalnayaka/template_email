<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon class="mx-2" v-on="on" :to="'/edit_profile/' ">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>
      </v-btn>

      <v-btn icon>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon class="mx-2" v-on="on" :to="'/pengaturan/' ">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <span>Pengaturan</span>
        </v-tooltip>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <v-card class="d-inline-block mx-auto" width="1000">
        <v-avatar size="80">
          <v-img src="/img/profile.png" alt="profile"></v-img>
        </v-avatar>

        <div class="d-flex justify-center">
          <span>
            <v-img src="/img/verified.png" width="20" height="20" contain></v-img>
          </span>
          {{ user.nama }}
        </div>
        <div class="d-flex justify-center">
          <span>
            <v-img src="/img/icons/hubungi.png" width="30" height="30" contain></v-img>
          </span>
          <div>{{ user.nomor_hp }}</div>
        </div>
        <div class="d-flex justify-center">
          <span>
            <v-img src="/img/icons/icon_lokasi.png" width="25" height="25" contain></v-img>
          </span>
          <div>{{ user.kota }}</div>
        </div>

        <div class="text-center">
          <v-card rounded="xl" to="/category/tiket" class="d-inline-block mx-auto" width="1000">
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <!-- <span>
                    <v-img src="/img/icons/info_penjual.png" width="30" height="30" contain></v-img>
                  </span> deskripsi
                  <div>{{user.deskripsi}}</div>-->
                  <div class="d-flex justify-center">
                    <span>
                      <v-img src="/img/icons/info_penjual.png" width="30" height="30" contain></v-img>
                    </span>
                    Deskripsi:
                    <br />
                    {{user.deskripsi}}
                  </div>
                </v-list-item-content>

                <v-list-item-avatar tile size="80">
                  <v-img src="/img/tiket.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="text-h6">{{ tiket.tersedia }}</v-list-item-title>
                  <v-list-item-subtitle class="text-h6">Tersedia</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </div>

        <v-tabs v-model="tab" background-color="transparent" center-active grow>
          <v-tab>Pembeli</v-tab>
          <v-tab>Penjual</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-list class="text-left">
              <v-list-item to="/iklan_favorit">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/ic_iklan_favorit.png"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Favorit</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item to="/tawar_bersama">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/ic_iklan_diikuti.png"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Iklan Diikuti</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item to="/bantuan">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/ic_bantuan.png"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Bantuan</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <!-- <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Rekomendasi Untuk Anda</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>-->
            </v-list>
          </v-tab-item>

          <v-tab-item>
            <v-list class="text-left">
              <v-list-item to="/iklan">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/ic_iklan_garasi_anda.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Iklan Anda</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item to="/garasi">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/ic_iklan_garasi_anda.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Garasi Anda</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item to="/tambah-iklan">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/ic_tambah_iklan.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Tambah Iklan</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item to="/tambah-unit">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/ic_tambah_unit.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Tambah Unit</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item to="/bantuan">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/ic_bantuan.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Bantuan</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "account",
  data() {
    return {
      tiket: [],
      tab: 0,
    };
  },
  methods: {
    totalTiket() {
      this.axios
        .get("/tiket/v3/total_tiket", {
          params: {
            id_app_user: this.user.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.tiket = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
  },
  created() {
    this.totalTiket();
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>