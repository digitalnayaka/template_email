<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-h4 text-center">Iklan Favorit</div>

    <v-container fluid class="ma-0 pa-0" grid-list-sm>
      <v-row>
        <v-col cols="6" sm="3" lg="2" v-for="item in hits" :key="item._source.id">
          <list-iklan :item="item" />
        </v-col>
      </v-row>
    </v-container>

    <v-pagination v-model="page" @input="getFavourite" :length="lengthPage" :total-visible="5"></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "iklan-favorit",
  components: {
    ListIklan: () =>
      import(/* webpackChunkName: "list-iklan" */ "@/components/ListIklan.vue"),
  },
  data: () => ({
    hits: [],
    page: 1,
    lengthPage: 0,
    limit: 20,
    offset: 0,
    total: 0,
  }),
  methods: {
    getFavourite() {
      var offset = (this.page - 1) * this.limit;
      this.axios
        .get("/iklan/v3/iklan_favorit", {
          params: {
            id_app_user: this.user.id,
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
  },
  created() {
    this.getFavourite();
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      guest: "auth/guest",
    }),
  },
};
</script>