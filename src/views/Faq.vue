<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card class="d-inline-block mx-auto" align="center">
      <v-card color="teal darken-4">
        <v-img src="img/banner web faq.png" width="600" height="150" contain></v-img>
      </v-card>

      <v-card color="teal accent-3">
        <v-container fluid>
          <div class="row mb-5 layout justify-center">
            <div class="col-md-10 text-justify white-gradient">
              <p>Q: Bagaimana cara menjadi akun verified di aplikasi SiMotor?</p>
              <p class="font-weight-bold">A: Silakan menghubungi support@simotor.id</p>
              <p>Q: Bagaimana cara mencari motor di aplikasi SiMotor?</p>
              <p
                class="font-weight-bold"
              >A: Anda bisa mencari kendaraan dengan menggunakan kotak pencarian di halaman utama aplikasi SiMotor, cukup dengan memilih merk dan model yang Anda inginkan dan klik tombol "Cari". Anda juga bisa menggunakan kota pencarian "kata kunci" jika Anda mencari secara spesifik (seperti warna, fitur, dll).</p>
              <p>Q: Bagaimana mengetahui jika motor yang saya suka masih ada ?</p>
              <p
                class="font-weight-bold"
              >A: Untuk memastikan kendaraan yang Anda inginkan belum terjual, silahkan hubungi penjual atau customer service kami.</p>
              <p>Q: Bagaimana cara menghubungi penjual motor yang ingin saya beli?</p>
              <p
                class="font-weight-bold"
              >A: Anda dapat menghubungi penjual melalui fitur “chat” yang ada di aplikasi SiMotor</p>
              <p>Q: Bagaimana cara saya mengetahui kendaraan masih dalam kondisi yang layak?</p>
              <p class="font-weight-bold">
                A: Anda dapat melihat foto dari kendaraan tersebut untuk mengetahui kondisinya. Anda juga bisa menghubungi atau bertemu langsung dengan penjualnya untuk memastikan kondisi sebenarnya dari kendaraan tersebut dan juga mencobanya langsung.
                Sebaiknya Anda membawa orang yang mengerti dengan kendaraan sehingga bisa mengecek kondisi mekanik dan mesin kendaraan dengan teliti.
              </p>
              <p>Q: Bagaimana cara jual motor di SiMotor?</p>
              <p class="font-weight-bold">A:</p>
              <p
                class="font-weight-bold ml-2 ml-lg-2 md-2"
              >-Download Aplikasi SiMotor yang ada di Playstore</p>
              <p
                class="font-weight-bold ml-2 ml-lg-2 md-2"
              >-Pilih jenis iklan motor apa yang akan anda iklankan,contoh seperti ‘satuan atau paketan’</p>
              <p class="font-weight-bold ml-2 ml-lg-2 md-2">-Lengkapi Form jual motor seperti:</p>
              <p
                class="font-weight-bold ml-3 ml-lg-3 md-3"
              >a. Identitas pemilik motor (nama dan alamat)</p>
              <p class="font-weight-bold ml-3 ml-lg-3 md-">b. Data kendaraan (STNK, BPKB dan faktur)</p>
              <p class="font-weight-bold ml-3 ml-lg-3 md-">c. Foto unit motor</p>
              <p class="font-weight-bold ml-3 ml-lg-3 md-">d. Kilometer motor</p>
              <p class="font-weight-bold ml-3 ml-lg-3 md-">e. Harga jual yang diinginkan</p>
              <p>Q: Bagaimana cara membeli motor di SiMotor?</p>
              <p class="font-weight-bold">A:</p>
              <p
                class="font-weight-bold ml-2 ml-lg-2 md-2"
              >- Download Aplikasi SiMotor yang ada di Playstore</p>
              <p
                class="font-weight-bold ml-2 ml-lg-2 md-2"
              >-Pilih motor yang Anda inginkan di aplikasi SiMotor :</p>
              <p class="font-weight-bold ml-2 ml-lg-2 md-2">-Tipe motor yang ingin dibeli</p>
              <p class="font-weight-bold ml-2 ml-lg-2 md-2">-Domisili (kota tempat tinggal)</p>
              <p
                class="font-weight-bold ml-2 ml-lg-2 md-2"
              >-Cara pembayaran motor (tunai/kredit) (jika kredit, pembeli diminta menyerahkan data untuk pengajuan kredit)</p>
            </div>
          </div>
        </v-container>
      </v-card>
    </v-card>
  </div>
</template>