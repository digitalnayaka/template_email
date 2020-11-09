<template>
  <div>
    <v-divider></v-divider>

    <div class="d-flex justify-space-between grey lighten-3 pa-2">
      <div v-if="selected != null">
        Penjual:
        <a :href="'/list-tb/' + item.order.nama_penjual">
          {{ item.order.nama_penjual }}
        </a>
      </div>

      <div v-else>
        Nomor Order:
        <a :href="'/detail-transaksi/' + item.order.id">{{ item.order.id }}</a>
      </div>

      <div>Pesanan selesai:</div>
    </div>

    <v-divider></v-divider>

    <v-row dense v-if="selected == null">
      <v-col cols="12" sm="6">
        <v-list>
          <v-list-item>
            <v-list-item-avatar tile size="70">
              <v-img
                src="/img/profile.png"
                contain
                v-if="item.order.photo_penjual == null"
              ></v-img>
              <v-img
                :src="getImage(item.order.photo_penjual)"
                alt="Avatar"
                v-else
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <a :href="'/list-tb/' + item.order.nama_penjual">{{
                  item.order.nama_penjual
                }}</a>
              </v-list-item-title>

              <v-list-item-subtitle class="d-inline-flex">
                <div class="red pa-1 white--text">Penjual</div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <div class="ma-2 text-center" v-if="point == 0">
          <div>
            Bagaimana pengalaman Anda berbelanja di
            {{ item.review.app_user_name_penjual }} ini?
          </div>

          <v-item-group v-model="point" class="d-flex justify-center">
            <div class="flex-column" v-for="item in points" :key="item.id">
              <v-item v-slot:default="{ toggle }" :value="item.id">
                <v-btn
                  icon
                  class="mx-3"
                  @click="toggle"
                  v-on:click="setPoint(item)"
                >
                 <v-img
                      :src="item.img"
                      contain
                      :width="30"
                      :height="30"
                      v-on="on"
                    ></v-img>
                </v-btn>
              </v-item>

              <div class="text-caption">{{ item.text }}</div>
            </div>
          </v-item-group>
        </div>

        <div class="ma-2 text-center" v-else>
          <div>Penilaian Anda</div>

          <div v-if="point == 1">
            <v-icon x-large :color="points[0].color">
              {{ points[0].icon }}
            </v-icon>

            <div class="text-caption">{{ points[0].text }}</div>
          </div>

          <div v-if="point == 2">
            <v-icon x-large :color="points[1].color">
              {{ points[1].icon }}
            </v-icon>

            <div class="text-caption">{{ points[1].text }}</div>
          </div>

          <div v-if="point == 3">
            <v-icon x-large :color="points[2].color">
              {{ points[2].icon }}
            </v-icon>

            <div class="text-caption">{{ points[2].text }}</div>
          </div>
        </div>
      </v-col>

      <v-col cols="12" sm="6" class="d-flex">
        <v-divider vertical></v-divider>

        <v-list subheader>
          <v-subheader class="font-weight-bold"> Daftar Produk </v-subheader>

          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-img :src="getImage(item.order.iklan.photo)" contain></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <a :href="'/iklan/' + item.order.id_iklan">
                  {{ item.order.iklan.judul }}
                </a>
              </v-list-item-title>

              <v-list-item-subtitle v-if="rating == 0">
                Belum diulas
              </v-list-item-subtitle>

              <v-list-item-subtitle class="d-inline-flex" v-else>
                <v-icon color="yellow" v-for="n in rating" :key="n">
                  mdi-star
                </v-icon>
              </v-list-item-subtitle>

              <v-list-item-subtitle class="d-flex d-sm-none" v-if="rating == 0">
                <v-btn
                  color="teal"
                  class="white--text"
                  :disabled="point == 0 ? true : false"
                  small
                  @click="ulas = false"
                >
                  Tulis Ulasan
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action class="d-none d-sm-flex" v-if="rating == 0">
              <v-btn
                color="teal"
                class="white--text"
                :disabled="point == 0 ? true : false"
                small
                @click="tulisReview(item.review)"
              >
                Tulis Ulasan
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-row dense no-gutters v-else>
      <v-col cols="12" sm="7">
        <v-list three-line>
          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-img :src="getImage(item.order.iklan.photo)" contain></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <a :href="'/iklan/' + item.order.id_iklan">
                  {{ item.order.iklan.judul }}
                </a>
              </v-list-item-title>

              <v-list-item-subtitle>
                Bagaimana kualitas produk ini secara keseluruhan?
              </v-list-item-subtitle>

              <div class="d-flex align-center flex-wrap">
                <star-rating
                  v-model="rating"
                  :show-rating="false"
                  :round-start-rating="false"
                  :star-size="30"
                  inline
                  class="mr-2"
                ></star-rating>

                <div class="text-caption">
                  <div v-if="rating == 0">Bagaimana kualitas produk ini?</div>
                  <div v-if="rating == 1">Sangat Buruk</div>
                  <div v-if="rating == 2">Buruk</div>
                  <div v-if="rating == 3">Cukup</div>
                  <div v-if="rating == 4">Baik</div>
                  <div v-if="rating == 5">Sangat Baik</div>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div class="d-flex flex-wrap justify-space-around text-center">
          <div v-for="item in list" :key="item.id">
            <image-uploader
              v-model="item.foto"
              :quality="0.7"
              :scaleRatio="0.5"
              accept="image/*"
              :preview="false"
              :className="['fileinput', { 'fileinput--loaded': hasImage }]"
              :autoRotate="true"
              outputFormat="blob"
              @input="setImage('foto' + item.id)"
              :id="'foto' + item.id"
            >
              <label :for="'foto' + item.id" slot="upload-label">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <!-- <v-icon v-on="on" v-if="item.foto == null">mdi-camera</v-icon> -->

                    <v-img
                      :src="item.previewUrl"
                      contain
                      :width="100"
                      :height="100"
                      v-on="on"
                    ></v-img>
                  </template>
                  <span>Pilih Foto</span>
                </v-tooltip>
              </label>
              
            </image-uploader>
            
          </div>
          
              <v-list-item-subtitle>
               Silahkan bagikan foto produk Anda
              </v-list-item-subtitle>
        </div>
      </v-col>

      <v-col cols="12" sm="5">
        <v-card flat class="pa-2">
          <div>Berikan ulasan untuk produk ini</div>

          <v-textarea
            v-model="deskripsiUlasan"
            placeholder="Tulis deskripsi Anda mengenai produk ini..."
            outlined
            dense
            rows="3"
            no-resize
          ></v-textarea>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="teal" dark @click="selected = null">Kembali</v-btn>

            <v-btn
              color="teal"
              class="white--text"
              :disabled="rating == 0 || deskripsiUlasan == '' ? true : false"
              @click="sendReview"
              >Kirim</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StarRating from "vue-star-rating";
