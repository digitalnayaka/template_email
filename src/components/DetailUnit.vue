<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-list dense subheader>
        <v-subheader class="text-h6">Detail Motor</v-subheader>

        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_id_iklan.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>ID Motor</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{ unitMokas.id }}</v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>
        <!-- <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_tipe.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>No. Polisi</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{ unitMokas.nomor_polisi }}</v-list-item-action>
        </v-list-item>
        <v-divider></v-divider> -->
        <!-- <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_tipe.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Status Unit</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{ unitMokas.status }}</v-list-item-action>
        </v-list-item> -->

        <!-- <v-divider></v-divider>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_tipe.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Deskripsi</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{ unitMokas.deskripsi }}</v-list-item-action>
        </v-list-item> -->
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_merek.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Merk</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{ unitMokas.merk }}</v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_tipe.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Tipe</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{ unitMokas.type }}</v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_tahun.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Tahun</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{ unitMokas.tahun }}</v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_odometer.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Odometer</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{ unitMokas.odometer }} KM</v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_warna.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Warna</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{ unitMokas.warna }}</v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_cc_mesin.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>CC Mesin</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{ unitMokas.odometer }} CC</v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_transmisi.webp"></v-img>
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
            <v-img src="/img/icons/icon_lokasi_samsat.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Lokasi Samsat</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{ unitMokas.lokasi_samsat }}</v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_lokasi.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Lokasi Motor</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{ unitMokas.lokasi }}</v-list-item-action>
        </v-list-item>
      </v-list>
    </v-col>

    <v-col cols="12" sm="6">
      <v-list dense subheader>
        <v-subheader class="text-h6">Kelengkapan Dokumen</v-subheader>

        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_stnk.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>STNK</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action
            >{{ unitMokas.lembar_stnk ? "ADA" : "TIDAK" }}
          </v-list-item-action>
        </v-list-item>
        <v-divider> </v-divider>
        <v-list-item v-if="unitMokas.tanggal_stnk != null">
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_stnk.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Tanggal Selesai STNK</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            {{ unitMokas.tanggal_stnk | dateFormat }}
          </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_lembar_pajak.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Lembar Pajak</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action
            >{{ unitMokas.lembar_pajak ? "ADA" : "TIDAK" }}
          </v-list-item-action>

          <!-- <v-list-item-action v-if="unitMokas.id_mst_motor_bekas_status == 1">{{
            unitMokas.lembar_pajak ? "ADA" : "TIDAK"
          }}</v-list-item-action> -->
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item v-if="unitMokas.tanggal_pajak != null">
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_lembar_pajak.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Tanggal Selesai Pajak</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            {{ unitMokas.tanggal_pajak | dateFormat }}
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="/img/icons/icon_bpkb.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>BPKB</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>{{
            unitMokas.lembar_bpkb ? "ADA" : "TIDAK"
          }}</v-list-item-action>
        </v-list-item>
      </v-list>

      <!-- <div v-if="unitMokas.id_mst_motor_bekas_status == 1">
        <v-btn block color="teal" dark :to="'/toko/add-ads?id=' + unitMokas.id">Iklankan</v-btn>
      </div>
      <br />
      <div
        v-if="unitMokas.id_mst_motor_bekas_status == 2 || unitMokas.id_mst_motor_bekas_status == 4"
      >
        <v-btn block color="teal" dark :to="'/produk/' + urlSeller + '/' + urlJudul">Lihat Iklan</v-btn>
      </div> -->
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment-timezone";
export default {
  name: "detail-unit",
  props: ["unitMokas", "hits"],
  // data: () => ({
  //   urlSeller: this.unitMokas.appuser.toLowerCase().replace(" ", "-"),
  //   urlJudul: this.hits.judul.toLowerCase().replace(" ", "-"),
  // }),
  filters: {
    dateFormat: (date) => {
      return moment.utc(date).format("DD MMM YYYY");
    },
    timeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("HH:mm");
    },
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY HH:mm");
    },
  },
};
</script>