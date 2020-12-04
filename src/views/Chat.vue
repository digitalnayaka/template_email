<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="chat container">
      <h2 class="text-primary text-center">
        <v-avatar size="32" v-if="appuser.id_mst_user_type == 2">
          <v-img src="/img/verified.png" alt="verified"></v-img>
        </v-avatar>
        {{ appuser.nama }}
      </h2>

      <v-card dense flat color="grey lighten-2" v-if="pemenang == 'true'">
        <div>
          User berikut adalah pemenang Tawar Bersama pada iklan yang Anda pasang. Selesaikan status user sebagai pemenang?
          <v-btn small dark @click="pinPemenang" color="teal">Selesai</v-btn>
        </div>
      </v-card>

      <div class="card">
        <div class="card-body">
          <p class="nomessages text-secondary" v-if="messages.length == 0">[No messages yet!]</p>

          <div class="messages" v-chat-scroll="{always: false, smooth: true}">
            <v-card
              v-for="(item,index) in messages"
              :key="index"
              :align="item.From == user.id ? 'right' : 'left'"
              :color="item.From == user.id ? 'teal lighten-5' : 'grey lighten-5'"
              class="pa-2 ma-2"
              flat
            >
              <span class="text-info">[{{ item.From == user.id ? user.nama : appuser.nama}}]:</span>

              <span v-if="item.Type == 'text'">{{item.Message}}</span>

              <span v-if="item.Type == 'iklan'">
                <v-card
                  class="d-inline-block mx-auto"
                  flat
                  v-if="item.Message.length > 0"
                  :href="'/iklan/' + item.Message[0].id"
                >
                  <v-container fluid>
                    <v-row>
                      <v-col cols="auto">
                        <v-img
                          height="80"
                          width="100"
                          :src="getImage(item.Message[0].photo)"
                          contain
                        ></v-img>
                      </v-col>

                      <v-col cols="auto" class="text-start pl-0">
                        <v-row class="flex-column ma-0">
                          <v-col class="pa-0 font-weight-bold">{{item.Message[0].deskripsi}}</v-col>

                          <v-col
                            class="pa-0"
                          >{{item.Message[0].mst_iklan_jenis}} {{item.Message[0].mst_iklan_type}} {{item.Message[0].mst_type_tb}}</v-col>

                          <v-col
                            class="pa-0"
                          >Rp {{item.Message[0].harga_awal.toLocaleString("id-ID")}}</v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </span>

              <span>
                <v-img
                  :src="getThumb(item.Image)"
                  width="300"
                  height="200"
                  v-if="item.Type == 'image'"
                ></v-img>
              </span>

              <span class="text-secondary time">
                {{item.Time.toDate()
                .toLocaleString("id-ID")}}
              </span>
            </v-card>
          </div>
        </div>

        <div class="card-action">
          <CreateMessage :name="name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CreateMessage from "@/components/CreateMessage";
import "firebase/firestore";
import { db } from "../main";
import VueChatScroll from "vue-chat-scroll";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";

Vue.use(VueChatScroll);

export default {
  name: "Chat",
  props: ["name"],
  components: {
    CreateMessage
  },
  data() {
    return {
      appuser: "",
      messages: [],
      pemenang: this.$route.query.pemenang,
      selesai: []
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set"
    }),
    getUser() {
      this.axios
        .get("/user/v3/user", {
          params: {
            id: this.$route.params.id,
            limit: 1
          }
        })
        .then(response => {
          let { data } = response.data;
          this.appuser = data[0];
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getMessages() {
      db.collection("chat")
        .doc(String(this.user.id))
        .collection("user_messages")
        .doc(String(this.$route.params.id))
        .collection("messages")
        .orderBy("Time", "asc")
        .onSnapshot(querySnapshot => {
          let messages = [];
          querySnapshot.forEach(doc => {
            let iklan = [];
            if (doc.data().Type == "iklan") {
              this.axios
                .get("/iklan/v3/iklan_tb_mokas", {
                  params: {
                    id: doc.data().Iklan
                  }
                })
                .then(response => {
                  let { data } = response.data;
                  iklan.push(data);
                });
            }
            const dataa = {
              From: doc.data().From,
              Message: doc.data().Type == "text" ? doc.data().Message : iklan,
              Image: doc.data().Image,
              Receive: doc.data().Receive,
              Seen: doc.data().Seen,
              Time: doc.data().Time,
              Type: doc.data().Type
            };
            messages.push(dataa);
          });
          this.messages = messages;
        });
    },
    pinPemenang() {
      let formData = new FormData();

      formData.append("from", this.user.id);
      formData.append("receive", this.$route.params.id);

      this.axios.post("/user/v3/chat/pin_pemenang", formData, {
        headers: { Authorization: "Bearer " + this.user.token }
      });
    }
  },
  async mounted() {
    this.getUser();
    await this.getMessages();
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>

<style scoped>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 0px;
}

.chat h5 {
  margin-top: 0px;
  margin-bottom: 40px;
}

.chat span {
  font-size: 1.2em;
}

.chat .time {
  display: block;
  font-size: 0.7em;
}

.messages {
  max-height: 300px;
  overflow: auto;
}
</style>