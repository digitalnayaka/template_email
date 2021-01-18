<template>
  <div>
    <v-app-bar app color="#22939E" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <v-card class="d-inline-block" align="center">
        <v-card color="#576A88">
          <br />
          <v-img
            src="img/tb_rules.png"
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
                <p class="ml-2 ml-lg-2">
                  Tawar Bersama adalah fitur dimana pembeli dapat mengajukan
                  harga terhadap iklan yang tayang di SiMotor.
                </p>
                <h3 class="text-justify font-weight-bold ml-2 ml-lg-2">
                  Peraturan Pelanggaran Tawar Bersama ‘Untuk Penawar’
                  <a
                    href="/pelanggaran-tb"
                    >Klik Disini</a
                  >
                </h3>
                <v-divider> </v-divider>
                <br />

                <p class="ml-2 ml-lg-2 font-weight-bold">
                  Peraturan Tawar Bersama:
                </p>
                <div class="ml-3 ml-lg-3">
                  <p>
                    1. Iklan Tawar Bersama bisa mempersyaratkan penggunaan tiket
                    atau tanpa tiket.
                  </p>

                  <p>
                    2. Pada Iklan Tawar Bersama yang menggunakan tiket, jumlah
                    tiket dapat ditentukan oleh pemasang iklan.
                  </p>

                  <p>
                    3. Pada Iklan Tawar Bersama yang menggunakan tiket, ketika
                    calon penawar menyetujui mengikuti Tawar Bersama maka jumlah
                    tiket yang tersedia akan berkurang sesuai dengan yang
                    dipersyaratkan dalam Iklan Tawar Bersama meskipun belum
                    melakukan penawaran.
                  </p>

                  <p>
                    4. Calon penawar menawarkan harga di atas harga terakhir
                    pada iklan yang berlangsung.
                  </p>

                  <p>
                    5. Harga yang ditawarkan pada poin 3 mengikuti kelipatan
                    kenaikan harga yang diatur oleh pemasang iklan.
                  </p>
                  <p>
                    6. Calon pembeli yang berhak melakukan pembayaran terhadap
                    Iklan Tawar Bersama adalah yang penawaranya tertinggi pada
                    saat iklan berakhir.
                  </p>
                  <p>
                    7. Tiket yang terpakai dalam Iklan Tawar Bersama akan
                    dikembalikan jika calon pembeli bukan penawar tertinggi
                    ketika Iklan Tawar Bersama berakhir.
                  </p>
                  <p>
                    8. Penawar tertinggi harus menunggu persetujuan proses
                    selanjutnya dari pihak pemasang Iklan Tawar Bersama sebelum
                    bisa melakukan pembayaran.
                  </p>
                  <p>
                    9. Apabila pemasang Iklan Tawar Bersama tidak menyetujui
                    proses selanjutnya atau tidak konfirmasi sampai batas waktu
                    yang telah ditentukan, maka secara otomatis tiket akan
                    dikembalikan jika Iklan Tawar Bersama tersebut menggunakan
                    tiket.
                  </p>
                    <p>
                    10. Jika pemasang Iklan Tawar Bersama telah menyetujui proses pembayaran, maka penawar tertinggi harus melakukan pembayaran sesuai dengan nominal yang tertera pada form penawaran.
                  </p>
                    <p>
                    11.	Pembayaran dilakukan langsung ke rekening pemasang Iklan Tawar Bersama sebelum waktu yang telah ditentukan dan mengunggah bukti pembayaran di menu transaksi pada Iklan Tawar Bersama tersebut.
                  </p>
                    <p>
                  12. Setelah pembayaran dikonfirmasi oleh pemasang Iklan Tawar Bersama maka tiket yang terpakai di Iklan Tawar Bersama tersebut otomatis dikembalikan.
                  </p>
                   <p>
                  13.	 Pemasang iklan berhak untuk menolak bukti pembayaran jika bukti pembayaran tersebut tidak sesuai dengan yang tertera pada form penawaran.</p>
                   <p>
                14. Apabila pembayaran dibatalkan atau tidak dilakukan oleh penawar tertinggi dalam waktu yang telah ditentukan maka tiket hangus dan penawar tertinggi menerima peringatan pelanggaran.</p>
                <p>
                15.	 Apabila transaksi dibatalkan oleh pemasang iklan, maka secara otomatis tiket akan dikembalikan jika Iklan Tawar Bersama tersebut menggunakan tiket.</p>
                
                <p>
                16. Apabila transaksi dibatalkan oleh pemasang iklan setelah penawar tertinggi melakukan pembayaran, maka pemasang iklan wajib untuk mengembalikan dana tersebut kepada penawar tertinggi sesuai dengan kesepakatan antara pemasang iklan dan penawar tertinggi.</p>
                </div>
              </div>
            </div>
          </v-container>
        </v-card>
      </v-card>
    </div>
  </div>
</template>