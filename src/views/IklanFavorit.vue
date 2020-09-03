<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card outlined tile class="ma-0">
      <v-container>
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-img
              height="300"
              width="300"
              align="center"
              src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
            ></v-img>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Judul</v-list-item-title>
                  <v-list-item-subtitle>Harga</v-list-item-subtitle>
                  <v-list-item-title>Rp.xxx.xxx</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-avatar size="16" item>
                      <v-img src="/img/verified.png" alt="verified"></v-img>
                    </v-avatar>nama_user
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>