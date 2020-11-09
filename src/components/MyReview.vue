<template>
  <div>
    <v-divider></v-divider>

    <div class="d-flex justify-space-between grey lighten-3 pa-2">
      <div>
        Nomor Order:
        <a :href="'/detail-transaksi/' + item.order.id">
          {{ item.order.id }}
        </a>
      </div>

      <!-- <div>Pesanan selesai:</div> -->
    </div>

    <v-divider></v-divider>

    <v-row dense>
      <v-col cols="12" sm="6">
        <v-list>
          <v-list-item>
            <v-list-item-avatar tile size="70">
              <v-img
                src="/img/profile.png"
                contain
                v-if="item.order.photo_penjual == null"
              ></v-img>
              <v-img
                :src="getImage(item.order.photo_penjual)"
                alt="Avatar"
                v-else
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <a :href="'/list-tb/' + item.order.nama_penjual">{{
                  item.order.nama_penjual
                }}</a>
              </v-list-item-title>

              <v-list-item-subtitle class="d-inline-flex">
                <div class="red pa-1 white--text">Penjual</div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-row>
          <v-col cols="4" align="center">
            <div>Penilaian Anda</div>

            <div class="d-flex justify-center">
              <div class="flex-column">
                <div v-if="item.review.ratting_user == 1">
                  <v-icon x-large color="red">
                    mdi-emoticon-angry-outline
                  </v-icon>

                  <div>Kecewa</div>
                </div>

                <div v-if="item.review.ratting_user == 2">
                  <v-icon x-large color="orange">
                    mdi-emoticon-neutral-outline
                  </v-icon>

                  <div>Netral</div>
                </div>

                <div v-if="item.review.ratting_user == 3">
                  <v-icon x-large color="teal">
                    mdi-emoticon-happy-outline
                  </v-icon>

                  <div>Puas</div>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="8" class="d-flex">
            <v-divider vertical></v-divider>

            <div class="d-flex mx-2">
              <div class="flex-column">
                <div>Ulasan <b>Saya:</b></div>

                <div class="text-justify text-subtitle-2">
                  {{ item.review.review }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="6" class="d-flex">
        <v-divider vertical></v-divider>

        <div class="flex-column flex-grow-1">
          <v-list>
            <v-list-item>
              <v-list-item-avatar tile size="70">
                <v-img :src="getImage(item.order.iklan.photo)" contain></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <a :href="'/iklan/' + item.order.id_iklan">
                    {{ item.order.iklan.judul }}
                  </a>
                </v-list-item-title>

                <v-list-item-subtitle class="d-flex align-center">
                  <v-icon
                    color="yellow"
                    v-for="n in item.review.ratting_iklan"
                    :key="n"
                    class="mr-2"
                  >
                    mdi-star
                  </v-icon>

                  <div v-if="item.review.ratting_iklan == 1">Sangat Buruk</div>
                  <div v-if="item.review.ratting_iklan == 2">Buruk</div>
                  <div v-if="item.review.ratting_iklan == 3">Cukup</div>
                  <div v-if="item.review.ratting_iklan == 4">Baik</div>
                  <div v-if="item.review.ratting_iklan == 5">Sangat Baik</div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <div class="d-flex ma-2">
            <div class="flex-column">
              <div>Ulasan <b>Penjual:</b></div>

              <div
                class="text-justify text-subtitle-2"
                v-if="item.review.reply != null"
              >
                {{ item.review.reply }}
              </div>

              <div class="text-justify text-subtitle-2" v-else>
                Belum diulas oleh penjual.
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "my-review",
  props: ["item"],
};
</script>

<style>
a:link,
a:visited {
  color: teal;
}
</style>