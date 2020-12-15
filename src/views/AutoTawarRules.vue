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

        <v-card color="#A5B8D3">
          <v-container fluid>
            <div class="row mb-5 layout justify-center">
              <div class="col-md-10 text-justify white-gradient">
                <div class="ml-2 ml-lg-2">
                  <p class="font-weight-bold">Persyaratan Auto Tawar</p>
                  <p>
                    1. Anda tetap dapat menawar secara manual saat
                    mengaktifkan/menonaktifkan fitur Auto Tawar.
                  </p>
                  <p>2. Auto Tawar tidak menjamin Anda menang.</p>

                  <p>
                    3. Auto Tawar hanya mempermudah Anda untuk melakukan
                    penawaran secara otomatis tanpa harus membuka aplikasi.
                  </p>
                  <p class="font-weight-bold">
                    Persyaratan Mengaktifkan dan Menonaktifkan Auto Tawar:
                  </p>
                  <p>1. Mengaktifkan Auto Tawar</p>
                  <p class="ml-4 ml-lg-4">
                    a. Menyetujui persyaratan & ketentuan Tawar Bersama
                  </p>
                  <p class="ml-4 ml-lg-4">
                    b. Sudah terdaftar sebagai peserta di Iklan Tawar Bersama
                    yang akan menggunakan fitur Auto Tawar
                  </p>

                  <p>2. Menonaktifkan Auto Tawar</p>
                  <p class="ml-4 ml-lg-4">
                    a. Menyetujui persyaratan & ketentuan Tawar Bersama
                  </p>
                  <p class="ml-4 ml-lg-4">b. 2 (dua) kali pelanggaran:</p>
                  <p class="font-weight-bold">
                    Persyaratan Nilai Maksimum Nominal Auto Tawar:
                  </p>
                  <p>
                    1. Nominal maksimum auto tawar harus lebih besar dari
                    nominal tawaran saat ini/tawaran berlangsung.
                  </p>
                  <p> 2.	Nominal maksimum auto tawar sesuai dengan harga kelipatan pada iklan yang Anda inginkan. </p>
                  <p class="ml-4 ml-lg-4 font-weight-bold">
                   Contoh sebagai berikut:
                  </p>
                  <p class="ml-4 ml-lg-4 font-weight-bold">
                  (<span class="red--text"> Rp 2.000.000 </span> )+ ( <span class="blue--text"> Rp 50.000  </span> * <span class="green--text"> 2</span> ) = Rp. 2.100.000
                  </p>
                  <p class="ml-4 ml-lg-4 font-weight-bold">
                   Ket Warna:
                  </p>
                   <p class="ml-4 ml-lg-4">Merah	: Harga Iklan Tawar Bersama saat ini</p>
                   <p class="ml-4 ml-lg-4">Biru		: Harga kelipatan Iklan Tawar Bersama</p>
                    <p class="ml-4 ml-lg-4">Hijau	: Berapa kali auto tawar yang diinginkan</p>
                 
                    <p class="ml-4 ml-lg-4">Maka nominal maksimum auto tawar adalah <b> Rp. 2.100.000 </b></p>

                     <p class="font-weight-bold">
                    Cara kerja Fitur Auto Tawar:
                  </p>
                  <p class="ml-4 ml-lg-4">1.	Masukan maksimum nominal Auto Tawar yang Anda tentukan dan aktifkan.</p>
                   <p class="ml-4 ml-lg-4">2.	Sistem Auto Tawar akan melakukan tawaran atas nama Anda secara otomatis (ditandai dengan warna orange pada tampilan penawar).</p>
               <p class="ml-4 ml-lg-4">3.	Sistem Auto Tawar melakukan penawaran dengan harga kelipatan minimal 1 (satu) kali kelipatan dan maksimal 3 (tiga) kali kelipatan di atas harga awal / tawaran saat ini dan di bawah harga maksimum nominal Auto Tawar Anda.</p>
                <p class="font-weight-bold">
                   Contoh Proses Auto Tawar:
                  </p>
               <li> Harga Awal / Harga saat ini Iklan Tawar Bersama = Rp. 500.000 </li>
               <li> Harga Kelipatan = Rp 100.000 </li>
               <li> Total Penawar yang menggunakan Auto Tawar = 3 (pengguna A, B, C)</li>
               <li> Maksimum nominal auto tawar: </li>
              <p class="ml-4 ml-lg-4">1.	A = Rp 1.000.000 </p>
               <p class="ml-4 ml-lg-4">2.	B = Rp 1.000.000 </p>
                <p class="ml-4 ml-lg-4">3.	C = Rp 900.000 </p>
                <p class="ml-3 ml-lg-3">Dalam kondisi ini penawaran A, B, C dilakukan oleh Auto Tawar</p>
                <li> B melakukan tawaran Rp 600.000 </li>
                <li> Pengguna C (secara acak dipilih oleh Auto Tawar pengguna A dan C) melakukan	penawaran Rp 800.000 (Min. 1 kali kelipatan, Maks. 3 kali kelipatan) </li>
                <li> Pengguna B (secara acak dipilih oleh Auto Tawar pengguna B dan A) melakukan	penawaran Rp 900.000 (Min. 1 kali kelipatan, Maks. 3 kali kelipatan) </li>
                <li> Pengguna A (pengguna C tidak dipilih oleh Auto Tawar karena sudah mencapai batas maksimum nominal auto tawar) melakukan penawaran Rp 1.000.000 (Min. 1 kali kelipatan, Maks. 3 kali kelipatan) </li>
<li> Jika waktu Iklan Tawar Bersama berakhir, maka pemenang Iklan Tawar Bersama tersebut adalah penawar A. </li>
                </div>
              </div>
            </div>
          </v-container>
        </v-card>
      </v-card>
    </div>
  </div>
</template>