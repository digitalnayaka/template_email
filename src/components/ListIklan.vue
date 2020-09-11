<template>
  <v-container fluid>
    <v-card outlined tile class="ma-0" :to="'/detail_iklan/' + item._source.id">
      <v-img width="500" height="300" :src="getThumb(item._source.photo)" contain>
        <v-card-title>
          <v-chip
            small
            left
            :color="item._source.id_mst_iklan_jenis == 1 ? 'teal' : 'red'"
            text-color="white"
          >{{ item._source.mst_iklan_jenis }}</v-chip>
          <v-chip
            small
            left
            color="orange"
            text-color="white"
            v-if="item._source.id_mst_iklan_jenis > 1 && item._source.id_mst_iklan_type == 1"
          >{{ item._source.mst_iklan_type }}</v-chip>
          <v-chip
            small
            left
            color="pink"
            text-color="white"
            v-if="item._source.id_mst_iklan_jenis > 1 && item._source.id_mst_iklan_type == 2"
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

      <v-list dense class="ma-0 pa-0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-black">{{ item._source.judul }}</v-list-item-title>

            <v-list-item-subtitle
              v-if="item._source.harga_saat_ini == null && item._source.id_mst_iklan_jenis == 1"
            >Harga</v-list-item-subtitle>
            <v-list-item-subtitle
              v-if="item._source.harga_saat_ini == null && item._source.id_mst_iklan_jenis > 1"
            >Harga awal</v-list-item-subtitle>
            <v-list-item-subtitle
              v-if="item._source.harga_saat_ini != null && item._source.id_mst_iklan_jenis > 1"
            >Harga saat ini</v-list-item-subtitle>

            <v-list-item-subtitle
              class="red--text"
              v-if="item._source.harga_saat_ini == null && item._source.id_mst_iklan_jenis == 1"
            >Rp {{ Number(item._source.harga).toLocaleString('id-ID') }}</v-list-item-subtitle>
            <v-list-item-subtitle
              class="red--text"
              v-if="item._source.harga_saat_ini == null && item._source.id_mst_iklan_jenis > 1"
            >Rp {{ Number(item._source.harga_awal).toLocaleString('id-ID') }}</v-list-item-subtitle>
            <v-list-item-subtitle
              class="red--text"
              v-if="item._source.harga_saat_ini != null && item._source.id_mst_iklan_jenis > 1"
            >Rp {{ Number(item._source.harga_saat_ini).toLocaleString('id-ID') }}</v-list-item-subtitle>

            <v-list-item-subtitle>
              <v-avatar size="16" item>
                <v-img src="/img/verified.png" alt="verified"></v-img>
              </v-avatar>
              {{ item._source.app_user }}
            </v-list-item-subtitle>

            <v-list-item-subtitle v-if="item._source.id_mst_iklan_jenis == 2">
              <v-icon small>mdi-calendar</v-icon>
              {{ item._source.tanggal_mulai | dateTimeFormat(utc) }} {{ waktu }}
            </v-list-item-subtitle>

            <v-list-item-subtitle
              v-if="item._source.id_mst_iklan_status == 6"
              class="font-italic teal--text"
            >Belum Terjual</v-list-item-subtitle>

            <v-list-item-subtitle
              v-if="item._source.id_mst_iklan_status == 2"
              class="font-italic teal--text"
            >Terjual</v-list-item-subtitle>

            <v-list-item-subtitle
              v-if="item._source.id_mst_iklan_status == 3"
              class="font-italic blue--text"
            >Serah Terima</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "list-iklan",
  props: ["item"],
  data: () => ({
    utc: moment().utcOffset() / 60 - 7,
    waktu: "",
  }),
  mounted() {
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
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM, HH:mm");
    },
  },
};
</script>