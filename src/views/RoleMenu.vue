<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="rolemenus"
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
          <v-btn class="ma-2" color="green" outlined @click="open">
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

                        <v-autocomplete
                          outlined
                          v-model="editedItem.role_name"
                          :items="roles"
                          item-text="role_name"
                          item-value="id"
                          clearable
                          label="Role"
                          :disabled="disabled"
                          @change="getMenus"
                          :rules="formRules"
                        ></v-autocomplete>

                        <v-autocomplete
                          outlined
                          v-model="editedItem.menu_name"
                          :items="menus"
                          item-text="menu_name"
                          item-value="id"
                          clearable
                          label="Menu"
                          small-chips
                          chips
                          multiple
                          :disabled="disabled"
                          :rules="formRules"
                        ></v-autocomplete>

                        <v-autocomplete
                          outlined
                          v-model="editedItem.status"
                          :items="status"
                          clearable
                          label="Status"
                          :rules="formRules"
                        ></v-autocomplete>
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
  name: "RoleMenu",
  components: {
    Alert: () =>
      import(/* webpackChunkName: "alert" */ "@/components/Alert.vue")
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Role Name", value: "role_name" },
      { text: "Menu Name", value: "menu_name" },
      { text: "Status", value: "status" },
      { text: "Action", value: "action" }
    ],
    rolemenus: [],
    roles: [],
    menus: [],
    disabled: false,
    dialog: false,
    search: "",
    key: 0,
    editedIndex: -1,
    editedItem: {
      id: "",
      role_name: "",
      menu_name: "",
      status: ""
    },
    defaultItem: {
      id: "",
      role_name: "",
      menu_name: {},
      status: ""
    },
    status: [{ text: "ACTIVE" }, { text: "INACTIVE" }],
    formRules: [v => !!v || "Field is required"],
    valid: true,
    datetime: new Date().toISOString()
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Role Menu" : "Edit Role Menu";
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
    open() {
      this.dialog = true;
      this.disabled = false;
      this.getMenus();
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    getRoleMenus() {
      this.axios
        .get("/setup/v1/rolemenus")
        .then(response => {
          let { data } = response.data;
          this.rolemenus = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
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
    getMenus() {
      this.axios
        .get("/setup/v1/allmenus", {
          params: {
            role_id: this.editedItem.role_name
          }
        })
        .then(response => {
          let { data } = response.data;
          this.menus = data;
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    storeItem() {
      var i = 0;
      let formData = new FormData();
      formData.append("role_id", this.editedItem.role_name);
      for (i = 0; i < this.editedItem.menu_name.length; i++) {
        formData.append("menu_id", this.editedItem.menu_name[i]);
      }
      formData.append("status", this.editedItem.status);
      formData.append("created_by", this.user.id);
      this.axios
        .post("/setup/v1/rolemenus", formData)
        .then(response => {
          let { data } = response.data;
          console.log(data);
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Saved"
          });
          this.getRoleMenus();
        })
        .catch(error => {
          console.log(error);
        });
      this.close();
    },
    editItem(item) {
      this.disabled = true;
      this.editedIndex = this.rolemenus.indexOf(item);
      this.editedItem.id = item.id;
      this.editedItem.role_name = item.role_id;
      this.editedItem.menu_name = item.menu_id;
      this.editedItem.status = item.status;
      this.dialog = true;
    },
    updateItem() {
      let formData = new FormData();
      formData.append("id", this.editedItem.id);
      formData.append("status", this.editedItem.status);
      formData.append("updated_by", this.user.id);
      formData.append("updated_at", this.datetime);
      this.axios
        .put("/setup/v1/rolemenus", formData)
        .then(response => {
          let { data } = response;
          console.log(data);
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Updated"
          });
          this.getRoleMenus();
          // this.key += 1;
        })
        .catch(error => {
          console.log(error);
        });
      this.close();
    },
    deleteItem(item) {
      const index = this.rolemenus.indexOf(item);
      var r = confirm("Yakin akan dihapus?");
      if (r == true) {
        this.axios
          .delete("/setup/v1/rolemenus", {
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
            this.rolemenus.splice(index, 1);
            this.key += 1;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  created() {
    this.getRoleMenus();
    this.getRoles();
    this.timestamp();
  }
};
</script>