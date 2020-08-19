<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card flat>
      <v-card-title>
        <h3>Daftar Iklan</h3>

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
              item-text="status"
              item-value="id"
              label="Status"
              @change="doSearch"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-title>

      <v-row align="center" dense>
        <v-col cols="6" sm="4" v-for="item in hits" :key="item._source.id">
          <v-card :color="item._source.id_mst_iklan_status == 2 ? 'green' : 'red'">
            <list-iklan :item="item" />
          </v-card>
        </v-col>
      </v-row>

      <v-pagination v-model="page" @input="doSearch" :length="lengthPage" :total-visible="5"></v-pagination>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Iklan",
  components: {
    ListIklan: () =>
      import(/* webpackChunkName: "list-iklan" */ "@/components/ListIklan.vue")
  },
  data: () => ({
    keyword: "",
    color: "",
    hits: [],
    items: [],
    value: { id: 0, status: "Semua" },
    page: 1,
    lengthPage: 0,
    limit: 20,
    offset: 0,
    total: 0
  }),
  methods: {
    doSearch() {
      var offset = (this.page - 1) * this.limit;

      var params = new URLSearchParams();
      params.append("id_app_user", this.user.id);
      if (this.value > 0) {
        params.append("id_mst_iklan_status", this.value);
      }
      params.append("search", this.keyword);
      params.append("offset", offset);
      params.append("limit", this.limit);

      var request = {
        params: params
      };

      this.axios
        .get("/search/v3/search", request)
        .then(response => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits;

          this.total = data.hits.total.value;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    doClear() {
      var params = new URLSearchParams();
      params.append("id_app_user", this.user.id);
      params.append("search", "");
      params.append("id_mst_iklan_status", this.value);
      params.append("limit", 999);

      var request = {
        params: params
      };

      this.axios
        .get("/search/v3/search", request)
        .then(response => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    getStatus() {
      this.axios
        .get("/iklan/v3/mst_iklan_status")
        .then(response => {
          let { data } = response.data;
          this.items = data;
          this.items.splice(0, 0, { id: 0, status: "Semua" });
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
  },
  created() {
    this.$nextTick(() => {
      this.doSearch();
    });
    this.getStatus();
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>