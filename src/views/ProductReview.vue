<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="back">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-h4 mb-2">Ulasan</div>

    <v-card flat>
      <v-tabs
        v-model="tab"
        background-color="teal"
        dark
        slider-color="yellow"
        show-arrows
      >
        <v-tab>Menunggu Diulas</v-tab>
        <v-tab>Ulasan Saya</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card
            outlined
            class="mt-2 mb-4"
            v-for="item in review"
            :key="item.id"
          >
            <list-review :item="item" />
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <list-review />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "product-review",
  components: {
    ListReview: () =>
      import(
        /* webpackChunkName: "list-review" */ "@/components/ListReview.vue"
      ),
  },
  data: () => ({
    tab: 0,
    review: [],
  }),
  methods: {
    getReview() {
      this.axios
        .get("/transaksi/v3/review", {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.review = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  created() {
    this.getReview();
  },
};
</script>

<style>
</style>