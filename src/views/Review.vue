<template>
  <div>
    <v-app-bar app color="teal" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="text-center">
      <div class="display-1 font-weight-bold"> Rating Anda
      </div>
     <div class="display-1 font-weight-bold">4.5 / 5.0
          <v-icon> mdi-star-outline </v-icon>
      </div>
      <br />

      <v-card class="d-inline-block mx-auto">
        <v-list>
          <v-list-item >
            <v-list-item-content>
              <v-list-item-title>
              
              </v-list-item-title>

            
            </v-list-item-content>
          </v-list-item>

       

        
        </v-list>
      </v-card>
    </div>
  </div>
</template>