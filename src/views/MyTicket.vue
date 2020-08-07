<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <v-card class="d-inline-block mx-auto" flat>
        <v-toolbar color="pink" dark>
          <span>Tiket Saya</span>

          <v-spacer></v-spacer>

          <v-btn icon @click="checkAll">
            <v-icon>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card v-for="item in tickets" :key="item.id" class="mb-4" width="500">
          <v-list>
            <v-list-item>
              <v-list-item-avatar tile size="80">
                <v-img src="/img/tiket.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-subtitle>Berlaku Hingga</v-list-item-subtitle>
                <v-list-item-title
                  class="red--text"
                >{{ item.expired_at | dateTimeFormat(utc) }} {{ waktu }}</v-list-item-title>
                <v-list-item-subtitle>Harga: Rp {{ Number(item.harga_beli).toLocaleString("id-ID") }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-checkbox v-model="selected" color="primary" :value="item.id"></v-checkbox>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card-actions v-if="selected.length > 0">
          <v-toolbar color="pink" dark>
            <span>Total Tiket</span>

            <v-spacer></v-spacer>

            <span>{{ selected.length }}</span>
          </v-toolbar>
        </v-card-actions>
      </v-card>
    </div>

    <!-- <div class="text-center">
      <v-card class="d-inline-block mx-auto" flat>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="tickets"
          :item-key="tickets.id"
          :items-per-page="20"
          :footer-props="{
            itemsPerPageOptions: [20,50,100,-1]
          }"
          show-select
          class="elevation-1"
        >
          <template v-slot:top>
            <h1>Tiket Saya</h1>
          </template>

          <template v-slot:item.code="{ item }">
            <v-card class="my-2">
              <v-list dense>
                <v-list-item>
                  <v-list-item-avatar tile size="80">
                    <v-img src="/img/tiket.png"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-subtitle>Berlaku Hingga</v-list-item-subtitle>
                    <v-list-item-title class="red--text">{{ item.expired_at | dateTimeFormat }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text>Harga</v-list-item-action-text>
                    <span>{{ item.harga_beli }}</span>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </template>
        </v-data-table>
      </v-card>
    </div>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";

export default {
  name: "BeliTiket",
  data() {
    return {
      headers: [
        { text: "Code", value: "code" },
        // { text: "Harga", value: "harga_beli" },
        // { text: "Expired", value: "expired_at" },
        { text: "", value: "data-table-select" },
      ],
      tickets: [],
      selected: [],
      utc: moment().utcOffset() / 60 - 7,
      waktu: "",
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    tiketSaya() {
      this.axios
        .get("/tiket/v1/tiket", {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.tickets = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
    checkAll() {
      if (this.selected.length == 0) {
        for (let index = 0; index < this.tickets.length; index++) {
          const element = this.tickets[index].id;
          this.selected.push(element);
        }
      } else {
        this.selected = [];
      }
    },
  },
  created() {
    this.tiketSaya();

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
    }),
  },
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY HH:mm");
    },
  },
};
</script>