<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card>
      <v-list>
        <v-subheader class="title">Pesan</v-subheader>

        <v-list-item-group v-model="item">
          <v-list-item
            v-for="(item, i) in chats"
            :key="i"
            @click="read(item.IdAppUser, item.Pemenang)"
          >
            <v-list-item-avatar size="80">
              <v-icon large v-if="item.user.photo == 'null'">
                mdi-account-circle
              </v-icon>
              <v-img :src="getImage(item.user.photo)" v-else></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-black">
                {{ item.user.nama }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.Messages }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action class="teal--text">
              <v-list-item-action-text>
                <v-chip
                  x-small
                  color="red"
                  text-color="white"
                  v-if="item.Pemenang"
                >
                  Pemenang
                </v-chip>

                <v-chip
                  x-small
                  color="green"
                  text-color="white"
                  v-if="!item.Seen"
                >
                  Belum dibaca
                </v-chip>
              </v-list-item-action-text>

              <v-list-item-action-text></v-list-item-action-text>
              {{ item.Time.toDate() | datediff }}
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment-timezone";
import "firebase/firestore";
import { db } from "../main";
import _ from "lodash";

export default {
  name: "chat",
  data: () => ({
    messages: [],
    users: [],
    chats: [],
    item: 0,
  }),
  methods: {
    getChats() {
      db.collection("chat")
        .doc(String(this.user.id))
        .collection("user_messages")
        .orderBy("Time", "desc")
        .onSnapshot((querySnapshot) => {
          let messages = [];
          querySnapshot.forEach((doc) => {
            messages.push(doc.data());
          });
          this.messages = messages;
          this.getUsers();
        });
    },
    getUsers() {
      let params = new URLSearchParams();

      for (let i = 0; i < this.messages.length; i++) {
        params.append("id", this.messages[i].IdAppUser);
      }
      params.set("limit", this.messages.length);

      let request = {
        params: params,
        headers: { Authorization: "Bearer " + this.user.token },
      };

      this.axios
        .get("/user/v3/user", request)
        .then((response) => {
          let { data } = response.data;
          this.users = data;
          this.chats = [];

          for (let i = 0; i < this.messages.length; i++) {
            let found = this.users.filter(
              (element) => element.id == this.messages[i].IdAppUser
            );

            this.chats.push({ ...this.messages[i], user: found[0] });
          }

          this.chats = _.orderBy(this.chats, ["Time"], ["desc"]);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
        });
    },
    read(id, pemenang) {
      let formData = new FormData();

      formData.append("from", this.user.id);
      formData.append("receive", id);

      this.axios
        .post("/user/v3/chat/read", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then(() => {
          this.$router.push({ path: "/chat/" + id + "?pemenang=" + pemenang });
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
        });
    },
  },
  created() {
    this.getChats();
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  filters: {
    datediff: (date) => {
      return moment.utc(date).from();
    },
  },
};
</script>