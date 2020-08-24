<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <div v-if="!guest">
        <div v-if="user.id == hits.id_app_user && hits.id_mst_iklan_status == 1">
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon class="mx-2" v-on="on" @click="deleteIklan">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </v-btn>

          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon class="mx-2" v-on="on" :to="'/edit_iklan/' + id">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-row dense>
      <v-col cols="12" sm="6" class="d-flex align-center">
        <v-carousel cycle>
          <v-carousel-item
            v-for="(item,i) in motorBekas"
            :key="i"
            :src="getImage(item.foto_1)"
            reverse-transition="fade-transition"
            transition="fade-transition"
            contain
          >
            <v-card-title>
              <v-chip small left color="primary" text-color="white">ID Iklan: {{ id }}</v-chip>
            </v-card-title>
            <v-img src="/img/sold_out.png" v-if="hits.id_mst_iklan_status == 2" contain></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="12" sm="6">
        <span
          class="subheading red--text float-left"
        >{{ hits.mst_iklan_jenis }} {{ hits.mst_iklan_type }}</span>

        <div class="text-right ma-0 pa-0">
          <v-icon>mdi-eye</v-icon>
          {{ hits.log_iklan_view }}
        </div>

        <div v-if="hits.is_verified">Tiket dibutuhkan untuk Iklan ini</div>

        <h2>{{ hits.judul }}</h2>

        <div>
          Harga Awal - Rp {{ Number(hits.harga_awal).toLocaleString('id-ID') }}
          <v-btn icon @click="info = !info">
            <v-icon small>mdi-information</v-icon>
          </v-btn>
        </div>

        <div
          class="ma-0 pa-0"
          v-if="info"
        >Ikuti tawar bersama dengan kelipatan Rp {{ Number(hits.kelipatan).toLocaleString('id-ID') }}</div>

        <v-card class="d-flex justify-space-between align-center" flat>
          <v-card align="center">
            <v-card-title class="d-block pa-2 teal accent-4 white--text">Tanggal Mulai</v-card-title>
            <div>{{ hits.tanggal_mulai | dateFormat}}</div>
            <div>{{ hits.tanggal_mulai | timeFormat}} {{ waktu }}</div>
          </v-card>
          <v-img src="/img/icons/gradient.jpg" width="100" height="60"></v-img>
          <v-card align="center">
            <v-card-title class="d-block pa-2 red accent-4 white--text">Tanggal Selesai</v-card-title>
            <div>{{ hits.tanggal_selesai | dateFormat}}</div>
            <div>{{ hits.tanggal_selesai | timeFormat}} {{ waktu }}</div>
          </v-card>
        </v-card>

        <v-divider class="mt-4"></v-divider>

        <v-list align="center">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon large color="green">mdi-folder-open-outline</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle>Jumlah Unit</v-list-item-subtitle>
              <v-list-item-subtitle
                v-if="hits.motor_bekas != undefined"
              >{{ hits.motor_bekas.length }} Unit</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title>
                <v-icon large color="green">mdi-google-maps</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle>Lokasi</v-list-item-subtitle>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <div class="teal--text" align="center" v-if="start == false && end == false">
          Tawar Bersama segera dimulai:
          <flip-countdown :deadline="hits.tanggal_mulai | dateTimeFormat(utc)"></flip-countdown>
        </div>
        <div class="teal--text" align="center" v-if="start == true && end == false">
          Tawar Bersama berlangsung:
          <flip-countdown :deadline="hits.tanggal_selesai | dateTimeFormat(utc)"></flip-countdown>
        </div>
        <div align="center" v-if="start == true && end == true">
          <h2 class="teal--text">Tawar Bersama selesai</h2>

          <div v-if="!guest">
            <v-btn
              color="teal"
              dark
              @click="dialogInfo = true"
              class="mx-2"
              v-if="liveBid.length > 0 && (liveBid[0].IdAppUser == user.id || hits.id_app_user == user.id)"
            >{{ liveBid[0].IdAppUser == user.id ? "Info Pemenang" : "Anda menang, klik disini" }}</v-btn>

            <v-dialog v-model="dialogInfo" persistent max-width="500px">
              <v-card>
                <v-toolbar color="teal darken-3" dark>
                  <v-toolbar-title>Info Pemenang Iklan</v-toolbar-title>

                  <div class="flex-grow-1"></div>

                  <v-btn icon @click="dialogInfo = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>

                <div v-if="!guest">
                  <v-card-title
                    v-if="hits.id_app_user == user.id"
                  >Segera hubungi pemenang iklan Anda</v-card-title>
                </div>

                <v-btn value="left" tile color="white" v-if="liveBid.length > 0">
                  <div v-if="!guest">
                    <a
                      :href="'/chat/' + hits.id_app_user"
                      v-if="liveBid[0].IdAppUser == user.id"
                    >Chat Penjual</a>
                  </div>
                  <a :href="'/chat/' + liveBid[0].IdAppUser" v-else>Chat Pemenang</a>
                </v-btn>

                <v-btn value="center" tile color="white">
                  <a :href="'/detail_transaksi/' + orders.id">Detail Transaksi</a>
                </v-btn>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row dense v-if="this.liveBid != ''">
      <v-col cols="12" v-if="hits.id_mst_iklan_jenis > 1">
        <v-list tile dense>
          <v-list-item v-for="(item,i) in liveBid.slice(0,5)" :key="item.Bid">
            <v-list-item-icon class="mx-0" v-if="i+1 == 1">
              <v-icon large color="orange">mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-icon class="mr-2" v-else>
              <v-chip color="green">{{ i + 1 }}</v-chip>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <v-chip
                  small
                  color="red"
                  text-color="white"
                >Rp {{ Number(item.Bid).toLocaleString('id-ID') }}</v-chip>&nbsp; oleh
                <span v-if="!guest">
                  <v-chip small color="red" text-color="white" v-if="user.id == item.IdAppUser">Anda</v-chip>
                </span>
                <v-chip small color="red" text-color="white">{{ item.IdUniq }}</v-chip>
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.CreatedAt.toDate() | datediff }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row dense>
      <v-col cols="12">
        <h2>Daftar Unit</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" sm="3" v-for="(item,i) in motorBekas" :key="i">
        <v-card :to="'/unit_mokas/' + item.id">
          <v-img :src="getImage(item.foto_1)" contain></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row dense>
      <v-col cols="12">
        <v-container fluid>
          <div class="headline">Deskripsi Iklan</div>
          <div>{{ hits.deskripsi }}</div>
        </v-container>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row dense>
      <v-col cols="12">
        <v-container fluid>
          <div class="headline">Informasi Penjual</div>

          <v-list>
            <v-list-item>
              <v-list-item-avatar size="50">
                <v-icon large v-if="hits.photo == 'null'">mdi-account-circle</v-icon>
                <v-img :src="getImage(hits.photo)" contain v-else></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <v-img
                    v-if="appuser.id_mst_user_type == 2"
                    src="/img/verified.png"
                    width="20"
                    height="20"
                    class="float-left"
                    contain
                  ></v-img>
                  {{ appuser.nama }}
                </v-list-item-title>
                <v-list-item-subtitle>Indonesia</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-container>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <p
      class="text-center"
      v-if="hits.id_mst_iklan_jenis > 1"
    >Tanggal diiklankan: {{ hits.created_at | dateTimeFormat(utc) }} {{ waktu }}</p>

    <div v-if="hits.id_mst_iklan_jenis > 1 && start == true">
      <div v-if="!guest">
        <div v-if="hits.id_app_user != user.id">
          <v-btn
            block
            color="teal"
            @click="ikutTB"
            v-if="hits.id_mst_iklan_status == 1"
          >Ikut Tawar Bersama</v-btn>
        </div>
      </div>
    </div>

    <v-bottom-sheet v-model="sheet">
      <v-sheet :height="height">
        <v-container fluid v-if="useTiket">
          <h2>Oops!</h2>

          <div>
            Untuk dapat mengikuti iklan ini perlu memakai tiket. Gunakan Tiket Tawar Bersama pada iklan ini?
            <br />Tiket yang dibutuhkan: 1 Tiket
            <br />
            Jumlah Tiket Tersedia: {{ totalTiket.tersedia }} Tiket
          </div>

          <v-btn block color="success" class="my-4" @click="konfirmasiTiket">Gunakan Tiket Anda</v-btn>
        </v-container>

        <v-list v-if="ikutPenawaran">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Nominal Penawaran</v-list-item-title>
              <v-list-item-subtitle>Masukan nominal penawaran Anda</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="sheet = !sheet">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Kelipatan Tawaran</v-list-item-title>
              <v-list-item-subtitle>Rp {{ Number(hits.kelipatan).toLocaleString('id-ID') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Harga Awal</v-list-item-title>
              <v-list-item-subtitle>Rp {{ Number(hits.harga_awal).toLocaleString('id-ID') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Penawaran Anda</v-list-item-title>

              <v-list-item-subtitle>
                <v-text-field outlined v-model="bid" hide-details readonly></v-text-field>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="minus">
                <v-icon>mdi-minus</v-icon>
              </v-btn>

              <v-btn icon @click="bid += hits.kelipatan">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-btn block color="success" @click="bidding">Konfirmasi Penawaran</v-btn>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
import FlipCountdown from "vue2-flip-countdown";
import "firebase/firestore";
import { db } from "../main";

const fmt = "YYYY-MM-DD HH:mm:ss";

export default {
  name: "detail_paket",
  components: { FlipCountdown },
  data() {
    return {
      id: this.$route.params.id,
      hits: [],
      info: false,
      time: "",
      utc: moment().utcOffset() / 60 - 7,
      waktu: "",
      motorBekas: [],
      sheet: false,
      height: 0,
      useTiket: false,
      ikutPenawaran: false,
      bid: 0,
      tiket: [],
      totalTiket: [],
      minBid: 0,
      penawaran: 0,
      liveBid: [],
      dialogInfo: false,
      orders: [],
      appuser: []
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    getTB() {
      this.axios
        .get("/iklan/v3/iklan_tb_mokas", {
          params: {
            id: this.id
          }
        })
        .then(response => {
          let { data } = response.data;
          this.hits = data;
          this.getUser(this.hits.id_app_user);

          if (this.minBid == 0) {
            this.penawaran =
              Number(this.hits.harga_awal) + Number(this.hits.kelipatan);
            this.bid = this.penawaran;
          } else {
            this.penawaran = Number(this.minBid) + Number(this.hits.kelipatan);
            this.bid = this.penawaran;
          }

          this.$nextTick(() => {
            this.unitMokas();
          });
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    unitMokas() {
      var params = new URLSearchParams();

      for (let index = 0; index < this.hits.motor_bekas.length; index++) {
        const element = this.hits.motor_bekas[index].id_motor_bekas;
        params.append("id", element);
      }

      params.append("limit", this.hits.motor_bekas.length);

      var request = {
        params: params
      };

      this.axios
        .get("/produk/v3/unit_mokas", request)
        .then(response => {
          let { data } = response.data;
          this.motorBekas = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getTiket() {
      this.axios
        .get("/tiket/v3/tiket", {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 1,
            limit: 1
          },
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response.data;
          this.tiket = data[0];

          this.getTotalTiket();
        })
        .catch(error => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message
          });
        });
    },
    getTotalTiket() {
      this.axios
        .get("/tiket/v3/total_tiket", {
          params: {
            id_app_user: this.user.id
          },
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response.data;
          this.totalTiket = data;
          this.height = 190;
          this.useTiket = !this.useTiket;
          this.sheet = !this.sheet;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    konfirmasiTiket() {
      var r = confirm(
        "     Konfirmasi Penggunaan Tiket \nGunakan tiket anda untuk iklan ini?"
      );
      if (r == true) {
        let formData = new FormData();

        formData.append("id_iklan", this.id);
        formData.append("id_app_user", this.user.id);
        formData.append("id_tiket", this.tiket.id);

        this.axios
          .post("/bid/v3/konfirmasi_penggunaan_tiket", formData, {
            headers: { Authorization: "Bearer " + this.user.token }
          })
          .then(response => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message
            });
            this.height = 350;
            this.useTiket = !this.useTiket;
            this.ikutPenawaran = !this.ikutPenawaran;
          })
          .catch(error => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "error",
              text: responses.api_message
            });
          });
      }
    },
    ikutTB() {
      let formData = new FormData();

      formData.append("id_iklan", this.id);
      formData.append("id_app_user", this.user.id);

      this.axios
        .post("/bid/v3/iklan_tb_peserta", formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response;
          if (data.api_status == 1) {
            this.sheet = !this.sheet;
            this.height = 350;
            this.ikutPenawaran = true;
          }
        })
        .catch(error => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message
          });
          if (responses.api_status == 2) {
            this.getTiket();
          }
        });
    },
    minus() {
      if (this.bid > this.penawaran) {
        this.bid -= this.hits.kelipatan;
      }
    },
    GetBid() {
      db.collection("tawar_bersama")
        .doc("iklan")
        .collection(this.id)
        .limit(5)
        .orderBy("Bid", "desc")
        .onSnapshot(querySnapshot => {
          let bidder = [];
          querySnapshot.forEach(doc => {
            bidder.push(doc.data());
            this.minBid = bidder[0].Bid;
            this.penawaran = Number(this.minBid) + Number(this.hits.kelipatan);
            this.bid = this.penawaran;
          });
          this.liveBid = bidder;
        });
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    bidding() {
      let formData = new FormData();
      formData.append("id_iklan", this.id);
      formData.append("bid", this.bid);
      formData.append("id_app_user", this.user.id);
      this.axios
        .post("/bid/v3/iklan_tb_bid", formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message
          });
          this.sheet = false;
          this.playSound("/audio/bid.mpeg");
        })
        .catch(error => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message
          });
        });
    },
    getOrder() {
      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_iklan: this.id
          },
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response.data;
          if (data.length > 0) {
            this.orders = data[0];
          }
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    deleteIklan() {
      var r = confirm("Apakah anda yakin untuk menghapus iklan ini?");
      if (r == true) {
        this.axios
          .delete("/iklan/v3/iklan", {
            headers: { Authorization: "Bearer " + this.user.token },
            params: {
              id: this.$route.params.id
            }
          })
          .then(response => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message
            });
            this.$router.push({ path: "/iklan" });
          })
          .catch(error => {
            let responses = error.response.data;
            console.log(responses);
          });
      }
    },
    getUser(id) {
      this.axios
        .get("/user/v3/user", {
          params: {
            id: id,
            limit: 1
          }
        })
        .then(response => {
          let { data } = response.data;
          this.appuser = data[0];
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses);
        });
    }
  },
  mounted() {
    this.getTB();
    this.GetBid();
    if (!this.guest) {
      this.getOrder();
    }

    if (this.utc == 0) {
      this.waktu = "WIB";
    }
    if (this.utc == 1) {
      this.waktu = "WITA";
    }
    if (this.utc == 2) {
      this.waktu = "WIT";
    }

    var app = this;
    setInterval(function() {
      app.time = moment().format(fmt);
    }, 1000);
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      guest: "auth/guest"
    }),
    start: function() {
      return moment.utc(this.time).isAfter(this.hits.tanggal_mulai);
    },
    end: function() {
      return moment.utc(this.time).isAfter(this.hits.tanggal_selesai);
    }
  },
  filters: {
    datediff: date => {
      return moment(date).from();
    },
    dateFormat: date => {
      return moment.utc(date).format("DD MMM YYYY");
    },
    timeFormat: (date, utc) => {
      return moment
        .utc(date)
        .add(utc, "h")
        .format("HH:mm");
    },
    dateTimeFormat: (date, utc) => {
      return moment
        .utc(date)
        .add(utc, "h")
        .format(fmt);
    },
    tglIklanFormat: (date, utc) => {
      return moment
        .utc(date)
        .add(utc, "h")
        .format("DD MMM YYYY HH:mm");
    }
  }
};
</script>