<template>
  <v-data-table :headers="headers" :items="accounts" :sort-by="['bank_name']">
    <template v-slot:top>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"
              >Daftar Rekening Bank</v-list-item-title
            >
            <v-btn
              color="teal"
              dark
              small
              @click="dialog = true"
              class="d-flex d-sm-none"
              >Tambah Rekening</v-btn
            >
          </v-list-item-content>

          <v-list-item-action class="d-none d-sm-flex">
            <v-dialog v-model="dialog" max-width="400px">
              <template v-slot:activator="{ on }">
                <v-btn color="teal" dark small v-on="on">Tambah Rekening</v-btn>
              </template>

              <v-card>
                <v-card-title>{{ formTitle }}</v-card-title>
                <v-card-subtitle
                  >Rekening bank yang telah ditambahkan bisa kamu gunakan untuk
                  pengembalian Refund Tiket SiMotor</v-card-subtitle
                >

                <v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Nama Bank</v-list-item-title>
                          <v-select
                            v-model="editedItem.bank_name"
                            outlined
                            dense
                            :items="banks"
                            item-value="id"
                            item-text="bank_name"
                            :rules="formRules"
                            v-if="bank"
                          ></v-select>

                          <v-text-field
                            v-model="editedItem.bank_name"
                            outlined
                            dense
                            v-else
                          ></v-text-field>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title
                            >Nama Pemilik Rekening</v-list-item-title
                          >
                          <v-text-field
                            v-model="editedItem.nama_rekening"
                            outlined
                            dense
                            :counter="20"
                            :rules="formRules"
                          ></v-text-field>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Nomor Rekening</v-list-item-title>
                          <v-text-field
                            v-model="editedItem.nomor_rekening"
                            outlined
                            dense
                            :counter="20"
                            :rules="rekeningRules"
                          ></v-text-field>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="red" outlined @click="close">Cancel</v-btn>

                  <v-btn
                    color="teal"
                    class="white--text"
                    @click="save"
                    :disabled="!valid"
                    v-if="editedIndex == -1"
                    >Simpan</v-btn
                  >

                  <v-btn
                    color="teal"
                    class="white--text"
                    @click="update"
                    :disabled="!valid"
                    v-if="editedItem.is_main == false"
                    >Jadikan Utama</v-btn
                  >

                  <v-btn
                    color="teal"
                    class="white--text"
                    disabled
                    v-if="editedIndex != -1 && editedItem.is_main == true"
                    >Sudah Utama</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </template>

    <template v-slot:item.is_main="{ item }">
      <v-icon :color="getColor(item.is_main)">mdi-star</v-icon>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" @click="editItem(item)"
            >mdi-pencil</v-icon
          >
        </template>
        <span>Edit</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" @click="deleteItem(item)"
            >mdi-delete</v-icon
          >
        </template>
        <span>Hapus</span>
      </v-tooltip>
    </template>

    <template v-slot:no-data>Anda belum memilki rekening.</template>
  </v-data-table>
</template>


<script>
import { mapActions } from "vuex";

export default {
  name: "rekening-bank",
  props: ["user"],
  data: () => ({
    dialog: false,
    headers: [
      { text: "Bank", value: "bank_name" },
      { text: "Nama Rekening", value: "nama_rekening" },
      { text: "Nomor Rekening", value: "nomor_rekening" },
      { text: "Utama", value: "is_main" },
      { text: "Actions", value: "actions" },
    ],
    accounts: [],
    banks: [],
    editedIndex: -1,
    editedItem: {
      bank_name: "",
      nama_rekening: "",
      nomor_rekening: "",
    },
    bank: true,
    defaultItem: {},
    formRules: [(v) => !!v || "tidak boleh kosong"],
    rekeningRules: [
      (v) => !!v || "tidak boleh kosong",
      (v) => /^\d+$/.test(v) || "harus diisi dengan angka",
    ],
    valid: true,
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Tambah Rekening Bank"
        : "Edit Rekening Bank";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
      setToken: "auth/SET_TOKEN",
    }),
    getRekening() {
      this.axios
        .get("/user/v3/user/rekening", {
          params: {
            id_app_user: this.user.id,
            limit: 999,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.accounts = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getBank() {
      this.axios
        .get("/master/v3/mst_bank")
        .then((response) => {
          let { data } = response.data;
          this.banks = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    editItem(item) {
      this.editedIndex = this.accounts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.bank = false;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
      this.bank = true;
    },
    save() {
      let formData = new FormData();

      formData.set("id_mst_bank", this.editedItem.bank_name);
      formData.set("nama_rekening", this.editedItem.nama_rekening.trim());
      formData.set("nomor_rekening", this.editedItem.nomor_rekening.trim());
      formData.set("id_app_user", this.user.id);

      this.axios
        .post("/user/v3/user/rekening", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.getRekening();
          this.close();
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "success",
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
    update() {
      let formData = new FormData();

      formData.set("is_main", true);
      formData.set("id", this.editedItem.id);
      formData.set("id_app_user", this.user.id);

      this.axios
        .put("/user/v3/user/rekening", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.getRekening();
          this.close();
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
    deleteItem(item) {
      this.editedIndex = this.accounts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      var r = confirm("Yakin akan dihapus?");
      if (r == true) {
        let formData = new FormData();

        formData.append("id", this.editedItem.id);
        formData.append("id_app_user", this.user.id);

        this.axios
          .post("/user/v3/user/rekening/delete", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.getRekening();
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
    getColor(is_main) {
      if (is_main == true) return "yellow";
      else return "grey lighten-1";
    },
  },
  created() {
    this.getRekening();
    this.getBank();
  },
};
</script>