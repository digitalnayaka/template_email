<template>
  <v-data-table
    :headers="headers"
    :items="banners"
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
                          label="Banner ID"
                          v-bind:style="{display:'none'}"
                        ></v-text-field>
                        <v-text-field
                          outlined
                          v-model="editedItem.banner_name"
                          label="Banner Name"
                          :rules="formRules"
                        ></v-text-field>
                        <v-text-field
                          outlined
                          v-model="editedItem.banner_image"
                          label="Banner Image"
                          :rules="formRules"
                        ></v-text-field>
                        <v-text-field
                          outlined
                          v-model="editedItem.banner_route"
                          label="Banner Route"
                          :rules="formRules"
                        ></v-text-field>
                        <v-autocomplete
                          outlined
                          v-model="editedItem.banner_status"
                          :items="status"
                          clearable
                          label="Status"
                          :rules="formRules"
                          @change="checkStatus"
                        ></v-autocomplete>
                      </form>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
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
  name: "Module",
  components: {
    Alert: () =>
      import(/* webpackChunkName: "alert" */ "@/components/Alert.vue")
  },
  data: () => ({
    headers: [
      { text: "Banner ID", value: "id" },
      { text: "Banner Name", value: "banner_name" },
      { text: "Banner Image", value: "banner_image" },
      { text: "Banner Route", value: "banner_route" },
      { text: "Status", value: "banner_status" },
      { text: "Action", value: "action" }
    ],
    banners: [],
    dialog: false,
    search: "",
    key: 0,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      id: "",
      banner_name: "",
      banner_image: "",
      banner_route: "",
      banner_status: ""
    },
    status: [{ text: "ACTIVE" }, { text: "INACTIVE" }],
    formRules: [v => !!v || "Field is required"],
    valid: true,
    countActive: 0,
    date: new Date().toISOString().replace("Z", "+07:00")
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Banner" : "Edit Banner";
    },
    ...mapGetters({
      user: "auth/user"
    }),
    date: {
      get() {
        return moment(this.date).format("YYYY-MM-DD HH:mm:ss");
      },
      set(value) {
        this.date = value;
      }
    }
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    GetBanners() {
      this.axios
        .get("http://dna-developer.com:8080/api/setup/v3/banners")
        .then(response => {
          let { data } = response.data;
          this.banners = data;
          this.countActive = 0;
          for (let i = 0; i < this.banners.length; i++) {
            if (this.banners[i].category_status == "ACTIVE") {
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
      formData.append("banner_name", this.editedItem.banner_name);
      formData.append("banner_image", this.editedItem.banner_image);
      formData.append("banner_route", this.editedItem.banner_route);
      formData.append("banner_status", this.editedItem.banner_status);
      formData.append("created_by", this.user[0].id);
      this.axios
        .post("http://dna-developer.com:8080/api/setup/v3/banners", formData)
        .then(response => {
          let { data } = response.data;
          this.setAlert({
            status: true,
            color: "success",
            text: "Data Saved"
          });
          this.banners.push(data);
          this.key += 1;
        })
        .catch(error => {
          console.log(error);
        });
      this.dialog = false;
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
      formData.append("updated_by", this.user[0].id);
      this.axios
        .put("http://dna-developer.com:8080/api/setup/v3/categories", formData)
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
      this.dialog = false;
    },
    deleteItem(item) {
      const index = this.categories.indexOf(item);
      var r = confirm("Yakin akan dihapus?");
      if (r == true) {
        this.axios
          .delete("http://dna-developer.com:8080/api/setup/v3/categories", {
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
    this.GetBanners();
  }
};
</script>