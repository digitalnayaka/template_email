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
            @click="read(item.IdAppUser,item.Pemenang)"
          >
            <v-list-item-avatar size="80">
              <v-icon large v-if="item.Avatar == 'null'">mdi-account-circle</v-icon>
              <v-img :src="getImage(item.Avatar)" v-else></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-black">{{ item.Nama }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.Messages }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action class="teal--text">
              <v-list-item-action-text>
                <v-chip x-small color="red" text-color="white" v-if="item.Pemenang">Pemenang</v-chip>

                <v-chip x-small color="green" text-color="white" v-if="!item.Seen">Belum dibaca</v-chip>
              </v-list-item-action-text>

              <v-list-item-action-text></v-list-item-action-text>
              {{ item.Time | datediff }}
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

export default {
  name: "chat",
  data: () => ({
    chats: [],
    item: 0
  }),
  methods: {
    async getChats() {
      db.collection("chat")
        .doc(String(this.user.id))
        .collection("user_messages")
        .orderBy("Time", "desc")
        .onSnapshot(querySnapshot => {
          let messages = [];
          querySnapshot.forEach(doc => {
            this.axios
              .get("/user/v3/user", {
                params: {
                  id: doc.data().IdAppUser,
                  limit: 1
                }
              })
              .then(response => {
                let { data } = response.data;
                const dataa = {
                  IdAppUser: doc.data().IdAppUser,
                  Messages: doc.data().Messages,
                  Pemenang: doc.data().Pemenang,
                  Seen: doc.data().Seen,
                  Time: doc.data().Time.toDate(),
                  Nama: data[0].nama,
                  Avatar: data[0].photo
                };
                messages.push(dataa);
              });
          });
          this.chats = messages;
        });
    },
    read(id, pemenang) {
      let formData = new FormData();

      formData.append("from", this.user.id);
      formData.append("receive", id);

      this.axios
        .post("/user/v3/chat/read", formData, {
          headers: { Authorization: "Bearer " + this.user.token }
        })
        .then(() => {
          this.$router.push({ path: "/chat/" + id + "?pemenang=" + pemenang });
        })
        .catch(error => {
          let responses = error.response.data;
          console.log(responses);
        });
    }
  },
  created() {
    this.getChats();
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  filters: {
    datediff: date => {
      return moment.utc(date).from();
    }
  }
};
</script>