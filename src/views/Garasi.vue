<template>
  <v-card flat>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="garasi"
      :search="search"
      class="elevation-1"
      hide-default-footer
      :page="page"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Daftar Unit ({{total}})</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>

          <v-btn
            color="teal"
            dark
            class="mb-2 text-caption"
            to="/garasi/add-unit"
          >
            <v-icon left>mdi-plus</v-icon>Tambah Unit
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

      <template v-slot:item.type="{ item }">
        <v-list>
          <v-list-item :to="'/garasi/detail-unit/' + item.id">
            <v-list-item-avatar tile size="50">
              <v-img :src="getImage(item.foto_1)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.type }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.merk }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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

          <v-list dense>
            <v-list-item @click="getBarcode(item.id)">
              <v-list-item-title class="d-flex align-center">
                <v-icon small class="mr-2">mdi-barcode-scan</v-icon>Barcode
              </v-list-item-title>

              <v-dialog v-model="dialog">
                <v-card v-html="barcode"></v-card>
              </v-dialog>
            </v-list-item>

            <v-list-item
              :disabled="
                item.id_mst_motor_bekas_status == 1
                  ? false
                  : item.id_mst_motor_bekas_status == 5
                  ? false
                  : true
              "
              :to="'/garasi/edit-unit/' + item.id"
            >
              <v-list-item-title class="d-flex align-center">
                <v-icon small class="mr-2">mdi-pencil</v-icon>Edit
              </v-list-item-title>
            </v-list-item>

            <v-list-item
              :disabled="item.id_mst_motor_bekas_status == 1 ? false : true"
              @click="deleteUnit(item)"
            >
              <v-list-item-title class="d-flex align-center">
                <v-icon small class="mr-2">mdi-delete</v-icon>Hapus
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-slot:no-data>Belum ada unit.</template>
    </v-data-table>

    <v-pagination
      v-model="page"
      @input="daftarProduk"
      :length="lengthPage"
      :total-visible="5"
    ></v-pagination>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "garasi",
  data: () => ({
    search: "",
    value: 0,
    items: [],
    headers: [
      { text: "Info Unit", value: "type" },
      { text: "Nomor Polisi", value: "nomor_polisi" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    garasi: [],
    dialog: false,
    barcode: null,
    page: 1,
    offset: 0,
    limit: 20,
    total: 0,
    lengthPage: 0,
  }),
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    daftarProduk() {
      var offset = (this.page - 1) * this.limit;

      var params = new URLSearchParams();

      params.set("id_app_user", this.user.id);
      if (this.value > 0) {
        params.set("id_mst_motor_bekas_status", this.value);
      }
      params.set("search", this.search == null ? "" : this.search);
      params.set("offset", offset);
      params.set("limit", this.limit);

      var request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/produk/v3/unit_mokas", request)
        .then((response) => {
          let { data } = response.data;
          this.garasi = data;
          this.total = response.data.count;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getBarcode(id) {
      this.axios
        .get("/produk/v3/barcode", {
          params: {
            id: id,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.barcode = data;
          this.dialog = true;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    deleteUnit(item) {
      var r = confirm("Yakin akan dihapus");
      if (r == true) {
        let formData = new FormData();

        formData.append("id", item.id);
        formData.append("limit", 1);

        this.axios
          .post("/produk/v3/unit_mokas_delete", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.daftarProduk();
          })
          .catch((error) => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "error",
              text: responses.api_message,
            });
          });
      }
    },
    filter(id) {
      this.$nextTick(() => {
        this.value = id;
        this.daftarProduk();
      });
    },
    getStatus() {
      this.axios
        .get("/produk/v3/mst_motor_bekas_status")
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
  },
  created() {
    this.daftarProduk();
    this.getStatus();
  },
};
</script>
