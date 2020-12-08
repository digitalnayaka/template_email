<template>
  <v-card>
    <v-toolbar dark color="teal">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-text-field
        hide-details
        outlined
        label="Search"
        prepend-inner-icon="mdi-magnify"
        v-model="keyword"
        @keyup.enter="doSearch"
        append-icon="mdi-filter"
        @click:append="sheet = !sheet"
        autofocus
        clearable
        @click:clear="clear"
      ></v-text-field>

      <v-bottom-sheet v-model="sheet">
        <v-sheet :height="selected == '1' ? 280 : 350">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <h3>Filter</h3>
                </v-list-item-title>

                <v-list-item-subtitle>Tipe Iklan</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text x-small @click="resetFilter">Reset Filter</v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-radio-group v-model="selected" row dense>
                <v-radio label="Semua" value="0"></v-radio>
                <v-radio label="Harga Pas" value="1"></v-radio>
                <v-radio label="Tawar Bersama" value="2"></v-radio>
              </v-radio-group>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Terdekat</v-list-item-title>

              <v-list-item-action>
                <v-switch v-model="selected" inset value="Y" color="success"></v-switch>
              </v-list-item-action>
            </v-list-item>

            <v-list-item v-if="selected != '1'">
              <v-list-item-content>
                <v-list-item-title>Urutkan Berdasarkan</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-radio-group v-model="order" row dense v-if="selected != '1'">
                <v-radio label="Postingan Terbaru" value="posting_terbaru"></v-radio>
                <v-radio label="Tawar Bersama dimulai" value="tanggal_mulai"></v-radio>
              </v-radio-group>
            </v-list-item>

            <v-list-item>
              <v-btn block shaped color="success" @click="saveFilter">Simpan</v-btn>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-bottom-sheet>
    </v-toolbar>

    <v-container fluid>
      <v-alert
        :value="hits.length == 0 && (keyword != '' || keyword != null)"
        color="warning"
      >Sorry, but no results were found.</v-alert>

      <v-row>
        <v-col cols="6" sm="3" lg="2" class="pa-0" v-for="item in hits" :key="item._source.id">
          <list-iklan :item="item" :utc="utc" :timezone="timezone" @click.native="close" />
        </v-col>
      </v-row>
    </v-container>

    <v-pagination v-model="page" @input="doSearch" :length="lengthPage" :total-visible="5"></v-pagination>
  </v-card>
</template>

<script>
export default {
  name: "search",
  props: ["utc", "timezone"],
  components: {
    ListIklan: () =>
      import(/* webpackChunkName: "list-iklan" */ "@/components/ListIklan.vue"),
  },
  data() {
    return {
      keyword: "",
      sheet: false,
      hits: [],
      selected: "0",
      order: "posting_terbaru",
      page: 1,
      lengthPage: 0,
      limit: 20,
      offset: 0,
      total: 0,
    };
  },
  methods: {
    doSearch() {
      var offset = (this.page - 1) * this.limit;

      var params = new URLSearchParams();
      params.append("id_mst_iklan_status", 1);
      params.append("search", this.keyword);
      params.append("sort", this.order);
      params.append("offset", offset);
      params.append("limit", this.limit);
      if (this.selected != 0) {
        params.append("id_mst_iklan_jenis", this.selected);
      }
      var request = {
        params: params,
      };

      this.axios
        .get("/search/v3/search", request)
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits;

          this.total = data.hits.total.value;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let { responses } = error;
          console.log(responses);
        });
    },
    clear() {
      var offset = (this.page - 1) * this.limit;

      var params = new URLSearchParams();

      params.append("id_mst_iklan_status", 1);
      params.append("sort", this.order);
      params.append("offset", offset);
      params.append("limit", this.limit);

      var request = {
        params: params,
      };

      this.axios
        .get("/search/v3/search", request)
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits;

          this.total = data.hits.total.value;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
        });
    },
    close() {
      this.$emit("closed", false);
    },
    saveFilter() {
      this.doSearch();
      this.sheet = false;
    },
    resetFilter() {
      this.selected = "0";
      this.order = "posting_terbaru";
    },
  },
  created() {
    this.doSearch();
  },
};
</script>