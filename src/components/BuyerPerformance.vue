<template>
  <div>
    <v-card outlined class="rounded-lg" :color="color" elevation="2">
      <v-card class="ma-2">
        <div class="d-flex align-center">
          <v-avatar size="40" class="mx-4 my-2">
            <v-img
              src="/img/icons/akun_aman.webp"
              contain
              v-if="pengguna.id_type_pinalti == 0"
            ></v-img>

            <v-img
              src="/img/icons/akun_wanprestasi1.webp"
              contain
              v-if="pengguna.id_type_pinalti == 1"
            ></v-img>

            <v-img
              src="/img/icons/akun_wanprestasi2.webp"
              contain
              v-if="pengguna.id_type_pinalti == 2"
            ></v-img>

            <v-img
              src="/img/icons/akun_blokir.webp"
              contain
              v-if="pengguna.id_type_pinalti == 3"
            ></v-img>
          </v-avatar>

          <h2>Harap Diperhatikan!</h2>
        </div>

        <div class="mx-2">
          <h4 v-if="pengguna.id_type_pinalti == 0">
            Akun Anda tidak pernah melakukan pembatalan transaksi. Hindari
            pembatalan transaksi agar akun anda tidak diblokir.
          </h4>

          <h4 v-if="pengguna.id_type_pinalti == 1">
            Anda telah melakukan 1x pembatalan transaksi. Hindari melakukan
            pembatalan transaksi karena dapat mengakibatkan Tiket anda hangus.
          </h4>

          <h4 v-if="pengguna.id_type_pinalti == 2">
            Anda telah melakukan 2x pembatalan transaksi. Hindari melakukan
            pembatalan transaksi karena dapat mengakibatkan akun anda di blokir
            selama 14 hari.
          </h4>

          <h4 v-if="pengguna.id_type_pinalti == 3">
            Anda telah melakukan 3x pembatalan transaksi yang mengakibatkan akun
            anda di blokir selamanya.
          </h4>

          <p class="my-2">
            Untuk informasi tentang kebijakan, silahkan kunjungi Bantuan
            <a href="/bantuan">disini</a>
          </p>

          <flip-countdown
            :deadline="pengguna.end_time_beku | dateTimeFormat(utc)"
            v-if="pengguna.id_mst_user_status == 3 && pengguna.id_type_pinalti == 2"
          ></flip-countdown>
        </div>
      </v-card>
    </v-card>
    <br />

    <div>
      Keterangan:
      <ul class="red--text">
        <li>
          <strong> Melakukan 1x pembatalan transaksi </strong>
          <p>
            Anda melakukan pembatalan transaksi 1x yang mengakibatkan Tiket anda
            hangus.
          </p>
        </li>

        <li>
          <strong> Melakukan 2x pembatalan transaksi </strong>
          <p>
            Anda melakukan pembatalan transaksi 2x yang mengakibatkan akun anda
            di blokir selama 14 hari.
          </p>
        </li>

        <li>
          <strong> Melakukan 3x pembatalan transaksi </strong>
          <p>
            Anda melakukan pembatalan transaksi 3x yang mengakibatkan akun anda
            di blokir selamanya.
          </p>
        </li>
      </ul>
      <h4 class="text-justify font-weight-bold ml-2 ml-lg-2">
        Informasi selengkapnya mengenai pelanggaran Tawar Bersama dapat dilihat
        <a href="/pelanggaran-tb">Disini</a>
      </h4>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FlipCountdown from "vue2-flip-countdown";
import moment from "moment-timezone";

export default {
  name: "buyer-performance",
  props: ["user", "utc", "timezone"],
  components: { FlipCountdown },
  data() {
    return {
      pengguna: [],
      color: "",
    };
  },
  methods: {
    ...mapActions({
      setAuth: "auth/set",
      setToken: "auth/SET_TOKEN",
    }),
    getUsers() {
      this.axios
        .get("/user/v3/user", {
          params: {
            id: this.user.id,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.pengguna = data[0];
          if (
            this.pengguna.id_type_pinalti == 1 ||
            this.pengguna.id_type_pinalti == 2
          ) {
            this.color = "deep-orange darken-4";
          } else if (this.pengguna.id_type_pinalti == 3) {
            this.color = "red darken-4";
          } else {
            this.color = "green";
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          
        });
    },
  },
  created() {
    this.getUsers();
  },
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY, HH:mm");
    },
  },
};
</script>

<style>
</style>