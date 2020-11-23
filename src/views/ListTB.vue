<template>
  <v-container fluid>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="back">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-card outlined class="rounded-lg">
      <v-row>
        <v-col cols="12" sm="6">
          <v-list>
            <v-list-item>
              <v-list-item-avatar size="100">
                <v-icon x-large v-if="appuser.photo == 'null'">
                  mdi-account-circle
                </v-icon>
                <v-img :src="getImage(appuser.photo)" v-else></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">
                  <div class="d-flex align-center">
                    <v-avatar size="16" item>
                      <v-img src="/img/verified.png" alt="verified"></v-img>
                    </v-avatar>

                    <span class="mx-1">{{ appuser.nama }}</span>
                  </div>
                </v-list-item-title>

                <v-list-item-subtitle class="teal--text">
                  {{ slogan }}
                </v-list-item-subtitle>

                <div v-if="!guest && $vuetify.breakpoint.smAndUp">
                  <v-btn
                    small
                    color="teal"
                    dark
                    @click="dialogHubungi = true"
                    class="ma-1"
                  >
                    Hubungi
                  </v-btn>
                  <v-btn
                    small
                    color="teal"
                    dark
                    :to="'/chat/' + appuser.id"
                    class="ma-1"
                  >
                    Pesan
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <div
            class="d-flex justify-space-around"
            v-if="!guest && $vuetify.breakpoint.xsOnly"
          >
            <v-btn
              small
              color="teal"
              dark
              @click="dialogHubungi = true"
              class="ma-1"
            >
              Hubungi
            </v-btn>
            <v-btn
              small
              color="teal"
              dark
              :to="'/chat/' + appuser.id"
              class="ma-1"
            >
              Pesan
            </v-btn>
          </div>
        </v-col>

        <v-dialog v-model="dialogHubungi" persistent max-width="500px">
          <v-card>
            <v-toolbar dark color="teal">
              <v-toolbar-title>Hubungi</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon @click="dialogHubungi = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-title>Tanyakan lebih lanjut kepada penjual</v-card-title>

            <div class="d-flex justify-space-around">
              <v-btn tile color="white" text>
                <a :href="'tel:' + appuser.nomor_hp">Telepon</a>
              </v-btn>

              <v-btn tile color="white" text>
                <a :href="'sms:' + appuser.nomor_hp">SMS</a>
              </v-btn>

              <v-btn tile color="white" text>
                <a
                  :href="
                    'https://api.whatsapp.com/send?phone=' +
                    appuser.nomor_hp +
                    '&text=Hai, saya dari aplikasi SiMotor'
                  "
                >
                  WhatsApp Now</a
                >
              </v-btn>
            </div>
          </v-card>
        </v-dialog>

        <v-col cols="12" sm="6">
          <v-row>
            <v-col cols="12" sm="6" class="text-center">
              <div class="text-h5">Rating Penjual</div>

              <div v-if="avg.ratting_user == 1">
                <v-avatar size="32" item>
                  <v-img
                    src="/img/icons/emoji_tidakpuas.png"
                    alt="rating"
                  ></v-img>
                </v-avatar>

                <div>Kecewa</div>
              </div>

              <div v-if="avg.ratting_user == 2">
                <v-avatar size="32" item>
                  <v-img src="/img/icons/emoji_netral.png" alt="rating"></v-img>
                </v-avatar>

                <div>Netral</div>
              </div>

              <div v-if="avg.ratting_user == 3">
                <v-avatar size="32" item>
                  <v-img src="/img/icons/emoji_puas.png" alt="rating"></v-img>
                </v-avatar>

                <div>Puas</div>
              </div>
            </v-col>

            <v-col cols="12" sm="6" class="text-center">
              <div class="text-h5">Nilai Kualitas Unit</div>

              <div class="d-flex align-center justify-center">
                <h3 class="mr-1">{{ avg.ratting_iklan }}</h3>

                <star-rating
                  :rating="avg.ratting_iklan"
                  read-only
                  :show-rating="false"
                  :round-start-rating="false"
                  :star-size="30"
                  inline
                  class="pa-0"
                ></star-rating>
              </div>

              ( {{ total }} Ulasan )
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-tabs
      v-model="tab"
      background-color="cyan"
      dark
      slider-color="yellow"
      show-arrows
      class="mt-2"
    >
      <v-tab>Iklan</v-tab>
      <v-tab>Ulasan</v-tab>
      <v-tab>Info Penjual </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card>
          <v-row>
            <v-col cols="12" sm="3">
              <v-card outlined class="ml-2">
                <v-list subheader>
                  <v-subheader>Etalase</v-subheader>

                  <v-list-item-group v-model="menu" color="primary">
                    <v-list-item @click="allUnit">
                      <v-list-item-title>Semua Iklan</v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="daftarTB">
                      <v-list-item-content>
                        <v-list-item-title
                          >Tawar Bersama hari ini</v-list-item-title
                        >
                        <v-list-item-subtitle>{{
                          tanggal_mulai
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>

            <v-col cols="12" sm="9">
              <v-text-field
                outlined
                dense
                hide-details
                flat
                label="Cari"
                prepend-inner-icon="mdi-magnify"
                v-model="keyword"
                @keyup.enter="daftarTB"
                append-icon="mdi-filter"
                @click:append="sheet = !sheet"
                autofocus
                clearable
                @click:clear="clear"
                class="mr-2"
              ></v-text-field>

              <v-bottom-sheet v-model="sheet">
                <v-sheet height="170">
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <h3>Filter</h3>
                        </v-list-item-title>
                        <v-list-item-subtitle
                          >Urutkan Berdasarkan</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-radio-group v-model="order" row dense>
                        <v-radio
                          label="Postingan Terbaru"
                          value="posting_terbaru"
                        ></v-radio>
                        <v-radio
                          label="Tawar Bersama dimulai"
                          value="tanggal_mulai"
                        ></v-radio>
                      </v-radio-group>
                    </v-list-item>

                    <v-list-item>
                      <v-btn block shaped color="success" @click="saveFilter"
                        >Simpan</v-btn
                      >
                    </v-list-item>
                  </v-list>
                </v-sheet>
              </v-bottom-sheet>

              <v-row>
                <v-col
                  cols="6"
                  sm="3"
                  lg="2"
                  class="pa-0"
                  v-for="item in hits"
                  :key="item._source.id"
                >
                  <list-iklan :item="item" :utc="utc" :timezone="timezone" />
                </v-col>
              </v-row>

              <v-pagination
                v-model="page"
                @input="daftarTB"
                :length="lengthPage"
                :total-visible="5"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <div v-if="ulasanSaya.length > 0">
          <v-card
            outlined
            class="mt-2 mb-4 rounded-lg"
            v-for="item in ulasanSaya"
            :key="item.id"
          >
            <v-row no-gutters>
              <v-col cols="12" sm="2">
                <div class="pa-2" align="center">
                  <v-img
                    class="rounded-lg"
                    :src="getImage(item.foto_iklan)"
                    contain
                    max-width="250"
                    max-height="150"
                  ></v-img>

                  <a :href="'/iklan/' + item.id_iklan">
                    {{ item.judul_iklan }}
                  </a>
                </div>
              </v-col>

              <v-col cols="12" sm="10" class="d-flex">
                <v-divider vertical></v-divider>

                <div class="flex-column flex-grow-1">
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar tile>
                        <v-icon v-if="item.app_user_foto_pembeli == ''">
                          mdi-account-circle
                        </v-icon>

                        <v-img
                          class="rounded-lg"
                          :src="getImage(item.app_user_foto_pembeli)"
                          v-else
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.app_user_name_pembeli }}
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          <span class="cyan pa-1 white--text text-caption mr-1">
                            Pembeli
                          </span>

                          <v-icon color="red" v-if="item.ratting_user == 1">
                            mdi-emoticon-angry-outline
                          </v-icon>

                          <v-icon color="orange" v-if="item.ratting_user == 2">
                            mdi-emoticon-neutral-outline
                          </v-icon>

                          <v-icon color="teal" v-if="item.ratting_user == 3">
                            mdi-emoticon-happy-outline
                          </v-icon>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <div class="mx-4">
                    <v-icon
                      color="yellow"
                      v-for="n in item.ratting_iklan"
                      :key="n"
                    >
                      mdi-star
                    </v-icon>

                    <div>{{ item.review }}</div>

                    <div
                      v-viewer="{ movable: false }"
                      class="d-flex flex-wrap mt-2"
                    >
                      <v-card flat class="mx-1" v-if="item.foto_1 != ''">
                        <img
                          :src="getImage(item.foto_1)"
                          contain
                          width="130"
                          height="80"
                          style="cursor: pointer"
                        />
                      </v-card>

                      <v-card flat class="mx-1" v-if="item.foto_2 != ''">
                        <img
                          :src="getImage(item.foto_2)"
                          contain
                          width="130"
                          height="80"
                          style="cursor: pointer"
                        />
                      </v-card>

                      <v-card flat class="mx-1" v-if="item.foto_3 != ''">
                        <img
                          :src="getImage(item.foto_3)"
                          contain
                          width="130"
                          height="80"
                          style="cursor: pointer"
                        />
                      </v-card>

                      <v-card flat class="mx-1" v-if="item.foto_4 != ''">
                        <img
                          :src="getImage(item.foto_4)"
                          contain
                          width="130"
                          height="80"
                          style="cursor: pointer"
                        />
                      </v-card>

                      <v-card flat class="mx-1" v-if="item.foto_5 != ''">
                        <img
                          :src="getImage(item.foto_5)"
                          contain
                          width="130"
                          height="80"
                          style="cursor: pointer"
                        />
                      </v-card>
                    </div>
                  </div>

                  <v-divider></v-divider>

                  <div v-if="item.Reply != null">
                    <v-list>
                      <v-list-item>
                        <v-list-item-avatar tile>
                          <v-icon v-if="item.app_user_foto_penjual == ''">
                            mdi-account-circle
                          </v-icon>

                          <v-img
                            class="rounded-lg"
                            :src="getImage(item.app_user_foto_penjual)"
                            v-else
                          ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.app_user_name_penjual }}
                          </v-list-item-title>

                          <v-list-item-subtitle>
                            <span
                              class="red pa-1 white--text text-caption mr-1"
                            >
                              Penjual
                            </span>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <div class="mx-4 mb-2">
                      {{ item.Reply[0].reply }}
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </div>

        <v-card
          class="d-flex align-center justify-center"
          flat
          height="100"
          tile
          v-else
        >
          <h2>Belum ada ulasan</h2>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card class="rounded-lg">
          <v-card-title class="font-weight-bold">
            Informasi Penjual
          </v-card-title>

          <v-card-text>
            <div>Nama Penjual : {{ appuser.nama }}</div>
            <div>Lokasi : {{ appuser.kota }}</div>
            <div>No Telp : {{ appuser.nomor_hp }}</div>
            <div class="font-weight-bold">
              Deskripsi Penjual: {{ appuser.deskripsi }}
            </div>
            <div class="font-weight-bold">Slogan: {{ slogan }}</div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-title class="font-weight-bold">
            Catatan & Kebijakan Penjual
          </v-card-title>

          <v-expansion-panels focusable inset>
            <v-expansion-panel v-for="item in catatan" :key="item.id">
              <v-expansion-panel-header>
                <b>{{ item.judul }}</b>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <div v-html="item.deskripsi"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <br />

          <v-expansion-panels focusable inset v-if="kebijakan != undefined">
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold">
                Kebijakan:
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <div v-html="kebijakan.deskripsi"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <!-- <v-text-field
      outlined
      dense
      hide-details
      flat
      label="Search"
      prepend-inner-icon="mdi-magnify"
      v-model="keyword"
      @keyup.enter="listLelang"
      append-icon="mdi-filter"
      @click:append="sheet = !sheet"
      autofocus
      clearable
      @click:clear="clear"
    ></v-text-field>-->

    <!-- <v-list two-line>
      <v-list-item>
        <v-list-item-avatar size="50">
          <v-icon x-large v-if="appuser.photo == 'null'">mdi-account-circle</v-icon>
          <v-img :src="getImage(appuser.photo)" v-else></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            <div class="d-flex align-center">
              <span class="mx-1">{{ appuser.nama }}</span>
              <v-avatar size="16" item>
                <v-img src="/img/verified.png" alt="verified"></v-img>
              </v-avatar>
            </div>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-avatar size="16" item>
              <v-img src="/img/icons/icon_lokasi.png" alt="verified"></v-img>
            </v-avatar>
            {{appuser.kota}}
          </v-list-item-subtitle>

          <v-list-item-subtitle v-if="!guest">
            <v-btn x-small color="teal" dark @click="dialogHubungi = true" class="mx-2">Hubungi</v-btn>
            <v-btn x-small color="teal" dark :to="'/chat/' + appuser.id" class="mx-2">Pesan</v-btn>
            <v-btn x-small color="teal" dark @click="dialogBio = true" class="mx-2">Info Penjual</v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
