<template>
  <v-app id="inspire">
    <v-content>
        <v-container fluid >
          <v-layout justify-left align-left>
            <v-flex text-xs-center>
              <div id="mapid"></div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
  import MenuBar from './MenuBar'
  export default {
    data: () => ({
      drawer: null,
      map: null,
      tileLayer: null,
      lat: 52.25,
      long: 21.00
    }),
    mounted(){
      this.getMap();
    },
    methods: {
      getMap: function() {
        this.map = L.map('mapid').setView([this.lat,this.long], 4.2);

        this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 18,
          id: 'mapbox.light',
          accessToken: 'pk.eyJ1Ijoia2FhYXNlbiIsImEiOiJjanRwZ2tmY2YwMDJnNGRxZGplMHZtdDJ3In0.TzTQ3C8LMcW8A1LIgyNYBg'
        })
        this.tileLayer.addTo(this.map);

        var osloMarker = L.marker([59.91, 10.74]).addTo(this.map);
        var berlinMarker = L.marker([52.52, 13.40]).addTo(this.map);
        var londonMarker = L.marker([51.50, -0.11]).addTo(this.map);
        var moscowMarker = L.marker([55.75, 37.61]).addTo(this.map);
      }
    },
    props: {
      source: String
    }
  }
</script>

<style>
#mapid {
  height: 500px;
  width: 800px;
  z-index: 1;
  border: 2px solid #0288D1;
  border-radius: 12px;
}
</style>
