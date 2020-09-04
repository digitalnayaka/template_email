<template>
  <div>
    <v-app-bar app color="teal" dark>
      <v-btn icon @click.stop="back">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <div v-if="!guest">
        <div v-if="user.id == iklan.id_app_user && hits.id_mst_iklan_status == 1">
          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon class="mx-2" v-on="on" @click="deleteIklan">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </v-btn>

          <v-btn icon>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon class="mx-2" v-on="on" :to="'/edit_iklan/' + id">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>
          </v-btn>
        </div>

        <div v-else>
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
      </div>
    </v-app-bar>

    <v-row dense>
      <v-col cols="12" sm="6">
        <v-carousel cycle hide-delimiter-background height="300">
          <v-carousel-item
            v-for="(item,index) in fotos"
            :key="index"
            :src="getImage(item.src)"
            reverse-transition="fade-transition"
            transition="fade-transition"
            contain
          ></v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="12" sm="6">
        <div class="d-flex justify-sm-center">
          <v-list>
            <v-list-item>
              <v-list-item-avatar size="62">
                <v-icon large v-if="hits.app_user_photo == 'null'">mdi-account-circle</v-icon>

                <v-img :src="getImage(hits.app_user_photo)" v-else></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <span class="float-left">{{ hits.app_user }}</span>
                  <v-img
                    v-if="hits.id_mst_user_type == 2"
                    src="/img/verified.png"
                    width="20"
                    height="20"
                    contain
                  ></v-img>
                </v-list-item-title>

                <v-list-item-subtitle>Penjual</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>

        <v-divider class="mb-2"></v-divider>
        <div class="text-center">
          <h2 class="font-weight-bold" v-if="iklan.id_mst_iklan_jenis == 1">
            Rp {{ Number(hits.harga).toLocaleString('id-ID') }}
            <img
              src="/img/icons/hargapas.png"
              height="25"
            />
          </h2>

          <div v-else>
            <h2 class="font-weight-black" v-if="liveBid.length == 0">
              Rp {{ Number(hits.harga_awal).toLocaleString('id-ID') }}
              <img
                src="/img/icons/harga_awal.png"
                height="25"
              />
            </h2>

            <h2 class="font-weight-black" v-else>
              Rp {{ Number(liveBid[0].Bid).toLocaleString('id-ID') }}
              <img
                src="/img/icons/harga_sekarang.png"
                height="25"
              />
            </h2>
          </div>
          <div class="text-center">
            <div class="text-h5 teal--text text-center">{{ iklan.judul }}</div>
            <div class="d-flex justify-sm-center">
              <h4>ID Iklan: {{ id }}</h4>
              <v-divider vertical class="mx-2"></v-divider>
              <div>
                <v-icon>mdi-eye</v-icon>
                {{ iklan.log_iklan_view }}
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-divider class="mt-2"></v-divider>

    <v-row dense>
      <v-col cols="12" v-if="iklan.id_mst_iklan_jenis > 1">
        <div class="teal--text" align="center" v-if="start == false && end == false">
          Tawar Bersama segera dimulai:
          <flip-countdown :deadline="hits.tanggal_mulai"></flip-countdown>
        </div>

        <div class="teal--text" align="center" v-if="start == true && end == false">
          Tawar Bersama berlangsung:
          <flip-countdown :deadline="hits.tanggal_selesai"></flip-countdown>
        </div>

        <div align="center" v-if="start == true && end == true">
          <h2 class="teal--text">Tawar Bersama selesai</h2>

          <div v-if="!guest">
            <v-btn
              color="teal"
              dark
              @click="dialogInfo = true"
              class="mx-2"
              v-if="liveBid.length > 0 && (liveBid[0].IdAppUser == user.id || iklan.id_app_user == user.id)"
            >{{ liveBid[0].IdAppUser == user.id ? "Anda menang, klik disini" : "Info Pemenang" }}</v-btn>

            <v-dialog v-model="dialogInfo" persistent max-width="500px">
              <v-card>
                <v-toolbar color="teal darken-3" dark>
                  <v-toolbar-title>Info Pemenang Iklan</v-toolbar-title>

                  <div class="flex-grow-1"></div>

                  <v-btn icon @click="dialogInfo = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>

                <div v-if="!guest">
                  <v-card-title
                    v-if="hits.id_app_user == user.id"
                  >Segera hubungi pemenang iklan Anda</v-card-title>
                </div>

                <v-btn value="left" tile color="white" v-if="liveBid.length > 0">
                  <div v-if="!guest">
                    <a
                      :href="'/chat/' + iklan.id_app_user"
                      v-if="liveBid[0].IdAppUser == user.id"
                    >Chat Penjual</a>
                  </div>
                  <a :href="'/chat/' + liveBid[0].IdAppUser" v-else>Chat Pemenang</a>
                </v-btn>

                <v-btn value="center" tile color="white">
                  <a :href="'/detail_transaksi/' + orders.id">Detail Transaksi</a>
                </v-btn>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row dense>
      <v-col cols="12">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          center-active
          grow
          v-if="hits.id_mst_iklan_jenis == 1"
        >
          <v-tab>Detail Iklan</v-tab>
        </v-tabs>

        <v-tabs v-model="tab" background-color="transparent" center-active grow v-else>
          <v-tab>
            <v-badge
              color="green"
              :content="liveBid.length"
              v-if="liveBid.length > 0"
            >Detail Penawaran</v-badge>
            <div v-else>Detail Penawaran</div>
          </v-tab>
          <v-tab>Detail Tawar Bersama</v-tab>
          <v-tab>Detail Iklan</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" v-if="hits.id_mst_iklan_jenis == 1">
          <v-tab-item>
            <v-list-item>
              <v-list-item-content>
                <div class="text-h6 text-left">Deskripsi</div>
                <div class="text-subtitle-1 text-left">{{ iklan.deskripsi }}</div>
              </v-list-item-content>

              <v-divider vertical class="mx-2"></v-divider>

              <v-list-item-content>
                <v-card flat width="1000">
                  <v-divider class="my-4"></v-divider>

                  <v-list dense subheader class="text-left" v-if="iklan.mst_iklan_type == 'Satuan'">
                    <v-subheader class="text-h6">Detail Motor</v-subheader>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_id_iklan.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>ID Motor</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.id }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_merek.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Merk</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.merk }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_tipe.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Tipe</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.type }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_tahun.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Tahun</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.tahun }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_odometer.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Odometer</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.odometer }} KM</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_warna.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Warna</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.warna }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_cc_mesin.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>CC Mesin</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.odometer }} CC</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_transmisi.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Transmisi</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.transmisi }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_jenis_motor.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Jenis Motor</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.jenis_motor }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_lokasi_samsat.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Samsat</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.lokasi_samsat }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_lokasi.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Lokasi</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.lokasi }}</v-list-item-action>
                    </v-list-item>

                    <v-subheader class="text-h6">Kelengkapan Dokumen</v-subheader>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_stnk.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>STNK</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.lembar_stnk ? "ADA" : "TIDAK" }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_lembar_pajak.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Lembar Pajak</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.lembar_pajak ? "ADA" : "TIDAK" }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_bpkb.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>BPKB</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.lembar_bpkb ? "ADA" : "TIDAK" }}</v-list-item-action>
                    </v-list-item>
                  </v-list>

                  <v-list dense subheader class="text-left" v-else>
                    <v-subheader class="text-h6">Informasi Paket Motor</v-subheader>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_jenis_motor.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Jumlah Motor</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action
                        v-if="iklan.motor_bekas != undefined"
                      >{{ iklan.motor_bekas.length }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_lokasi.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Lokasi Motor</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ unitMokas.lokasi }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_list.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Daftar Paket Motor:</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item
                      v-for="(item,i) in motorBekas"
                      :key="i"
                      :to="'/unit_mokas/' + item.id"
                    >
                      <v-list-item-avatar size="80">
                        <v-img :src="getImage(item.foto_1)" contain></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>{{ item.merk }} {{ item.type }}</v-list-item-title>
                        <v-list-item-subtitle>{{ item.tahun }}</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-icon>mdi-chevron-right</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-list-item-content>
            </v-list-item>
            <v-card>
              <!-- <div align="center" class="my-4">
               
              </div>-->
            </v-card>
          </v-tab-item>
        </v-tabs-items>

        <v-tabs-items v-model="tab" v-else>
          <v-tab-item>
            <div align="center" class="my-4" v-if="liveBid.length > 0">
              <v-card class="d-flex justify-space-between align-center" flat width="500">
                <v-list align="left" v-if="iklan.id_mst_iklan_jenis > 1">
                  <v-list-item v-for="(item,i) in liveBid.slice(0,5)" :key="item.Bid">
                    <v-list-item-icon class="mx-0" v-if="i+1 == 1">
                      <v-icon large color="orange">mdi-star</v-icon>
                    </v-list-item-icon>

                    <v-list-item-icon class="mr-2" v-else>
                      <v-chip color="green">{{ i + 1 }}</v-chip>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>
                        <span>Oleh: {{ !guest && user.id == item.IdAppUser ? "Anda" : item.IdUniq }}</span>
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ item.CreatedAt.toDate() | datediff }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-chip color="red" dark>Rp {{ Number(item.Bid).toLocaleString('id-ID') }}</v-chip>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </div>

            <v-card class="text-center ma-4" flat v-else>
              <div class="text-h4">Belum ada penawar</div>
              <div class="text-subtitle-1">Penawaran akan muncul disini</div>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-list-item>
              <v-list-item-content>
                <v-card class="d-flex justify-space-between align-center" flat width="500">
                  <v-card align="center">
                    <v-card-subtitle class="teal accent-4 white--text">Tanggal Mulai</v-card-subtitle>
                    <div>{{ hits.tanggal_mulai | dateFormat}}</div>
                    <div>{{ hits.tanggal_mulai | timeFormat}} {{ waktu }}</div>
                  </v-card>
                  <v-img src="/img/icons/gradient.jpg" width="100" height="60"></v-img>

                  <v-card align="center">
                    <v-card-subtitle class="red accent-4 white--text">Tanggal Selesai</v-card-subtitle>
                    <div>{{ hits.tanggal_selesai | dateFormat}}</div>
                    <div>{{ hits.tanggal_selesai | timeFormat}} {{ waktu }}</div>
                  </v-card>
                </v-card>
              </v-list-item-content>

              <v-divider vertical class="mx-2"></v-divider>

              <v-list-item-content>
                <v-card flat width="500" align="left">
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_jenis_iklan.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Jenis Iklan</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ iklan.mst_iklan_jenis }} {{ iklan.mst_iklan_type }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_tiket_dibutuhkan.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Tiket</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ iklan.jumlah_tiket > 0 ? "Ya" : "Tidak" }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_jumlah_tiket.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Jumlah Tiket</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>{{ iklan.jumlah_tiket }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_harga_awal.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Harga Awal</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>Rp {{ Number(iklan.harga_awal).toLocaleString("id-ID") }}</v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="/img/icons/icon_harga_kelipatan.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Kelipatan</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>Rp {{ Number(iklan.kelipatan).toLocaleString("id-ID") }}</v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-list-item-content>
            </v-list-item>
          </v-tab-item>

          <v-tab-item>
            <v-list-item>
              <v-list-item-content>
                <v-subheader class="text-h6">Deskripsi</v-subheader>
                <v-list-item-title>{{ iklan.deskripsi }}</v-list-item-title>
                <v-divider></v-divider>
                <v-subheader class="text-h6">Kelengkapan Dokumen</v-subheader>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/icon_stnk.png"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>STNK</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>{{ unitMokas.lembar_stnk ? "ADA" : "TIDAK" }}</v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/icon_lembar_pajak.png"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Lembar Pajak</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>{{ unitMokas.lembar_pajak ? "ADA" : "TIDAK" }}</v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/icon_bpkb.png"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>BPKB</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>{{ unitMokas.lembar_bpkb ? "ADA" : "TIDAK" }}</v-list-item-action>
                </v-list-item>
              </v-list-item-content>

              <v-divider vertical class="mx-2"></v-divider>

              <v-list-item-content>
                <v-list dense subheader class="text-left" v-if="iklan.mst_iklan_type == 'Satuan'">
                  <v-subheader class="text-h6">Detail Motor</v-subheader>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_id_iklan.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>ID Motor</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>{{ unitMokas.id }}</v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_merek.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Merk</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>{{ unitMokas.merk }}</v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_tipe.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Tipe</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>{{ unitMokas.type }}</v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_tahun.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Tahun</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>{{ unitMokas.tahun }}</v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_odometer.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Odometer</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>{{ unitMokas.odometer }} KM</v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_warna.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Warna</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>{{ unitMokas.warna }}</v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_cc_mesin.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>CC Mesin</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>{{ unitMokas.odometer }} CC</v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_transmisi.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Transmisi</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>{{ unitMokas.transmisi }}</v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_jenis_motor.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Jenis Motor</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>{{ unitMokas.jenis_motor }}</v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_lokasi_samsat.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Lokasi Samsat</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>{{ unitMokas.lokasi_samsat }}</v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_lokasi.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Lokasi</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>{{ unitMokas.lokasi }}</v-list-item-action>
                  </v-list-item>
                </v-list>

                <v-list dense subheader class="text-left" v-else>
                  <v-subheader class="text-h6">Informasi Paket Motor</v-subheader>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_jenis_motor.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Jumlah Motor</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action
                      v-if="iklan.motor_bekas != undefined"
                    >{{ iklan.motor_bekas.length }}</v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_lokasi.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Lokasi Motor</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>{{ unitMokas.lokasi }}</v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="/img/icons/icon_list.png"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Daftar Paket Motor:</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item
                    v-for="(item,i) in motorBekas"
                    :key="i"
                    :to="'/unit_mokas/' + item.id"
                  >
                    <v-list-item-avatar size="80">
                      <v-img :src="getImage(item.foto_1)" contain></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.merk }} {{ item.type }}</v-list-item-title>
                      <v-list-item-subtitle>{{ item.tahun }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-list-item-content>
            </v-list-item>
          </v-tab-item>
        </v-tabs-items>

        <v-divider></v-divider>

        <div
          class="text-center my-4"
          v-if="iklan.id_mst_iklan_jenis > 1"
        >Tanggal Diiklankan: {{ iklan.created_at | dateTimeFormat(utc) }} {{ waktu }}</div>

        <div
          class="text-center my-4"
          v-else
        >Tanggal Expired: {{ iklan.expired_at | dateTimeFormat(utc) }} {{ waktu }}</div>

        <div v-if="iklan.id_mst_iklan_jenis > 1 && start == true && end == false">
          <div v-if="!guest">
            <div v-if="iklan.id_app_user != user.id">
              <v-btn
                block
                color="teal"
                dark
                @click="ikutTB"
                v-if="iklan.id_mst_iklan_status == 1"
              >Ikut Tawar Bersama</v-btn>
            </div>
          </div>
        </div>

        <v-bottom-sheet v-model="sheet">
          <v-sheet>
            <v-container fluid v-if="useTiket">
              <h2 class="text-center my-4 red--text">{{iklan.jumlah_tiket}} Tiket dibutuhkan</h2>

              <div class="text-center my-4">
                Untuk dapat mengikuti iklan ini perlu memakai tiket. Gunakan Tiket Tawar Bersama pada iklan ini?
                <br />Catatan:
                <br />1. Pastikan masa kadaluarsa tiket Anda melebihi waktu selesai tawar bersama iklan ini.
                <br />2. Tiket Anda akan tetap terpakai untuk mengikuti iklan Tawar Bersama ini meskipun Anda tidak melakukan penawaran
              </div>
              <h2
                class="text-center my-4 green--text"
              >Jumlah tiket tersedia milik Anda: {{ totalTiket.tersedia }} Tiket</h2>
              <v-btn block color="primary" class="my-4" @click="konfirmasiTiket">Gunakan Tiket Anda</v-btn>
            </v-container>
            <!-- 
            <v-container fluid v-if="noTiket">
              <h2 class="text-center my-4">Oops!</h2>

              <div class="text-center my-4">
                Dengan mengikuti iklan Tawar Bersama ini Anda terdaftar sebagai peserta iklan ini meskipun Anda tidak melakukan penawaran
                <br />Apakah Anda setuju?
              </div>

              <v-btn
                block
                color="success"
                class="my-4"
                @click="konfirmasiNonTiket"
              >Setuju, mengikuti Tawar Bersama</v-btn>
            </v-container>-->

            <v-list v-if="ikutPenawaran">
              <v-list-item>
                <v-list-item-content>
                  <flip-countdown :deadline="hits.tanggal_selesai"></flip-countdown>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Harga Awal</v-list-item-title>
                  <v-list-item-subtitle>Rp {{ Number(iklan.harga_awal).toLocaleString('id-ID') }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-divider vertical class="mx-2"></v-divider>

                <v-list-item-content>
                  <v-list-item-title>Kelipatan Tawaran</v-list-item-title>
                  <v-list-item-subtitle>Rp {{ Number(iklan.kelipatan).toLocaleString('id-ID') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-btn icon @click="minus">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-list-item-icon>

                <v-list-item-content align="center">
                  <v-list-item-subtitle>Nominal Penawaran</v-list-item-subtitle>

                  <v-list-item-title class="font-weight-black">
                    <!-- <v-text-field outlined v-model="bid" hide-details readonly></v-text-field> -->
                    Rp {{ Number(bid).toLocaleString("id-ID") }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon @click="bid += iklan.kelipatan">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-list-item>
                <v-btn block dark color="teal" @click="bidding">Konfirmasi Penawaran</v-btn>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-bottom-sheet>

        <div v-if="iklan.id_mst_iklan_jenis == 1">
          <div v-if="!guest">
            <div v-if="iklan.id_app_user == user.id">
              <v-btn
                block
                color="teal"
                @click="terjual"
                v-if="iklan.id_mst_iklan_status != 2"
              >Set Iklan Terjual</v-btn>
            </div>

            <div v-else>
              <v-row>
                <v-col cols="6">
                  <v-btn block color="primary" @click="dialogInfo2 = true">Hubungi</v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn block color="teal" :to="'/chat/' + iklan.id_app_user">Pesan</v-btn>
                </v-col>
              </v-row>

              <v-dialog v-model="dialogInfo2" persistent max-width="500px">
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
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- <v-row dense>
      <v-col cols="12" sm="6" class="d-flex align-center">
        <v-carousel cycle>
          <v-carousel-item
            v-for="(item,index) in fotos"
            :key="index"
            :src="getImage(item.src)"
            reverse-transition="fade-transition"
            transition="fade-transition"
            contain
          >
            <v-card-title>
              <v-chip small left color="primary" text-color="white">ID Iklan: {{ id }}</v-chip>
            </v-card-title>
            <v-img src="/img/sold_out.png" v-if="iklan.id_mst_iklan_status == 2" contain></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="12" sm="6" xs="6">
        <v-card class="d-flex justify-space-between align-center" flat>
          <v-card align="center">
            <v-card-title class="teal accent-4 white--text">Tanggal Mulai</v-card-title>
            <div>{{ hits.tanggal_mulai | dateFormat}}</div>
            <div>{{ hits.tanggal_mulai | timeFormat}} {{ waktu }}</div>
          </v-card>
          <v-img src="/img/icons/gradient.jpg" width="100" height="60"></v-img>

          <v-card align="center">
            <v-card-title class="red accent-4 white--text">Tanggal Selesai</v-card-title>
            <div>{{ hits.tanggal_selesai | dateFormat}}</div>
            <div>{{ hits.tanggal_selesai | timeFormat}} {{ waktu }}</div>
          </v-card>
        </v-card>

        <v-divider class="mt-4"></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-content class="text-center">
              <v-list-item-title>
                <v-icon large color="green">mdi-speedometer</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle>Kilometer</v-list-item-subtitle>
              <v-list-item-subtitle>{{ unitMokas.odometer }} KM</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-content class="text-center">
              <v-list-item-title>
                <v-icon large color="green">mdi-calendar-month</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle>Tahun</v-list-item-subtitle>
              <v-list-item-subtitle>{{ unitMokas.tahun }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-content class="text-center">
              <v-list-item-title>
                <v-btn class="ma-2" text icon color="blue lighten-2" @click="dialog_dokumen = true">
                  <v-icon large color="green">mdi-folder-open-outline</v-icon>
                </v-btn>
              </v-list-item-title>
              <v-list-item-subtitle>Dokumen</v-list-item-subtitle>
              <v-list-item-subtitle>{{ dokumen.length }} / 3</v-list-item-subtitle>
            </v-list-item-content>

            <v-dialog v-model="dialog_dokumen" max-width="350">
              <v-card>
                <v-card-title primary-title>Daftar Dokumen</v-card-title>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Surat Tanda Nomer Kendaraan</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox v-model="unitMokas.lembar_stnk" readonly></v-checkbox>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Surat Ketetapan Pajak</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox v-model="unitMokas.lembar_pajak" readonly></v-checkbox>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Buku Pemilik Kendaraan Bermotor</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox v-model="unitMokas.lembar_bpkb" readonly></v-checkbox>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-dialog>

            <v-list-item-content class="text-center">
              <v-list-item-title>
                <v-icon large color="green">mdi-google-maps</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle>Lokasi</v-list-item-subtitle>
              <v-list-item-subtitle>{{ unitMokas.lokasi }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-card flat>
          <v-card-title class="justify-center">
            <div class="headline">Detail Motor</div>
          </v-card-title>

          <v-card-text>
            <v-row dense>
              <v-col cols="6">ID Motor</v-col>
              <v-col cols="6">{{ unitMokas.id }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Merk:</v-col>
              <v-col cols="6">{{ unitMokas.merk }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Tipe:</v-col>
              <v-col cols="6">{{ unitMokas.type }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Warna:</v-col>
              <v-col cols="6">{{ unitMokas.warna }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">CC Mesin:</v-col>
              <v-col cols="6">{{ unitMokas.cc }} CC</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Transmisi:</v-col>
              <v-col cols="6">{{ unitMokas.transmisi }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Jenis Motor:</v-col>
              <v-col cols="6">{{ unitMokas.jenis_motor }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Tanggal Selesai STNK:</v-col>
              <v-col
                cols="6"
                v-if="unitMokas.tanggal_stnk != null"
              >{{ unitMokas.tanggal_stnk | dateFormat }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="6">Tanggal Selesai Pajak:</v-col>
              <v-col
                cols="6"
                v-if="unitMokas.tanggal_pajak != null"
              >{{ unitMokas.tanggal_pajak | dateFormat }}</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" sm="6">
        <div v-if="iklan.id_mst_iklan_jenis == 1">
          <span class="subheading red--text float-left">Harga Pas</span>

          <div class="text-right ma-0 pa-0">
            <v-icon>mdi-eye</v-icon>
            {{ iklan.log_iklan_view }}
          </div>

          <h2>{{ iklan.judul }}</h2>

          <span>Rp {{ Number(iklan.harga).toLocaleString('id-ID') }}</span>
        </div>

        <div v-else>
          <span class="subheading red--text float-left">Tawar Bersama {{ iklan.mst_iklan_type }}</span>

          <div class="text-right ma-0 pa-0">
            <v-icon>mdi-eye</v-icon>
            {{ iklan.log_iklan_view }}
          </div>

          <div v-if="iklan.is_verified">Tiket dibutuhkan untuk Iklan ini</div>

          <h2>{{ iklan.judul }}</h2>

          <div>
            Harga Awal - Rp {{ Number(iklan.harga_awal).toLocaleString('id-ID') }}
            <v-btn icon @click="display = !display">
              <v-icon small>mdi-information</v-icon>
            </v-btn>
          </div>

          <div
            v-if="display"
            class="ma-0 pa-0"
          >Ikuti tawar bersama dengan kelipatan Rp {{ Number(iklan.kelipatan).toLocaleString('id-ID') }}</div>
        </div>
      </v-col>

      <v-col cols="12" sm="6" v-if="iklan.id_mst_iklan_jenis > 1">
        <div class="teal--text" align="center" v-if="start == false && end == false">
          Tawar Bersama segera dimulai:
          <flip-countdown :deadline="hits.tanggal_mulai"></flip-countdown>
        </div>

        <div class="teal--text" align="center" v-if="start == true && end == false">
          Tawar Bersama berlangsung:
          <flip-countdown :deadline="hits.tanggal_selesai"></flip-countdown>
        </div>

        <div align="center" v-if="start == true && end == true">
          <h2 class="teal--text">Tawar Bersama selesai</h2>

          <div v-if="!guest">
            <v-btn
              color="teal"
              dark
              @click="dialogInfo = true"
              class="mx-2"
              v-if="liveBid.length > 0 && (liveBid[0].IdAppUser == user.id || iklan.id_app_user == user.id)"
            >{{ liveBid[0].IdAppUser == user.id ? "Anda menang, klik disini" : "Info Pemenang" }}</v-btn>

            <v-dialog v-model="dialogInfo" persistent max-width="500px">
              <v-card>
                <v-toolbar color="teal darken-3" dark>
                  <v-toolbar-title>Info Pemenang Iklan</v-toolbar-title>

                  <div class="flex-grow-1"></div>

                  <v-btn icon @click="dialogInfo = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>

                <div v-if="!guest">
                  <v-card-title
                    v-if="hits.id_app_user == user.id"
                  >Segera hubungi pemenang iklan Anda</v-card-title>
                </div>

                <v-btn value="left" tile color="white" v-if="liveBid.length > 0">
                  <div v-if="!guest">
                    <a
                      :href="'/chat/' + iklan.id_app_user"
                      v-if="liveBid[0].IdAppUser == user.id"
                    >Chat Penjual</a>
                  </div>
                  <a :href="'/chat/' + liveBid[0].IdAppUser" v-else>Chat Pemenang</a>
                </v-btn>

                <v-btn value="center" tile color="white">
                  <a :href="'/detail_transaksi/' + orders.id">Detail Transaksi</a>
                </v-btn>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row dense v-if="this.liveBid != ''">
      <v-col cols="12" v-if="iklan.id_mst_iklan_jenis > 1">
        <v-list tile dense>
          <v-list-item v-for="(item,i) in liveBid.slice(0,5)" :key="item.Bid">
            <v-list-item-icon class="mx-0" v-if="i+1 == 1">
              <v-icon large color="orange">mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-icon class="mr-2" v-else>
              <v-chip color="green">{{ i + 1 }}</v-chip>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <v-chip
                  small
                  color="red"
                  text-color="white"
                >Rp {{ Number(item.Bid).toLocaleString('id-ID') }}</v-chip>&nbsp; oleh
                <span v-if="!guest">
                  <v-chip small color="red" text-color="white" v-if="user.id == item.IdAppUser">Anda</v-chip>
                </span>
                <v-chip small color="red" text-color="white">{{ item.IdUniq }}</v-chip>
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.CreatedAt.toDate() | datediff }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row dense>
      <v-col cols="12">
        <v-container fluid>
          <div class="headline">Deskripsi Iklan</div>
          <div>{{ iklan.deskripsi }}</div>
        </v-container>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row dense>
      <v-col cols="12">
        <v-container fluid>
          <div class="headline">Informasi Penjual</div>

          <v-list>
            <v-list-item>
              <v-list-item-avatar size="50">
                <v-icon large v-if="hits.app_user_photo == 'null'">mdi-account-circle</v-icon>
                <v-img :src="getImage(hits.app_user_photo)" contain v-else></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <v-img
                    v-if="hits.id_mst_user_type == 2"
                    src="/img/verified.png"
                    width="20"
                    height="20"
                    class="float-left"
                    contain
                  ></v-img>
                  {{ hits.app_user }}
                </v-list-item-title>
                <v-list-item-subtitle>Indonesia</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-container>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <p
      class="text-center"
      v-if="iklan.id_mst_iklan_jenis > 1"
    >Tanggal diiklankan: {{ iklan.created_at | dateTimeFormat(utc) }} {{ waktu }}</p>

    <p
      class="text-center red--text"
      v-else
    >Tanggal Expired: {{ iklan.expired_at | dateTimeFormat(utc) }} {{ waktu }}</p>

    <div v-if="iklan.id_mst_iklan_jenis > 1 && start == true && end == false">
      <div v-if="!guest">
        <div v-if="iklan.id_app_user != user.id">
          <v-btn
            block
            color="teal"
            @click="ikutTB"
            v-if="iklan.id_mst_iklan_status == 1"
          >Ikut Tawar Bersama</v-btn>
        </div>
      </div>
    </div>

    <v-bottom-sheet v-model="sheet">
      <v-sheet :height="height">
        <v-container fluid v-if="useTiket">
          <h2>Oops!</h2>

          <div>
            Untuk dapat mengikuti iklan ini perlu memakai tiket. Gunakan Tiket Tawar Bersama pada iklan ini?
            <br />Tiket yang dibutuhkan: 1 Tiket
            <br />
            Jumlah Tiket Tersedia: {{ totalTiket.tersedia }} Tiket
          </div>

          <v-btn block color="success" class="my-4" @click="konfirmasiTiket">Gunakan Tiket Anda</v-btn>
        </v-container>

        <v-list v-if="ikutPenawaran">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Nominal Penawaran</v-list-item-title>
              <v-list-item-subtitle>Masukan nominal penawaran Anda</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="sheet = !sheet">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Kelipatan Tawaran</v-list-item-title>
              <v-list-item-subtitle>Rp {{ Number(iklan.kelipatan).toLocaleString('id-ID') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Harga Awal</v-list-item-title>
              <v-list-item-subtitle>Rp {{ Number(iklan.harga_awal).toLocaleString('id-ID') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Penawaran Anda</v-list-item-title>

              <v-list-item-subtitle>
                <v-text-field outlined v-model="bid" hide-details readonly></v-text-field>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="minus">
                <v-icon>mdi-minus</v-icon>
              </v-btn>

              <v-btn icon @click="bid += iklan.kelipatan">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-btn block color="success" @click="bidding">Konfirmasi Penawaran</v-btn>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>

    <div v-if="iklan.id_mst_iklan_jenis == 1">
      <div v-if="!guest">
        <div v-if="iklan.id_app_user == user.id">
          <v-btn
            block
            color="teal"
            @click="terjual"
            v-if="iklan.id_mst_iklan_status != 2"
          >Set Iklan Terjual</v-btn>
        </div>

        <div v-else>
          <v-row>
            <v-col cols="6">
              <v-btn block color="primary" @click="dialogInfo2 = true">Hubungi</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="teal" :to="'/chat/' + iklan.id_app_user">Pesan</v-btn>
            </v-col>
          </v-row>

          <v-dialog v-model="dialogInfo2" persistent max-width="500px">
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
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "firebase/firestore";
import { db } from "../main";
import moment from "moment-timezone";
import FlipCountdown from "vue2-flip-countdown";

const fmt = "YYYY-MM-DD HH:mm:ss";

export default {
  name: "detail_iklan",
  components: { FlipCountdown },
  data() {
    return {
      id: this.$route.params.id,
      tab: 1,
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
      utc: moment().utcOffset() / 60 - 7,
      waktu: "",
      motorBekas: [],
      dialog_dokumen: false,
      time: "",
      orders: [],
      dialogInfo2: false,
      appuser: [],
      title: "",
      favorit: [],
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
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
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
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
          let foto1 = this.unitMokas.foto_1;
          let foto2 = this.unitMokas.foto_2;
          let foto3 = this.unitMokas.foto_3;
          let foto4 = this.unitMokas.foto_4;
          let foto5 = this.unitMokas.foto_5;
          this.fotos.push(
            { src: foto1 },
            { src: foto2 },
            { src: foto3 },
            { src: foto4 },
            { src: foto5 }
          );
          let stnk = this.unitMokas.lembar_stnk;
          let bpkb = this.unitMokas.lembar_bpkb;
          let pajak = this.unitMokas.lembar_pajak;
          if (stnk == true) {
            this.dokumen.push(stnk);
          }
          if (bpkb == true) {
            this.dokumen.push(bpkb);
          }
          if (pajak == true) {
            this.dokumen.push(pajak);
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
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
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
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
          if (this.iklan.motor_bekas.length > 1) {
            this.paketMokas();
          }
          if (this.minBid == 0) {
            this.penawaran =
              Number(this.iklan.harga_awal) + Number(this.iklan.kelipatan);
            this.bid = this.penawaran;
          } else {
            this.penawaran = Number(this.minBid) + Number(this.iklan.kelipatan);
            this.bid = this.penawaran;
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          console.log(responses.api_message);
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
        });
    },
    konfirmasiTiket() {
      var r = confirm(
        "     Konfirmasi Penggunaan Tiket \nGunakan tiket anda untuk iklan ini?"
      );
      if (r == true) {
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
            this.noTiket = !this.noTiket;
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
      }
    },
    konfirmasiNonTiket() {
      var r = confirm(
        "Konfirmasi mengikuti Tawar Bersama \nDengan mengikuti iklan Tawar Bersama ini Anda terdaftar sebagai peserta iklan ini meskipun Anda tidak melakukan penawaran. \nApakah Anda setuju?"
      );
      if (r == true) {
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
          })
          .catch((error) => {
            let responses = error.response.data;
            this.setAlert({
              status: true,
              color: "error",
              text: responses.api_message,
            });
          });
      }
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
        .collection(this.id)
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
            id_iklan: this.$route.params.id,
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
        });
    },
    back() {
      this.$router.go(-1);
      this.title = "SiMotor";
    },
  },
  created() {
    this.getDtlIklan();
    this.GetBid();
    this.getFavourite();
    if (!this.guest) {
      this.getOrder();
    }
  },
  mounted() {
    var app = this;
    setInterval(() => {
      app.time = moment().format(fmt);
    }, 1000);

    if (this.utc == 0) {
      this.waktu = "WIB";
    }
    if (this.utc == 1) {
      this.waktu = "WITA";
    }
    if (this.utc == 2) {
      this.waktu = "WIT";
    }
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