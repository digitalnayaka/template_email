<template>
  <div>
    <v-app-bar app color="#22939E" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="back">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-h4 mb-2">Ulasan Pembelian</div>

    <v-card flat>
      <v-tabs
        v-model="tab"
        background-color="#22939E"
        dark
        slider-color="yellow"
        show-arrows
      >
        <v-tab>Berikan Ulasan</v-tab>
        <v-tab>Sudah Diulas</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card
            outlined
            class="mt-2 mb-4"
            v-for="item in detailReview"
            :key="item.order.id"
          >
            <list-review :item="item" :utc="utc" :timezone="timezone" />
          </v-card>

          <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="review.length == 0"
          >
            <h2>Belum ada ulasan</h2>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card
            outlined
            class="mt-2 mb-4"
            v-for="item in detailUlasan"
            :key="item.order.id"
          >
            <my-review :item="item" :utc="utc" :timezone="timezone" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "product-review",
  props: ["utc", "timezone"],
  components: {
    ListReview: () =>
      import(
        /* webpackChunkName: "list-review" */ "@/components/ListReview.vue"
      ),
    MyReview: () =>
      import(/* webpackChunkName: "my-review" */ "@/components/MyReview.vue"),
  },
  data: () => ({
    tab: 0,
    review: [],
    order: [],
    detailReview: [],
    ulasanSaya: [],
    orderSaya: [],
    detailUlasan: [],
    page: 1,
    limit: 20,
    total: 0,
    lengthPage: 0,
  }),
  methods: {
    getReview() {
      let offset = (this.page - 1) * this.limit;

      this.axios
        .get("/transaksi/v3/belum_review", {
          params: {
            id_pembeli: this.user.id,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.review = data;
          this.getOrder();

          this.total = response.data.count;
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit);
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
    getOrder() {
      let params = new URLSearchParams();

      for (let i = 0; i < this.review.length; i++) {
        params.append("id", this.review[i].id_order);
      }

      let request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/transaksi/v3/order", request)
        .then((response) => {
          let { data } = response.data;
          this.order = data;

          for (let i = 0; i < this.review.length; i++) {
            let order = this.order.filter(
              (item) => item.id == this.review[i].id_order
            );
            this.detailReview.push({
              review: this.review[i],
              order: order[0],
            });
          }
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
    myReview() {
      let offset = (this.page - 1) * this.limit;

      this.axios
        .get("/transaksi/v3/review", {
          params: {
            id_app_user: this.user.id,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.ulasanSaya = data;
          this.getOrderUlasan();

          this.total = response.data.count;
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit);
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
    getOrderUlasan() {
      let params = new URLSearchParams();

      for (let i = 0; i < this.ulasanSaya.length; i++) {
        params.append("id_iklan", this.ulasanSaya[i].id_iklan);
      }

      let request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/transaksi/v3/order", request)
        .then((response) => {
          let { data } = response.data;
          this.orderSaya = data;

          for (let i = 0; i < this.ulasanSaya.length; i++) {
            let order = this.orderSaya.filter(
              (item) => item.id_iklan == this.ulasanSaya[i].id_iklan
            );
            this.detailUlasan.push({
              review: this.ulasanSaya[i],
              order: order[0],
            });
          }
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
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  created() {
    this.getReview();
    this.myReview();
  },
};
</script>

<style>
</style>