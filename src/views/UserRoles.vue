<template>
  <v-data-table
    :headers="headers"
    :items="jenisIklan"
    :items-per-page="20"
    :key="key"
    :search="search"
    :footer-props="{
      itemsPerPageOptions: [20,50,100,-1]
    }"
    class="elevation-1"
    dense
  >
    <template v-slot:top>
      <v-toolbar flat dense color="grey lighten-2">
        <v-btn class="ma-2" color="green" outlined @click="dialog = true;">
          <v-icon large left>mdi-plus</v-icon>Add
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          outlined
          dense
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-form ref="form" v-model="valid">
          <v-dialog v-model="dialog" persistent max-width="400px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row dense>
                    <v-col cols="12">
                      <form>
                        <v-text-field
                          v-model="editedItem.id"
                          label="ID"
                          v-bind:style="{display:'none'}"
                        ></v-text-field>
                        <v-text-field outlined v-model="editedItem.name" label="Name"></v-text-field>
                        <v-text-field outlined v-model="editedItem.desc" label="Desc"></v-text-field>
                        <v-text-field outlined v-model="editedItem.icon" label="icon"></v-text-field>
                        <v-text-field outlined v-model="editedItem.route" label="Route"></v-text-field>
                        <v-autocomplete
                          outlined
                          v-model="editedItem.status"
                          :items="status"
                          clearable
                          label="Status"
                        ></v-autocomplete>
                      </form>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="storeItem"
                  v-if="editedIndex == -1"
                  :disabled="!valid"
                >Save</v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="updateItem"
                  v-else
                  :disabled="!valid"
                >Update</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-form>
      </v-toolbar>
    </template>

    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>

    <alert />
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  name: "UserRoles",
  components: {
    Alert: () =>
      import(/* webpackChunkName: "alert" */ "@/components/Alert.vue")
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Name", value: "name" },
      { text: "Desc", value: "desc" },
      { text: "Icon", value: "icon" },
      { text: "Route", value: "route" },
      { text: "Status", value: "status" },
      { text: "Action", value: "action" }
    ],
    jenisIklan: [],
    dialog: false,
    search: "",
    key: 0,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      id: "",
      name: "",
      desc: "",
      icon: "",
      route: "",
      status: ""
    },
    status: [{ text: "ACTIVE" }, { text: "INACTIVE" }],
    valid: true,
    defaultActive: 0,
    countActive: 0,
    datetime: new Date().toISOString()
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Jenis Iklan" : "Edit Jenis Iklan";
    },
    ...mapGetters({
      user: "auth/user"
    })
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    timestamp() {
      this.datetime = moment(this.date).format("YYYY-MM-DD HH:mm:ss");
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    getJenisIklan() {
      this.axios
        .get("/setup/v3/jenis_iklan")
        .then(response => {
          let { data } = response.data;
          this.jenisIklan = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    storeItem() {
      let formData = new FormData();
      formData.append("name", this.editedItem.name);
      formData.append("desc", this.editedItem.desc);
      formData.append("icon", this.editedItem.icon);
      formData.append("route", this.editedItem.route);
      formData.append("status", this.editedItem.status);
      formData.append("created_by", this.user[0].id);
      this.axios
        .post("/setup/v3/jenis_iklan", formData)
        .then(response => {
          let { data } = response.data;
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Saved"
          });
          this.jenisIklan.push(data);
          this.key += 1;
        })
        .catch(error => {
          console.log(error);
        });
      this.close();
    },
    editItem(item) {
      this.editedIndex = this.jenisIklan.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    updateItem() {
      let formData = new FormData();
      formData.append("id", this.editedItem.id);
      formData.append("name", this.editedItem.name);
      formData.append("desc", this.editedItem.desc);
      formData.append("icon", this.editedItem.icon);
      formData.append("route", this.editedItem.route);
      formData.append("status", this.editedItem.status);
      formData.append("updated_by", this.user[0].id);
      formData.append("updated_at", this.datetime);
      this.axios
        .put("/setup/v3/jenis_iklan", formData)
        .then(response => {
          let { data } = response;
          console.log(data);
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Updated"
          });
          this.getJenisIklan();
          this.key += 1;
        })
        .catch(error => {
          console.log(error);
        });
      this.close();
    },
    deleteItem(item) {
      const index = this.jenisIklan.indexOf(item);
      var r = confirm("Yakin akan dihapus?");
      if (r == true) {
        this.axios
          .delete("/setup/v3/jenis_iklan", {
            data: {
              id: item.id
            }
          })
          .then(response => {
            let { data } = response;
            console.log(data);
            this.setAlert({
              status: true,
              color: "success",
              text: "Data Deleted"
            });
            this.jenisIklan.splice(index, 1);
            this.key += 1;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  created() {
    this.getJenisIklan();
    this.timestamp();
  }
};
</script>