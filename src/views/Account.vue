<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <div>
        <div>
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
        </div>
      </div>
    </v-app-bar>
    <v-row dense align="center">
      <v-col cols="12">
        <div class="text-center">
          <v-card class="d-inline-block" flat>
            <v-list dense>
              <v-list-item>
                <v-list-item-avatar tile size="80">
                  <v-img src="/img/profile.png" alt="verified"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    <v-list-item-avatar tile size="16">
                      <v-img src="/img/verified.png" alt="verified"></v-img>
                    </v-list-item-avatar>Nama
                  </v-list-item-title>
                  <v-list-item-subtitle>Nomor hp</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
        <div class="text-center">
          <v-card class="d-inline-block mx-auto" flat>
            <v-card :to="'/category/tiket' ">
              <v-list dense>
                <v-list-item>
                  <v-list-item-avatar tile size="80">
                    <v-img src="/img/tiket.png"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Jumlah</v-list-item-title>
                    <v-list-item-subtitle>Tersedia</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-tabs v-model="tab" background-color="transparent" center-active grow>
          <v-tab>Pembeli</v-tab>
          <v-tab>Penjual</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card :to="'/pengaturan/' ">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Favorit</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Iklan Diikuti</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
             <v-card :to="'/bantuan' ">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Bantuan</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
             <v-card >
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Rekomendasi Untuk Anda</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card :to="'/tambah-iklan' ">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Tambah Iklan</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
             <v-card :to="'/tambah-unit' ">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Tambah Unit</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
             <v-card :to="'/iklan' ">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Iklan Anda</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
              <v-card :to="'/garasi' ">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Garasi Anda</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
             <v-card :to="'/bantuan' ">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Bantuan</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "account",
  data() {
    return {
      appuser: [],
      id_app_user: this.$route.params.id,
      tab: 0,
    };
  },
  methods: {
    getUser() {
      this.axios
        .get("/user/v1/user", {
          params: {
            id: this.id_app_user,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.appuser = data[0];
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>