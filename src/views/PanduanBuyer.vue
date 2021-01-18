<template>
  <div>
    <v-app-bar app color="#22939E" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card class="d-inline-block mx-auto" align="center">
      <v-card color="#22939E">
        <v-img src="img/banner web panduan.webp" width="600" height="150" contain></v-img>
      </v-card>

      <v-card >
        <v-container fluid>
          <div class="row mb-5 layout justify-center">
            <div class="col-md-10 text-justify white-gradient">
              <p class="text-justify">
                Panduan Penggunaan bertujuan untuk memudahkan pengguna dalam menggunakan aplikasi SiMotor. Panduan penggunaan
                terdiri dari dua (2) yaitu panduan penggunaan aplikasi SiMotor untuk Pembeli dan panduan penggunaan aplikasi SiMotor untuk penjual.
              </p>

              <p class="text-justify font-weight-bold h4">
                Panduan Penggunaan Aplikasi SiMotor
                ‘Sebagai Pembeli’
              </p>
              <p class="text-justify">
                <a
                  href="/img/Panduan Penggunaan Aplikasi SiMotor PEMBELI ver1-6-0.pdf"
                  download
                >Download disini</a>
              </p>
              <p class="text-justify font-weight-bold h6">
                Panduan Penggunaan Aplikasi SiMotor
                ‘Sebagai Penjual’
              </p>
              <p class="text-justify">
                <a href="/panduan-penjual" target="_blank">Klik disini</a>
              </p>
              <p class="text-justify font-weight-bold h6">Video Tutorial SiMotor</p>
              <p class="text-justify">
                <a
                  href="https://www.youtube.com/channel/UCBExlB0xnMoTDT8LwVKg9oA/videos"
                  target="_blank"
                >Klik disini</a>
              </p>
              <p class="text-justify ml-2 ml-lg-2 md-2 font-weight-bold">1. PENDAFTARAN</p>
              <p class="text-justify ml-3 ml-lg-3 md-3">1.1. Pendaftaran via nomor handphone (HP).</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >1.1.1. Pada halaman Login & Sign Up, pilih tab Sign Up</p>
              <p class="text-justify ml-4 ml-lg-4 md-4">
                1.1.2. Masukkan nama lengkap & nomor HP, lalu klik “Daftar”,
                Anda akan menerima kode OTP (One Time Password) melalui SMS
              </p>
              <p class="text-justify ml-4 ml-lg-4 md-4">1.1.3. Masukkan kode OTP yang Anda terima</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >1.1.4. Jika kode OTP benar, maka Anda akan masuk ke menu halaman utama</p>
              <!-- <img src="img/tutorial1.png" width="600px" class="img-fluid" /> -->
              <v-img src="img/pembeli1.webp" width="600" contain></v-img>
              <br />
              <br />

              <p class="text-justify ml-2 ml-lg-2 md-2 font-weight-bold">2. LOGIN</p>
              <p
                class="text-justify ml-3 ml-lg-3 md-3 font-weight-bold"
              >2.1. Login via nomor handphone (HP)</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >2.1.1. Pada halaman Login & Sign Up, pilih tab Login</p>
              <p class="text-justify ml-4 ml-lg-4 md-4">2.1.2. Masukkan nomor HP Anda</p>
              <p class="text-justify ml-4 ml-lg-4 md-4">2.1.3. Masukan kode OTP yang Anda terima</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >2.1.4 Jika kode OTP benar, maka Anda akan masuk ke menu halaman utama</p>
              <p class="text-justify ml-2 ml-lg-2 md-2">
                Catatan : Jika nomor Anda belum pernah terdaftar di aplikasi SiMotor, maka akan
                ada pemberitahuan bahwa Anda harus mendaftar terlebih dahulu.
              </p>
              <v-img src="img/pembeli2.webp" width="600" contain></v-img>
              <br />
              <br />
              <p
                class="text-justify ml-3 ml-lg-3 md-3 font-weight-bold"
              >2.2. Login via email (Gmail)</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >2.2.1. Pada halaman Login & Sign Up, pilih tab Login</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >2.2.2. Klik button Google yang ada dibawah tab nomor handphone</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >2.2.3. Pilih email yang akan Anda daftarkan untuk SiMotor</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >2.2.4 Jika berhasil, Anda akan masuk ke menu halaman utama</p>
              <v-img src="img/pembeli3.webp" width="600" contain></v-img>
              <br />
              <br />
              <p class="text-justify ml-2 ml-lg-2 md-2 font-weight-bold">3. PENELUSURAN IKLAN</p>
              <p
                class="text-justify ml-2 ml-lg-2 md-2"
              >Anda bisa menelusuri iklan motor yang dijual dengan 2 cara:</p>
              <p class="text-justify ml-3 ml-lg-3 md-3">3.1. Menelusuri iklan dari halaman utama</p>
              <p class="text-justify ml-4 ml-lg-4 md-4">
                Gulung/ scroll ke bawah untuk melihat iklan apa saja yang terdapat dalam aplikasi SiMotor,
                Anda dapat meliat rekomendasi untuk iklan motor baru,
                motor bekas terdekat dan iklan motor yang dijual melalui metode Tawar Bersama yang sedang berlangsung
              </p>
              <v-img src="img/pembeli4.webp" width="600" contain></v-img>
              <br />
              <br />
              <p
                class="text-justify ml-3 ml-lg-3 md-3"
              >3.2. Menelusuri iklan dengan menggunakan bar ‘Cari’</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >Ketikkan kata kunci yang ingin Anda cari (contoh: merek motor/ nama penjual)</p>
              <v-img src="img/pembeli5.webp" width="600" contain></v-img>
              <br />
              <br />
              <p
                class="text-justify ml-3 ml-lg-3 md-3"
              >3.3. Menelusuri iklan dengan menggunakan filter lanjutan</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >3.3.1. Buka menu halaman utama dan klik menu ‘Motor Bekas’</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >3.3.2. Klik tombol dengan ikon filter di pojok kanan atas</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >3.3.3. Pilih tombol tipe iklan yang ingin difilter, misalnya "Tawar Bersama"</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >3.3.4. Klik tombol ‘Simpan’ untuk menerapkan filter</p>
              <v-img src="img/pembeli6.webp" width="600" contain></v-img>
              <br />
              <br />
              <p class="text-justify ml-4 ml-lg-4 md-4">
                3.3.5. Jika Anda kemudian ingin memfilter lebih lanjut lagi untuk melihat hanya nama penjual tertentu
                atau kata kunci tertentu yang terdapat di dalam judul/ deskripsi iklan, maka Anda bisa mengetikkannya
                pada kotak ‘Cari’ setelah filter diterapkan.
              </p>
              <p
                class="text-justify ml-2 ml-lg-2 md-2 font-weight-bold"
              >4. BERINTERAKSI DENGAN IKLAN</p>
              <p
                class="text-justify ml-3 ml-lg-3 md-3"
              >Ketika Anda tertarik dengan sebuah iklan, maka langkah selanjutnya adalah sebagai berikut:</p>
              <p class="text-justify ml-3 ml-lg-3 md-3">4.1. Interaksi dengan iklan Harga Pas</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.1.1. Pilih salah satu iklan Harga Pas yang ingin lihat</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.1.2. Setelah detail iklan tersebut ditampilkan, Anda dapat memilih cara untuk menghubungi penjualnya</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.1.3. Pilihan menghubungi penjualnya adalah dengan cara Chat/ Telepon/ SMS/ Whatsapp</p>
              <v-img src="img/pembeli7.webp" width="600" contain></v-img>
              <br />
              <br />
              <p
                class="text-justify ml-3 ml-lg-3 md-3"
              >4.2. Interaksi dengan iklan Tawar Bersama (TB) yang sedang berlangsung</p>
              <p class="text-justify ml-4 ml-lg-4 md-4">4.2.1. Pilih iklan TB yang ingin Anda ikuti.</p>
              <p class="text-justify ml-4 ml-lg-4 md-4">4.2.2. Tinjau detail iklan tersebut.</p>
              <p class="text-justify ml-4 ml-lg-4 md-4">
                4.2.3. Jika Anda ingin mengikuti sesi penawaran pada iklan TB tersebut,
                klik tombol di bawahnya berlabel ‘Ikut Tawar Bersama’.
              </p>
              <p class="text-justify ml-4 ml-lg-4 md-4">
                4.2.4. Jika Anda tidak memiliki Tiket, Anda hanya bisa memasang penawaran pada iklan TB yang tidak ada syarat penggunaan Tiket.
                Anda bisa membeli tiket di Menu ‘Tiket Tawar Bersama’
              </p>
              <v-img src="img/pembeli8.webp" width="600" contain></v-img>
              <br />
              <br />
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.2.5. Setelah Tiket Anda berhasil digunakan, masukkan nominal bidding yang ingin Anda tawar dengan menekan tombol + / - sebanyak yang Anda inginkan dengan kelipatan nominal yang ditentukan di iklan TB tersebut.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.2.6. Klik tombol ‘Konfirmasi Penawaran’ untuk memasukkan penawaran Anda.</p>

              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.2.7. Jika penawaran Anda berhasil masuk, maka nominal penawaran Anda akan muncul pada daftar penawaran di posisi paling atas.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.2.8. Jika ada penawar lain yang memasukkan penawaran yang lebih tinggi, maka penawaran Anda akan otomatis turun ke bawah dan Anda akan menerima pemberitahuan.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.2.9. Jika Anda ingin mengubah posisi penawaran Anda kembali ke atas, Anda bisa memasukkan penawaran yang lebih tinggi seperti pada langkah 4.2.5 & 4.2.6 di atas.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.2.10. Begitu seterusnya sampai periode iklan TB selesai sesuai waktu yang ditentukan.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.2.11. Jika penawaran Anda berada di posisi paling atas pada daftar penawaran, maka Anda akan menerima pesan otomatis oleh penjual di menu Chat.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.2.12. Berikutnya Anda bisa berkomunikasi melalui fitur chat dengan penjual untuk mengonformasi penyelesaian transaksi pembeliannya.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.2.13. Anda diberi waktu 3 x 24 jam untuk melakukan pembayaran dan mengunggah bukti pembayaran.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.2.14. Penjual akan mengonfirmasi bukti pembayaran yang Anda unggah.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.2.15. Setelah waktu 3 x 24 jam berakhir, Tiket yang Anda gunakan pada iklan TB ini akan kembali ke stok Tiket Anda.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >4.2.16. Jika Anda tidak mengunggah bukti pembayaran, maka pembelian Anda dianggap batal dan Tiket yang Anda gunakan pada iklan TB ini akan menjadi hangus.</p>
              <v-img src="img/pembeli9.webp" width="600" contain></v-img>
              <br />
              <br />
              <p class="text-justify ml-2 ml-lg-2 md-2 font-weight-bold">5. TIKET</p>

              <p class="text-justify ml-3 ml-lg-3 md-3 font-weight-bold">5.1. Cara Membeli Tiket</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >5.1.1 Klik Menu ‘Tiket Tawar Bersama’ di halaman utama</p>
              <p class="text-justify ml-4 ml-lg-4 md-4">5.1.2. Klik tombol ‘Beli Tiket’</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >5.1.3 Klik tombol jumlah tiket atau ketikkan angka jumlah tiket yang ingin Anda beli</p>
              <p class="text-justify ml-4 ml-lg-4 md-4">5.1.4. Klik tombol ‘Lanjutkan’ ke pembayaran</p>
             <v-img src="img/pembeli10.webp" width="600" contain></v-img>
              <br />
              <br />
             
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >5.1.5 Tinjau detail transaksi pembayaran tiket Anda dan lakukan pembayaran.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >5.1.6 Setelah melakukan pembayaran, silakan unggah bukti pembayaran tiket di aplikasi SiMotor dan menunggu verifikasi tiket oleh admin SiMotor.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >5.1.7 Setelah diverifikasi oleh admin SiMotor, lalu stok tiket Anda akan bertambah di halaman tiket Tawar Bersama Anda.</p>
              <v-img src="img/pembeli11.webp" width="600" contain></v-img>
              <br />
              <br />
              <p class="text-justify ml-3 ml-lg-3 md-3 font-weight-bold">5.2. Cara Refund Tiket</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >5.2.1 Buka menu Tiket Tawar Bersama yang ada di Halaman utama</p>
              <p class="text-justify ml-4 ml-lg-4 md-4">5.2.2. Klik tombol ‘Refund Tiket”</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >5.2.3 Klik tombol jumlah tiket atau ketikkan angka jumlah tiket yang ingin Anda Refund</p>
              <v-img src="img/pembeli12.webp" width="600" contain></v-img>
              <br />
              <br />
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >5.2.4 Pilih/ tambah baru rekening bank yang menjadi tujuan pengembalian dana refund tiket.</p>
              <p class="ml-4 ml-lg-4 md-4">5.2.5. Klik tombol ‘Refund’.</p>
              <p
                class="text-justify ml-4 ml-lg-4 md-4"
              >5.2.6 Setelah diverifikasi oleh Admin SiMotor, uang akan masuk ke rekening Anda ± 2 hari kerja.</p>
             <v-img src="img/pembeli13.webp" width="600" contain></v-img>
              <br />
              <br />
              <p class="ml-3 ml-lg-3 md-3">5.3 Cara Mencari Iklan Dengan Barcode</p>
              <p class="ml-4 ml-lg-4 md-4">
                5.3.1 Buka halaman utama, lalu klik gambar
                <img src="img/barcode.JPG" width="30px" />
              </p>
              <p class="ml-4 ml-lg-4 md-4">
                5.3.2
                Muncul scan dan persiapkan barcode yang ingin dicari iklannya
              </p>
              <p class="ml-4 ml-lg-4 md-4">5.3.3 Anda akan berada di Iklan yang anda cari</p>
               <v-img src="img/pembeli14.webp" width="600" contain></v-img>
            </div>
          </div>
        </v-container>
      </v-card>
    </v-card>
  </div>
</template>