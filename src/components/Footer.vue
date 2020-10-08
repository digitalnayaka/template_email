<template>
  <v-container>
    <v-footer padless>
      <v-card flat tile class="text-center flex">
        <!-- <v-flex xs12 md6 lg6>
          <v-row justify="center" no-gutters>
            <v-col cols="6">
              <v-list-item to="/account/edit">
                <v-list-item-content>
                  <v-list-item-title>FAQ</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="6">
              <v-list-item to="/account/edit">
                <v-list-item-content>
                  <v-list-item-title>FAQ</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>

       
          </v-row>
        </v-flex>-->
        {{ new Date().getFullYear() }} —
        <strong>Digital Nayaka Abhinaya. All Rights Reserved.</strong>

        <v-divider></v-divider>
      </v-card>
    </v-footer>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    route: [],
  }),
};
</script>