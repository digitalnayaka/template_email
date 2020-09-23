<template>
  <v-container fluid>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <!-- <div v-if="!guest">
        <div v-if="user.id == unitMokas.id_app_user">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon class="mx-2" v-on="on" @click="getBarcode">
                <v-icon large>mdi-barcode-scan</v-icon>
              </v-btn>
            </template>
            <span>Barcode</span>
          </v-tooltip>

          <v-dialog v-model="dialog">
            <v-card v-html="barcode"></v-card>
          </v-dialog>

          <v-btn
            icon
            class="mx-2"
            v-if="unitMokas.id_mst_motor_bekas_status == 1 || unitMokas.id_mst_motor_bekas_status == 3 || unitMokas.id_mst_motor_bekas_status == 5"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon class="mx-2" v-on="on" :to="'/edit_unit/' + id">
                  <v-icon large>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>
          </v-btn>

          <v-btn
            icon
            class="mx-2"
            v-if="unitMokas.id_mst_motor_bekas_status == 1 || unitMokas.id_mst_motor_bekas_status == 3"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon class="mx-2" v-on="on" @click="deleteUnit">
                  <v-icon large>mdi-trash-can</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </v-btn>
        </div>
      </div>-->
    </v-app-bar>

    <div
      v-viewer="{movable: false}"
      class="d-flex flex-nowrap justify-space-between"
      style="overflow-x: auto;"
    >
      <v-card flat v-for="(item,i) in fotos" :key="i" class="mx-2">
        <img :src="getImage(item.src)" contain width="270" height="150" style="cursor: pointer" />
      </v-card>
    </div>

    <detail-unit :unitMokas="unitMokas" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);

export default {
  name: "unit-mokas",
  components: {
    DetailUnit: () =>
      import(
        /* webpackChunkName: "detail-unit" */ "@/components/DetailUnit.vue"
      ),
  },
  data() {
    return {
      id: this.$route.params.id,
      unitMokas: [],
      iklan: [],
      hits: [],
      fotos: [],
      dokumen: [],
      dialog_dokumen: false,
      barcode: null,
      dialog: false,
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    unit_mokas() {
      this.axios
        .get("/produk/v3/unit_mokas", {
          params: {
            id: this.id,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.unitMokas = data[0];
          this.linkIklan(this.unitMokas.id);

          let foto1 = this.unitMokas.foto_1;
          let foto2 = this.unitMokas.foto_2;
          let foto3 = this.unitMokas.foto_3;
          let foto4 = this.unitMokas.foto_4;
          let foto5 = this.unitMokas.foto_5;
          this.fotos.push(
            { src: foto1 },
            { src: foto2 },
            { src: foto3 },
            { src: foto4 },
            { src: foto5 }
          );

          let stnk = this.unitMokas.lembar_stnk;
          let bpkb = this.unitMokas.lembar_bpkb;
          let pajak = this.unitMokas.lembar_pajak;
          if (stnk == true) {
            this.dokumen.push(stnk);
          }
          if (bpkb == true) {
            this.dokumen.push(bpkb);
          }
          if (pajak == true) {
            this.dokumen.push(pajak);
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    linkIklan(id) {
      this.axios
        .get("/iklan/v3/link_iklan_tb", {
          params: {
            id_motor_bekas: id,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.iklan = data[0];

          this.getDtlIklan(this.iklan.id_iklan);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getDtlIklan(id) {
      this.axios
        .get("/search/v3/search", {
          params: {
            id: id,
            limit: 1,
          },
        })
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits[0]._source;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getBarcode() {
      this.axios
        .get("/produk/v3/barcode", {
          params: {
            id: this.id,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.barcode = data;
          this.dialog = true;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    deleteUnit() {
      var r = confirm("Yakin akan dihapus");
      if (r == true) {
        let formData = new FormData();

        formData.append("id", this.id);
        formData.append("limit", 1);

        this.axios
          .post("/produk/v3/unit_mokas_delete", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.unitMokas = data.data;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.$router.push({ path: "/garasi" });
          })
          .catch((error) => {
            let responses = error.response.data;
            console.log(responses.api_message);
          });
      }
    },
  },
  created() {
    this.unit_mokas();
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      guest: "auth/guest",
    }),
  },
  filters: {
    countDoc(doc) {
      if (doc !== null) {
        return true;
      }
    },
  },
};
</script>