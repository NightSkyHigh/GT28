<template>
  <v-app id="inspire">
    <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <v-flex text-xs-center>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn :href="source" icon large target="_blank" v-on="on">
                    <v-icon large>code</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn icon large href="https://codepen.io/johnjleider/pen/rJdVMq" target="_blank" v-on="on">
                    <v-icon large>mdi-codepen</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
  import MenuBar from './MenuBar'
  import Map from '../map.js'
  export default {
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    }
  }
</script>
