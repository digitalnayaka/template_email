<template>
  <div>
    <h3>Slogan</h3>

    <v-text-field
      clearable
      v-model="slogan"
      placeholder="Masukkan Slogan Anda"
      outlined
      dense
    ></v-text-field>

    <div align="right">
      <v-btn
        color="primary"
        @click="postSlogan"
        :disabled="slogan == null ? true : false"
        >Simpan</v-btn
      >
    </div>

    <br />

    <div class="d-flex flex-wrap align-center">
      <h3 class="mr-auto">Catatan</h3>

      <v-btn
        color="teal"
        dark
        small
        class="mx-2"
        @click="openDialog('Tambah Catatan')"
      >
        Tambah Catatan
      </v-btn>
      <v-btn color="teal" dark small @click="openDialog('Tambah Kebijakan')">
        Tambah Kebijakan
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

    <h3>Kebijakan</h3>

    <div v-html="kebijakan.deskripsi"></div>
  </div>

  <!-- <div>
    <h3>Umum</h3>

    <v-row dense>
      <v-col cols="12" sm="8">
        <h5>Informasi Umum</h5>

        <v-textarea
          placeholder="Masukan informasi umum"
          outlined
          dense
          rows="3"
          no-resize
        ></v-textarea>
      </v-col>

      <v-col cols="12" sm="8">
        <h5>Slogan</h5>

        <v-text-field
          clearable
          v-model="slogan"
          placeholder="Masukkan Slogan Anda"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>

    <h3>Tambahkan Catatan</h3>

    <v-row dense>
      <v-col cols="12" sm="8">
        <h5>Judul Catatan</h5>

        <v-text-field
          clearable
          v-model="catatan.judul"
          placeholder="Masukkan Judul Catatan"
          outlined
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="8">
        <h5>Isi Catatan</h5>

        <v-textarea
          v-model="catatan.deskripsi"
          placeholder="Masukan isi catatan"
          outlined
          dense
          rows="3"
          no-resize
        ></v-textarea>
      </v-col>
    </v-row>

    <h3>Tambahkan Kebijakan Penjual</h3>

    <v-row dense>
      <v-col cols="12" sm="8">
        <h5>Judul Kebijakan</h5>

        <v-text-field
          clearable
          v-model="first"
          placeholder="Masukkan Judul Kebijakan"
          outlined
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="8">
        <h5>Isi Kebijakan</h5>

        <v-textarea
          v-model="reply"
          placeholder="Masukan isi kebijakan"
          outlined
          dense
          rows="3"
          no-resize
        ></v-textarea>
      </v-col>
    </v-row>

    <v-btn block color="primary" @click="simpan">Simpan</v-btn>
  </div> -->
</template>

<script>
import { mapActions } from "vuex";
import { VueEditor } from "vue2-editor";

export default {
  name: "info-penjual",
  props: ["user"],
  components: { VueEditor },
  data: () => ({
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
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
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
          this.slogan = data[0].slogan;
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
          let { data } = response.data;
          this.catatan = data;
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
          let { data } = response.data;
          this.kebijakan = data[0];
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
      this.title =
        item.type_catatan == 1 ? "Tambah Catatan" : "Tambah Kebijakan";
      if (this.title == "Tambah Kebijakan") {
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
    simpan() {
      if (this.jenis == "post") {
        this.postCatatan();
      } else {
        this.updateCatatan();
      }
    },
  },
  created() {
    this.getSlogan();
    this.getCatatan();
    this.getKebijakan();
  },
};
</script>