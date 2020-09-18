<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="modules"
      :items-per-page="20"
      :key="key"
      :search="search"
      :footer-props="{
      itemsPerPageOptions: [20,50,100,-1]
    }"
      class="elevation-1"
      dense
      show-expand
      single-expand
      :expanded.sync="expanded"
      @item-expanded="getMenus($event.item.id)"
    >
      <template v-slot:top>
        <v-toolbar flat dense color="grey lighten-2">
          <v-btn class="ma-2" color="green" outlined @click="open($event.item,'module')">
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
            <v-dialog v-model="dialogModule" persistent max-width="400px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-container fluid>
                  <v-row dense>
                    <v-col cols="12">
                      <form>
                        <v-text-field
                          v-model="editedItem.id"
                          label="Module ID"
                          v-bind:style="{display:'none'}"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="editedItem.module_name"
                          label="Module Name"
                          :rules="formRules"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="editedItem.module_icon"
                          label="Module Icon"
                          :rules="formRules"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="editedItem.module_seq"
                          v-mask="mask"
                          label="Module Seq"
                          :rules="formRules"
                        ></v-text-field>
                      </form>
                    </v-col>
                  </v-row>
                </v-container>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="blue darken-1" text @click="closeModule">Cancel</v-btn>

                  <v-btn
                    color="blue darken-1"
                    text
                    @click="storeItem"
                    v-if="method != 'edit_module'"
                    :disabled="!valid"
                  >Save</v-btn>

                  <v-btn
                    color="blue darken-1"
                    text
                    @click="updateItem"
                    :disabled="!valid"
                    v-else
                  >Update</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogMenu" persistent max-width="400px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ dialogTitle }}</span>
                </v-card-title>

                <v-container>
                  <v-row dense>
                    <v-col cols="12">
                      <form>
                        <v-text-field
                          v-model="editedMenu.id"
                          label="Menu ID"
                          v-bind:style="{display:'none'}"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="editedMenu.menu_name"
                          label="Menu Name"
                          :rules="formRules"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="editedMenu.menu_icon"
                          label="Menu Icon"
                          :rules="formRules"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="editedMenu.menu_route"
                          label="Menu Route"
                          :rules="formRules"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="editedMenu.menu_seq"
                          v-mask="mask"
                          label="Menu Seq"
                          :rules="formRules"
                        ></v-text-field>

                        <v-autocomplete
                          outlined
                          v-model="editedMenu.menu_status"
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

                  <v-btn color="blue darken-1" text @click="closeMenu">Cancel</v-btn>

                  <v-btn
                    color="blue darken-1"
                    text
                    @click="storeMenu"
                    v-if="method != 'edit_menu'"
                    :disabled="!valid"
                  >Save</v-btn>

                  <v-btn
                    color="blue darken-1"
                    text
                    @click="updateMenu"
                    :disabled="!valid"
                    v-else
                  >Update</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-form>
        </v-toolbar>
      </template>

      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length">
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Menu</th>
                <th class="text-left">Icon</th>
                <th class="text-left">Route</th>
                <th class="text-left">Seq</th>
                <th class="text-left">Status</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="subItem in menus" :key="subItem.id">
                <td>{{ subItem.id }}</td>
                <td>{{ subItem.menu_name }}</td>
                <td>{{ subItem.menu_icon }}</td>
                <td>{{ subItem.menu_route }}</td>
                <td>{{ subItem.menu_seq }}</td>
                <td>{{ subItem.menu_status }}</td>
                <td>
                  <v-icon small class="mr-2" @click="editItem(subItem,'edit_menu')">mdi-pencil</v-icon>
                  <v-icon small @click="deleteMenu(subItem)">mdi-delete</v-icon>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </td>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon small @click="open(item,'menu')">mdi-plus-thick</v-icon>
        <v-icon small class="mr-2" @click="editItem(item,'edit_module')">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>

      <alert />
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mask } from "vue-the-mask";
import moment from "moment";

