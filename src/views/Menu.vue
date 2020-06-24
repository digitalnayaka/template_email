<template>
  <v-data-table
    :headers="headers"
    :items="datas"
    :search="search"
    :items-per-page="10"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat dense color="grey lighten-2">
        <v-btn class="ma-2" color="green" outlined @click="dialog = true">
          <v-icon large left>mdi-plus</v-icon>Add
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <form>
                    <v-text-field
                      v-model="editedItem.id"
                      label="Module ID"
                      v-bind:style="{display:'none'}"
                    ></v-text-field>
                    <v-text-field v-model="editedItem.name" label="Module Name"></v-text-field>
                    <v-text-field v-model="editedItem.icon" label="Module Icon"></v-text-field>
                  </form>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="store">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-divider></v-divider>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: "Module", value: "module_name" },
      { text: "Menu ID", value: "id" },
      { text: "Menu Name", value: "name" },
      { text: "Menu Icon", value: "icon" },
      { text: "Seq", value: "seq" },
      { text: "Action", value: "action" }
    ],
    datas: [],
    search: "",
    dialog: false,
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      icon: ""
    },
    defaultItem: {
      id: "",
      name: "",
      icon: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Module" : "Edit Module";
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.datas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.datas.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.datas.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.datas[this.editedIndex], this.editedItem);
      } else {
        this.datas.push(this.editedItem);
      }
      this.close();
    },
    store() {
      let formData = new FormData();
      formData.set("name", this.editedItem.name);
      formData.set("icon", this.editedItem.icon);
      this.axios
        .post("http://localhost/raharjadb-api/v1/store", formData)
        .then(response => {
          let { data } = response;
          if (data && data.status == "success") {
            this.datas.push(data.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.close();
    }
  },
  created() {
    this.axios
      .get("http://localhost/raharjadb-api/v1/index")
      .then(response => {
        let { data } = response.data;
        this.datas = data;
      })
      .catch(error => {
        let { responses } = error;
        console.log(responses);
      });
  }
};
</script>