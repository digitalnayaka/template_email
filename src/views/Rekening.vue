<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-data-table :headers="headers" :items="accounts" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Rekening Bank</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="350px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Tambah</v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-row dense>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.bank_name"
                        :items="banks"
                        item-value="id"
                        item-text="bank_name"
                        :rules="[v => !!v || 'Field is required']"
                        label="Pilih Nama Bank"
                        v-if="bank"
                      ></v-select>

                      <v-text-field v-model="editedItem.bank_name" label="Pilih Nama Bank" v-else></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.nama_rekening"
                        :counter="20"
                        :rules="[v => !!v || 'Field is required']"
                        label="Nama Pemilik Rekening"
                        :readonly="bank"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.nomor_rekening"
                        :counter="20"
                        :rules="[v => !!v || 'Field is required',v => /^\d+$/.test(v) || 'Numbers Only',]"
                        label="Nomor Rekening"
                        :readonly="bank"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="blue darken-1" @click="close">Cancel</v-btn>

                <v-btn
                  color="blue darken-1"
                  @click="save"
                  :disabled="!valid"
                  v-if="editedIndex == -1"
                >Save</v-btn>

                <v-btn
                  color="blue darken-1"
                  @click="update"
                  :disabled="!valid"
                  v-if="editedItem.is_main == false"
                >Jadikan Utama</v-btn>

                <v-btn
                  color="blue darken-1"
                  disabled
                  v-if="editedIndex != -1 && editedItem.is_main == true"
                >Sudah Utama</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.is_main="{ item }">
        <v-icon :color="getColor(item.is_main)">mdi-star</v-icon>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "rekening",
  data: () => ({
    dialog: false,
    headers: [
      { text: "Bank", value: "bank_name" },
      { text: "Nama Rekening", value: "nama_rekening" },
      { text: "Nomor Rekening", value: "nomor_rekening" },
      { text: "Utama", value: "is_main" },
      { text: "Actions", value: "actions" }
    ],
    accounts: [],
    banks: [],
    editedIndex: -1,
    editedItem: {
      bank_name: "",
      nama_rekening: "",
      nomor_rekening: ""
    },
    bank: true,
    defaultItem: {},
    valid: true,
    money: {
      precision: 0,
      thousands: "",
      masked: true
    }
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    getRekening() {
      this.axios
        .get("/user/v3/user/rekening", {
          params: {
            id_app_user: this.user.id,
            limit: 999
          }
        })
        .then(response => {
          let { data } = response.data;
          this.accounts = data;
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getBank() {
      this.axios
        .get("/master/v3/mst_bank")
        .then(response => {
          let { data } = response.data;
          this.banks = data;
        })
        .catch(error => {
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

      formData.append("id_mst_bank", this.editedItem.bank_name);
      formData.append("nama_rekening", this.editedItem.nama_rekening.trim());
      formData.append("nomor_rekening", this.editedItem.nomor_rekening.trim());
      formData.append("id_app_user", this.user.id);

      this.axios
        .post("/user/v3/user/rekening", formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message
          });
          this.getRekening();
          this.close();
        })
        .catch(error => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "success",
            text: responses.api_message
          });
        });
    },
    update() {
      let formData = new FormData();

      formData.append("is_main", true);
      formData.append("id", this.editedItem.id);
      formData.append("id_app_user", this.user.id);

      this.axios
        .put("/user/v3/user/rekening", formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message
          });
          this.getRekening();
          this.close();
        })
        .catch(error => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message
          });
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
            headers: { Authorization: "Bearer " + this.user.token }
          })
          .then(response => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message
            });
            this.getRekening();
          })
          .catch(error => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "error",
              text: responses.api_message
            });
          });
      }
    },
    getColor(is_main) {
      if (is_main == true) return "yellow";
      else return "grey lighten-1";
    }
  },
  created() {
    this.getRekening();
    this.getBank();
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    }),
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Rekening" : "Edit Rekening";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  }
};
</script>