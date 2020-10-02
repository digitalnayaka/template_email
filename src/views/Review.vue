<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div>
      <div class="display-1 font-weight-bold text-center">Rating Anda</div>
      <div class="display-1 font-weight-bold text-center">
        4.5 / 5.0
        <v-icon>mdi-star-outline</v-icon>
      </div>
      <br />

      <v-card outlined width="500" height="200">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/profile.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>oleh: xxxx</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon>mdi-star-outline</v-icon>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item-content class="text-center">
            <v-row>
              <v-col cols="6">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-list-item-avatar tile size="100">
                      <v-img src="/img/vario.png"></v-img>
                    </v-list-item-avatar>
                  </v-list-item-title>
                  <v-list-item-title>28 sept 2020</v-list-item-title>
                </v-list-item-content>
              </v-col>

              <v-col cols="6">
                <v-list-item-title class="font-weight-bold">Judul Iklan</v-list-item-title>
                <v-list-item-subtitle>
                  Lorem Ipsum is simply dummy
                  text of the printing and typesetting....
                </v-list-item-subtitle>
                <v-btn outlined color="primary">balas</v-btn>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list>
      </v-card>
    </div>
  </div>
</template>