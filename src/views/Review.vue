<template>
  <v-card flat>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- <h4>Rata-rata rating unit</h4>

    <div class="d-flex align-center">
      <v-icon color="yellow" x-large class="mr-2">mdi-star</v-icon>
      <h1>3.1</h1>
      <v-icon>mdi-slash-forward</v-icon>
      <h1>5.0</h1>
    </div>

    <v-data-table
      :headers="headers"
      :items="hits"
      :search="search"
      class="elevation-1"
      hide-default-footer
      :page="page"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Daftar Iklan ({{ total }})</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>

          <v-btn color="teal" dark class="mb-2 text-caption" to="/toko/add-ads">
            <v-icon left>mdi-plus</v-icon>Tambah Iklan
          </v-btn>

          <v-text-field
            v-model="search"
            outlined
            dense
            label="Search"
            class="mt-7"
            slot="extension"
            clearable
          >
            <template v-slot:append>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-filter</v-icon>
                </template>

                <v-list dense>
                  <v-list-item-group v-model="value" color="primary">
                    <v-list-item
                      v-for="item in items"
                      :key="item.id"
                      @click="filter(item.id)"
                    >
                      <v-list-item-subtitle>
                        {{ item.status }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </template>
          </v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:item._source.judul="{ item }">
        <v-list>
          <v-list-item :to="'/iklan/' + item._source.id">
            <v-list-item-avatar tile size="50">
              <v-img :src="getImage(item._source.photo)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item._source.judul }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template v-slot:no-data>Tidak ada ulasan.</template>
    </v-data-table>

    <v-pagination
      v-model="page"
      @input="daftarIklan"
      :length="lengthPage"
      :total-visible="5"
    ></v-pagination> -->

    <div>
      <div class="display-1 font-weight-bold text-center">Rating Anda</div>
      <div class="display-1 font-weight-bold text-center">
        4.5 / 5.0
        <v-icon>mdi-star-outline</v-icon>
      </div>
      <br />

      <v-card outlined width="500" height="200">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/img/profile.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>oleh: xxxx</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon>mdi-star-outline</v-icon>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item-content class="text-center">
            <v-row>
              <v-col cols="6">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-list-item-avatar tile size="100">
                      <v-img src="/img/vario.png"></v-img>
                    </v-list-item-avatar>
                  </v-list-item-title>
                  <v-list-item-title>28 sept 2020</v-list-item-title>
                </v-list-item-content>
              </v-col>

              <v-col cols="6">
                <v-list-item-title class="font-weight-bold">Judul Iklan</v-list-item-title>
                <v-list-item-subtitle>
                  Lorem Ipsum is simply dummy
                  text of the printing and typesetting....
                </v-list-item-subtitle>
                <v-btn outlined color="primary">balas</v-btn>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list>
      </v-card>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "review",
  data: () => ({
    headers: [
      { text: "Nama Unit", value: "_source.judul" },
      { text: "Jenis Iklan", value: "_source.mst_iklan_jenis" },
      { text: "Harga", value: "_source.harga_awal" },
      { text: "Status", value: "_source.mst_iklan_status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
};
</script>