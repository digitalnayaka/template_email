<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <div v-if="!guest">
        <div v-if="user.id == unitMokas.id_app_user">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon class="mx-2" v-on="on" @click="getBarcode">
                <v-icon large>mdi-barcode-scan</v-icon>
              </v-btn>
            </template>
            <span>Barcode</span>
          </v-tooltip>

          <v-dialog v-model="dialog">
            <v-card v-html="barcode"></v-card>
          </v-dialog>

          <v-btn
            icon
            class="mx-2"
            v-if="unitMokas.id_mst_motor_bekas_status == 1 || unitMokas.id_mst_motor_bekas_status == 3 || unitMokas.id_mst_motor_bekas_status == 5"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon class="mx-2" v-on="on" :to="'/edit_unit/' + id">
                  <v-icon large>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>
          </v-btn>

          <v-btn
            icon
            class="mx-2"
            v-if="unitMokas.id_mst_motor_bekas_status == 1 || unitMokas.id_mst_motor_bekas_status == 3"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon class="mx-2" v-on="on" @click="deleteUnit">
                  <v-icon large>mdi-trash-can</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-row dense>
      <v-col cols="12" sm="6">
        <v-carousel cycle>
          <v-carousel-item
            v-for="(item,index) in fotos"
            :key="index"
            :src="getImage(item.src)"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="12" sm="6">
        <v-list>
          <v-subheader class="text-h6">Kelengkapan Dokumen</v-subheader>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_stnk.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>STNK</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.lembar_stnk ? "ADA" : "TIDAK" }}</v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_lembar_pajak.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Lembar Pajak</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.lembar_pajak ? "ADA" : "TIDAK" }}</v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_bpkb.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>BPKB</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.lembar_bpkb ? "ADA" : "TIDAK" }}</v-list-item-action>
          </v-list-item>

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
        </v-list>

        <v-divider></v-divider>

        <v-card flat>
          <v-card-title class="layout justify-center">
            <div class="headline text-center">Detail Motor</div>
          </v-card-title>

          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_id_iklan.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>ID Motor</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.id }}</v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_merek.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Merk</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.merk }}</v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_tipe.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Tipe</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.type }}</v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_tahun.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Tahun</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.tahun }}</v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_odometer.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Odometer</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.odometer }} KM</v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_warna.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Warna</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.warna }}</v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_cc_mesin.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>CC Mesin</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.odometer }} CC</v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_transmisi.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Transmisi</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.transmisi }}</v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_jenis_motor.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Jenis Motor</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.jenis_motor }}</v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_lokasi_samsat.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Lokasi Samsat</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.lokasi_samsat }}</v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/icons/icon_lokasi.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Lokasi</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>{{ unitMokas.lokasi }}</v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense v-if="!guest">
      <v-col cols="12">
        <div v-if="unitMokas.id_mst_motor_bekas_status == 1">
          <v-btn block color="teal" :to="'/tambah-iklan?id=' + unitMokas.id">Iklankan</v-btn>
        </div>

        <div
          v-if="unitMokas.id_mst_motor_bekas_status == 2 || unitMokas.id_mst_motor_bekas_status == 4"
        >
          <v-btn
            block
            color="teal"
            :to="'/detail_iklan/' + iklan.id_iklan"
            v-if="hits.id_mst_iklan_type != 2"
          >Lihat Iklan</v-btn>
          <v-btn block color="teal" :to="'/detail_paket/' + iklan.id_iklan" v-else>Lihat Iklan</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "detail_unit",
  data() {
    return {
      id: this.$route.params.id,
      unitMokas: [],
      iklan: [],
      hits: [],
      fotos: [],
      dokumen: [],
      dialog_dokumen: false,
      barcode: null,
      dialog: false,
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    async unit_mokas() {
      await this.axios
        .get("/produk/v3/unit_mokas", {
          params: {
            id: this.id,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.unitMokas = data[0];
          this.linkIklan(this.unitMokas.id);

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
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    linkIklan(id) {
      this.axios
        .get("/iklan/v3/link_iklan_tb", {
          params: {
            id_motor_bekas: id,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.iklan = data[0];

          this.getDtlIklan(this.iklan.id_iklan);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getDtlIklan(id) {
      this.axios
        .get("/search/v3/search", {
          params: {
            id: id,
            limit: 1,
          },
        })
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits[0]._source;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getBarcode() {
      this.axios
        .get("/produk/v3/barcode", {
          params: {
            id: this.id,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.barcode = data;
          this.dialog = true;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    deleteUnit() {
      var r = confirm("Yakin akan dihapus");
      if (r == true) {
        let formData = new FormData();

        formData.append("id", this.id);
        formData.append("limit", 1);

        this.axios
          .post("/produk/v3/unit_mokas_delete", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.unitMokas = data.data;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.$router.push({ path: "/garasi" });
          })
          .catch((error) => {
            let responses = error.response.data;
            console.log(responses.api_message);
          });
      }
    },
  },
  created() {
    this.unit_mokas();
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      guest: "auth/guest",
    }),
  },
  filters: {
    countDoc(doc) {
      if (doc !== null) {
        return true;
      }
    },
  },
};
</script>