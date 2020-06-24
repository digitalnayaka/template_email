<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="roles"
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

                <v-container>
                  <v-row dense>
                    <v-col cols="12">
                      <form>
                        <v-text-field
                          v-model="editedItem.id"
                          label="ID"
                          v-bind:style="{display:'none'}"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="editedItem.role_name"
                          label="Role Name"
                          :rules="formRules"
                        ></v-text-field>
                      </form>
                    </v-col>
                  </v-row>
                </v-container>

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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "Role",
  components: {
    Alert: () =>
      import(/* webpackChunkName: "alert" */ "@/components/Alert.vue")
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Role Name", value: "role_name" },
      { text: "Action", value: "action" }
    ],
    roles: [],
    dialog: false,
    search: "",
    key: 0,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      id: "",
      role_name: ""
    },
    formRules: [v => !!v || "Field is required"],
    valid: true,
    datetime: new Date().toISOString()
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Role" : "Edit Role";
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
    getRoles() {
      this.axios
        .get("/setup/v1/roles")
        .then(response => {
          let { data } = response.data;
          this.roles = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    storeItem() {
      let formData = new FormData();
      formData.append("role_name", this.editedItem.role_name);
      formData.append("created_by", this.user.id);
      this.axios
        .post("/setup/v1/roles", formData)
        .then(response => {
          let { data } = response.data;
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Saved"
          });
          this.roles.push(data);
          this.key += 1;
        })
        .catch(error => {
          console.log(error);
        });
      this.close();
    },
    editItem(item) {
      this.editedIndex = this.roles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    updateItem() {
      let formData = new FormData();
      formData.append("id", this.editedItem.id);
      formData.append("role_name", this.editedItem.role_name);
      formData.append("updated_by", this.user.id);
      formData.append("updated_at", this.datetime);
      this.axios
        .put("/setup/v1/roles", formData)
        .then(response => {
          let { data } = response;
          console.log(data);
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Updated"
          });
          this.getRoles();
          this.key += 1;
        })
        .catch(error => {
          console.log(error);
        });
      this.close();
    },
    deleteItem(item) {
      const index = this.roles.indexOf(item);
      var r = confirm("Yakin akan dihapus?");
      if (r == true) {
        this.axios
          .delete("/setup/v1/roles", {
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
            this.roles.splice(index, 1);
            this.key += 1;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  created() {
    this.getRoles();
    this.timestamp();
  }
};
</script>