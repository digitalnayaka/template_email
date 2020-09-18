<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card class="d-inline-block mx-auto" align="center">
      <v-card color="teal darken-4">
        <v-img src="img/banner web panduan.png" width="600" height="150" contain></v-img>
      </v-card>

      <v-card color="teal lighten-4">
        <v-container>
          <br />
          <div class="row mb-5 layout justify-center">
            <div class="col-md-10 text-justify white-gradient">
              <p class="text-justify">
                Penggunaan bertujuan untuk memudahkan pengguna dalam menggunakan aplikasi SiMotor. Panduan penggunaan
                terdiri dari dua (2) yaitu panduan penggunaan aplikasi SiMotor untuk Pembeli dan panduan penggunaan aplikasi SiMotor untuk penjual.
              </p>

              <p class="font-weight-bold h4">
                Panduan Penggunaan Aplikasi SiMotor
                ‘Sebagai Penjual’
              </p>
              <p>
                <a
                  href="/img/Panduan Penggunaan Aplikasi SiMotor PENJUAL ver1-6-0.pdf"
                  download
                >Download disini</a>
              </p>
              <p class="font-weight-bold h6">
                Panduan Penggunaan Aplikasi SiMotor
                ‘Sebagai Pembeli’
              </p>
              <p>
                <a href="/panduan_penjual" target="_self">Klik disini</a>
              </p>
              <p class="font-weight-bold h6">Video Tutorial SiMotor</p>
              <p>
                <a
                  href="https://www.youtube.com/channel/UCBExlB0xnMoTDT8LwVKg9oA/videos"
                  target="_blank"
                >Klik disini</a>
              </p>
              <p class="ml-2 ml-lg-2 md-2 font-weight-bold">1. PENDAFTARAN</p>
              <p class="ml-3 ml-lg-3 md-3">1.1. Pendaftaran via nomor handphone (HP).</p>
              <p class="ml-4 ml-lg-4 md-4">1.1.1. Pada halaman Login & Sign Up, pilih tab Sign Up</p>
              <p class="ml-4 ml-lg-4 md-4">
                1.1.2. Masukkan nama lengkap & nomor HP, lalu klik “Daftar”,
                Anda akan menerima kode OTP (One Time Password) melalui SMS
              </p>
              <p class="ml-4 ml-lg-4 md-4">1.1.3. Masukkan kode OTP yang Anda terima</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >1.1.4. Jika kode OTP benar, maka Anda akan masuk ke menu halaman utama</p>
               <v-img src="img/penjual1.png" width="600" contain></v-img>
              <br />
              <br />

              <p class="ml-2 ml-lg-2 md-2 font-weight-bold">2. LOGIN</p>
              <p class="ml-3 ml-lg-3 md-3 font-weight-bold">2.1. Login via nomor handphone (HP)</p>
              <p class="ml-4 ml-lg-4 md-4">2.1.1. Pada halaman Login & Sign Up, pilih tab Login</p>
              <p class="ml-4 ml-lg-4 md-4">2.1.2. Masukkan nomor HP Anda</p>
              <p class="ml-4 ml-lg-4 md-4">2.1.3. Masukan kode OTP yang Anda terima</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >2.1.4 Jika kode OTP benar, maka Anda akan masuk ke menu halaman utama</p>
              <p class="ml-2 ml-lg-2 md-2">
                Catatan : Jika nomor Anda belum pernah terdaftar di aplikasi SiMotor, maka akan
                ada pemberitahuan bahwa Anda harus mendaftar terlebih dahulu.
              </p>
              <v-img src="img/penjual2.png" width="600" contain></v-img>
              <br />
              <br />

              <p class="ml-2 ml-lg-2 md-2 font-weight-bold">3. TAMBAH UNIT</p>
              <p class="ml-3 ml-lg-3 md-3">3.1. Masuk ke halaman utama</p>
              <p class="ml-3 ml-lg-3 md-3">3.2. Klik tombol + (Tambah) di bar navigasi bagian bawah</p>
              <p
                class="ml-3 ml-lg-3 md-3"
              >3.3. Klik ‘Tambah Unit’ untuk memasukkan data unit motor ke garasi Anda di aplikasi SiMotor</p>
              <img src="img/penjual1.png" width="600px" class="img-fluid" />
              <br />
              <br />
              <p class="ml-3 ml-lg-3 md-3">
                3.4. Pilih merk motor, tahun motor dan tipe motor, klik tombol ‘Selanjutnya’
                untuk masuk ke langkah berikutnya
              </p>
              <p
                class="ml-3 ml-lg-3 md-3"
              >3.6. Isi detail motor seperti warna, odometer, kapasitas mesin, transmisi dan sebagainya</p>
              <img src="img/penjual2.png" width="600px" class="img-fluid" />

              <br />
              <br />
              <p
                class="ml-3 ml-lg-3 md-3"
              >3.7. Setelah semua detail terisi, Anda bisa klik tombol ‘Simpan’</p>
              <p
                class="ml-3 ml-lg-3 md-3"
              >3.8. Setelah unit berhasil disimpan ke garasi, Anda harus menunggu proses moderasi oleh Admin SiMotor</p>
              <p class="ml-3 ml-lg-3 md-3">
                3.9. Jika sudah berhasil dimoderasi oleh admin, status unit akan berubah menjadi tersedia dan akan ada pemberitahuan bahwa unit Anda telah tersedia di garasi dan sudah bisa untuk diiklankan
                Gambar 19. Klik tombol simpan Gambar 20. Proses moderasi Gambar 21. Unit tersedia diiklankan
                Catatan: Dalam proses moderasi, unit akan ditolak apabila gambar dianggap tidak sesuai dengan syarat dan ketentuan Aplikasi
              </p>
              <img src="img/penjual3.png" width="600px" class="img-fluid" />

              <p
                class="ml-3 ml-lg-3 md-3"
              >Catatan: Dalam proses moderasi, unit akan ditolak apabila gambar dianggap tidak sesuai dengan syarat dan ketentuan Aplikasi SiMotor</p>
              <br />
              <br />
              <p class="ml-2 ml-lg-2 md-2 font-weight-bold">4. Tambah Iklan</p>
              <p class="ml-3 ml-lg-3 md-3">4.1. Tambah Iklan Harga Pas</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >4.1.1. Buka menu Halaman utama, lalu klik tombol + (Tambah) di bar navigasi bagian bawah</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >4.1.2. Klik ‘Tambah Iklan’ untuk mengiklankan unit motor yang tersedia di garasi Anda</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >4.1.3. Pilih Jenis Iklan ‘Harga Pas’ untuk melanjutkan ke langkah berikutnya</p>
              <img src="img/penjual4.png" width="600px" class="img-fluid" />
              <br />
              <br />
              <p
                class="ml-4 ml-lg-4 md-4"
              >4.1.4. Pilih unit Motor dari garasi Anda yang ingin diiklankan</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >4.1.5. Isi data iklan motor seperti Judul Iklan, Deskripsi Iklan, dan Harga yang ingin ditawarkan, kemudian klik tombol ‘Iklankan’</p>
              <img src="img/penjual5.png" width="600px" class="img-fluid" />
              <br />
              <br />
              <p class="ml-3 ml-lg-3 md-3">4.2. Tambah Iklan Tawar Bersama</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >4.2.1. Buka Halaman utama, Klik tombol + (Tambah) di bar navigasi bagian bawah</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >4.2.2. Klik ‘Tambah Iklan’ untuk mengiklankan unit motor yang tersedia di garasi Anda</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >4.2.3. Pilih jenis iklan Tawar Bersama Satuan atau Tawar Bersama Paketan</p>
              <img src="img/penjual6.png" width="600px" class="img-fluid" />
              <br />
              <br />
              <p class="ml-4 ml-lg-4 md-4">4.2.4. Pilih unit Motor yang ingin Anda iklankan</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >4.2.5. Isi data-data motor seperti Judul Iklan, Deskripsi Iklan, Informasi Harga, Kelipatan Tawar dan jadwal sesi Tawar Bersama akan dilangsungkan. Lalu kli tombol ‘Iklankan’</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >4.2.6. Setelah itu, iklan akan bisa dilihat di tab iklan pada menu Akun Anda</p>
              <img src="img/penjual7.png" width="600px" class="img-fluid" />
              <img src="img/penjual8.png" width="210px" class="img-fluid" />
              <p class="ml-4 ml-lg-4 md-4 font-weight-bold">Catatan:</p>
              <p class="ml-4 ml-lg-4 md-4">- Anda bisa memilih kelipatan tawar</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >- Anda bisa menentukan apakah para penawar iklan Anda memerlukan tiket atau tidak (Gambar 31)</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >- Pada Tawar Bersama Paketan, Anda bisa memilih unit mana yang akan dijadikan gambar utama (thumbnail)</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >- Ketika sesi Tawar Bersama berakhir, penawar yang berada pada urutan paling atas dalam daftar penawaran akan menerima pesan otomatis dari Anda yang bisa Anda atur di pengaturan</p>

              <p class="ml-2 ml-lg-2 md-2 font-weight-bold">5. Menu Aktivitas</p>
              <p
                class="ml-3 ml-lg-3 md-3"
              >5.1. Buka halaman utama, Klik tombol Aktivitas di bar navigasi bagian bawah</p>
              <p
                class="ml-3 ml-lg-3 md-3"
              >5.2. Klik tombol tab ‘Iklan Anda’ untuk melihat iklan apa saja yang sudah pernah Anda buat baik itu iklan Tawar Bersama maupun iklan Harga Pas (pilih salah satu)</p>
              <img src="img/penjual9.png" width="500px" class="img-fluid" />
              <p class="ml-2 ml-lg-2 md-2 font-weight-bold">6. PENGATURAN</p>
              <p class="ml-3 ml-lg-3 md-3">6.1. Cara tambah rekening baru</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >6.1.1. Buka halaman utama, lalu klik tombol ‘Akun’ di bar navigasi bagian bawah</p>
              <p class="ml-4 ml-lg-4 md-4">6.1.2. Klik tombol Pengaturan di pojok kanan atas</p>
              <p class="ml-4 ml-lg-4 md-4">6.1.3. Klik ‘Rekening Bank’</p>
              <img src="img/penjual10.png" width="600px" class="img-fluid" />
              <br />
              <br />
              <p class="ml-4 ml-lg-4 md-4">6.1.4. Akan tampil daftar nama dan nomor rekening Anda</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >6.1.5. Klik tombol ‘Tambah’ di pojok kanan atas untuk menambah rekening baru</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >6.1.6. Setelah itu pilih nama bank, ketik nama rekening dan nomor rekening</p>
              <p class="ml-4 ml-lg-4 md-4">6.1.7. Klik tombol ‘tambah’</p>
              <p class="ml-4 ml-lg-4 md-4">6.1.8. Anda berhasil menambah rekening bank yang baru</p>
              <img src="img/penjual11.png" width="800px" class="img-fluid" />
              <br />
              <br />
              <p
                class="ml-3 ml-lg-3 md-3"
              >6.2. Cara membuat Pesan Otomatis yang akan dikirimkan kepada pembeli yang berada di urutan paling atas pada daftar penawaran dalam sesi Tawar Bersama</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >6.2.1. Buka halaman utama, lalu klik tombol ‘Akun’ di bar navigasi bagian bawah</p>
              <p class="ml-4 ml-lg-4 md-4">6.2.2. Klik tombol pengaturan di pojok kanan atas</p>
              <p class="ml-4 ml-lg-4 md-4">6.2.3. Klik ‘Chat Otomatis’</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >6.2.4. Ketik pesan yang Anda inginkan contoh ‘Selamat kamu telah menang Tawar Bersama. Silakan hubungi kami di nomor +628111873434’</p>
              <p
                class="ml-4 ml-lg-4 md-4"
              >6.2.5. Klik tombol simpan dan Anda telah berhasil menambah chat otomatis</p>
              <img src="img/penjual12.png" width="800px" class="img-fluid" />
              <br />
              <img src="img/penjual13.png" width="500px" class="img-fluid" />
              <br />
            </div>
          </div>
        </v-container>
      </v-card>
    </v-card>
  </div>
</template>