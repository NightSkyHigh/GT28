<template>
  <v-app id="inspire">
    <v-content>
        <v-container fluid fill-height>
          <v-layout
            justify-center
            align-center
          >
            <v-flex text-xs-center>
              <h1>wegaseg</h1>
              <div id="mapid"></div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      map: null,
      tileLayer: null
    }),
    methods: {
      getMap: function(){
        this.map = L.map('mapid').setView([52.25, 21.00], 4.2);

        this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1Ijoia2FhYXNlbiIsImEiOiJjanRwZ2tmY2YwMDJnNGRxZGplMHZtdDJ3In0.TzTQ3C8LMcW8A1LIgyNYBg'
        })
        this.tileLayer.addTo(this.map);
      }
    },
    mounted(){
      this.getMap();
    },

    props: {
      source: String
    }
  }
</script>
<style>
#mapid{
  height: 400px;
}
</style>

