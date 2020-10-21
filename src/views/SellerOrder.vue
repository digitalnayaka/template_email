<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <h2>Daftar Penjualan</h2>

    <v-tabs
      v-model="tab"
      background-color="cyan"
      dark
      slider-color="teal"
      show-arrows
    >
      <v-tab>Tawar Bersama</v-tab>
      <v-tab>Tiket</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="pa-4">
      <v-tab-item>
        <v-chip-group v-model="chip" mandatory active-class="primary--text">
          <div class="d-flex flex-nowrap align-center">
            <h4 class="mr-2">Status</h4>

            <v-chip
              v-for="tag in tags"
              :key="tag.id"
              :value="tag.id"
              @click="filterStatus"
            >
              {{ tag.text }}
              <span class="ml-1" v-if="tag.id == chip">
                ({{ orders.length }})
              </span>
            </v-chip>
          </div>
        </v-chip-group>

        <v-card
          outlined
          class="mt-2 mb-4"
          v-for="item in orders"
          :key="item.id"
          :to="'/detail-transaksi/' + item.id"
        >
          <v-row dense class="mx-2">
            <v-col cols="6">
              <div>{{ item.nama_pembeli }}</div>
            </v-col>

            <v-col cols="6" align="right">
              <div class="red--text">{{ item.pembayaran_status }}</div>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row dense align="center">
            <v-col cols="12" sm="6">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar tile size="80">
                    <v-img :src="getImage(item.iklan.photo)" contain></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-subtitle> Tawar Bersama </v-list-item-subtitle>

                    <v-list-item-title>
                      <a :href="'/iklan/' + item.id_iklan">
                        {{ item.iklan.judul }}
                      </a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" sm="6">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle> Tawaran Anda </v-list-item-subtitle>

                    <v-list-item-title>
                      Rp
                      {{
                        Number(item.total_pembayaran).toLocaleString("id-ID")
                      }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              small
              outlined
              color="teal"
              dark
              :to="'/chat/' + item.id_pembeli"
            >
              Hubungi Pembeli
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-pagination
          v-model="page"
          @input="filterStatus"
          :length="lengthPage"
          :total-visible="5"
        ></v-pagination>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";

export default {
  name: "seller-order",
  props: ["utc", "timezone"],
  data() {
    return {
      tab: 0,
      chip: Number(this.$route.query.id),
      tags: [
        { id: 0, text: "Semua" },
        { id: 10, text: "Menunggu Persetujuan" },
        { id: 1, text: "Menunggu Pembayaran" },
        { id: 4, text: "Menunggu Verifikasi" },
        { id: 6, text: "Ditolak" },
        { id: 2, text: "Pembayaran Diverifikasi" },
        { id: 5, text: "Dibatalkan" },
        { id: 3, text: "Expired" },
      ],
      orders: [],
      page: 1,
      offset: 0,
      limit: 20,
      total: 0,
      lengthPage: 0,
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAds: "ads/setAds",
    }),
    getTransaksi() {
      let offset = (this.page - 1) * this.limit;

      let params = new URLSearchParams();
      params.set("id_penjual", this.user.id);
      params.set("id_mst_order_jenis_iklan", 2);
      if (this.chip > 0) {
        params.set("id_mst_pembayaran_status", this.chip);
      }
      params.set("offset", offset);
      params.set("limit", this.limit);

      let request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/transaksi/v3/order", request)
        .then((response) => {
          let { data } = response.data;
          this.orders = data;

          this.total = response.data.count;
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    filterStatus() {
      this.$nextTick(() => {
        this.getTransaksi();
      });
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  created() {
    this.getTransaksi();
  },
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY, HH:mm");
    },
  },
};
</script>