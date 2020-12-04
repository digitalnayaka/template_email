<template>
  <v-container fluid>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-text-field
      outlined
      dense
      hide-details
      flat
      label="Search"
      prepend-inner-icon="mdi-magnify"
      v-model="keyword"
      @keyup.enter="doSearch(selected, tb)"
      append-icon="mdi-filter"
      @click:append="sheet = !sheet"
      autofocus
      clearable
      @click:clear="clear"
    ></v-text-field>

    <v-bottom-sheet v-model="sheet">
      <v-sheet :height="selected == '1' ? 240 : 350">
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
              <v-switch
                v-model="selected"
                inset
                value="Y"
                color="success"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>

          <v-list-item v-if="selected != '1'">
            <v-list-item-content>
              <v-list-item-title>Urutkan Berdasarkan</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="selected != '1'">
            <v-radio-group v-model="order" row dense>
              <v-radio
                label="Postingan Terbaru"
                value="posting_terbaru"
              ></v-radio>
              <v-radio
                label="Tawar Bersama dimulai"
                value="tanggal_mulai"
              ></v-radio>
            </v-radio-group>
          </v-list-item>

          <v-list-item>
            <v-btn block shaped color="success" @click="saveFilter"
              >Simpan</v-btn
            >
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>

    <v-container fluid>
      <v-alert
        :value="hits.length == 0 && (keyword != '' || keyword != null)"
        color="cyan lighten-5"
        >Harap Tunggu Sebentar...
        <v-progress-circular
          :size="40"
          color="amber"
          indeterminate
        ></v-progress-circular
      ></v-alert>

      <v-row>
        <v-col
          cols="6"
          sm="3"
          lg="2"
          v-for="item in hits"
          :key="item._source.id"
          class="pa-0"
        >
          <list-iklan
            :item="item"
            :utc="utc"
            :timezone="timezone"
            @click.native="close"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-pagination
      v-model="page"
      @input="doSearch"
      :length="lengthPage"
      :total-visible="5"
    ></v-pagination>
  </v-container>
</template>

<script>
export default {
  name: "mokas",
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
      tb: this.$route.query.tb,
      jenis: this.$route.query.jenis,
    };
  },
  methods: {
    doSearch(id_mst_iklan_jenis, tb_berlangsung) {
      var offset = (this.page - 1) * this.limit;

      let params = new URLSearchParams();
      params.set("id_mst_iklan_status", 1);
      params.set("search", this.keyword);
      if (id_mst_iklan_jenis != undefined && this.selected != "0") {
        params.set("id_mst_iklan_jenis", id_mst_iklan_jenis);
      }
      if (tb_berlangsung != undefined) {
        params.set("tb_berlangsung", tb_berlangsung);
      }
      params.set("sort", this.order);
      params.set("offset", offset);
      params.set("limit", this.limit);

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
        });
    },
    clear() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/search/v3/search", {
          params: {
            id_mst_iklan_status: 1,
            sort: this.order,
            offset: offset,
            limit: this.limit,
          },
        })
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
        });
    },
    close() {
      this.$emit("closed", false);
    },
    saveFilter() {
      this.doSearch(this.selected, this.tb);
      this.sheet = false;
    },
    resetFilter() {
      this.selected = "0";
      this.order = "posting_terbaru";
    },
  },
  mounted() {
    this.doSearch(this.jenis, this.tb);

    if (this.tb) {
      this.selected = "2";
    }
    if (this.jenis == 1) {
      this.selected = "1";
    }
    if (this.jenis == 2) {
      this.selected = "2";
    }
  },
};
</script>