<v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            <div class="d-flex align-center">
             sfaf
            </div>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-avatar size="16" item>
              <v-img src="/img/icons/icon_lokasi.png" alt="verified"></v-img>
            </v-avatar>
            {{appuser.kota}}
          </v-list-item-subtitle>

          <v-list-item-subtitle v-if="!guest">
            <v-btn x-small color="teal" dark @click="dialogHubungi = true" class="mx-2">Hubungi</v-btn>
            <v-btn x-small color="teal" dark :to="'/chat/' + appuser.id" class="mx-2">Pesan</v-btn>
            <v-btn x-small color="teal" dark @click="dialogBio = true" class="mx-2">Info Penjual</v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
  
      </v-list-item>
    </v-list>-->
    <!-- <v-row>
      <v-col cols="12" sm="6">
        <div class="d-flex align-center">
          <v-list-item-avatar size="80">
            <v-icon x-large v-if="appuser.photo == 'null'">mdi-account-circle</v-icon>
            <v-img :src="getImage(appuser.photo)" v-else></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              <div class="d-flex align-center">
                <span class="mx-1">{{ appuser.nama }}</span>
                <v-avatar size="16" item>
                  <v-img src="/img/verified.png" alt="verified"></v-img>
                </v-avatar>
              </div>
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-avatar size="16" item>
                <v-img src="/img/icons/icon_lokasi.png" alt="verified"></v-img>
              </v-avatar>
              {{appuser.kota}}
            </v-list-item-subtitle>

            <v-list-item-subtitle v-if="!guest">
              <v-btn x-small color="teal" dark @click="dialogHubungi = true" class="mx-2">Hubungi</v-btn>
              <v-btn x-small color="teal" dark :to="'/chat/' + appuser.id" class="mx-2">Pesan</v-btn>
              <v-btn x-small color="teal" dark @click="dialogBio = true" class="mx-2">Info Penjual</v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </div>
      </v-col>

      <v-col cols="12" sm="6">
        <v-list-item-content>
          <div class="d-flex align-center">
            <v-list-item-title class="teal--text text-subtitle-2">Penilaian Unit</v-list-item-title>
          </div>
          <v-list-item-subtitle>
            3.5/5.0
            <v-avatar size="16" item>
              <v-icon>mdi-star-outline</v-icon>
            </v-avatar>
            <v-icon>mdi-circle-medium</v-icon>

            <v-btn text small color="primary">Lihat Statistik Penjual</v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogHubungi" persistent max-width="500px">
      <v-card>
        <v-toolbar dark color="teal">
          <v-toolbar-title>Hubungi</v-toolbar-title>

          <div class="flex-grow-1"></div>

          <v-btn icon @click="dialogHubungi = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-title>Tanyakan lebih lanjut kepada penjual</v-card-title>

        <div align="center">
          <v-btn tile color="white" class="mx-2">
            <a :href="'tel:' + appuser.nomor_hp">Telepon</a>
          </v-btn>

          <v-btn tile color="white" class="mx-2">
            <a :href="'sms:' + appuser.nomor_hp">SMS</a>
          </v-btn>

          <v-btn tile color="white" class="mx-2">
            <a
              :href="'https://api.whatsapp.com/send?phone=' + appuser.nomor_hp + '&text=Hai, saya dari aplikasi SiMotor'"
            >WhatsApp Now</a>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogBio" persistent max-width="500px">
      <v-card>
        <v-toolbar dark color="teal">
          <v-toolbar-title>Info Penjual</v-toolbar-title>

          <div class="flex-grow-1"></div>

          <v-btn icon @click="dialogBio = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>{{ appuser.deskripsi }}</v-card-text>
      </v-card>
    </v-dialog>-->
    <!-- <v-card outlined tile>
      <v-list>
        <v-list-item>
          <v-list-item-avatar size="100">
            <v-icon x-large v-if="appuser.photo == 'null'">mdi-account-circle</v-icon>
            <v-img :src="getImage(appuser.photo)" v-else></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="font-weight-black">
              {{ appuser.nama }}
              <v-avatar size="16" item>
                <v-img src="/img/verified.png" alt="verified"></v-img>
               
              </v-avatar>
               <span class="ml-1 teal--text text-subtitle-2">Premium Seller</span>
            </v-list-item-title>

            <v-list-item-subtitle
              v-if="appuser.nomor_hp != undefined"
            >{{ appuser.nomor_hp.slice(0, -6) }}xxxxxxx</v-list-item-subtitle>

         
          </v-list-item-content>

          <div class="d-none d-sm-flex">
            <v-btn color="teal" dark @click="dialogHubungi = true" class="mx-2">Hubungi</v-btn>
            <v-btn color="teal" dark :to="'/chat/' + appuser.id" class="mx-2">Pesan</v-btn>
          </div>
        </v-list-item>
      </v-list>

      <v-dialog v-model="dialogHubungi" persistent width="500">
        <v-card>
          <v-toolbar dark color="teal">
            <v-toolbar-title>Hubungi</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="dialogHubungi = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-title>Tanyakan lebih lanjut kepada penjual</v-card-title>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn text color="white" class="blue--text" :href="'tel:' + appuser.nomor_hp">Telepon</v-btn>

            <v-divider vertical></v-divider>

            <v-btn text color="white" class="blue--text" :href="'sms:' + appuser.nomor_hp">SMS</v-btn>

            <v-divider vertical></v-divider>

            <v-btn
              text
              color="white"
              class="blue--text"
              :href="'https://api.whatsapp.com/send?phone=' + appuser.nomor_hp + '&text=Hai, saya dari aplikasi SiMotor'"
            >WhatsApp Now</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>-->

    <!-- <h2 class="mt-2">Tawar Bersama Hari ini</h2> -->

    <!-- <v-alert
      :value="hits.length == 0 && (keyword != '' || keyword != null)"
      color="warning"
    >Sorry, but no results were found.</v-alert>

    <v-row>
      <v-col cols="6" sm="3" lg="2" class="pa-0" v-for="item in hits" :key="item._source.id">
        <list-iklan :item="item" :utc="utc" :timezone="timezone" />
      </v-col>
    </v-row>

    <v-pagination v-model="page" @input="listLelang" :length="lengthPage" :total-visible="5"></v-pagination>

    <v-bottom-sheet v-model="sheet">
      <v-sheet height="170">
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <h3>Filter</h3>
              </v-list-item-title>
              <v-list-item-subtitle>Urutkan Berdasarkan</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-radio-group v-model="order" row dense>
              <v-radio label="Postingan Terbaru" value="posting_terbaru"></v-radio>
              <v-radio label="Tawar Bersama dimulai" value="tanggal_mulai"></v-radio>
            </v-radio-group>
          </v-list-item>

          <v-list-item>
            <v-btn block shaped color="success" @click="saveFilter">Simpan</v-btn>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>-->
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment-timezone";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);
import StarRating from "vue-star-rating";

