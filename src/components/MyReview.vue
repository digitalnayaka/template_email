<template>
  <div class="rounded-lg">
    <v-divider></v-divider>

    <div class="d-flex justify-space-between grey lighten-3 pa-2">
      <div>
        Nomor Order:
        <a :href="'/detail-transaksi/' + item.order.id">
          {{ item.order.id }}
        </a>
      </div>

      <div>
        Pesanan selesai: {{ item.review.created_at | dateTimeFormat(utc) }}
        {{ timezone }}
      </div>
    </div>

    <v-divider></v-divider>

    <v-row dense>
      <v-col cols="12" sm="6">
        <v-list>
          <!-- <v-list-item>
            <v-list-item-avatar tile size="50">
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
          </v-list-item> -->
          <v-list-item>
            <v-list-item-avatar tile size="150">
              <v-img
                :src="getImage(item.order.iklan.photo)"
                contain
                align="center"
              ></v-img>
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
                >
                  mdi-star
                </v-icon>

                <div v-if="item.review.ratting_iklan == 1">Tidak Memuaskan</div>
                <div v-if="item.review.ratting_iklan == 2">
                  Kurang Memuaskan
                </div>
                <div v-if="item.review.ratting_iklan == 3">Cukup Memuaskan</div>
                <div v-if="item.review.ratting_iklan == 4">Memuaskan</div>
                <div v-if="item.review.ratting_iklan == 5">
                  Sangat Memuaskan
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" sm="6" class="d-flex">
        <v-divider vertical></v-divider>

        <div class="flex-column flex-grow-1">
          <v-divider></v-divider>

          <v-row>
            <v-col cols="4" align="center">
              <div>Penilaian Anda</div>

              <div class="d-flex justify-center">
                <div class="flex-column">
                  <div v-if="item.review.ratting_user == 1">
                    <!-- <v-icon x-large color="red">
                    mdi-emoticon-angry-outline
                  </v-icon> -->
                    <v-avatar>
                      <v-img src="/img/icons/emoji_tidakpuas.png"></v-img>
                    </v-avatar>

                    <div>Tidak Puas</div>
                  </div>

                  <div v-if="item.review.ratting_user == 2">
                    <v-avatar>
                      <v-img src="/img/icons/emoji_netral.png"></v-img>
                    </v-avatar>

                    <div>Netral</div>
                  </div>

                  <div v-if="item.review.ratting_user == 3">
                    <!-- <v-icon x-large color="teal">
                    mdi-emoticon-happy-outline
                  </v-icon> -->
                    <v-avatar>
                      <v-img src="/img/icons/emoji_puas.png"></v-img>
                    </v-avatar>

                    <div>Puas</div>
                  </div>
                </div>
              </div>
            </v-col>

            <v-col cols="8" class="d-flex">
              <v-divider vertical></v-divider>

              <div class="d-flex mx-2">
                <div class="flex-column">
                  <div>Ulasan oleh:</div>

                  <div>
                    <v-avatar tile size="50">
                      <v-img
                        src="/img/profile.png"
                        contain
                        v-if="item.order.photo_pembeli == null"
                      ></v-img>

                      <v-img
                        :src="getImage(item.order.photo_pembeli)"
                        alt="Avatar"
                        v-else
                      ></v-img>
                    </v-avatar>

                    <b class="blue--text ml-2">{{ item.order.nama_pembeli }}</b>
                  </div>

                  <div class="text-justify text-subtitle-2 font-italic">
                    "{{ item.review.review }}"
                  </div>

                  <v-divider> </v-divider>

                  <div class="d-flex ma-2">
                    <div class="flex-column">
                      <div>Balasan oleh:</div>

                      <v-list class="pa-0">
                        <v-list-item>
                          <v-list-item-avatar tile size="50">
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
                            <v-list-item-title class="teal--text">
                              {{ item.order.nama_penjual }}
                            </v-list-item-title>

                            <v-list-item-subtitle class="d-inline-flex">
                              <div class="red pa-1 white--text">Penjual</div>
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>

                      <div
                        class="text-justify text-subtitle-2 font-italic"
                        v-if="item.review.Reply != null"
                      >
                        {{ item.review.Reply[0].reply }}
                      </div>

                      <div
                        class="text-justify text-subtitle-2 font-italic grey--text"
                        v-else
                      >
                        Ulasan belum dibalas oleh penjual.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- <div class="d-flex ma-2">
            <div class="flex-column">
              <div>
                Balasan oleh:
                <b class="blue--text">{{ item.order.nama_penjual }}</b>
              </div>

              <div
                class="text-justify text-subtitle-2"
                v-if="item.review.reply != null"
              >
                {{ item.review.reply }}
              </div>

              <div class="text-justify text-subtitle-2" v-else>
                Ulasan belum dibalas oleh penjual.
              </div>
            </div>
          </div> -->
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: "my-review",
  props: ["item", "utc", "timezone"],
  filters: {
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY HH:mm");
    },
  },
};
</script>

<style>
a:link,
a:visited {
  color: teal;
}
</style>