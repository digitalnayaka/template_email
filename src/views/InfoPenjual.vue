<template>
  <div>
    <v-container fluid>
      <h3>Umum</h3>
      <v-row align="center">
        <v-col cols="12" sm="8">
          <h5>Informasi Umum</h5>
          <v-textarea outlined clearable name="input-7-4" label="Masukkan Informasi Umum"></v-textarea>
        </v-col>
        <v-col cols="12" sm="8">
          <h5>Slogan</h5>
          <v-text-field clearable v-model="first" label="Masukkan Slogan Anda" outlined></v-text-field>
        </v-col>
      </v-row>
      <br />
      <h3>Tambahkan Catatan</h3>
      <v-row>
        <v-col cols="12" sm="8">
          <h5>Judul Catatan</h5>
          <v-text-field clearable v-model="first" label="Masukkan Judul Catatan" outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="8">
          <h5>Isi Catatan</h5>
          <v-textarea outlined clearable name="input-7-4" label="Masukkan Isi Catatan"></v-textarea>
        </v-col>
      </v-row>
      <br />

      <h3>Tambahkan Kebijakan Penjual</h3>
      <v-row>
        <v-col cols="12" sm="8">
          <h5>Judul Kebijakan</h5>
          <v-text-field clearable v-model="first" label="Masukkan Judul Kebijakan" outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="8">
          <h5>Isi Kebijakan</h5>
          <v-textarea outlined clearable name="input-7-4" label="Masukkan Isi Kebijakan"></v-textarea>
        </v-col>
      </v-row>
      <v-btn block color="primary">Simpan</v-btn>
    </v-container>
  </div>
</template>