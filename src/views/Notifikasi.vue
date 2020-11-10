<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card v-if="notif.length > 0">
      <v-list>
        <v-subheader class="title">Semua Notifikasi</v-subheader>

        <!-- <v-list-item-group v-model="model" multiple>
          <template v-for="(item, i) in notif">
            <v-list-item
              :key="i"
              @click="read(item.id, item.id_modul, item.id_data)"
              :value="item.is_read"
              active-class="deep-purple--text text--accent-4"
            >
              <template v-slot:default="{ active }">
                <v-list-item-avatar>
                  <v-img src="/img/icons/unit.png" v-if="item.id_modul == 4"></v-img>
                  <v-img src="/img/icons/transaksi.png" v-if="item.id_modul == 3"></v-img>
                  <v-img src="/img/icons/iklan.png" v-if="item.id_modul == 1"></v-img>
                  <v-img src="/img/icons/iklan.png" v-if="item.id_modul == 5"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.judul }}</v-list-item-title>

                  <v-list-item-subtitle>{{ item.deskripsi }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action class="overline teal--text">{{ item.created_at | dateFormat }}</v-list-item-action>

                <v-list-item-action-text style="display:none">
                  <v-checkbox :input-value="active" color="deep-purple accent-4"></v-checkbox>
                </v-list-item-action-text>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group> -->
        <v-tabs
          v-model="tab"
          grow
          slider-color="teal"
          show-arrows
          @change="getNotif"
        >
          <v-tab class="text-caption">Semua</v-tab>
          <v-tab class="text-caption">Iklan</v-tab>
          <v-tab class="text-caption">Transaksi</v-tab>
          <v-tab class="text-caption">Unit</v-tab>
          <v-tab class="text-caption">Tiket</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-list-item-group v-model="model" multiple>
              <template v-for="(item, i) in notif">
                <v-list-item
                  :key="i"
                  @click="read(item.id, item.id_modul, item.id_data)"
                  :value="item.is_read"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-avatar>
                      <v-img
                        src="/img/icons/unit.png"
                        v-if="item.id_modul == 4"
                      ></v-img>
                      <v-img
                        src="/img/icons/transaksi.png"
                        v-if="item.id_modul == 3"
                      ></v-img>
                      <v-img
                        src="/img/icons/iklan.png"
                        v-if="item.id_modul == 1"
                      ></v-img>
                      <v-img
                        src="/img/icons/iklan.png"
                        v-if="item.id_modul == 5"
                      ></v-img>
                       <v-img
                        src="/img/icons/tiket_expired.webp"
                        v-if="item.id_modul == 7"
                      ></v-img>
                      <v-img
                        src="/img/icons/tiket_expired.webp"
                        v-if="item.id_modul == 10"
                      ></v-img>
                      <v-img
                        src="/img/icons/tiket_terpakai.webp"
                        v-if="item.id_modul == 11"
                      ></v-img>
                      <v-img
                        src="/img/icons/tiket_tersedia.webp"
                        v-if="item.id_modul == 12"
                      ></v-img>

                      <v-img
                        src="/img/icons/ic_review_dibalas.webp"
                        v-if="item.id_modul == 9"
                      ></v-img>

                       <v-img
                        src="/img/icons/review_pembeli.webp"
                        v-if="item.id_modul == 8"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.judul }}</v-list-item-title>

                      <v-list-item-subtitle>{{
                        item.deskripsi
                      }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action class="overline teal--text">{{
                      item.created_at | dateFormat
                    }}</v-list-item-action>

                    <v-list-item-action-text style="display: none">
                      <v-checkbox
                        :input-value="active"
                        color="deep-purple accent-4"
                      ></v-checkbox>
                    </v-list-item-action-text>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-tab-item>

          <v-tab-item>
            <v-list-item-group v-model="model" multiple>
              <template v-for="(item, i) in notif">
                <v-list-item
                  :key="i"
                  @click="read(item.id, item.id_modul, item.id_data)"
                  :value="item.is_read"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-avatar>
                      <v-img src="/img/icons/iklan.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.judul }}</v-list-item-title>

                      <v-list-item-subtitle>{{
                        item.deskripsi
                      }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action class="overline teal--text">{{
                      item.created_at | dateFormat
                    }}</v-list-item-action>

                    <v-list-item-action-text style="display: none">
                      <v-checkbox
                        :input-value="active"
                        color="deep-purple accent-4"
                      ></v-checkbox>
                    </v-list-item-action-text>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-tab-item>

          <v-tab-item>
            <v-list-item-group v-model="model" multiple>
              <template v-for="(item, i) in notif">
                <v-list-item
                  :key="i"
                  @click="read(item.id, item.id_modul, item.id_data)"
                  :value="item.is_read"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-avatar>
                      <v-img src="/img/icons/transaksi.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.judul }}</v-list-item-title>

                      <v-list-item-subtitle>{{
                        item.deskripsi
                      }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action class="overline teal--text">{{
                      item.created_at | dateFormat
                    }}</v-list-item-action>

                    <v-list-item-action-text style="display: none">
                      <v-checkbox
                        :input-value="active"
                        color="deep-purple accent-4"
                      ></v-checkbox>
                    </v-list-item-action-text>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-tab-item>

          <v-tab-item>
            <v-list-item-group v-model="model" multiple>
              <template v-for="(item, i) in notif">
                <v-list-item
                  :key="i"
                  @click="read(item.id, item.id_modul, item.id_data)"
                  :value="item.is_read"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-avatar>
                      <v-img src="/img/icons/unit.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.judul }}</v-list-item-title>

                      <v-list-item-subtitle>{{
                        item.deskripsi
                      }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action class="overline teal--text">{{
                      item.created_at | dateFormat
                    }}</v-list-item-action>

                    <v-list-item-action-text style="display: none">
                      <v-checkbox
                        :input-value="active"
                        color="deep-purple accent-4"
                      ></v-checkbox>
                    </v-list-item-action-text>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-tab-item>

          <v-tab-item>
            <v-list-item-group v-model="model" multiple>
              <template v-for="(item, i) in notif">
                <v-list-item
                  :key="i"
                  @click="read(item.id, item.id_modul, item.id_data)"
                  :value="item.is_read"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-avatar>
                      <v-img
                        src="/img/icons/tiket_expired.webp"
                        v-if="item.id_modul == 7"
                      ></v-img>
                      <v-img
                        src="/img/icons/tiket_expired.webp"
                        v-if="item.id_modul == 10"
                      ></v-img>
                      <v-img
                        src="/img/icons/tiket_terpakai.webp"
                        v-if="item.id_modul == 11"
                      ></v-img>
                      <v-img
                        src="/img/icons/tiket_tersedia.webp"
                        v-if="item.id_modul == 12"
                      ></v-img>
                      <v-img
                        src="/img/icons/tiket_expired.webp"
                        v-if="item.id_modul == 10"
                      ></v-img>
                      <v-img
                        src="/img/icons/tiket_terpakai.webp"
                        v-if="item.id_modul == 11"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.judul }}</v-list-item-title>

                      <v-list-item-subtitle>{{
                        item.deskripsi
                      }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action class="overline teal--text">{{
                      item.created_at | dateFormat
                    }}</v-list-item-action>

                    <v-list-item-action-text style="display: none">
                      <v-checkbox
                        :input-value="active"
                        color="deep-purple accent-4"
                      ></v-checkbox>
                    </v-list-item-action-text>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-tab-item>
        </v-tabs-items>
      </v-list>

      <v-pagination
        v-model="page"
        @input="getNotif"
        :length="lengthPage"
        :total-visible="5"
      ></v-pagination>
    </v-card>

    <div align="center" v-else>
      <v-img
        src="/img/notifikasi-belum.png"
        width="500"
        height="600"
        contain
      ></v-img>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment-timezone";

export default {
  name: "notifikasi",
  data: () => ({
    tab: 0,
    modul: 0,
    notif: [],
    notifIklan: [],
    model: [false],
    page: 1,
    lengthPage: 0,
    limit: 20,
    offset: 0,
    total: 0,
  }),
  methods: {
    getNotif() {
      var offset = (this.page - 1) * this.limit;

      let params = new URLSearchParams();

      params.set("id_user", this.user.id);
      if (this.tab > 0) {
        if (this.tab == 1) {
          this.modul = 1;
          params.set("id_modul", this.modul);
        }
        if (this.tab == 2) {
          this.modul = 3;
          params.set("id_modul", this.modul);
        }
        if (this.tab == 3) {
          this.modul = 4;
          params.set("id_modul", this.modul);
        }
        if (this.tab == 4) {
          // this.modul = [7,10,11,12];
          params.append("id_modul", 7);
          params.append("id_modul", 10);
          params.append("id_modul", 11);
          params.append("id_modul", 12);
        }
      }
      params.set("offset", offset);
      params.set("limit", this.limit);

      let request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/log/v3/log/notifikasi", request)
        .then((response) => {
          let { data } = response;
          this.notif = data.data;

          this.total = data.count;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    read(id, modul, data) {
      let formData = new FormData();

      formData.append("id", id);

      this.axios
        .put("/log/v3/log/notifikasi", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then(() => {
          if (modul == 1) {
            this.$router.push({ path: "/iklan/" + data });
          } else if (modul == 4) {
            this.$router.push({ path: "/garasi/detail-unit/" + data });
          } else {
            this.$router.push({ path: "/upload-bukti/" + data });
          }
          this.$root.$children[0].getNotif();
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
  },
  created() {
    this.getNotif();
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  filters: {
    dateFormat: (date) => {
      return moment.utc(date).format("DD MMM YYYY");
    },
  },
};
</script>