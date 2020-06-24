<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card class="d-inline-block mx-auto" align="center">
      <v-card color="teal darken-4">
        <v-img src="img/banner web kodeetik.png" width="600" height="150" contain></v-img>
      </v-card>

      <v-card color="teal accent-3">
        <v-container fluid>
          <div class="row mb-5 layout justify-center">
            <div class="col-md-10 text-justify white-gradient">
              <p
                class="ml-2 ml-lg-2"
              >SiMotor mempunyai kewajiban untuk menjalankan bisnisnya sesuai peraturan, undang-undang dan hukum yang berlaku. Kami berkomitmen membantu semua Pengguna agar bertindak demi terciptanya kepercayaan dan rasa hormat. Kode etik ini dimaksudkan sebagai panduan untuk menggunakan Layanan kami baik dalam bentuk Aplikasi atau pun Situs SiMotor dengan benar dan harus diikuti setiap waktu. Kode etik ini juga bagian yang tak terpisahkan dari Syarat dan Ketentuan Layanan SiMotor. Pelanggaran Kode Etik ini ditangani sesuai dengan Kebijakan Pelanggaran kami yang akan mengakibatkan tindakan pendisiplinan, hingga ke, dan termasuk, penutupan akun. Setiap pertanyaan mengenai Kode ini harus ditujukan ke Tim Dukungan SiMotor dengan mengirimkan email ke support@simotor.id dimana kami bisa memberikan Anda informasi tambahan mengenai prosedur yang benar untuk diikuti, dan mengatasi setiap permasalahan Anda yang berkaitan dengan layanan kami.</p>

              <p class="ml-3 ml-lg-3 font-weight-bold">1. Perilaku Pribadi</p>
              <p class="ml-4 ml-lg-4">1.1 Saya akan bertindak secara etis dan dengan integritas.</p>
              <p class="ml-4 ml-lg-4">1.2 Saya akan mematuhi semua kebijakan SiMotor.</p>
              <p class="ml-4 ml-lg-4">1.3 Saya akan menghormati hak semua Pengguna.</p>
              <p
                class="ml-4 ml-lg-4"
              >1.4 Saya tidak akan menyalahgunakan informasi rahasia, atau berpartisipasi dalam praktek ilegal lainnya.</p>
              <p
                class="ml-4 ml-lg-4"
              >1.5 Saya tidak akan melecehkan, menggertak atau mendiskriminasi.</p>
              <p
                class="ml-4 ml-lg-4"
              >1.6 Saya tidak akan memalsukan identitas saya sendiri atau orang lain dan saya akan memberikan informasi yang benar dan akurat.</p>
              <p
                class="ml-4 ml-lg-4"
              >1.7 Saya tidak akan mengajukan penawaran pada iklan yang tidak mampu saya beli.</p>
              <p
                class="ml-4 ml-lg-4"
              >1.8 Saya tidak akan meminta rilis Pembayaran Tanda Jadi di muka sebelum saya mengirim pekerjaan.</p>
              <p class="ml-3 ml-lg-3 font-weight-bold">2. Konten Pengguna</p>
              <p
                class="ml-3 ml-lg-3 font-weight-bold"
              >Saya bertanggung jawab atas konten yang saya posting di SiMotor dan:</p>
              <p
                class="ml-4 ml-lg-4"
              >2.1 Saya tidak akan mengirim konten yang melanggar hak cipta atau hak kekayaan intelektual orang lain;</p>
              <p
                class="ml-4 ml-lg-4"
              >2.2 Saya tidak akan mengirimkan konten yang melanggar hukum atau peraturan apapun;</p>
              <p class="ml-4 ml-lg-4">2.3 Saya tidak akan mengirimkan konten yang memfitnah;</p>
              <p
                class="ml-4 ml-lg-4"
              >2.4 Saya tidak akan mengirimkan konten yang tidak senonoh atau mengandung pornografi anak;</p>
              <p
                class="ml-4 ml-lg-4"
              >2.5 Saya tidak akan mengirim konten yang termasuk informasi yang setengah-setengah, palsu atau tidak akurat tentang siapa pun, produk apa pun atau jasa apa pun;</p>
              <p
                class="ml-4 ml-lg-4"
              >2.6 Saya tidak akan mengirimkan konten yang mengandung virus atau rutin program apapun yang bertujuan merusak sistem;</p>
              <p
                class="ml-4 ml-lg-4"
              >2.7 Saya tidak akan mengirim konten yang membuat SiMotor menanggung atau membahayakan operasi bisnis atau reputasinya.</p>
              <p class="ml-3 ml-lg-3 font-weight-bold">3. Kerahasiaan</p>
              <p
                class="ml-4 ml-lg-4"
              >3.1 Saya akan menghormati kerahasiaan dan privasi yang diatur dalam SiMotor.</p>
              <p
                class="ml-4 ml-lg-4"
              >3.2 Saya tidak akan mengungkapkan informasi atau dokumen yang saya dapatkan, selain yang diperlukan oleh hukum atau dimana otorisasi diberikan oleh SiMotor.</p>
              <p class="ml-3 ml-lg-3 font-weight-bold">4. Kontak</p>
              <p
                class="ml-4 ml-lg-4"
              >4.1 Saya tidak akan meminta pengguna SiMotor lain memberikan rincian kontak mereka dan hanya akan berkomunikasi dengan mereka melalui fitur obrolan (chat) yang resmi yang disediakan oleh SiMotor.</p>
              <p
                class="ml-4 ml-lg-4"
              >4.2 Saya tidak akan mengumpulkan nama-nama dari milis, email grup, dll untuk mengirimkan email-email yang tidak dikehendaki ("Spam").</p>
              <p class="ml-3 ml-lg-3 font-weight-bold">5. Penipuan</p>
              <p class="ml-4 ml-lg-4">5.1 Saya tidak akan terlibat dalam penipuan.</p>
              <p class="ml-4 ml-lg-4">5.2 Saya tidak akan membuat akun-akun ganda.</p>
              <p
                class="ml-4 ml-lg-4"
              >5.3 Saya tidak akan menggunakan Situs ini untuk mentransfer dana secara ilegal.</p>
              <p
                class="ml-4 ml-lg-4"
              >5.4 Saya tidak akan menggunakan Situs untuk membuat umpan balik palsu tentang siapa pun, produk atau layanan apa pun.</p>
              <p class="ml-3 ml-lg-3 font-weight-bold">6. Komunikasi</p>
              <p
                class="ml-4 ml-lg-4"
              >6.1 Saya akan menghindari komentar yang berlebihan, menghina, dan referensi yang tidak pantas.</p>
              <p
                class="ml-4 ml-lg-4"
              >6.2 Saya tidak akan terlibat dalam menyinggung pribadi, mengkritik negatif atau lainnya yang tidak adil, dan melakukan tindakan tidak profesional apapun.</p>
              <p class="ml-3 ml-lg-3 font-weight-bold">7. Menawar</p>
              <p
                class="ml-4 ml-lg-4"
              >7.1 Saya tidak akan menawar lebih murah dari apa yang sudah ditentukan dalam sistem tawar bersama.</p>
              <p
                class="ml-4 ml-lg-4"
              >7.2 Saya tidak akan berpartisipasi dalam iklan-iklan yang melibatkan perilaku ilegal.</p>
              <p
                class="ml-4 ml-lg-4"
              >7.3 Saya hanya akan menawar pada iklan yang saya perkirakan bisa saya bayar lunas.</p>
              <p class="ml-3 ml-lg-3 font-weight-bold">8. Spam atau Iklan</p>
              <p
                class="ml-4 ml-lg-4"
              >Saya tidak akan mengirim spam atau iklan situs web atau jasa saya kecuali yang sudah diizinkan dan ditentukan SiMotor.</p>
              <p class="ml-3 ml-lg-3 font-weight-bold">9. Pembayaran</p>
              <p
                class="ml-4 ml-lg-4"
              >Saya tidak akan menggunakan SiMotor untuk memfasilitasi pertukaran uang termasuk, namun tidak terbatas pada, mata uang digital (seperti bitcoin, ethereum, dll.)</p>
            </div>
          </div>
        </v-container>
      </v-card>
    </v-card>
  </div>
</template>