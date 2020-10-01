<template>
  <chat-window
    :currentUserId="currentUserId"
    :rooms="rooms"
    :messages="messages"
  />
</template>
 
<script>
import { mapGetters } from "vuex";
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";
import "firebase/firestore";
import { db } from "../main";

export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      rooms: [],
      messages: [
        {
          _id: 7890,
          content: "message 1",
          sender_id: 1234,
          username: "John Doe",
          date: "13 November",
          timestamp: "10:20",
          seen: true,
          disable_actions: false,
          disable_reactions: false,
          file: {
            name: "My File",
            size: 67351,
            type: "png",
            url: "https://firebasestorage.googleapis.com/...",
          },
          reactions: {
            wink: [
              1234, // USER_ID
              4321,
            ],
            laughing: [1234],
          },
        },
      ],
      currentUserId: 1234,
    };
  },
  methods: {
    getChats() {
      db.collection("chat")
        .doc(String(this.user.id))
        .collection("user_messages")
        .orderBy("Time", "desc")
        .onSnapshot((querySnapshot) => {
          let messages = [];
          querySnapshot.forEach((doc) => {
            this.axios
              .get("/user/v3/user", {
                params: {
                  id: doc.data().IdAppUser,
                  limit: 1,
                },
              })
              .then((response) => {
                let { data } = response.data;
                const dataa = {
                  IdAppUser: doc.data().IdAppUser,
                  Messages: doc.data().Messages,
                  Pemenang: doc.data().Pemenang,
                  Seen: doc.data().Seen,
                  Time: doc.data().Time.toDate(),
                  Nama: data[0].nama,
                  Avatar: data[0].photo,
                };
                messages.push(dataa);
              });
          });
          this.rooms = messages;
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  created() {
    this.getChats();
  },
};
</script>