<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="#22939E"
      color="white"
      dark
      slider-color="yellow"
      show-arrows
    >
      <v-tab>Performa Penjualan </v-tab>
      <v-tab>Performa Pembelian</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="pa-4">
      <v-tab-item>
        <div class="d-flex align-center">
          <h3 class="cyan lighten-4 pa-1">
            {{ avg.ratting_iklan }}
          </h3>

          <star-rating
            :rating="avg.ratting_iklan"
            read-only
            :show-rating="false"
            :round-start-rating="false"
            :star-size="30"
            inline
            class="ml-2"
          ></star-rating>

          <div v-if="ulasanSaya > 0">( {{ ulasanSaya }} Ulasan )</div>
        </div>

        <v-divider class="my-4"></v-divider>

        <div class="d-flex align-center">
          <h3 class="mr-auto">Slogan</h3>

          <v-btn
            small
            color="#22939E"
            dark
            @click="ubahSlogan = true"
            v-if="user.slogan == null"
          >
            <v-icon left>mdi-plus</v-icon> Tambah Slogan
          </v-btn>
        </div>

        <div class="d-flex align-center" v-if="!ubahSlogan">
          <div>{{ slogan }}</div>

          <a
            href="javascript:void(0)"
            @click="ubahSlogan = true"
            v-if="user.slogan != null"
          >
            <v-icon>mdi-pencil</v-icon>
          </a>
        </div>

        <div v-else>
          <v-text-field
            clearable
            v-model="slogan"
            placeholder="Masukkan Slogan Anda"
            outlined
            dense
          ></v-text-field>

          <div align="right">
            <v-btn color="error" @click="ubahSlogan = false" class="mx-2">
              Cancel
            </v-btn>

            <v-btn
              color="primary"
              @click="postSlogan"
              :disabled="slogan == null ? true : false"
            >
              Simpan
            </v-btn>
          </div>
        </div>

        <v-divider class="my-4"></v-divider>

        <div class="d-flex flex-wrap align-center">
          <h3 class="mr-auto">Catatan</h3>

          <v-btn
            color="#22939E"
            dark
            small
            class="mx-2"
            @click="openDialog('Tambah Catatan')"
          >
            <v-icon left>mdi-plus</v-icon>
            Tambah Catatan
          </v-btn>

          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                {{ title }}
              </v-card-title>

              <v-card-text>
                <h3 class="mt-2">Judul Catatan</h3>

                <v-text-field
                  v-model="judul"
                  placeholder="Masukkan Judul"
                  outlined
                  dense
                  :readonly="readonly"
                ></v-text-field>

                <h3>Isi Catatan</h3>

                <vue-editor
                  v-model="content"
                  :editorToolbar="customToolbar"
                ></vue-editor>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  class="white--text"
                  :disabled="judul == '' || content == '' ? true : false"
                  @click="simpan"
                >
                  Simpan
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <br />

        <v-expansion-panels focusable>
          <v-expansion-panel v-for="item in catatan" :key="item.id">
            <v-expansion-panel-header>
              <div class="d-flex align-center">
                <b class="mr-auto">{{ item.judul }}</b>

                <div class="mx-2">
                  <v-btn x-small outlined @click="edit(item)">
                    <v-icon left>mdi-pencil</v-icon> Ubah
                  </v-btn>
                </div>

                <div class="mx-2">
                  <v-btn x-small outlined @click="deleteCatatan(item)">
                    <v-icon left>mdi-delete</v-icon> Hapus
                  </v-btn>
                </div>
              </div>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <div v-html="item.deskripsi"></div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <br />

        <div class="d-flex flex-wrap">
          <h3 class="mr-auto">Kebijakan</h3>
          <v-btn
            color="#22939E"
            dark
            small
            class="mx-2"
            @click="openDialog('Tambah Kebijakan')"
          >
            <v-icon left>mdi-plus</v-icon>
            Tambah Kebijakan
          </v-btn>
        </div>

        <div class="d-flex justify-space-between mt-2">
          <div v-html="kebijakan.deskripsi"></div>

          <div v-if="kebijakan != ''">
            <v-btn x-small outlined class="mx-2" @click="edit(kebijakan)">
              <v-icon left>mdi-pencil</v-icon> Ubah
            </v-btn>

            <v-btn
              x-small
              outlined
              class="mx-2"
              @click="deleteCatatan(kebijakan)"
            >
              <v-icon left>mdi-delete</v-icon> Hapus
            </v-btn>
          </div>
        </div>
      </v-tab-item>

      <v-tab-item>
        <buyer-performance :user="user" :utc="utc" :timezone="timezone" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { VueEditor } from "vue2-editor";
