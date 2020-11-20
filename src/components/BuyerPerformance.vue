<template>
  <div>
    <v-row align="center" justify="space-around">
      <v-col cols="3" sm="3" align="center">
        <div v-if="user.id_type_pinalti !== 3">
          <v-img
            src="/img/icons/akun_blokir_gray.webp"
            width="35"
            contain
          ></v-img>
        </div>

        <div v-else>
          <v-img src="/img/icons/akun_blokir.webp" width="35" contain></v-img>
        </div>

        <h5>Akun diBlokir</h5>
      </v-col>

      <v-col cols="3" sm="3" align="center">
        <div v-if="user.id_type_pinalti == 2">
          <v-img
            src="/img/icons/akun_wanprestasi2.webp"
            width="35"
            contain
          ></v-img>
        </div>

        <div v-else>
          <v-img
            src="/img/icons/akun_wanprestasi2_gray.webp"
            width="35"
            contain
          ></v-img>
        </div>

        <h5>Wanprestasi 2</h5>
      </v-col>

      <v-col cols="3" sm="3" align="center">
        <div v-if="user.id_type_pinalti == 1">
          <v-img
            src="/img/icons/akun_wanprestasi1.webp"
            width="35"
            contain
          ></v-img>

          <h5>Wanprestasi 1</h5>
        </div>

        <div v-else>
          <v-img
            src="/img/icons/akun_wanprestasi1_gray.webp"
            width="35"
            contain
          ></v-img>

          <h5>Wanprestasi 1</h5>
        </div>
      </v-col>

      <v-col cols="3" sm="3" align="center">
        <div v-if="user.id_type_pinalti !== 0">
          <v-img
            src="/img/icons/akun_aman_gray.webp"
            width="35"
            contain
          ></v-img>
        </div>

        <div v-else>
          <v-img src="/img/icons/akun_aman.webp" width="35" contain></v-img>
        </div>

        <h5>Akun Aman</h5>
      </v-col>

      <div>
        <v-alert dense type="success" v-if="user.id_type_pinalti == 0">
          Selamat Anda Pembeli <strong>TERPERCAYA,</strong> tingkatkan terus
          transaksi Anda!
        </v-alert>

        <v-alert dense type="warning" v-if="user.id_type_pinalti == 1">
          Anda terdeteksi melakukan <strong>1 Kali WANPRESTASI,</strong> Mohon
          maaf, tiket untuk iklan Anda hangus.
        </v-alert>

        <v-alert dense type="warning" v-if="user.id_type_pinalti == 2">
          Anda terdeteksi melakukan <strong>2 Kali WANPRESTASI,</strong> Mohon
          maaf, akun Anda tidak bisa ikut Tawar Bersama.
        </v-alert>

        <v-alert dense type="error" v-if="user.id_type_pinalti == 3">
          Anda terdeteksi melakukan <strong>3 Kali WANPRESTASI,</strong> Mohon
          maaf, akun Anda diBlokir sampai batas waktu yang ditentukan.
        </v-alert>
      </div>
    </v-row>

    <v-row>
      <v-col cols="6">
        Note Wanprestasi:

        <ul class="red--text">
          <li>1 kali gagal Tiket hangus</li>

          <li>2 kali gagal tidak bisa ikut Tawar Bersama selama 2 minggu</li>

          <li>3 kali gagal Akun anda akan diblokir secara permanen</li>
        </ul>
      </v-col>

      <v-col cols="6" v-if="user.id_type_pinalti == 3 ">Masa blokir akun Anda berakhir pada: <flip-countdown :deadline="user.tanggal_selesai"></flip-countdown></v-col>

    </v-row>
  </div>
</template>

<script>
import FlipCountdown from "vue2-flip-countdown";

export default {
  name: "buyer-performance",
  props: ["user"],
  components: { FlipCountdown },
};
</script>

<style>
</style>