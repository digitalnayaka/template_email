<template>
  <v-container fluid>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="back">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-breadcrumbs :items="items" class="pa-0 d-none d-sm-flex">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-row>
      <v-col cols="12" sm="6">
        <v-carousel cycle hide-delimiter-background height="300">
          <v-carousel-item
            v-for="(item, index) in fotos"
            :key="index"
            :src="getImage(item.src)"
            reverse-transition="fade-transition"
            transition="fade-transition"
            contain
          ></v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="12" sm="6">
        <v-list>
          <v-list-item>
            <v-list-item-avatar size="50">
              <v-icon x-large v-if="appuser.photo == 'null'">
                mdi-account-circle
              </v-icon>
              <v-img :src="getImage(appuser.photo)" v-else></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                <div class="d-flex align-center">
                  <v-avatar size="16" item v-if="appuser.id_mst_user_type == 2">
                    <v-img src="/img/verified.png" alt="verified"></v-img>
                  </v-avatar>

                  <span class="mx-1">{{ appuser.nama }}</span>
                </div>
              </v-list-item-title>

              <v-list-item-subtitle>Penjual</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div v-if="appuser.slogan != null">Slogan: {{ appuser.slogan }}</div>

        <div class="d-flex align-center justify-space-around">
          <div v-if="avg.ratting_user != null">
            <div v-if="avg.ratting_user == 1">
              <v-avatar size="25" item>
                <v-img
                  src="/img/icons/emoji_tidakpuas.png"
                  alt="kecewa"
                ></v-img>
              </v-avatar>

              Kurang Memuaskan
            </div>

            <div v-if="avg.ratting_user == 2">
              <v-avatar size="25" item>
                <v-img src="/img/icons/emoji_netral.png" alt="netral"></v-img>
              </v-avatar>

              Cukup Memuaskan
            </div>

            <div v-if="avg.ratting_user == 3">
              <v-avatar size="25" item>
                <v-img src="/img/icons/emoji_puas.png" alt="puas"></v-img>
              </v-avatar>

              Sangat Memuaskan
            </div>
          </div>

          <div>
            <star-rating
              :rating="avg.ratting_iklan"
              read-only
              :round-start-rating="false"
              :star-size="20"
              inline
              class="pa-0"
            ></star-rating>
          </div>

          <div>
            <v-btn
              color="teal"
              small
              dark
              @click="dialogInfo2 = true"
              class="mx-2"
              v-if="!guest"
            >
              Hubungi
            </v-btn>

            <v-btn
              color="teal"
              small
              dark
              :to="'/chat/' + appuser.id"
              class="mx-2"
              v-if="!guest"
            >
              Pesan
            </v-btn>
          </div>
        </div>

        <v-dialog v-model="dialogInfo2" persistent max-width="500px">
          <v-card>
            <v-toolbar dark color="teal">
              <v-toolbar-title>Hubungi</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon @click="dialogInfo2 = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-title> Tanyakan lebih lanjut kepada penjual </v-card-title>

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
                  WhatsApp Now
                </a>
              </v-btn>
            </div>
          </v-card>
        </v-dialog>

        <v-divider class="my-2"></v-divider>

        <div class="text-h5 font-weight-bold">{{ hits.judul }}</div>

        <div class="d-flex align-center text-caption text-sm-body-2">
          <span v-if="iklan.log_iklan_view > 0">
            {{ iklan.log_iklan_view }}x Dilihat
          </span>

          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon class="mx-2" v-on="on" @click="favourite">
                  <v-icon v-if="favorit == undefined">mdi-heart-outline</v-icon>
                  <v-icon color="red" v-else>mdi-heart</v-icon>
                </v-btn>
              </template>
              <span>Favorit</span>
            </v-tooltip>
          </v-btn>
        </div>

        <v-divider class="mt-2"></v-divider>

        <v-row class="font-weight-bold text-subtitle-1 text-sm-h5">
          <v-col cols="3">
            <span class="blue-grey--text">Harga</span>
          </v-col>

          <v-col cols="6" class="orange--text">
            <div v-if="iklan.id_mst_iklan_jenis == 1">
              Rp {{ Number(hits.harga).toLocaleString("id-ID") }}
            </div>

            <div v-else>
              <div v-if="liveBid.length == 0">
                Rp {{ Number(hits.harga_awal).toLocaleString("id-ID") }}
              </div>

              <div v-else>
                Rp {{ Number(liveBid[0].Bid).toLocaleString("id-ID") }}
              </div>
            </div>
          </v-col>

          <v-col cols="3" class="text-right">
            <div v-if="iklan.id_mst_iklan_jenis == 1">
              <img src="/img/icons/hargapas.png" width="100" height="25" />
            </div>

            <div v-else>
              <img
                src="/img/icons/harga_awal.png"
                width="100"
                height="25"
                v-if="liveBid.length == 0"
              />

              <img
                src="/img/icons/harga_sekarang.png"
                width="100"
                height="25"
                v-else
              />
            </div>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <div v-if="iklan.id_mst_iklan_jenis > 1">
          <div
            class="teal--text"
            align="center"
            v-if="start == false && end == false"
          >
            Tawar Bersama segera dimulai:
            <flip-countdown :deadline="hits.tanggal_mulai"></flip-countdown>
          </div>

          <div
            class="teal--text"
            align="center"
            v-if="start == true && end == false"
          >
            Tawar Bersama berlangsung:
            <flip-countdown :deadline="hits.tanggal_selesai"></flip-countdown>
          </div>

          <div align="center" v-if="start == true && end == true">
            <h2 class="teal--text">Tawar Bersama selesai</h2>

            <div v-if="!guest">
              <v-btn
                color="indigo darken-3"
                dark
                @click="dialogInfo = true"
                class="mx-2"
                v-if="
                  liveBid.length > 0 &&
                  (liveBid[0].IdAppUser == user.id ||
                    iklan.id_app_user == user.id)
                "
              >
                {{
                  liveBid[0].IdAppUser == user.id
                    ? "Anda menang, klik disini"
                    : "Info Pemenang"
                }}
              </v-btn>

              <v-dialog v-model="dialogInfo" persistent max-width="500px">
                <v-card>
                  <v-toolbar color="teal darken-3" dark>
                    <v-toolbar-title>Info Pemenang Iklan</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="dialogInfo = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <div v-if="!guest">
                    <v-card-title v-if="hits.id_app_user == user.id"
                      >Segera hubungi pemenang iklan Anda</v-card-title
                    >
                  </div>

                  <v-btn
                    value="left"
                    tile
                    color="white"
                    v-if="liveBid.length > 0"
                  >
                    <div v-if="!guest">
                      <a
                        :href="'/chat/' + iklan.id_app_user"
                        v-if="liveBid[0].IdAppUser == user.id"
                      >
                        Chat Penjual
                      </a>
                    </div>
                    <a :href="'/chat/' + liveBid[0].IdAppUser" v-else>
                      Chat Pemenang
                    </a>
                  </v-btn>

                  <v-btn value="center" tile color="white">
                    <a :href="'/detail-transaksi/' + orders.id">
                      Detail Transaksi
                    </a>
                  </v-btn>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-tabs v-model="tab" color="teal" slider-color="teal" show-arrows>
      <v-tab>Spesifikasi</v-tab>
      <v-tab v-if="hits.id_mst_iklan_jenis == 2">Info Tawar Bersama</v-tab>
      <v-tab v-if="hits.id_mst_iklan_jenis == 2">Penawaran</v-tab>
      <v-tab>Info Penjual</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <detail-unit
          :unitMokas="unitMokas"
          :hits="hits"
          v-if="hits.id_mst_iklan_type == 1"
        />

        <div v-else>
          <v-row>
            <v-col cols="12" sm="6">
              <v-list dense subheader>
                <v-subheader class="text-h6">Informasi Paket Motor</v-subheader>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/icon_jenis_motor.png"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Jumlah Motor</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action v-if="iklan.motor_bekas != undefined">
                    {{ iklan.motor_bekas.length }}
                  </v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/icon_lokasi.png"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Lokasi Motor</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    {{ unitMokas.lokasi }}
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-col>

            <v-divider></v-divider>
            <v-col cols="12" sm="6">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_list.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Daftar Paket Motor:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-row>
                <v-col v-for="(item, i) in motorBekas" :key="i">
                  <v-card
                    :to="'/garasi/detail-unit/' + item.id"
                    class="rounded-lg"
                  >
                    <v-img
                      :src="getImage(item.foto_1)"
                      height="230"
                      contain
                    ></v-img>

                    <v-divider></v-divider>

                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.merk }} {{ item.type }}
                          </v-list-item-title>

                          <v-list-item-subtitle>
                            {{ item.tahun }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-title class="font-weight-bold">
            Catatan & Kebijakan Penjual
          </v-card-title>

          <v-row justify="center">
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
          </v-row>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-card flat>
              <v-card-title class="font-weight-bold">
                Deskripsi Iklan:
              </v-card-title>

              <v-card-text>{{ hits.deskripsi }}</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card class="d-flex justify-space-between align-center" flat>
              <v-card align="center">
                <v-card-subtitle class="teal accent-4 white--text">
                  Tanggal Mulai
                </v-card-subtitle>

                <div>{{ hits.tanggal_mulai | dateFormat }}</div>

                <div>{{ hits.tanggal_mulai | timeFormat }} {{ timezone }}</div>
              </v-card>

              <v-img
                src="/img/icons/gradient.jpg"
                width="100"
                height="60"
              ></v-img>

              <v-card align="center">
                <v-card-subtitle class="red accent-4 white--text">
                  Tanggal Selesai
                </v-card-subtitle>

                <div>{{ hits.tanggal_selesai | dateFormat }}</div>

                <div>
                  {{ hits.tanggal_selesai | timeFormat }} {{ timezone }}
                </div>
              </v-card>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-list dense>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_jenis_iklan.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Jenis Iklan</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  {{ iklan.mst_iklan_jenis }}
                  {{ iklan.mst_iklan_type }}
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_tiket_dibutuhkan.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Tiket</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  {{ iklan.jumlah_tiket > 0 ? "Ya" : "Tidak" }}
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_jumlah_tiket.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Jml Tiket</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  {{ iklan.jumlah_tiket }}
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" sm="6">
            <v-list dense>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_harga_awal.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Harga Awal</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  Rp
                  {{ Number(iklan.harga_awal).toLocaleString("id-ID") }}
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="/img/icons/icon_harga_kelipatan.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Kelipatan</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  Rp
                  {{ Number(iklan.kelipatan).toLocaleString("id-ID") }}
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item>
        <v-list v-if="liveBid.length > 0">
          <v-list-item v-for="(item, i) in liveBid.slice(0, 5)" :key="item.Bid">
            <v-list-item-icon class="mx-0" v-if="i + 1 == 1">
              <v-icon large color="orange">mdi-star</v-icon>
            </v-list-item-icon>

            <v-list-item-icon class="mr-2" v-else>
              <v-chip color="green" dark>{{ i + 1 }}</v-chip>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <span>
                  Oleh:
                  {{
                    !guest && user.id == item.IdAppUser ? "Anda" : item.IdUniq
                  }}
                </span>

                <v-icon v-if="item.IdTypeBid == 2">mdi-auto-upload</v-icon>
              </v-list-item-title>

              <v-list-item-subtitle>
                {{ item.CreatedAt.toDate() | datediff }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-chip color="red" dark>
                Rp {{ Number(item.Bid).toLocaleString("id-ID") }}
              </v-chip>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-card
          class="d-flex align-center justify-center"
          flat
          height="100"
          tile
          v-else
        >
          <h2>Belum ada Penawaran</h2>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-divider></v-divider>

    <div class="text-center my-2" v-if="iklan.id_mst_iklan_jenis > 1">
      Tanggal Diiklankan: {{ iklan.created_at | dateTimeFormat(utc) }}
      {{ timezone }}
    </div>

    <div class="text-center my-2" v-else>
      Tanggal Expired: {{ iklan.expired_at | dateTimeFormat(utc) }}
      {{ timezone }}
    </div>

    <div v-if="iklan.id_mst_iklan_jenis > 1 && start == true && end == false">
      <div v-if="!guest">
        <div v-if="iklan.id_app_user != user.id">
          <v-btn
            block
            color="teal"
            dark
            @click="ikutTB()"
            v-if="iklan.id_mst_iklan_status == 1"
          >
            Ikut Tawar Bersama
          </v-btn>
        </div>
      </div>
    </div>

    <v-bottom-sheet v-model="sheet">
      <v-sheet>
        <v-container fluid v-if="useTiket">
          <h2 class="text-center my-4 red--text">
            {{ iklan.jumlah_tiket }} Tiket dibutuhkan
          </h2>

          <div class="text-center my-4">
            Untuk dapat mengikuti iklan ini perlu memakai tiket. Gunakan Tiket
            Tawar Bersama pada iklan ini?
            <br />Catatan: <br />1. Pastikan masa kadaluarsa tiket Anda melebihi
            waktu selesai tawar bersama iklan ini. <br />2. Tiket Anda akan
            tetap terpakai untuk mengikuti iklan Tawar Bersama ini meskipun Anda
            tidak melakukan penawaran
          </div>

          <h2 class="text-center my-4 green--text">
            Jumlah tiket tersedia milik Anda: {{ totalTiket.tersedia }} Tiket
          </h2>

          <v-btn
            block
            color="primary"
            class="my-4"
            @click="dialogKonfirmasiTiket = true"
            v-if="totalTiket.tersedia > 0"
          >
            Gunakan Tiket Anda
          </v-btn>

          <v-dialog v-model="dialogKonfirmasiTiket" max-width="400">
            <v-card>
              <div v-if="auto == false">
                <v-card-title class="headline">
                  Konfirmasi Penggunaan Tiket
                </v-card-title>

                <v-card-text>
                  {{ iklan.jumlah_tiket }} Tiket Anda akan tetap terpakai untuk
                  mengikuti iklan Tawar Bersama ini meskipun Anda tidak
                  melakukan penawaran, <br />
                  Apakah Anda Setuju?
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="red darken-1"
                    dark
                    @click="dialogKonfirmasiTiket = false"
                  >
                    Batalkan
                  </v-btn>

                  <v-btn dark color="green darken-3" @click="konfirmasiTiket()">
                    Ya, Gunakan
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-dialog>
        </v-container>

        <v-container fluid v-if="noTiket">
          <h2 class="text-center my-4">Oops!</h2>

          <v-divider> </v-divider>

          <div class="text-center my-4">
            Dengan mengikuti iklan Tawar Bersama ini Anda terdaftar sebagai
            peserta iklan ini meskipun Anda tidak melakukan penawaran
            <br />Apakah Anda setuju?
          </div>

          <v-btn
            block
            color="success"
            class="my-4"
            @click="dialogKonfirmasi = true"
          >
            Setuju, mengikuti Tawar Bersama
          </v-btn>

          <v-dialog v-model="dialogKonfirmasi" max-width="460">
            <v-card>
              <div v-if="auto == false">
                <v-card-title class="headline">
                  Konfirmasi Mengikuti Tawar Bersama
                </v-card-title>

                <v-card-text>
                  Dengan mengikuti iklan Tawar Bersama ini Anda terdaftar
                  sebagai peserta iklan ini meskipun Anda tidak melakukan
                  penawaran. Apakah Anda setuju?
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="red darken-1"
                    dark
                    @click="dialogKonfirmasi = false"
                  >
                    Tidak
                  </v-btn>

                  <v-btn color="primary" dark @click="konfirmasiNonTiket()">
                    Ya, Setuju
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-dialog>
        </v-container>

        <div v-if="ikutPenawaran">
          <flip-countdown :deadline="hits.tanggal_selesai"></flip-countdown>

          <v-divider></v-divider>

          <v-list>
            <v-list-item class="text-center">
              <v-list-item-content>
                <v-list-item-title>Harga Awal</v-list-item-title>
                <v-list-item-subtitle>
                  Rp
                  {{ Number(iklan.harga_awal).toLocaleString("id-ID") }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-divider vertical class="mx-2"></v-divider>

              <v-list-item-content>
                <v-list-item-title>Kelipatan Tawaran</v-list-item-title>
                <v-list-item-subtitle>
                  Rp
                  {{ Number(iklan.kelipatan).toLocaleString("id-ID") }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-tabs
            v-model="tab2"
            background-color="teal darken-2"
            color="white"
            slider-color="yellow"
            show-arrows
            grow
          >
            <v-tab>Tawar Manual</v-tab>
            <v-tab>
              <v-badge color="red" content="Aktif" v-if="isAuto != null"
                >Tawar Otomatis</v-badge
              >

              <div v-else>Tawar Otomatis</div>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab2">
            <v-tab-item>
              <v-list dense>
                <v-list-item>
                  <v-list-item-icon>
                    <v-btn icon @click="minus">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </v-list-item-icon>

                  <v-list-item-content align="center">
                    <h2>Nominal Penawaran</h2>

                    <h2>Rp {{ Number(bid).toLocaleString("id-ID") }}</h2>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon @click="bid += iklan.kelipatan">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-btn block dark color="teal" @click="bidding">
                    Konfirmasi Penawaran
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-tab-item>

            <v-tab-item>
              <v-container
                fluid
                class="text-center"
                v-if="!KonfirmasiAuto && isAuto == null"
              >
                <h2>Mau coba fitur tawar otomatis?</h2>

                <v-btn color="green" dark @click="KonfirmasiAuto = true">
                  Mau donk
                </v-btn>
              </v-container>

              <v-container fluid v-else>
                <div class="text-center">
                  <div align="center">
                    <v-text-field
                      v-model="amountAuto"
                      outlined
                      readonly
                      maxlength="11"
                      hide-details
                      style="width: 170px; display: none"
                      prepend-icon="mdi-minus"
                      @click:prepend="minAuto()"
                      append-outer-icon="mdi-plus"
                      @click:append-outer="addAuto()"
                    ></v-text-field>
                  </div>

                  <h2>Harga maksimal tawaran anda</h2>

                  <div class="d-flex align-center justify-center">
                    <v-btn icon color="red" @click="minAuto()">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>

                    <h2 class="mx-2">
                      Rp {{ Number(amountAuto).toLocaleString("id-ID") }}
                    </h2>

                    <v-btn icon color="green" @click="addAuto()">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>

                  <v-btn
                    color="teal"
                    dark
                    @click="autoBid"
                    v-if="isAuto == null"
                  >
                    Aktifkan Auto Tawar
                  </v-btn>

                  <div v-else>
                    <v-btn
                      color="teal"
                      @click="autoBid"
                      dark
                    >
                      Ubah Nominal
                    </v-btn>

                    <v-btn color="red" dark @click="offBid" class="mx-2">
                      Non Aktifkan
                    </v-btn>
                  </div>
                </div>

                <br />

                <div class="red--text font-weight-bold">
                  Catatan: <br />
                  Fitur Tawar Otomatis tidak menjamin anda akan memenangkan
                  iklan Tawar Bersama
                </div>
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <div v-if="iklan.id_mst_iklan_jenis == 1">
      <div v-if="!guest">
        <div v-if="iklan.id_app_user == user.id">
          <v-btn
            block
            color="teal"
            dark
            @click="terjual"
            v-if="iklan.id_mst_iklan_status != 2"
          >
            Set Iklan Terjual
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "firebase/firestore";
import { db } from "../main";
import moment from "moment-timezone";
import FlipCountdown from "vue2-flip-countdown";
import StarRating from "vue-star-rating";
import { VMoney } from "v-money";

const fmt = "YYYY-MM-DD HH:mm:ss";

export default {
  name: "detail_iklan",
  components: {
    StarRating,
    FlipCountdown,
    DetailUnit: () =>
      import(
        /* webpackChunkName: "detail-unit" */ "@/components/DetailUnit.vue"
      ),
  },
  directives: { money: VMoney },
  props: ["utc", "timezone"],
  beforeRouteLeave(to, from, next) {
    this.title = "SiMotor";
    this.$nextTick(() => {
      next();
    });
  },
  data() {
    return {
      id: this.$route.params.id,
      items: [],
      tab: 0,
      hits: [],
      iklan: [],
      display: false,
      unitMokas: [],
      fotos: [],
      dokumen: [],
      date: new Date().toISOString(),
      sheet: false,
      height: 0,
      tiket: [],
      totalTiket: [],
      useTiket: false,
      noTiket: false,
      ikutPenawaran: false,
      penawaran: 0,
      minBid: 0,
      dialogInfo: false,
      dialogDokumen: false,
      liveBid: [],
      bid: 0,
      motorBekas: [],
      dialog_dokumen: false,
      time: "",
      orders: [],
      dialogInfo2: false,
      appuser: [],
      title: "",
      loading: true,
      catatan: [],
      kebijakan: [],
      avg: [],
      favorit: [],
      dialogKonfirmasi: false,
      auto: false,
      dialogTawar: false,
      KonfirmasiAuto: false,
      tab2: 0,
      amountAuto: 0,
      isAuto: [],
      dialogKonfirmasiTiket: false,
      money: {
        thousands: ".",
        precision: 0,
      },
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAds: "ads/setAds",
    }),
    getDtlIklan() {
      this.axios
        .get("/search/v3/search", {
          params: {
            id: this.id,
            limit: 1,
          },
        })
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.hits = hits[0]._source;
          this.getUser(this.hits.id_app_user);
          this.unit_mokas(this.hits.unit_motor_bekas[0].id);
          if (this.hits.id_mst_iklan_jenis == 1) {
            this.getHP(this.id);
          } else {
            this.getTB(this.id);
          }
          this.title = this.hits.judul;
          this.items.push(
            {
              text: "Beranda",
              disabled: false,
              to: "/",
            },
            {
              text: "Motor Bekas",
              disabled: false,
              to: "/category/mokas",
            },
            {
              text: this.hits.mst_iklan_jenis,
              disabled: false,
              to: "/category/mokas?jenis=" + this.hits.id_mst_iklan_jenis,
            },
            {
              text: this.hits.judul,
              disabled: true,
            }
          );
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
    unit_mokas(id) {
      this.axios
        .get("/produk/v3/unit_mokas", {
          params: {
            id: id,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.unitMokas = data[0];
          this.fotos = [];
          this.fotos.push(
            { src: this.unitMokas.foto_1 },
            { src: this.unitMokas.foto_2 },
            { src: this.unitMokas.foto_3 },
            { src: this.unitMokas.foto_4 },
            { src: this.unitMokas.foto_5 }
          );
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
    paketMokas() {
      var params = new URLSearchParams();

      for (let index = 0; index < this.iklan.motor_bekas.length; index++) {
        const element = this.iklan.motor_bekas[index].id_motor_bekas;
        params.append("id", element);
      }

      params.append("limit", this.iklan.motor_bekas.length);

      var request = {
        params: params,
      };

      this.axios
        .get("/produk/v3/unit_mokas", request)
        .then((response) => {
          let { data } = response.data;
          this.motorBekas = data;
          this.fotos = [];

          for (let i = 0; i < this.motorBekas.length; i++) {
            const e = this.motorBekas[i].foto_1;

            this.fotos.push({ src: e });
          }
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
    getHP(id) {
      this.axios
        .get("/iklan/v3/iklan_hp_mokas", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.iklan = data;
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
    getTB(id) {
      this.axios
        .get("/iklan/v3/iklan_tb_mokas", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.iklan = data;
          if (this.hits.id_mst_iklan_type === 2) {
            this.paketMokas();
          }
          if (this.minBid == 0) {
            this.penawaran =
              Number(this.iklan.harga_awal) + Number(this.iklan.kelipatan);
            this.bid = this.penawaran;
            this.amountAuto = this.penawaran;
          } else {
            this.penawaran = Number(this.minBid) + Number(this.iklan.kelipatan);
            this.bid = this.penawaran;
            this.amountAuto = this.penawaran;
          }
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
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
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
          if (error.response.status == 403) {
            this.setAuth(null);
            this.setToken(null);
            window.localStorage.setItem("user", null);
            window.localStorage.setItem("token", null);
            window.location.href = "/";
          }
        });
    },
    getTiket() {
      this.axios
        .get("/tiket/v3/tiket", {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 1,
            limit: 1,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.tiket = data[0];
          this.getTotalTiket();
        })
        .catch(() => {
          this.setAlert({
            status: true,
            color: "error",
            text: "Anda tidak memiliki tiket",
          });
        });
    },
    getTotalTiket() {
      this.axios
        .get("/tiket/v3/total_tiket", {
          params: {
            id_app_user: this.user.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          this.totalTiket = data;
          this.height = 190;
          this.useTiket = !this.useTiket;
          this.sheet = !this.sheet;
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
    konfirmasiTiket() {
      // var r = confirm(
      //   "     Konfirmasi Penggunaan Tiket \nGunakan tiket anda untuk iklan ini?"
      // );
      // if (r == true) {
      let formData = new FormData();

      formData.append("id_iklan", this.id);
      formData.append("id_app_user", this.user.id);
      formData.append("id_tiket", this.tiket.id);

      this.axios
        .post("/bid/v3/konfirmasi_penggunaan_tiket", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.height = 350;
          this.useTiket = !this.useTiket;
          // this.noTiket = !this.noTiket;
          this.ikutPenawaran = !this.ikutPenawaran;
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
        });
      // }
    },
    konfirmasiNonTiket() {
      // var r = confirm(
      //   "Konfirmasi mengikuti Tawar Bersama \nDengan mengikuti iklan Tawar Bersama ini Anda terdaftar sebagai peserta iklan ini meskipun Anda tidak melakukan penawaran. \nApakah Anda setuju?"
      // );

      let formData = new FormData();

      formData.append("id_iklan", this.id);
      formData.append("id_app_user", this.user.id);

      this.axios
        .post("/bid/v3/konfirmasi_penggunaan_nontiket", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.height = 350;
          this.noTiket = !this.noTiket;
          this.ikutPenawaran = !this.ikutPenawaran;
          this.auto = true;
          this.dialogKonfirmasi = false;
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
        });
    },
    ikutTB() {
      let formData = new FormData();

      formData.append("id_iklan", this.id);
      formData.append("id_app_user", this.user.id);

      this.axios
        .post("/bid/v3/iklan_tb_peserta", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          if (data.api_status == 1) {
            this.sheet = !this.sheet;
            this.height = 350;
            this.ikutPenawaran = true;
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
          if (responses.api_status == 2) {
            this.getTiket();
          }
          if (responses.api_status == 4) {
            this.sheet = !this.sheet;
            this.height = 350;
            this.noTiket = true;
          }
        });
    },
    minus() {
      if (this.bid > this.penawaran) {
        this.bid -= this.iklan.kelipatan;
      }
    },
    GetBid() {
      db.collection("tawar_bersama")
        .doc("iklan")
        .collection(String(this.id))
        .limit(5)
        .orderBy("Bid", "desc")
        .onSnapshot((querySnapshot) => {
          let bidder = [];
          querySnapshot.forEach((doc) => {
            bidder.push(doc.data());
            this.minBid = bidder[0].Bid;
            this.penawaran = Number(this.minBid) + Number(this.iklan.kelipatan);
            this.bid = this.penawaran;
          });
          this.liveBid = bidder;
        });
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    bidding() {
      let formData = new FormData();
      formData.append("id_iklan", this.id);
      formData.append("bid", this.bid);
      formData.append("id_app_user", this.user.id);

      this.axios
        .post("/bid/v3/iklan_tb_bid", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.sheet = false;
          this.playSound("/audio/bid.mpeg");
          this.tab = 3;
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
        });
    },
    terjual() {
      var r = confirm("Konfirmasi untuk merubah status iklan ke terjual?");
      if (r == true) {
        let formData = new FormData();

        formData.append("id", this.id);
        formData.append("id_mst_iklan_status", 2);

        this.axios
          .put("iklan/v3/iklan_hp_mokas_satuan", formData, {
            headers: { Authorization: "Bearer " + this.user.token },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
          })
          .catch((error) => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "error",
              text: responses.api_message,
            });
            if (responses.api_status == 2) {
              this.getTiket();
            }
          });
      }
    },
    getOrder() {
      this.axios
        .get("/transaksi/v3/order", {
          params: {
            id_iklan: this.id,
          },
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response.data;
          if (data.length > 0) {
            this.orders = data[0];
          }
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
    deleteIklan() {
      var r = confirm("Apakah anda yakin untuk menghapus iklan ini?");
      if (r == true) {
        this.axios
          .delete("/iklan/v3/iklan", {
            headers: { Authorization: "Bearer " + this.user.token },
            params: {
              id: this.$route.params.id,
            },
          })
          .then((response) => {
            let { data } = response;
            this.setAlert({
              status: true,
              color: "success",
              text: data.api_message,
            });
            this.$router.push({ path: "/iklan" });
          })
          .catch((error) => {
            let responses = error.response.data;
            console.log(responses);
          });
      }
    },
    getUser(id) {
      this.axios
        .get("/user/v3/user", {
          params: {
            id: id,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data;
          this.appuser = data[0];

          this.getCatatan();
          this.getKebijakan();
          this.reviewAvg();
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses);
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
    getFavourite() {
      this.axios
        .get("/iklan/v3/iklan_favorit", {
          params: {
            id_app_user: this.user.id,
            id_iklan: this.id,
            limit: 1,
          },
        })
        .then((response) => {
          let data = response.data;
          let { hits } = data.hits;
          this.favorit = hits[0];
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
    favourite() {
      let formData = new FormData();
      formData.append("id_iklan", this.id);
      formData.append("id_app_user", this.user.id);

      this.axios
        .post("/iklan/v3/iklan_favorit", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then(() => {
          this.getFavourite();
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
    back() {
      this.$router.go(-1);
      this.title = "SiMotor";
    },
    getAutoBid() {
      this.axios
        .get("/bid/v3/pembeli_auto_tawar", {
          params: {
            id_app_user: this.user.id,
            id_iklan: this.id,
          },
        })
        .then((response) => {
          let { data } = response.data;
          if (data.length == 0) {
            this.isAuto = null;
            this.amountAuto = this.bid;
          } else {
            this.isAuto = data[0];
            this.amountAuto = this.bid;
          }
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
    autoBid() {
      let formData = new FormData();
      formData.append("id_app_user", this.user.id);
      formData.append("id_iklan", this.id);
      formData.append("max_bid", this.amountAuto);

      this.axios
        .post("/bid/v3/konfirmasi_auto_tawar ", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.getAutoBid();
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
    offBid() {
      let formData = new FormData();
      formData.append("id_app_user", this.user.id);
      formData.append("id_iklan", this.id);

      this.axios
        .post("/bid/v3/off_auto_tawar ", formData, {
          headers: { Authorization: "Bearer " + this.user.token },
        })
        .then((response) => {
          let { data } = response;
          this.setAlert({
            status: true,
            color: "success",
            text: data.api_message,
          });
          this.getAutoBid();
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
    addAuto() {
      let max = this.bid + 20000000;
      if (this.amountAuto < max) {
        this.amountAuto += this.iklan.kelipatan;
      }
    },
    minAuto() {
      if (this.amountAuto > this.bid) {
        this.amountAuto -= this.iklan.kelipatan;
      }
    },
  },
  created() {
    this.getDtlIklan();
    this.GetBid();
    this.getFavourite();
    this.getAutoBid();
    if (!this.guest) {
      this.getOrder();
    }

    var app = this;
    setInterval(() => {
      app.time = moment().format(fmt);
    }, 1000);
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      guest: "auth/guest",
    }),
    now: function () {
      return this.time;
    },
    start: function () {
      return moment.utc(this.time).isAfter(this.iklan.tanggal_mulai);
    },
    end: function () {
      return moment.utc(this.time).isAfter(this.iklan.tanggal_selesai);
    },
  },
  filters: {
    datediff: (date) => {
      return moment(date).from();
    },
    dateFormat: (date) => {
      return moment.utc(date).format("DD MMM YYYY");
    },
    timeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("HH:mm");
    },
    dateTimeFormat: (date, utc) => {
      return moment.utc(date).add(utc, "h").format("DD MMM YYYY HH:mm");
    },
  },
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = this.title;
      },
    },
  },
};
</script>