<template>
  <v-container fluid>
    <v-card>
      <v-card-subtitle class="pb-0">Kode Tiket</v-card-subtitle>
      <v-card-title class="py-0">{{ item.code }}</v-card-title>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Harga</v-list-item-subtitle>
            <v-list-item-title
              class="teal--text"
            >Rp {{ Number(item.harga_beli).toLocaleString("id-ID") }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text>Masa Berlaku</v-list-item-action-text>
            <div class="red--text">{{ item.expired_at | dateTimeFormat(utc) }} {{ waktu }}</div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "list-tiket",
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
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY, HH:mm");
    },
  },
};
</script>