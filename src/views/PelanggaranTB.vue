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
            src="img/pelanggaran-tb.png"
            width="800"
            height="200"
            contain
          ></v-img>
          <br />
        </v-card>

        <v-card >
          <v-container fluid>
            <div class="row mb-5 layout justify-center">
              <div class="col-md-10 text-justify white-gradient">
                <p class="ml-2 ml-lg-2 font-weight-bold">
                  Untuk penjelasan mengenai Tawar Bersama
                  <a href="/tb-rules">Klik Disini</a>
                </p>

                <v-divider> </v-divider>
                <br />

                <div class="ml-3 ml-lg-3">
                  <p>
                    Berikut adalah peraturan mengenai tawar bersama untuk
                    penawar:
                  </p>
                  <p>
                    1. Maksimum pelanggaran penawar Tawar Bersama adalah 3
                    (tiga) kali.
                  </p>

                  <p>2. Penawar dianggap melanggar jika:</p>
                  <p class="ml-4 ml-lg-4">
                    a. Saat penawar/pengguna memenangkan Iklan Tawar Bersama,
                    penawar/pengguna membatalkan transaksi pembelian Tawar
                    Bersama di aplikasi SiMotor.
                  </p>
                  <p class="ml-4 ml-lg-4">
                    b. Saat penawar/pengguna memenangkan Iklan Tawar Bersama dan
                    sudah disetujui oleh penjual namun tidak melakukan transaksi
                    pembayaran di aplikasi SiMotor hingga batas waktu yang telah
                    ditentukan.
                  </p>
                  <p>3. Akibat dari pelanggaran:</p>
                  <p class="ml-4 ml-lg-4 font-weight-bold">
                    a. 1 (satu) kali pelanggaran:
                  </p>
                  <p class="ml-4 ml-lg-4">
                    Tiket Anda hangus (*jika Iklan Tawar Bersama menggunakan
                    tiket)
                  </p>
                  <p class="ml-4 ml-lg-4 font-weight-bold">
                    b. 2 (dua) kali pelanggaran:
                  </p>

                  <p class="ml-4 ml-lg-4">
                    Tiket Anda hangus (*jika Iklan Tawar Bersama menggunakan
                    tiket) dan akun Anda akan dibekukan selama 2 (dua) minggu
                    yang mengakibatkan akun Anda tidak dapat mengikuti Tawar
                    Bersama selama waktu tersebut, namun masih dapat masuk ke
                    aplikasi SiMotor.
                  </p>
                  <p class="ml-4 ml-lg-4 font-weight-bold">
                    c. 3 (tiga) kali pelanggaran:
                  </p>
                  <p class="ml-4 ml-lg-4">
                    Tiket Anda hangus (*jika Iklan Tawar Bersama menggunakan
                    tiket) dan akun anda diblokir secara permanen yang
                    mengakibatkan akun Anda tidak dapat mengakses SiMotor hingga
                    ada ketentuan baru.
                  </p>
                  
                </div>
              </div>
            </div>
          </v-container>
        </v-card>
      </v-card>
    </div>
  </div>
</template>