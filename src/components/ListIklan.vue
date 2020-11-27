<template>
  <v-container fluid>
    <v-card
      class="rounded-lg mx-auto my-12"
      outlined
      tile
      :href="'/iklan/' + item._source.id"
    >
      <v-img
        :src="getThumb(item._source.photo)"
        height="230"
        contain
        class="rounded-lg"
      >
        <v-card-title>
          <v-chip
            small
            :color="item._source.id_mst_iklan_jenis == 1 ? 'teal' : 'red'"
            dark
            >{{ item._source.mst_iklan_jenis }}</v-chip
          >

          <v-chip
            small
            color="orange"
            dark
            v-if="
              item._source.id_mst_iklan_jenis > 1 &&
              item._source.id_mst_iklan_type == 1
            "
            >{{ item._source.mst_iklan_type }}</v-chip
          >

          <v-chip
            small
            color="pink"
            dark
            v-if="
              item._source.id_mst_iklan_jenis > 1 &&
              item._source.id_mst_iklan_type == 2
            "
            >{{ item._source.mst_iklan_type }}</v-chip
          >

          <v-chip
            small
            color="green"
            dark
            v-if="item._source.is_verified == true"
            >Tiket</v-chip
          >
        </v-card-title>
      </v-img>

      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-black">{{
              item._source.judul
            }}</v-list-item-title>

            <v-list-item-subtitle
              v-if="
                item._source.harga_saat_ini == null &&
                item._source.id_mst_iklan_jenis == 1
              "
              >Harga</v-list-item-subtitle
            >
            <v-list-item-subtitle
              v-if="
                item._source.harga_saat_ini == null &&
                item._source.id_mst_iklan_jenis > 1
              "
              >Harga awal</v-list-item-subtitle
            >
            <v-list-item-subtitle
              v-if="
                item._source.harga_saat_ini != null &&
                item._source.id_mst_iklan_jenis > 1
              "
              >Harga saat ini</v-list-item-subtitle
            >

            <v-list-item-subtitle
              class="red--text"
              v-if="
                item._source.harga_saat_ini == null &&
                item._source.id_mst_iklan_jenis == 1
              "
              >Rp
              {{
                Number(item._source.harga).toLocaleString("id-ID")
              }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              class="red--text"
              v-if="
                item._source.harga_saat_ini == null &&
                item._source.id_mst_iklan_jenis > 1
              "
              >Rp
              {{
                Number(item._source.harga_awal).toLocaleString("id-ID")
              }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              class="red--text"
              v-if="
                item._source.harga_saat_ini != null &&
                item._source.id_mst_iklan_jenis > 1
              "
              >Rp
              {{
                Number(item._source.harga_saat_ini).toLocaleString("id-ID")
              }}</v-list-item-subtitle
            >

            <v-list-item-subtitle>
              <v-avatar size="16" item v-if="item._source.id_mst_user_type == 2">
                <v-img src="/img/verified.png" alt="verified"></v-img>
              </v-avatar>
              {{ item._source.app_user }}
            </v-list-item-subtitle>

            <v-list-item-action-text v-if="item._source.id_mst_iklan_jenis == 2">
              <v-icon small>mdi-calendar</v-icon>
              {{ item._source.tanggal_mulai | dateTimeFormat(utc) }}
              {{ timezone }}
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment-timezone";

export default {
  name: "list-iklan",
  props: ["item", "utc", "timezone"],
  methods: {
    ...mapActions({
      setAds: "ads/setAds",
    }),
    go(seller, judul, id) {
      this.setAds(id);
      let urlSeller = seller.toLowerCase().replaceAll(" ", "-");
      let urlJudul = judul.toLowerCase().replaceAll(" ", "-");
      this.$router.push("/produk/" + urlSeller + "/" + urlJudul);
    },
  },
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM, HH:mm");
    },
  },
};
</script>