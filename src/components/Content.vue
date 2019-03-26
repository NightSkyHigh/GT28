<template>
  <v-app id="inspire">
    <v-content>
        <v-container fluid fill-height>
          <v-layout
            justify-center
            align-center
          >
            <v-flex text-xs-center>
              <div id="app">
                <div id="titleFrame"><h1>Title</h1></div>
                <div id="outterFrame">
                  <div id="locationFrame">
                    <ul>
                      <li><a href="#">Oslo</a></li>
                      <li><a href="#">London</a></li>
                      <li><a href="#">Berlin</a></li>
                      <li><a href="#">Moscow</a></li>
                      </li>
                    </ul>
                  </div>
                  <div id="mapFrame">
                    <div id="mapid"></div>
                    <script src="map.js">
                    </script>
                  </div>
                </div>
              </div>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn :href="source" icon large target="_blank" v-on="on">
                    <v-icon large>code</v-icon>
                  </v-btn>
                </template>
                <span>Source</span>
              </v-tooltip>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn icon large href="https://codepen.io/johnjleider/pen/rJdVMq" target="_blank" v-on="on">
                    <v-icon large>mdi-codepen</v-icon>
                  </v-btn>
                </template>
                <span>Codepen</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    }
  }
</script>
