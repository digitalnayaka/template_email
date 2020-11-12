<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="hits"
      :search="search"
      class="elevation-1"
      hide-default-footer
      :page="page"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Daftar Iklan ({{ total }})</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>

          <v-btn color="teal" dark class="mb-2 text-caption" to="/toko/add-ads">
            <v-icon left>mdi-plus</v-icon>Tambah Iklan
          </v-btn>

          <v-text-field
            v-model="search"
            outlined
            dense
            label="Search"
            class="mt-7"
            slot="extension"
            clearable
          >
            <template v-slot:append>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-filter</v-icon>
                </template>

                <v-list dense>
                  <v-list-item-group v-model="value" color="primary">
                    <v-list-item
                      v-for="item in items"
                      :key="item.id"
                      @click="filter(item.id)"
                    >
                      <v-list-item-subtitle> 
                        {{ item.status }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </template>
          </v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:item._source.judul="{ item }">
        <v-list>
          <v-list-item :to="'/iklan/' + item._source.id">
            <v-list-item-avatar tile size="50">
              <v-img :src="getImage(item._source.photo)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item._source.judul }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template v-slot:item._source.harga_awal="{ item }">
        <div v-if="item._source.id_mst_iklan_jenis == 2">
          Rp {{ item._source.harga_awal.toLocaleString("id-ID") }}
        </div>

        <div v-else>Rp {{ item._source.harga.toLocaleString("id-ID") }}</div>
      </template>

      <template v-slot:item._source.id_mst_iklan_status="{ item }">
        <div v-if="item._source.id_mst_iklan_status == 1">
          Tayang
        </div>

        <div v-if="item._source.id_mst_iklan_status == 2">
          Terjual
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small outlined color="teal" dark v-bind="attrs" v-on="on">
              Atur
              <v-icon right v-if="attrs['aria-expanded'] === 'false'"
                >mdi-chevron-down</v-icon
              >
              <v-icon right v-else>mdi-chevron-up</v-icon>
            </v-btn>
          </template>

          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-list dense>
                <v-list-item
                  v-bind="attrs"
                  v-on="on"
                  @click="edit(item)"
                  :disabled="
                    item._source.id_mst_iklan_status == 2 ? true : false
                  "
                >
                  <v-list-item-title class="d-flex align-center">
                    <v-icon small class="mr-2">mdi-pencil</v-icon>Edit
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">Edit Iklan</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="judul"
                    label="Judul Iklan"
                    outlined
                    dense
                    :rules="formRules"
                  ></v-text-field>

                  <v-text-field
                    v-model="deskripsi"
                    label="Deskripsi Iklan"
                    outlined
                    dense
                    :rules="formRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="teal"
                  :disabled="!valid"
                  class="white--text"
                  @click="updateIklan(item)"
                  >Simpan</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-list dense>
            <v-list-item
              @click="deleteIklan(item)"
              :disabled="item._source.id_mst_iklan_status == 1 ? false : true"
            >
              <v-list-item-title class="d-flex align-center">
                <v-icon small class="mr-2">mdi-delete</v-icon>Hapus
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-slot:no-data>Belum ada iklan.</template>
    </v-data-table>

    <v-pagination
      v-model="page"
      @input="daftarIklan"
      :length="lengthPage"
      :total-visible="5"
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "manage-ads",
  data: () => ({
    search: "",
    value: 0,
    items: [],
    headers: [
      { text: "Info Iklan", value: "_source.judul" },
      { text: "Jenis Iklan", value: "_source.mst_iklan_jenis" },
      { text: "Harga", value: "_source.harga_awal" },
      { text: "Status", value: "_source.id_mst_iklan_status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    hits: [],
    dialog: false,
    valid: true,
    formRules: [(v) => !!v || "Field is required"],
    judul: "",
    deskripsi: "",
    page: 1,
    offset: 0,
    limit: 20,
    total: 0,
    lengthPage: 0,
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAds: "ads/setAds",
    }),
    daftarIklan() {
      var offset = (this.page - 1) * this.limit;

      var params = new URLSearchParams();
      params.set("id_app_user", this.user.id);
      if (this.value > 0) {
        params.set("id_mst_iklan_status", this.value);
      }
      params.set("search", this.search == null ? "" : this.search);
      params.set("offset", offset);
      params.set("limit", this.limit);

      var request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
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
    filter(id) {
      this.$nextTick(() => {
        this.value = id;
        this.daftarIklan();
      });
    },
    getStatus() {
      this.axios
        .get("/iklan/v3/mst_iklan_status")
        .then((response) => {
          let { data } = response.data;
          this.items = data;
          this.items.splice(0, 0, { id: 0, status: "Semua" });
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    edit(item) {
      // this.dialog = true;
      this.judul = item._source.judul;
      this.deskripsi = item._source.deskripsi;
    },
    updateIklan(item) {
      let formData = new FormData();
      formData.set("judul", this.judul.trim());
      formData.set("deskripsi", this.deskripsi.trim());
      formData.set("id", item._source.id);

      if (item._source.id_mst_iklan_jenis == 1) {
        this.axios
          .put("/iklan/v3/iklan_hp_mokas_satuan", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            window.location = "/toko/manage-ads";
          })
          .catch((error) => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "success",
              text: responses.api_message,
            });
          });
      } else {
        this.axios
          .put("/iklan/v3/iklan_tb_mokas_satuan", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            window.location = "/toko/manage-ads";
          })
          .catch((error) => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "success",
              text: responses.api_message,
            });
          });
      }
    },
    deleteIklan(item) {
      var r = confirm("Apakah anda yakin untuk menghapus iklan ini?");
      if (r == true) {
        this.axios
          .delete("/iklan/v3/iklan", {
            headers: { Authorization: "Bearer " + this.user.token },
            params: {
              id: item._source.id,
            },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            window.location = "/toko/manage-ads";
          })
          .catch((error) => {
            let responses = error.response.data;
            console.log(responses);
          });
      }
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  created() {
    this.daftarIklan();
    this.getStatus();
  },
};
</script>