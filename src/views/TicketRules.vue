<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

   <div class="text-center">
      <v-card class="d-inline-block mx-auto" align="center">
        <v-card color="#576A88">
          <br />
          <v-img
            src="img/ticket_rules.png"
            width="800"
            height="200"
            contain
          ></v-img>
          <br />
        </v-card>

        <v-card>
          <v-container fluid>
            <div class="row mb-5 layout justify-center">
              <div class="col-md-10 text-justify white-gradient">
                <p class="font-weight-bold">Pengertian Umum</p>
                <p class="ml-2 ml-lg-2">
                  a. Tiket digunakan sebagai deposit yang dapat Anda tarik
                  kembali (refund).
                </p>
                <p class="ml-2 ml-lg-2">
                  b. Masa kadaluarsa setiap tiket adalah 3 bulan sejak pembelian
                  tiket dikonfirmasi oleh SiMotor.
                </p>
                <p class="ml-2 ml-lg-2">
                  c. Kami sarankan untuk tarik kembali (refund) tiket yang
                  tersedia sebelum mendekati tanggal kadaluarsa.
                </p>
                <p class="ml-2 ml-lg-2">
                  d. Pengajuan tiket atau kepemilikan tiket maksimal adalah 20
                  tiket per akun (total dari tiket tersedia, terpakai dan
                  refund)
                </p>

                <p class="ml-2 ml-lg-2">
                  e. Tiket yang disetujui oleh SiMotor sesuai dengan sisa kuota
                  yang ada di akun Anda.
                </p>
                <p class="ml-2 ml-lg-2 font-weight-bold">
                  Pengertian Pembagian Status Tiket:
                </p>
                <p class="ml-3 ml-lg-3 font-weight-bold">1. Tersedia</p>

                <p class="ml-3 ml-lg-3">
                  Jumlah tiket yang belum terpakai dan dapat digunakan untuk
                  mengikuti Iklan Tawar Bersama yang membutuhkan tiket.
                  (*Pastikan tanggal kadaluarsa tiket tidak melebihi tanggal
                  berakhir Iklan Tawar Bersama)
                </p>
                <p class="ml-3 ml-lg-3 font-weight-bold">2. Terpakai</p>
                <p class="ml-3 ml-lg-3">
                  Jumlah tiket yang digunakan untuk Iklan Tawar Bersama.
                </p>
                <p class="ml-3 ml-lg-3 font-weight-bold">3. Refund</p>
                <p class="ml-3 ml-lg-3">
                  Jumlah tiket yang sudah ditarik kembali oleh pengguna
                  (*permohonan menunggu pembayaran oleh SiMotor)
                </p>
                <p class="ml-3 ml-lg-3 font-weight-bold">4. Hangus</p>
                <p class="ml-3 ml-lg-3">
                  Jumlah tiket yang tidak berlaku lagi dikarenakan melakukan
                  wanprestasi/pembatalan pembelian. Deposit yang disetorkan
                  tidak dapat ditarik kembali.
                </p>
                <p class="ml-3 ml-lg-3 font-weight-bold">5. Expired</p>
                <p class="ml-3 ml-lg-3">
                  Jumlah tiket yang tidak berlaku lagi dikarenakan melewati
                  tanggal kedaluarsa. Deposit yang disetorkan tidak dapat
                  ditarik Kembali.
                </p>

               
              </div>
            </div>
          </v-container>
        </v-card>
      </v-card>
   </div>
  </div>
</template>