<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <div class="display-1 font-weight-bold">Bantuan</div>
      <div>Kami disini untuk membantu Anda menggunakan SiMotor dengan lebih baik.</div>
      <div>Kami aktif setiap hari Senin - Jumat, pukul 09.30 - 17.30</div>

      <br />

      <v-card align="center" class="d-inline-block mx-auto">
        <v-list>
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
          </v-list-item> <v-list-item to="/panduan_pembeli">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-help-circle-outline</v-icon>Panduan
              </v-list-item-title>

              <v-list-item-subtitle>Panduan pemakaian aplikasi SiMotor</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/chat/1">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-message-text</v-icon>Kirim Pesan
              </v-list-item-title>

              <v-list-item-subtitle>@SiMotor</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            href="mailto:support@simotor.id?subject=Pengaduan Customer SiMotor &body=Nama: "
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-email</v-icon>Kirim Email Anda
              </v-list-item-title>

              <v-list-item-subtitle>support@simotor.id</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item href="tel:02130490087">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-phone</v-icon>Telepon
              </v-list-item-title>

              <v-list-item-subtitle>(021)- 65835839</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item href="https://api.whatsapp.com/send?phone=628111873434">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-whatsapp</v-icon>Whatsapp
              </v-list-item-title>

              <v-list-item-subtitle>+628111873434</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-office-building</v-icon>Office
              </v-list-item-title>

              <v-list-item-subtitle>
                Ruko Sentra Komersil (Rsk) Blok 7/96 Grand Galaxy City, Kelurahan Jakasetia,
                Kecamatan Bekasi Selatan, Kota Bekasi, Jawa Barat
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>