<template>
  <v-card>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div align="center">
      <div class="display-1 font-weight-bold text-center">Beri Ulasan</div>
      <v-card d-flex outlined width="800">
        <v-list>
          <v-list-item-content class="text-center">
            <v-row>
              <v-col cols="6">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-list-item-avatar tile size="100">
                      <v-img src="/img/vario.png"></v-img>
                    </v-list-item-avatar>
                  </v-list-item-title>
                </v-list-item-content>
              </v-col>

              <v-col cols="6">
                <v-list-item-title class="font-weight-bold">Judul Iklan</v-list-item-title>
                <v-list-item-title class="font-weight-bold">RP.xxxxxx</v-list-item-title>
              </v-col>
              <v-list-item-subtitle>Seberapa puas Anda dengan unit ini?</v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-icon>mdi-star-outline</v-icon>
              </v-list-item-subtitle>
              
            </v-row>
            <v-textarea outlined name="input-7-4" label="Tuliskan pengalaman anda disini...."></v-textarea>
               <v-list-item-subtitle>Berikan penilaian Anda untuk penjual: <span> nama penjual </span></v-list-item-subtitle>
            <v-list-item-content class="text-center">
            <v-row>
              <v-col cols="4">
                <v-icon>mdi-pirate</v-icon>
              </v-col>

              <v-col cols="4">
                <v-icon>mdi-pirate</v-icon>
              </v-col>
              <v-col cols="4">
                <v-icon>mdi-pirate</v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">Tidak Puas</v-col>
              <v-col cols="4">Netral</v-col>
              <v-col cols="4">Sangat Puas</v-col>
            </v-row>
            <v-textarea outlined name="input-7-4" label="Tuliskan tentang penjual disini...."></v-textarea>
          </v-list-item-content>
          </v-list-item-content>
         
        </v-list>
         <v-btn outlined color="primary">Nanti Saja </v-btn>
          <v-btn color="teal"> Simpan </v-btn>
      </v-card>
      
    </div>
    
  </v-card>
</template>
