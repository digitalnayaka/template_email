<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-row dense>
      <v-col cols="12">
        <v-text-field
          outlined
          hide-details
          flat
          label="Search"
          prepend-inner-icon="mdi-magnify"
          v-model="keyword"
          @keyup.enter="listLelang"
          append-icon="mdi-filter"
          @click:append="sheet = !sheet"
          autofocus
          clearable
          @click:clear="clear"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-card outlined tile>
          <v-list>
            <v-list-item>
              <v-list-item-avatar width="120" height="120">
                <v-icon x-large v-if="appuser.photo == 'null'">mdi-account-circle</v-icon>
                <v-img :src="getImage(appuser.photo)" v-else></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-black">
                  <v-avatar size="16" item>
                    <v-img src="/img/verified.png" alt="verified"></v-img>
                  </v-avatar>
                  {{ appuser.nama }}
                </v-list-item-title>

                <v-list-item-subtitle
                  v-if="appuser.length > 0"
                >{{ appuser.nomor_hp.slice(0, -6) }}xxxxxxx</v-list-item-subtitle>

                <v-list-item-title class="font-weight-black">
                  Tanggal:
                  <span class="subtitle-2">{{ tanggal_mulai | dateFormat }}</span>
                </v-list-item-title>
              </v-list-item-content>

              <div class="mt-2">
                <v-btn color="white" @click="dialogHubungi = true" contain>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/hubungi.png"></v-img>
                  </v-list-item-avatar>Hubungi
                </v-btn>

                <v-btn color="white" :to="'/chat/' + appuser.id" class="mx-2">
                  <v-list-item-avatar>
                    <v-img src="/img/icons/pesan.png"></v-img>
                  </v-list-item-avatar>Pesan
                </v-btn>
                <v-btn color="white" @click="dialogBio = true" class="mx-2">
                  <v-list-item-avatar>
                    <v-img src="/img/icons/info_penjual.png"></v-img>
                  </v-list-item-avatar>Info Penjual
                </v-btn>
              </div>
            </v-list-item>
          </v-list>

          <v-dialog v-model="dialogHubungi" persistent max-width="500px">
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

          <v-dialog v-model="dialogBio" persistent max-width="500px">
            <v-card>
              <v-toolbar dark color="teal">
                <v-toolbar-title>Info Penjual</v-toolbar-title>

                <div class="flex-grow-1"></div>

                <v-btn icon @click="dialogBio = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
                {{ appuser.deskripsi }}
               </v-card-text>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense>
      <h3>Tawar Bersama Hari ini</h3>
    </v-row>

    <v-alert
      :value="hits.length == 0 && (keyword != '' || keyword != null)"
      color="warning"
    >Sorry, but no results were found.</v-alert>

    <!-- Hasil pencarian ditampilkan di sini -->

    <v-row dense>
      <v-col cols="6" sm="3" class="pa-2" v-for="item in hits" :key="item._source.id">
        <v-card :to="'/detail_iklan/' + item._source.id">
          <v-img
            class="align-start"
            width="500"
            height="300"
            :src="getThumb(item._source.photo)"
            contain
          >
            <v-card-title>
              <v-chip small left color="red" text-color="white">{{ item._source.mst_iklan_jenis }}</v-chip>
              <v-chip
                small
                left
                color="orange"
                text-color="white"
                v-if="item._source.id_mst_iklan_type == 1"
              >{{ item._source.mst_iklan_type }}</v-chip>
              <v-chip
                small
                left
                color="pink"
                text-color="white"
                v-if="item._source.id_mst_iklan_type == 2"
              >{{ item._source.mst_iklan_type }}</v-chip>
              <v-chip
                small
                left
                color="green"
                text-color="white"
                v-if="item._source.is_verified == true"
              >Tiket</v-chip>
            </v-card-title>
          </v-img>

          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-black">{{ item._source.judul }}</v-list-item-title>
                <v-list-item-subtitle v-if="item._source.harga_saat_ini == null">Harga awal</v-list-item-subtitle>
                <v-list-item-subtitle v-else>Harga saat ini</v-list-item-subtitle>
                <v-list-item-subtitle
                  style="color:red"
                  v-if="item._source.harga_saat_ini == null"
                >Rp {{ Number(item._source.harga_awal).toLocaleString('id-ID') }}</v-list-item-subtitle>
                <v-list-item-subtitle
                  style="color:red"
                  v-else
                >Rp {{ Number(item._source.harga_saat_ini).toLocaleString('id-ID') }}</v-list-item-subtitle>

                <v-list-item-subtitle>
                  <v-icon small>mdi-calendar</v-icon>
                  {{ item._source.tanggal_mulai | dateTimeFormat(utc) }} {{ waktu }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-pagination v-model="page" @input="listLelang" :length="lengthPage" :total-visible="5"></v-pagination>

    <v-bottom-sheet v-model="sheet">
      <v-sheet :height="selected == '1' ? 190 : 310">
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <h3>Filter</h3>
              </v-list-item-title>
              <v-list-item-subtitle>Tipe Iklan</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn text x-small @click="resetFilter">Reset Filter</v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-radio-group v-model="selected" row dense>
                <v-radio label="Semua" value="0"></v-radio>
                <v-radio label="Harga Pas" value="1"></v-radio>
                <v-radio label="Tawar Bersama" value="2"></v-radio>
              </v-radio-group>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="selected != '1'">
            <v-list-item-content>
              <v-list-item-title>Urutkan Berdasarkan</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="selected != '1'">
            <v-list-item-content>
              <v-radio-group v-model="order" row dense>
                <v-radio label="Postingan Terbaru" value="posting_terbaru"></v-radio>
                <v-radio label="Tawar Bersama dimulai" value="tanggal_mulai"></v-radio>
              </v-radio-group>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-btn block shaped color="success" @click="saveFilter">Simpan</v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "listLelang",
  data() {
    return {
      id_app_user: this.$route.params.id,
      tanggal_mulai: this.$route.query.tgl,
      utc: moment().utcOffset() / 60 - 7,
      hits: [],
      appuser: [],
      keyword: "",
      page: 1,
      lengthPage: 0,
      limit: 20,
      dialogHubungi: false,
      dialogBio: false,
      offset: 0,
      total: 0,
      waktu: "",
      sheet: false,
      selected: "2",
      order: "tanggal_mulai",
    };
  },
  methods: {
    getUser() {
      this.axios
        .get("/user/v3/user", {
          params: {
            id: this.id_app_user,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.appuser = data[0];
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    listLelang() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/search/v3/search", {
          params: {
            id_app_user: this.id_app_user,
            tanggal_mulai: this.tanggal_mulai,
            id_mst_iklan_status: 1,
            sort: this.order,
            search: this.keyword,
            offset: offset,
            limit: this.limit,
          },
        })
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits;

          this.total = data.hits.total.value;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    clear() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/search/v3/search", {
          params: {
            id_app_user: this.id_app_user,
            tanggal_mulai: this.tanggal_mulai,
            id_mst_iklan_status: 1,
            sort: this.order,
            offset: offset,
            limit: this.limit,
          },
        })
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits;

          this.total = data.hits.total.value;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    saveFilter() {
      this.listLelang();
      this.sheet = false;
    },
    resetFilter() {
      this.selected = "0";
      this.order = "posting_terbaru";
    },
  },
  mounted() {
    this.listLelang();
    this.getUser();

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
  filters: {
    dateFormat: (date) => {
      return moment.utc(date).format("DD-MMM-YYYY");
    },
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM, HH:mm");
    },
  },
};
</script>