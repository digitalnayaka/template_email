<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <h1>Jadwal Tawar Bersama</h1>

    <v-tabs background-color="teal" dark grow>
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab>Semua</v-tab>
      <v-tab>Kalendar</v-tab>

      <v-tab-item>
        <v-container fluid>
          <v-row dense v-if="jadwal.length > 0">
            <v-col cols="12" sm="6" v-for="(item,index) in jadwal" :key="index">
              <v-card :to="'/list_lelang/' + item.id_app_user + '?tgl=' + item.date.substr(0,10)">
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar size="80">
                      <v-icon x-large v-if="item.photo == 'null'">mdi-account-circle</v-icon>
                      <v-img :src="getImage(item.photo)" v-else></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <v-img
                          src="/img/verified.png"
                          width="20"
                          height="20"
                          v-if="item.id_mst_user_type == 2"
                          class="float-left"
                        ></v-img>
                        {{ item.nama }}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ item.total_iklan }} Iklan | {{ item.date | dateFormat }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>

          <div align="center" v-else>
            <p class="display-1">Tidak ada data</p>
            <p>Tidak ada jadwal tawar bersama di tanggal ini</p>
          </div>
        </v-container>
      </v-tab-item>

      <v-tab-item>
        <v-container fluid>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-date-picker
                ref="picker"
                v-model="date"
                full-width
                @click:date="selectDate()"
                :events="arrayEvents"
                event-color="green lighten-1"
              ></v-date-picker>
            </v-col>
            <v-col cols="12" sm="6" xs="6">
              <div v-if="iklan.length > 0">
                <v-card
                  class="ma-2"
                  v-for="(item,index) in iklan"
                  :key="index"
                  :to="'/list_lelang/'+item.id_app_user+'?tgl='+date"
                >
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon x-large v-if="item.photo == 'null'">mdi-account-circle</v-icon>
                        <v-img :src="getImage(item.photo)" v-else></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          <v-img
                            src="/img/verified.png"
                            width="20"
                            height="20"
                            v-if="item.id_mst_user_type == 2"
                            class="float-left"
                          ></v-img>
                          {{ item.nama }}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{ item.total_iklan }} Iklan | {{ item.date | dateFormat }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </div>

              <div align="center" v-else>
                <p class="display-1">Tidak ada data</p>
                <p>Tidak ada jadwal tawar bersama di tanggal ini</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    jadwal: [],
    event: [],
    iklan: [],
    arrayEvents: []
  }),
  methods: {
    jadwalLelang() {
      this.axios
        .get("/iklan/v2/iklan_jadwal_tb", {
          params: {
            id_mst_iklan_status: 1,
            limit: 999
          }
        })
        .then(response => {
          let { data } = response.data;
          this.jadwal = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    listIklan() {
      this.axios
        .get("/iklan/v2/iklan_jadwal_tb", {
          params: {
            tanggal_mulai: this.date,
            id_mst_iklan_status: 1,
            limit: 99
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
    functionEvents() {
      this.axios
        .get("/iklan/v1/iklan_cal_event_jadwal_tb")
        .then(response => {
          let { data } = response.data;

          this.event = data;
          var length = data.length;
          var date = [];
          var i = 0;

          for (i = 0; i < length; i++) {
            date.push(data[i].tanggal);
          }
          this.arrayEvents = date;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    selectDate() {
      this.listIklan(this.date);
    }
  },
  created() {
    this.jadwalLelang();
    this.listIklan();
    this.functionEvents();
  },
  filters: {
    dateFormat: date => {
      return moment.utc(date).format("DD MMM YYYY");
    }
  }
};
</script>