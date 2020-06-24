<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="categories"
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
                          label="Category ID"
                          v-bind:style="{display:'none'}"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="editedItem.category_name"
                          label="Category Name"
                          :rules="rules"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="editedItem.category_image"
                          label="Category Image"
                          :rules="rules"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          v-model="editedItem.category_route"
                          label="Category Route"
                          :rules="rules"
                        ></v-text-field>

                        <v-autocomplete
                          outlined
                          v-model="editedItem.category_status"
                          :items="status"
                          clearable
                          label="Status"
                          :rules="rules"
                          @change="checkStatus"
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
  name: "Category",
  components: {
    Alert: () =>
      import(/* webpackChunkName: "alert" */ "@/components/Alert.vue")
  },
  data: () => ({
    headers: [
      { text: "Category ID", value: "id" },
      { text: "Category Name", value: "category_name" },
      { text: "Category Image", value: "category_image" },
      { text: "Category Route", value: "category_route" },
      { text: "Status", value: "category_status" },
      { text: "Action", value: "action" }
    ],
    categories: [],
    dialog: false,
    search: "",
    key: 0,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      id: "",
      category_name: "",
      category_image: "",
      category_route: "",
      category_status: ""
    },
    status: [{ text: "ACTIVE" }, { text: "INACTIVE" }],
    valid: true,
    countActive: 0,
    date: new Date().toISOString().replace("Z", "+07:00")
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Category" : "Edit Category";
    },
    ...mapGetters({
      user: "auth/user"
    }),
    rules() {
      let rules = [
        v => !!v || "Field is required",
        this.countActive <= 4 || "Banner yang ACTIVE hanya boleh 4"
      ];
      return rules;
    }
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
    getCategories() {
      this.axios
        .get("/setup/v1/categories")
        .then(response => {
          let { data } = response.data;
          this.categories = data;
          this.countActive = 0;
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].category_status == "ACTIVE") {
              this.defaultActive++;
              this.countActive++;
            }
          }
        })
        .catch(error => {
          let { responses } = error;
          console.log(responses);
        });
    },
    storeItem() {
      let formData = new FormData();
      formData.append("category_name", this.editedItem.category_name);
      formData.append("category_image", this.editedItem.category_image);
      formData.append("category_route", this.editedItem.category_route);
      formData.append("category_status", this.editedItem.category_status);
      formData.append("created_by", this.user.id);
      this.axios
        .post("/setup/v1/categories", formData)
        .then(response => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Saved"
          });
          this.categories.push(data.data);
          this.key += 1;
        })
        .catch(error => {
          console.log(error);
        });
      this.close();
    },
    editItem(item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    updateItem() {
      let formData = new FormData();
      formData.append("id", this.editedItem.id);
      formData.append("category_name", this.editedItem.category_name);
      formData.append("category_image", this.editedItem.category_image);
      formData.append("category_route", this.editedItem.category_route);
      formData.append("category_status", this.editedItem.category_status);
      formData.append("updated_by", this.user.id);
      formData.append("updated_at", this.date);
      this.axios
        .put("/setup/v1/categories", formData)
        .then(response => {
          let { data } = response;
          console.log(data);
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Updated"
          });
          this.getCategories();
          this.key += 1;
        })
        .catch(error => {
          console.log(error);
        });
      this.close();
    },
    deleteItem(item) {
      const index = this.categories.indexOf(item);
      var r = confirm("Yakin akan dihapus?");
      if (r == true) {
        this.axios
          .delete("/setup/v1/categories", {
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
            this.categories.splice(index, 1);
            this.key += 1;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    checkStatus() {
      if (this.countActive >= 4) {
        this.valid = false;
        this.setAlert({
          status: true,
          color: "error",
          text: "Category yang ACTIVE hanya boleh 4"
        });
      }
    }
  },
  created() {
    this.getCategories();
    this.timestamp();
  }
};
</script>