<template>
  <div>
    <v-divider></v-divider>

    <div class="d-flex justify-space-between grey lighten-3 pa-2">
      <div v-if="selected != null">
        Penjual: {{ item.review.app_user_name_penjual }}
      </div>

      <div v-else>
        <a :href="'/detail-transaksi/' + item.review.id_order">
          Nomor Order: {{ item.review.id_order }}
        </a>
      </div>

      <div>Pesanan selesai:</div>
    </div>

    <v-divider></v-divider>

    <v-row dense v-if="selected == null">
      <v-col cols="12" sm="6">
        <v-list>
          <v-list-item>
            <v-list-item-avatar tile size="70">
              <v-img
                src="/img/profile.png"
                contain
                v-if="item.review.app_user_foto_penjual == null"
              ></v-img>
              <v-img
                :src="getImage(item.review.app_user_foto_penjual)"
                alt="Avatar"
                v-else
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <a :href="'/list-tb/' + item.review.app_user_name_penjual">{{
                  item.review.app_user_name_penjual
                }}</a>
              </v-list-item-title>

              <v-list-item-subtitle class="d-inline-flex">
                <div class="red pa-1 white--text">Penjual</div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <div class="ma-2 text-center" v-if="point == 0">
          <div>
            Bagaimana pengalaman Anda berbelanja di
            {{ item.review.app_user_name_penjual }} ini?
          </div>

          <v-item-group v-model="point" class="d-flex justify-center">
            <div class="flex-column" v-for="item in points" :key="item.id">
              <v-item v-slot:default="{ active, toggle }" :value="item.id">
                <v-btn
                  icon
                  class="mx-3"
                  @click="toggle"
                  v-on:click="setPoint(item)"
                >
                  <v-icon x-large :color="active ? item.color : ''">
                    {{ item.icon }}
                  </v-icon>
                </v-btn>
              </v-item>
              <div class="text-caption">{{ item.text }}</div>
            </div>
          </v-item-group>
        </div>

        <div class="ma-2 text-center" v-else>
          <div>Penilaian Anda</div>

          <div v-if="point == 1">
            <v-icon x-large :color="points[0].color">
              {{ points[0].icon }}
            </v-icon>
            <div class="text-caption">{{ points[0].text }}</div>
          </div>

          <div v-if="point == 2">
            <v-icon x-large :color="points[1].color">
              {{ points[1].icon }}
            </v-icon>
            <div class="text-caption">{{ points[1].text }}</div>
          </div>

          <div v-if="point == 3">
            <v-icon x-large :color="points[2].color">
              {{ points[2].icon }}
            </v-icon>
            <div class="text-caption">{{ points[2].text }}</div>
          </div>
        </div>
      </v-col>

      <v-col cols="12" sm="6" class="d-flex">
        <v-divider vertical></v-divider>

        <v-list subheader>
          <v-subheader> Daftar Produk </v-subheader>

          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-img :src="getImage(item.review.foto_iklan)" contain></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <a :href="'/iklan/' + item.review.id_iklan">
                  {{ item.order.iklan.judul }}
                </a>
              </v-list-item-title>

              <v-list-item-subtitle v-if="rating == 0"
                >Belum diulas</v-list-item-subtitle
              >

              <v-list-item-subtitle class="d-inline-flex" v-else>
                <v-icon color="yellow" v-for="n in rating" :key="n"
                  >mdi-star</v-icon
                >
              </v-list-item-subtitle>

              <v-list-item-subtitle class="d-flex d-sm-none" v-if="rating == 0">
                <v-btn color="teal" dark small @click="ulas = false">
                  Tulis Ulasan
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action class="d-none d-sm-flex" v-if="rating == 0">
              <v-btn color="teal" dark small @click="tulisReview(item.review)">
                Tulis Ulasan
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-row dense no-gutters v-else>
      <v-col cols="12" sm="7">
        <v-list three-line>
          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-img :src="getImage(item.review.foto_iklan)" contain></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Judul Iklan</v-list-item-title>
              <v-list-item-subtitle>
                Bagaimana kualitas produk ini secara keseluruhan?
              </v-list-item-subtitle>
              <div class="d-flex align-center flex-wrap">
                <star-rating
                  v-model="rating"
                  :show-rating="false"
                  :round-start-rating="false"
                  :star-size="30"
                  inline
                  class="mr-2"
                ></star-rating>

                <div class="text-caption">
                  <div v-if="rating == 0">Bagaimana kualitas produk ini?</div>
                  <div v-if="rating == 1">Sangat Buruk</div>
                  <div v-if="rating == 2">Buruk</div>
                  <div v-if="rating == 3">Cukup</div>
                  <div v-if="rating == 4">Baik</div>
                  <div v-if="rating == 5">Sangat Baik</div>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" sm="5">
        <v-card flat class="pa-2">
          <div>Berikan ulasan untuk produk ini</div>

          <v-textarea
            v-model="deskripsiUlasan"
            placeholder="Tulis deskripsi Anda mengenai produk ini..."
            outlined
            dense
            rows="3"
            no-resize
          ></v-textarea>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="teal" dark @click="selected = null">Kembali</v-btn>
            <v-btn color="teal" dark @click="sendReview">Kirim</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StarRating from "vue-star-rating";

export default {
  name: "list-review",
  components: { StarRating },
  props: ["item"],
  data: () => ({
    ulas: true,
    selected: null,
    review: [],
    point: "",
    points: [
      {
        id: 1,
        icon: "mdi-emoticon-angry-outline",
        color: "red",
        text: "Kecewa",
        point: -1,
      },
      {
        id: 2,
        icon: "mdi-emoticon-neutral-outline",
        color: "orange",
        text: "Netral",
        point: 1,
      },
      {
        id: 3,
        icon: "mdi-emoticon-happy-outline",
        color: "teal",
        text: "Puas",
        point: 2,
      },
    ],
    rating: 0,
    deskripsiUlasan: "",
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    setPoint(item) {
      let r = confirm("Apakah Anda yakin memberi penilaian " + item.text + "?");
      if (r == true) {
        alert("Point anda: " + item.point);
      }
    },
    tulisReview(item) {
      this.selected = item;
    },
    sendReview(){
      var r = confirm("Yakin dengan ulasan berikut?");
      if (r == true) {
        let formData = new FormData();

        formData.set("id_iklan", this.selected.id_iklan);
        formData.set("id_app_user", this.user.id);
        formData.set("ratting_iklan", this.rating);
        formData.set("ratting_user", this.point);
        formData.set("review", this.deskripsiUlasan);

        this.axios
          .post("/transaksi/v3/review", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.getOrder();
          })
          .catch((error) => {
            let responses = error.response.data;
            console.log(responses);
          });
      }
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>

<style>
a:link,
a:visited {
  color: teal;
}
</style>