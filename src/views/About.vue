<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <div class="display-1 font-weight-bold">Tentang Aplikasi</div>
      <div>Cari tahu lebih banyak tentang kami</div>

      <br />

      <v-card align="center" class="d-inline-block mx-auto">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-cellphone</v-icon>Versi Aplikasi
              </v-list-item-title>

              <v-list-item-subtitle>1.5.0</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item href="http://faq.simotor.id" target="_blank">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-comment-question-outline</v-icon>FAQ
              </v-list-item-title>

              <v-list-item-subtitle>Pertanyaan yang sering ada</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/syarat_ketentuan">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-clipboard-outline</v-icon>Ketentuan Penggunaan
              </v-list-item-title>

              <v-list-item-subtitle>Detail ketentuan penggunaan aplikasi SiMotor</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/larangan_iklan">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-alert</v-icon>Larangan Iklan
              </v-list-item-title>
              <v-list-item-subtitle>Detail informasi mengenai larangan iklan</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/kebijakan_privasi">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-bookmark-check-outline</v-icon>Kebijakan Privasi
              </v-list-item-title>

              <v-list-item-subtitle>Detail kebijakan privasi</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            href="https://www.youtube.com/channel/UCBExlB0xnMoTDT8LwVKg9oA"
            target="_blank"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-youtube-tv</v-icon>Video Tutorial
              </v-list-item-title>

              <v-list-item-subtitle>Video tutorial pemakaian aplikasi SiMotor</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/panduan_pembeli">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-help-circle-outline</v-icon>Panduan
              </v-list-item-title>

              <v-list-item-subtitle>Panduan pemakaian aplikasi SiMotor</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/kode_etik">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-check-decagram</v-icon>Kode Etik Pengguna
              </v-list-item-title>

              <v-list-item-subtitle>Informasi mengenai kode etik pengguna SiMotor</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>