export default {
  name: "Module",
  components: {
    Alert: () =>
      import(/* webpackChunkName: "alert" */ "@/components/Alert.vue"),
  },
  directives: { mask },
  data: () => ({
    headers: [
      { text: "Module ID", value: "id" },
      { text: "Module Name", value: "module_name" },
      { text: "Module Icon", value: "module_icon" },
      { text: "Seq", value: "module_seq" },
      { text: "Action", value: "action" },
      { text: "", value: "data-table-expand" },
    ],
    modules: [],
    method: "",
    dialogModule: false,
    search: "",
    key: 0,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      id: "",
      module_name: "",
      module_icon: "",
      module_seq: "",
    },
    mask: "##",
    expanded: [],
    menus: [],
    dialogMenu: false,
    dialogTitle: "",
    status: [{ text: "ACTIVE" }, { text: "INACTIVE" }],
    editedMenu: {},
    defaultMenu: {
      id: "",
      menu_name: "",
      menu_icon: "",
      menu_route: "",
      menu_seq: "",
      menu_status: "",
      module_id: "",
    },
    formRules: [(v) => !!v || "Field is required"],
    valid: true,
    datetime: new Date().toISOString(),
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    timestamp() {
      this.datetime = moment(this.date).format("YYYY-MM-DD HH:mm:ss");
    },
    getModules() {
      this.axios
        .get("/setup/v3/modules", {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.modules = data;
        })
        .catch((error) => {
          let { responses } = error;
          console.log(responses);
        });
    },
    forceRerender() {
      this.key += 1;
    },
    open(item, setup) {
      if (setup == "module") {
        this.method = "new_module";
        this.dialogModule = true;
      } else {
        this.dialogTitle = "New Menu";
        this.method = "new_menu";
        this.dialogMenu = true;
        this.editedIndex = this.modules.indexOf(item);
        this.editedItem = Object.assign({}, item);
      }
    },
    editItem(item, method) {
      this.method = method;
      if (method == "edit_module") {
        this.editedIndex = this.modules.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogModule = true;
      }
      if (method == "edit_menu") {
        console.log(item);
        this.dialogTitle = "Edit Menu";
        this.editedIndex = this.menus.indexOf(item);
        this.editedMenu = Object.assign({}, item);
        this.dialogMenu = true;
      }
    },
    closeModule() {
      this.dialogModule = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    storeItem() {
      let formData = new FormData();
      formData.append("module_name", this.editedItem.module_name);
      formData.append("module_icon", this.editedItem.module_icon);
      formData.append("module_seq", this.editedItem.module_seq);
      formData.append("created_by", this.user.id);
      this.axios
        .post("/setup/v3/modules", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Saved",
          });
          this.modules.push(data.data);
          this.forceRerender();
        })
        .catch((error) => {
          console.log(error);
        });
      this.closeModule();
    },
    deleteItem(item) {
      const index = this.modules.indexOf(item);
      var r = confirm("Yakin akan dihapus?");
      if (r == true) {
        this.axios.delete("/setup/v3/modules", {
          data: {
            id: item.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        });
        this.setAlert({
          status: true,
          color: "success",
          text: "Data Deleted",
        });
        this.modules.splice(index, 1);
        this.forceRerender();
      }
    },
    updateItem() {
      let formData = new FormData();
      formData.append("id", this.editedItem.id);
      formData.append("module_name", this.editedItem.module_name);
      formData.append("module_icon", this.editedItem.module_icon);
      formData.append("module_seq", this.editedItem.module_seq);
      formData.append("updated_by", this.user.id);
      formData.append("updated_at", this.datetime);
      this.axios.put("/setup/v3/modules", formData, {
        headers: { Authorization: "Bearer " + this.user.token },
      });
      this.setAlert({
        status: true,
        color: "success",
        text: "Data Updated",
      });
      this.getModules();
      this.forceRerender();
      this.closeModule();
    },
    getMenus(module_id) {
      this.axios
        .get("/setup/v3/menus", {
          params: {
            module_id: module_id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.menus = data;
        })
        .catch((error) => {
          let { responses } = error;
          console.log(responses);
          this.menus = "";
        });
    },
    closeMenu() {
      this.dialogMenu = false;
      setTimeout(() => {
        this.editedMenu = Object.assign({}, this.defaultMenu);
        this.editedIndex = -1;
      }, 300);
    },
    storeMenu() {
      let formData = new FormData();
      formData.append("menu_name", this.editedMenu.menu_name);
      formData.append("menu_icon", this.editedMenu.menu_icon);
      formData.append("menu_route", this.editedMenu.menu_route);
      formData.append("menu_seq", this.editedMenu.menu_seq);
      formData.append("menu_status", this.editedMenu.menu_status);
      formData.append("module_id", this.editedItem.id);
      formData.append("created_by", this.user.id);
      this.axios
        .post("/setup/v3/menus", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Saved",
          });
          console.log(data);
          this.menus.push(data);
          this.closeMenu();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateMenu() {
      let formData = new FormData();
      formData.append("id", this.editedMenu.id);
      formData.append("menu_name", this.editedMenu.menu_name);
      formData.append("menu_icon", this.editedMenu.menu_icon);
      formData.append("menu_route", this.editedMenu.menu_route);
      formData.append("menu_seq", this.editedMenu.menu_seq);
      formData.append("menu_status", this.editedMenu.menu_status);
      formData.append("updated_by", this.user.id);
      formData.append("updated_at", this.datetime);
      this.axios
        .put("/setup/v3/menus", formData)
        .then((response) => {
          console.log(response);
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Updated",
          });
          this.getMenus(this.expanded[0].id);
          this.closeMenu();
        })
        .catch((error) => {
          let { responses } = error;
          console.log(responses);
        });
    },
    deleteMenu(item) {
      const index = this.menus.indexOf(item);
      var r = confirm("Yakin akan dihapus?");
      if (r == true) {
        this.axios
          .delete("/setup/v3/menus", {
            data: {
              id: item.id,
            },
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            console.log(response);
            this.setAlert({
              status: true,
              color: "success",
              text: "Data Deleted",
            });
            this.menus.splice(index, 1);
          })
          .catch((error) => {
            let { responses } = error;
            console.log(responses);
          });
      }
    },
  },
  created() {
    this.getModules();
    this.timestamp();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Module" : "Edit Module";
    },
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>