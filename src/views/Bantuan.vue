<template>
  <div>
    <v-app-bar app color="teal" dark>
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

              <v-list-item-subtitle>(021)-30490087</v-list-item-subtitle>
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

              <v-list-item-subtitle>Menara Kirana 2 Lantai 10 A, Jl. Boulevard Timur No.88 Pegangsaan 2, Kelapa Gading, Jakarta Utara</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>