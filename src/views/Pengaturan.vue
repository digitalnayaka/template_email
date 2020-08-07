<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- <div align="center">
      <h1>Pengaturan</h1>
    </div>
    <v-card :to="'/rekening/' " flat align="center" class="d-inline-block mx-auto">
      <v-list-item-title class="font-weight-bold">
        <v-btn icon>
          <v-icon>mdi-credit-card-outline</v-icon>
        </v-btn>Rekening Bank
      </v-list-item-title>
      <v-list-item-subtitle>Daftar rekening bank Anda</v-list-item-subtitle>
    </v-card>

    <v-card :to="'/chat_otomatis' " flat align="center">
      <v-list-item-title class="font-weight-bold">
        <v-btn icon>
          <v-icon>mdi-chat-outline</v-icon>
        </v-btn>Pesan Otomatis
      </v-list-item-title>
      <v-list-item-subtitle>Atur fitur pesan otomatis Anda disini</v-list-item-subtitle>
    </v-card>
    <v-divider></v-divider> -->

    <div class="text-center">
      <div class="display-1 font-weight-bold">Pengaturan</div>
      <v-card align="center" :to="'/rekening/' " >
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-credit-card-outline</v-icon>Rekening Bank
              </v-list-item-title>

              <v-list-item-subtitle>Daftar rekening bank Anda</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
       <v-card align="center" :to="'/chat_otomatis'" >
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-chat-outline</v-icon>Pesan Otomatis
              </v-list-item-title>

              <v-list-item-subtitle>Atur fitur pesan otomatis Anda disini</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <div class="text-center">
      <div class="display-1 font-weight-bold">Lainnya</div>
      <v-card align="center" :to="'/bantuan' " >
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-ear-hearing</v-icon>Bantuan
              </v-list-item-title>

              <v-list-item-subtitle>Beri Pertanyaan Anda kepada kami</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
       <v-card align="center" :to="'/about' " >
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-clipboard-outline</v-icon>Tentang Aplikasi
              </v-list-item-title>

              <v-list-item-subtitle>Tahu lebih dalam tentang SiMotor</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>