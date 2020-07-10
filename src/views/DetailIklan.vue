<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <div v-if="!guest">
        <div v-if="user.id == iklan.id_app_user && hits.id_mst_iklan_status == 1">
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
            v-for="(item,index) in fotos"
            :key="index"
            :src="getImage(item.src)"
            reverse-transition="fade-transition"
            transition="fade-transition"
            contain
          >
            <v-card-title>
              <v-chip small left color="primary" text-color="white">ID Iklan: {{ id }}</v-chip>
            </v-card-title>
            <v-img src="/img/sold_out.png" v-if="iklan.id_mst_iklan_status == 2" contain></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="12" sm="6" xs="6">
        <v-card class="d-flex justify-space-between align-center" flat>
          <v-card align="center">
            <v-card-title class="teal accent-4 white--text">Tanggal Mulai</v-card-title>
            <div>{{ hits.tanggal_mulai | dateFormat}}</div>
            <div>{{ hits.tanggal_mulai | timeFormat}} {{ waktu }}</div>
          </v-card>
          <v-img src="/img/icons/gradient.jpg" width="100" height="100"></v-img>

          <v-card align="center">
            <v-card-title class="red accent-4 white--text">Tanggal Selesai</v-card-title>
            <div>{{ hits.tanggal_selesai | dateFormat}}</div>
            <div>{{ hits.tanggal_selesai | timeFormat}} {{ waktu }}</div>
          </v-card>
        </v-card>

        <v-divider class="mt-4"></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-content class="text-center">
              <v-list-item-title>
                <v-icon large color="green">mdi-speedometer</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle>Kilometer</v-list-item-subtitle>
              <v-list-item-subtitle>{{ unitMokas.odometer }} KM</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-content class="text-center">
              <v-list-item-title>
                <v-icon large color="green">mdi-calendar-month</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle>Tahun</v-list-item-subtitle>
              <v-list-item-subtitle>{{ unitMokas.tahun }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-content class="text-center">
              <v-list-item-title>
                <v-btn class="ma-2" text icon color="blue lighten-2" @click="dialog_dokumen = true">
                  <v-icon large color="green">mdi-folder-open-outline</v-icon>
                </v-btn>
              </v-list-item-title>
              <v-list-item-subtitle>Dokumen</v-list-item-subtitle>
              <v-list-item-subtitle>{{ dokumen.length }} / 3</v-list-item-subtitle>
            </v-list-item-content>

            <v-dialog v-model="dialog_dokumen" max-width="350">
              <v-card>
                <v-card-title primary-title>Daftar Dokumen</v-card-title>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Surat Tanda Nomer Kendaraan</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox v-model="unitMokas.lembar_stnk" readonly></v-checkbox>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Surat Ketetapan Pajak</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox v-model="unitMokas.lembar_pajak" readonly></v-checkbox>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Buku Pemilik Kendaraan Bermotor</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox v-model="unitMokas.lembar_bpkb" readonly></v-checkbox>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-dialog>

            <v-list-item-content class="text-center">
              <v-list-item-title>
                <v-icon large color="green">mdi-google-maps</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle>Lokasi</v-list-item-subtitle>
              <v-list-item-subtitle>{{ unitMokas.lokasi }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-content class="text-center" v-if="iklan.mst_iklan_type == 'Paketan'">
              <v-list-item-title>
                <v-icon large color="green">mdi-counter</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle>Jumlah Unit</v-list-item-subtitle>
              <v-list-item-subtitle>{{ iklan.motor_bekas.length }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-card flat>
          <v-card-title class="justify-center">
            <div class="headline">Detail Motor</div>
          </v-card-title>

          <v-card-text>
            <v-row dense>
              <v-col cols="6">ID Motor</v-col>
              <v-col cols="6">{{ unitMokas.id }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Merk:</v-col>
              <v-col cols="6">{{ unitMokas.merk }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Tipe:</v-col>
              <v-col cols="6">{{ unitMokas.type }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Warna:</v-col>
              <v-col cols="6">{{ unitMokas.warna }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">CC Mesin:</v-col>
              <v-col cols="6">{{ unitMokas.cc }} CC</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Transmisi:</v-col>
              <v-col cols="6">{{ unitMokas.transmisi }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Jenis Motor:</v-col>
              <v-col cols="6">{{ unitMokas.jenis_motor }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Tanggal Selesai STNK:</v-col>
              <v-col
                cols="6"
                v-if="unitMokas.tanggal_stnk != null"
              >{{ unitMokas.tanggal_stnk | dateFormat }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Tanggal Selesai Pajak:</v-col>
              <v-col
                cols="6"
                v-if="unitMokas.tanggal_pajak != null"
              >{{ unitMokas.tanggal_pajak | dateFormat }}</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" sm="6">
        <div v-if="iklan.id_mst_iklan_jenis == 1">
          <span class="subheading red--text float-left">Harga Pas</span>

          <div class="text-right ma-0 pa-0">
            <v-icon>mdi-eye</v-icon>
            {{ iklan.log_iklan_view }}
          </div>

          <h2>{{ iklan.judul }}</h2>

          <span>Rp {{ Number(iklan.harga).toLocaleString('id-ID') }}</span>
        </div>

        <div v-else>
          <span
            class="subheading red--text float-left"
          >Tawar Bersama {{ iklan.mst_iklan_type }} {{ iklan.mst_type_tb }} {{ hits.mst_type_tb }}</span>

          <div class="text-right ma-0 pa-0">
            <v-icon>mdi-eye</v-icon>
            {{ iklan.log_iklan_view }}
          </div>

          <div v-if="iklan.is_verified">Tiket dibutuhkan untuk Iklan ini</div>

          <h2>{{ iklan.judul }}</h2>

          <div>
            Harga Awal - Rp {{ Number(iklan.harga_awal).toLocaleString('id-ID') }}
            <v-btn icon @click="display = !display">
              <v-icon small>mdi-information</v-icon>
            </v-btn>
          </div>

          <div
            v-if="display"
            class="ma-0 pa-0"
          >Ikuti tawar bersama dengan kelipatan Rp {{ Number(iklan.kelipatan).toLocaleString('id-ID') }}</div>
        </div>
      </v-col>

      <v-col cols="12" sm="6" v-if="iklan.id_mst_iklan_jenis > 1">
        <div class="teal--text" align="center" v-if="start == false && end == false">
          Tawar Bersama segera dimulai:
          <flip-countdown :deadline="hits.tanggal_mulai"></flip-countdown>
        </div>

        <div class="teal--text" align="center" v-if="start == true && end == false">
          Tawar Bersama berlangsung:
          <flip-countdown :deadline="hits.tanggal_selesai"></flip-countdown>
        </div>

        <div align="center" v-if="start == true && end == true">
          <h2 class="teal--text">Tawar Bersama selesai</h2>

          <div v-if="!guest">
            <v-btn
              color="teal"
              dark
              @click="dialogInfo = true"
              class="mx-2"
              v-if="liveBid.length > 0 && (liveBid[0].IdAppUser == user.id || iklan.id_app_user == user.id)"
            >{{ liveBid[0].IdAppUser == user.id ? "Anda menang, klik disini" : "Info Pemenang" }}</v-btn>

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
                      :href="'/chat/' + iklan.id_app_user"
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

    <v-divider></v-divider>

    <v-row dense v-if="this.liveBid != ''">
      <v-col cols="6" v-if="iklan.id_mst_iklan_jenis > 1">
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
        <v-container fluid>
          <div class="headline">Deskripsi Iklan</div>
          <div>{{ iklan.deskripsi }}</div>
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
                <v-icon large v-if="hits.app_user_photo == 'null'">mdi-account-circle</v-icon>
                <v-img :src="getImage(hits.app_user_photo)" contain v-else></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <v-img
                    v-if="hits.id_mst_user_type == 2"
                    src="/img/verified.png"
                    width="20"
                    height="20"
                    class="float-left"
                    contain
                  ></v-img>
                  {{ hits.app_user }}
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
      v-if="iklan.id_mst_iklan_jenis > 1"
    >Tanggal diiklankan: {{ iklan.created_at | dateTimeFormat(utc) }} {{ waktu }}</p>

    <p
      class="text-center red--text"
      v-else
    >Tanggal Expired: {{ iklan.expired_at | dateTimeFormat(utc) }} {{ waktu }}</p>

    <div v-if="iklan.id_mst_iklan_jenis > 1 && start == true">
      <div v-if="!guest">
        <div v-if="iklan.id_app_user != user.id">
          <v-btn
            block
            color="teal"
            @click="ikutTB"
            v-if="iklan.id_mst_iklan_status == 1"
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
              <v-list-item-subtitle>Rp {{ Number(iklan.kelipatan).toLocaleString('id-ID') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Harga Awal</v-list-item-title>
              <v-list-item-subtitle>Rp {{ Number(iklan.harga_awal).toLocaleString('id-ID') }}</v-list-item-subtitle>
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

              <v-btn icon @click="bid += iklan.kelipatan">
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

    <div v-if="iklan.id_mst_iklan_jenis == 1">
      <div v-if="!guest">
        <div v-if="iklan.id_app_user == user.id">
          <v-btn
            block
            color="teal"
            @click="terjual"
            v-if="iklan.id_mst_iklan_status != 2"
          >Set Iklan Terjual</v-btn>
        </div>

        <div v-else>
          <v-row>
            <v-col cols="6">
              <v-btn block color="primary" @click="dialogInfo2 = true">Hubungi</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="teal" :to="'/chat2/' + iklan.id_app_user">Pesan</v-btn>
            </v-col>
          </v-row>
          <v-dialog v-model="dialogInfo2" persistent max-width="500px">
            <v-card>
              <v-toolbar dark color="teal">
                <v-toolbar-title>Hubungi</v-toolbar-title>

                <div class="flex-grow-1"></div>

                <v-btn icon @click="dialogHubungi = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-title>Tanyakan lebih lanjut kepada penjual</v-card-title>

              <div align="center">
                <v-btn tile color="white" class="mx-2">
                  <a :href="'tel:' + appuser.nomor_hp">Telepon</a>
                </v-btn>

                <v-btn tile color="white" class="mx-2">
                  <a :href="'sms:' + appuser.nomor_hp">SMS</a>
                </v-btn>

                <v-btn tile color="white" class="mx-2">
                  <a
                    :href="'https://api.whatsapp.com/send?phone=' + appuser.nomor_hp + '&text=Hai, saya dari aplikasi SiMotor'"
                  >WhatsApp Now</a>
                </v-btn>
              </div>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "firebase/firestore";
import { db } from "../main";
import moment from "moment-timezone";
import FlipCountdown from "vue2-flip-countdown";

const fmt = "YYYY-MM-DD HH:mm:ss";

export default {
  name: "detail_iklan",
  components: { FlipCountdown },
  data() {
    return {
      id: this.$route.params.id,
      hits: [],
      iklan: [],
      display: false,
      unitMokas: [],
      fotos: [],
      dokumen: [],
      date: new Date().toISOString(),
      sheet: false,
      height: 0,
      tiket: [],
      totalTiket: [],
      useTiket: false,
      ikutPenawaran: false,
      penawaran: 0,
      minBid: 0,
      dialogInfo: false,
      dialogDokumen: false,
      liveBid: [],
      bid: 0,
      utc: moment().utcOffset() / 60 - 7,
      waktu: "",
      idpaket: [],
      dialog_dokumen: false,
      time: "",
      orders: [],
      dialogInfo2: false,
      appuser: []
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    getDtlIklan() {
      this.axios
        .get("/search/v1/search", {
          params: {
            id: this.id,
            limit: 1
          }
        })
        .then(response => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits[0]._source;
          this.getUser(this.hits.id_app_user);
          this.unit_mokas(this.hits.unit_motor_bekas[0].id);
          if (this.hits.id_mst_iklan_jenis == 1) {
            this.getHP(this.id);
          } else {
            this.getTB(this.id);
          }
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    unit_mokas(id) {
      this.axios
        .get("/produk/v1/unit_mokas", {
          params: {
            id: id,
            limit: 1
          }
        })
        .then(response => {
          let { data } = response.data;
          this.unitMokas = data[0];
          let foto1 = this.unitMokas.foto_1;
          let foto2 = this.unitMokas.foto_2;
          let foto3 = this.unitMokas.foto_3;
          let foto4 = this.unitMokas.foto_4;
          let foto5 = this.unitMokas.foto_5;
          this.fotos.push(
            { src: foto1 },
            { src: foto2 },
            { src: foto3 },
            { src: foto4 },
            { src: foto5 }
          );
          let stnk = this.unitMokas.lembar_stnk;
          let bpkb = this.unitMokas.lembar_bpkb;
          let pajak = this.unitMokas.lembar_pajak;
          if (stnk == true) {
            this.dokumen.push(stnk);
          }
          if (bpkb == true) {
            this.dokumen.push(bpkb);
          }
          if (pajak == true) {
            this.dokumen.push(pajak);
          }
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getHP(id) {
      this.axios
        .get("/iklan/v1/iklan_hp_mokas", {
          params: {
            id: id
          }
        })
        .then(response => {
          let { data } = response.data;
          this.iklan = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getTB(id) {
      this.axios
        .get("/iklan/v1/iklan_tb_mokas", {
          params: {
            id: id
          }
        })
        .then(response => {
          let { data } = response.data;
          this.iklan = data;
          if (this.iklan.motor_bekas.length > 1) {
            this.idpaket = data.motor_bekas;
          }
          if (this.minBid == 0) {
            this.penawaran =
              Number(this.iklan.harga_awal) + Number(this.iklan.kelipatan);
            this.bid = this.penawaran;
          } else {
            this.penawaran = Number(this.minBid) + Number(this.iklan.kelipatan);
            this.bid = this.penawaran;
          }
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getTiket() {
      this.axios
        .get("/tiket/v1/tiket", {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 1,
            limit: 1
          }
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
        .get("/tiket/v1/total_tiket", {
          params: {
            id_app_user: this.user.id
          }
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
          .post("/bid/v1/konfirmasi_penggunaan_tiket", formData, {
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
        .post("/bid/v1/iklan_tb_peserta", formData, {
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
        this.bid -= this.iklan.kelipatan;
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
            this.penawaran = Number(this.minBid) + Number(this.iklan.kelipatan);
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
        .post("/bid/v1/iklan_tb_bid", formData, {
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
    terjual() {
      var r = confirm("Konfirmasi untuk merubah status iklan ke terjual?");
      if (r == true) {
        let formData = new FormData();

        formData.append("id", this.id);
        formData.append("id_mst_iklan_status", 2);

        this.axios
          .put("iklan/v1/iklan_hp_mokas_satuan", formData, {
            headers: { Authorization: "Bearer " + this.user.token }
          })
          .then(response => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message
            });
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
      }
    },
    getOrder() {
      this.axios
        .get("/transaksi/v1/order", {
          params: {
            id_iklan: this.$route.params.id
          }
        })
        .then(response => {
          let { data } = response.data;
          if (data.length > 0) {
            this.orders = data[0];
          }
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    deleteIklan() {
      var r = confirm("Apakah anda yakin untuk menghapus iklan ini?");
      if (r == true) {
        this.axios
          .delete("/iklan/v1/iklan", {
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
        .get("/user/v1/user", {
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
  created() {
    this.getDtlIklan();
    this.GetBid();
    this.getOrder();
  },
  mounted() {
    var app = this;
    setInterval(() => {
      app.time = moment().format(fmt);
    }, 1000);

    if (this.utc == 0) {
      this.waktu = "WIB";
    }
    if (this.utc == 1) {
      this.waktu = "WITA";
    }
    if (this.utc == 2) {
      this.waktu = "WIT";
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      guest: "auth/guest"
    }),
    now: function() {
      return this.time;
    },
    start: function() {
      return moment.utc(this.time).isAfter(this.iklan.tanggal_mulai);
    },
    end: function() {
      return moment.utc(this.time).isAfter(this.iklan.tanggal_selesai);
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
        .format("DD MMM YYYY HH:mm");
    }
  }
};
</script>