<template>
  <div class="container" style="margin-bottom: 30px">
    <form @submit.prevent="createMessage" enctype="multipart/form-data">
      <div class="form-group">
        <v-text-field outlined shaped label="Enter message ..." v-model="newMessage">
          <template v-slot:append>
            <v-menu top :offset-y="true">
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-plus-circle</v-icon>
              </template>

              <v-list>
                <v-list-item>
                  <v-icon v-on="on" @click="browse">mdi-image</v-icon>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-text-field>

        <!-- <v-file-input
          id="file"
          label="File input"
          style="display:none"
          v-model="image"
          @change="sendImage"
        ></v-file-input>-->
        <image-uploader
          id="file"
          v-model="image"
          :quality="0.7"
          :scaleRatio="0.5"
          accept="image/*"
          :preview="false"
          :className="['fileinput', { 'fileinput--loaded': hasImage }]"
          :capture="false"
          :debug="0"
          :autoRotate="true"
          outputFormat="blob"
          @input="sendImage"
          style="display:none"
        ></image-uploader>
        <!-- <p class="text-danger" v-if="errorText">{{ errorText }}</p> -->
      </div>

      <button class="btn btn-primary" type="submit" name="action">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ImageUploader from "vue-image-upload-resize";

export default {
  name: "CreateMessage",
  props: ["name"],
  components: {
    ImageUploader
  },
  data() {
    return {
      newMessage: null,
      errorText: null,
      on: "",
      image: "",
      hasImage: false
    };
  },
  methods: {
    createMessage() {
      let formData = new FormData();

      formData.append("from", this.user.id);
      formData.append("receive", this.$route.params.id);
      formData.append("message", this.newMessage);

      this.axios
        .post("/user/v3/chat/text", formData, formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(() => {
          this.newMessage = null;
        });
    },
    browse() {
      document.getElementById("file").click();
    },
    sendImage() {
      let formData = new FormData();

      formData.append("from", this.user.id);
      formData.append("receive", this.$route.params.id);
      formData.append("foto", this.image, "foto.jpg");

      this.axios
        .post("/user/v3/chat/image", formData, formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(response => {
          console.log(response);
        });
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>