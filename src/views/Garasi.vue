<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card flat>
      <v-card-title>
        <h3>Daftar Garasi</h3>

        <v-spacer></v-spacer>

        <v-row dense>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="keyword"
              solo
              label="Cari Motor"
              single-line
              prepend-inner-icon="mdi-magnify"
              hide-details
              clearable
              @keyup.enter="doSearch"
              @click:clear="doClear"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-select
              v-model="value"
              :items="items"
              label="Status"
              item-text="status"
              item-value="id"
              @change="doSearch"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card>
    <v-container fluid>
      <v-row align="center" dense>
        <v-col cols="6" sm="4" lg="3" v-for="item in unitMokas" :key="item.id">
          <v-card outlined tile :to="'/unit_mokas/'+item.id">
            <div align="center">
              <v-img align="center" width="500" height="300" :src="getImage(item.foto_1)" contain></v-img>
            </div>

            <v-list class="ma-0 pa-0">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle style="color : red">{{ item.status }}</v-list-item-subtitle>
                  <v-list-item-title class="font-weight-black">{{ item.type }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.nomor_polisi }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination v-model="page" @input="doSearch" :length="lengthPage" :total-visible="5"></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Garasi",
  data: () => ({
    keyword: "",
    unitMokas: [],
    items: [],
    value: { id: 0, status: "Semua" },
    page: 1,
    lengthPage: 0,
    limit: 20,
    offset: 0,
    total: 0
  }),
  methods: {
    async doSearch() {
      var offset = (this.page - 1) * this.limit;

      var params = new URLSearchParams();
      params.append("id_app_user", this.user.id);
      if (this.value > 0) {
        params.append("id_mst_motor_bekas_status", this.value);
      }
      params.append("search", this.keyword);
      params.append("id_mst_iklan_status", this.value);
      params.append("offset", offset);
      params.append("limit", this.limit);

      var request = {
        params: params
      };

      await this.axios
        .get("/produk/v3/unit_mokas", request)
        .then(response => {
          let { data } = response.data;
          this.unitMokas = data;
          this.total = response.data.count;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    doClear() {
      var params = new URLSearchParams();
      params.append("id_app_user", this.user.id);
      params.append("search", "");
      params.append("limit", 999);

      var request = {
        params: params
      };

      this.axios
        .get("/produk/v3/unit_mokas", request)
        .then(response => {
          let { data } = response.data;
          this.unitMokas = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    getStatus() {
      this.axios
        .get("/produk/v3/mst_motor_bekas_status")
        .then(response => {
          let { data } = response.data;
          this.items = data;
          this.items.splice(0, 0, { id: 0, status: "Semua" });
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    }
  },
  created() {
    this.doSearch();
    this.getStatus();
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>