import ImageUploader from "vue-image-upload-resize";

export default {
  name: "list-review",
  components: { StarRating, ImageUploader },
  props: ["item"],
  data: () => ({
    ulas: true,
    selected: null,
    review: [],
    point: "",
    points: [
      {
        id: 1,
        img: "/img/icons/emoji_tidakpuas.png",
        color: "red",
        text: "Tidak Puas",
        point: -1,
      },
      {
        id: 2,
       img: "/img/icons/emoji_netral.png",
        color: "orange",
        text: "Netral",
        point: 1,
      },
      {
        id: 3,
        img: "/img/icons/emoji_puas.png",
        color: "teal",
        text: "Puas",
        point: 2,
      },
    ],
    rating: 0,
    deskripsiUlasan: "",
    list: [
      {
        id: 1,
        foto: null,
        previewUrl: "/img/icons/camera.png",
        label: "Foto 1",
      },
      {
        id: 2,
        foto: null,
        previewUrl: "/img/icons/camera.png",
        label: "Foto 2",
      },
      {
        id: 3,
        foto: null,
        previewUrl: "/img/icons/camera.png",
        label: "Foto 3",
      },
      {
        id: 4,
        foto: null,
        previewUrl: "/img/icons/camera.png",
        label: "Foto 4",
      },
      {
        id: 5,
        foto: null,
        previewUrl: "/img/icons/camera.png",
        label: "Foto 5",
      },
    ],
    hasImage: false,
    image: null,
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    setPoint(item) {
      let r = confirm("Apakah Anda yakin memberi penilaian " + item.text + "?");
      if (r == false) {
        this.point = 0;
      }
    },
    tulisReview(item) {
      this.selected = item;
    },
    setImage(file) {
      this.hasImage = true;
      this.image = file;
      this.onFileChange(file);
    },
    onFileChange(foto) {
      const reader = new FileReader();

      if (foto == "foto1") {
        reader.onload = (e) => {
          this.list[0].previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.list[0].foto);
      }
      if (foto == "foto2") {
        reader.onload = (e) => {
          this.list[1].previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.list[1].foto);
      }
      if (foto == "foto3") {
        reader.onload = (e) => {
          this.list[2].previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.list[2].foto);
      }
      if (foto == "foto4") {
        reader.onload = (e) => {
          this.list[3].previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.list[3].foto);
      }
      if (foto == "foto5") {
        reader.onload = (e) => {
          this.list[4].previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.list[4].foto);
      }
    },
    sendReview() {
      var r = confirm("Yakin dengan ulasan berikut?");
      if (r == true) {
        let formData = new FormData();

        formData.set("id_iklan", this.selected.id_iklan);
        formData.set("id_app_user", this.user.id);
        formData.set("ratting_iklan", this.rating);
        formData.set("ratting_user", this.point);
        formData.set("foto_1", this.list[0].foto);
        formData.set("foto_2", this.list[1].foto);
        formData.set("foto_3", this.list[2].foto);
        formData.set("foto_4", this.list[3].foto);
        formData.set("foto_5", this.list[4].foto);
        formData.set("review", this.deskripsiUlasan);

        this.axios
          .post("/transaksi/v3/review", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.getOrder();
          })
          .catch((error) => {
            let responses = error.response.data;
            console.log(responses);
          });
      }
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>

<style>
a:link,
a:visited {
  color: teal;
}

#foto1 {
  display: none;
}
#foto2 {
  display: none;
}
#foto3 {
  display: none;
}
#foto4 {
  display: none;
}
#foto5 {
  display: none;
}
</style>