import StarRating from "vue-star-rating";

export default {
  name: "info-penjual",
  props: ["user", "utc", "timezone"],
  components: {
    StarRating,
    VueEditor,
    BuyerPerformance: () =>
      import(
        /* webpackChunkName: "buyer-performance" */ "@/components/BuyerPerformance.vue"
      ),
  },
  data: () => ({
    tab: 0,
    ubahSlogan: false,
    slogan: null,
    dialog: false,
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block"],
    ],
    title: "",
    catatan: [],
    judul: "",
    content: "",
    kebijakan: [],
    readonly: false,
    type: 0,
    jenis: "post",
    selected: [],
    avg: [],
    ulasanSaya: 0,
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
      setToken: "auth/SET_TOKEN",
    }),
    getSlogan() {
      this.axios
        .get("/user/v3/user/slogan_penjual", {
          params: {
            id_app_user: this.user.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          if (data.length > 0) {
            this.slogan = data[0].slogan;
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    postSlogan() {
      let formData = new FormData();

      formData.set("id_app_user", this.user.id);
      formData.set("slogan", this.slogan);

      this.axios
        .post("/user/v3/user/slogan_penjual", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
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
    openDialog(title) {
      this.dialog = true;
      this.title = title;
      this.type = 2;
      if (title == "Tambah Kebijakan") {
        this.judul = "Kebijakan";
        this.readonly = true;
        this.type = 1;
      }
    },
    getCatatan() {
      this.axios
        .get("/user/v3/user/catatan_penjual", {
          params: {
            id_app_user: this.user.id,
            type_catatan: 2,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          if (data.count > 0) {
            this.catatan = data.data;
          } else {
            this.catatan = [];
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getKebijakan() {
      this.axios
        .get("/user/v3/user/catatan_penjual", {
          params: {
            id_app_user: this.user.id,
            type_catatan: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          if (data.count > 0) {
            this.kebijakan = data.data[0];
          } else {
            this.kebijakan = [];
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    postCatatan() {
      let formData = new FormData();

      formData.set("id_app_user", this.user.id);
      formData.set("judul", this.judul);
      formData.set("deskripsi", this.content);
      formData.set("type_catatan", this.type);

      this.axios
        .post("/user/v3/user/catatan_penjual", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.dialog = false;
          this.judul = "";
          this.content = "";
          this.getCatatan();
          this.getKebijakan();
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
        });
    },
    edit(item) {
      this.selected = item;
      this.dialog = true;
      this.jenis = "edit";
      this.title = item.type_catatan == 1 ? "Edit Catatan" : "Edit Kebijakan";
      if (this.title == "Edit Kebijakan") {
        this.type = 1;
      } else {
        this.type = 2;
      }
      this.judul = item.judul;
      this.content = item.deskripsi;
    },
    updateCatatan() {
      let formData = new FormData();

      formData.set("id", this.selected.id);
      formData.set("judul", this.judul);
      formData.set("deskripsi", this.content);

      this.axios
        .put("/user/v3/user/catatan_penjual", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.dialog = false;
          this.judul = "";
          this.content = "";
          this.getCatatan();
          this.getKebijakan();
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
        });
    },
    deleteCatatan(item) {
      var r = confirm("Yakin akan dihapus?");
      if (r == true) {
        this.axios
          .delete("/user/v3/user/catatan_penjual", {
            headers: { Authorization: "Bearer " + this.user.token },
            data: {
              id: item.id,
            },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.getCatatan();
            this.getKebijakan();
          })
          .catch((error) => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "error",
              text: responses.api_message,
            });
            if (error.response.status == 403) {
              this.setAuth(null);
              this.setToken(null);
              window.localStorage.setItem("user", null);
              window.localStorage.setItem("token", null);
              window.location.href = "/";
            }
          });
      }
    },
    simpan() {
      if (this.jenis == "post") {
        this.postCatatan();
      } else {
        this.updateCatatan();
      }
    },
    reviewAvg() {
      this.axios
        .get("/transaksi/v3/review_avg", {
          params: {
            id_penjual: this.user.id,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.avg = data[0];
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    myReview() {
      this.axios
        .get("/transaksi/v3/review", {
          params: {
            id_penjual: this.user.id,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.ulasanSaya = data.count;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
  },
  created() {
    this.getSlogan();
    this.getCatatan();
    this.getKebijakan();
    this.reviewAvg();
    this.myReview();
  },
};
</script>