export default {
  name: "listLelang",
  props: ["utc", "timezone"],
  components: {
    StarRating,
    ListIklan: () =>
      import(/* webpackChunkName: "list_iklan" */ "@/components/ListIklan.vue"),
  },
  beforeRouteLeave(to, from, next) {
    this.title = "SiMotor";
    this.$nextTick(() => {
      next();
    });
  },
  data() {
    return {
      title: this.$route.params.id,
      tanggal_mulai: this.$route.query.tgl,
      init: [],
      hits: [],
      appuser: [],
      dialogHubungi: false,
      dialogBio: false,
      sheet: false,
      tab: 0,
      menu: this.$route.query.tgl == undefined ? 0 : 1,
      keyword: "",
      page: 1,
      lengthPage: 0,
      limit: 20,
      offset: 0,
      total: 0,
      order: "tanggal_mulai",
      slogan: "",
      catatan: [],
      kebijakan: [],
      ulasanSaya: [],
      avg: [],
    };
  },
  methods: {
    back() {
      this.title = "SiMotor";
      this.$router.go(-1);
    },
    initialize() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/search/v3/search", {
          params: {
            tanggal_mulai:
              this.tanggal_mulai == undefined ? "" : this.tanggal_mulai,
            id_mst_iklan_status: 1,
            sort: this.order,
            search: this.title,
            offset: offset,
            limit: this.limit,
          },
        })
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.init = hits;

          this.sellerInfo();

          this.total = data.hits.total.value;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    sellerInfo() {
      this.axios
        .get("/user/v3/user", {
          params: {
            id: this.init[0]._source.id_app_user,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.appuser = data[0];

          this.daftarTB();
          this.getSlogan();
          this.getCatatan();
          this.getKebijakan();
          this.myReview();
          this.reviewAvg();
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getSlogan() {
      this.axios
        .get("/user/v3/user/slogan_penjual", {
          params: {
            id_app_user: this.appuser.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          if (data.length > 0) {
            this.slogan = data[0].slogan;
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getCatatan() {
      this.axios
        .get("/user/v3/user/catatan_penjual", {
          params: {
            id_app_user: this.appuser.id,
            type_catatan: 2,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.catatan = data;
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    getKebijakan() {
      this.axios
        .get("/user/v3/user/catatan_penjual", {
          params: {
            id_app_user: this.appuser.id,
            type_catatan: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.kebijakan = data[0];
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },

    daftarTB() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/search/v3/search", {
          params: {
            id_app_user: this.appuser.id,
            tanggal_mulai: this.tanggal_mulai,
            id_mst_iklan_status: 1,
            sort: this.order,
            search: this.keyword,
            offset: offset,
            limit: this.limit,
          },
        })
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits;

          this.total = data.hits.total.value;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    clear() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/search/v3/search", {
          params: {
            id_app_user: this.appuser.id,
            tanggal_mulai: this.tanggal_mulai,
            id_mst_iklan_status: 1,
            sort: this.order,
            offset: offset,
            limit: this.limit,
          },
        })
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits;

          this.total = data.hits.total.value;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    saveFilter() {
      this.daftarTB();
      this.sheet = false;
    },
    allUnit() {
      var offset = (this.page - 1) * this.limit;

      this.axios
        .get("/search/v3/search", {
          params: {
            id_app_user: this.appuser.id,
            id_mst_iklan_status: 1,
            sort: this.order,
            search: this.keyword,
            offset: offset,
            limit: this.limit,
          },
        })
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits;

          this.total = data.hits.total.value;
          this.lengthPage = Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    myReview() {
      let offset = (this.page - 1) * this.limit;

      this.axios
        .get("/transaksi/v3/review", {
          params: {
            id_penjual: this.appuser.id,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.ulasanSaya = data;

          this.total = response.data.count;
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit);
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
        });
    },
    reviewAvg() {
      this.axios
        .get("/transaksi/v3/review_avg", {
          params: {
            id_penjual: this.appuser.id,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.avg = data[0];
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      guest: "auth/guest",
    }),
  },
  created() {
    this.initialize();
  },
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = this.title;
      },
    },
  },
  filters: {
    dateFormat: (date) => {
      return moment.utc(date).format("DD-MMM-YYYY");
    },
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM, HH:mm");
    },
  },
};
</script>