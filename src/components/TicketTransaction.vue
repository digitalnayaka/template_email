<template>
  <div>
    <v-card flat v-for="item in group" :key="item.id_mst_pembayaran_status">
      <v-card-title>{{ item.pembayaran_status }}</v-card-title>

      <v-card
        class="mx-2 mb-4"
        v-for="subItem in item.found"
        :key="subItem.id"
        :to="'/upload-bukti/' + subItem.id"
      >
        <div
          class="d-flex justify-space-between mx-2 pt-2"
          v-if="subItem.id_mst_pembayaran_status != 1"
        >
          <div class="font-weight-medium">Nomor Order:</div>
          <div class="red--text">{{ subItem.no_order }}</div>
        </div>

        <div class="d-flex justify-space-between mx-2 pt-2" v-else>
          <div class="font-weight-medium">
            {{ type == "pembelian" ? "Bayar " : "Dibayarkan " }} sebelum:
          </div>
          <div class="red--text">
            {{ subItem.expired_at | dateTimeFormat(utc) }} {{ timezone }}
          </div>
        </div>

        <v-list>
          <v-list-item>
            <v-list-item-avatar rounded size="80">
              <v-img src="/img/tiket.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Tiket Tawar Bersama</v-list-item-title>
              <v-list-item-subtitle class="teal--text"
                >Jumlah {{ type == "pembelian" ? "Pembelian:" : "Penjualan:" }}
                {{ subItem.jumlah }} Tiket</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title
                >Total
                {{
                  type == "pembelian" ? "Pembayaran" : "Pencairan"
                }}</v-list-item-title
              >
              <v-list-item-subtitle>
                Rp
                {{ Number(subItem.total_pembayaran).toLocaleString("id-ID") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div
          class="d-block pa-2 amber darken-1 white--text text-center"
          v-if="subItem.id_mst_pembayaran_status == 1"
        >
          {{ subItem.pembayaran_status }}
        </div>

        <div
          class="d-block pa-2 blue darken-1 white--text text-center"
          v-if="subItem.id_mst_pembayaran_status == 2"
        >
          {{ subItem.pembayaran_status }}
        </div>

        <div
          class="d-block pa-2 red accent-2 white--text text-center"
          v-if="
            subItem.id_mst_pembayaran_status == 3 ||
            subItem.id_mst_pembayaran_status == 5 ||
            subItem.id_mst_pembayaran_status == 6
          "
        >
          {{ subItem.pembayaran_status }}
        </div>

        <div
          class="d-block pa-2 teal accent-4 white--text text-center"
          v-if="subItem.id_mst_pembayaran_status == 4"
        >
          {{ subItem.pembayaran_status }}
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "buy-transaction",
  props: ["group", "utc", "timezone", "type"],
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY, HH:mm");
    },
  },
};
</script>

<style>
</style>