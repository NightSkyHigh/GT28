<template>
  <v-app id="inspire">
    <v-toolbar color="light-blue darken-2" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <img id="logo" src="../images/logo.png"></img>
      <v-toolbar-title>Our Weather Service</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer
    v-model="drawer"
    fixed
    app
    >
    <v-list dense>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(52.52, 13.40, 9)">Berlin</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(51.50, -0.11, 9)">London</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(55.75, 37.61, 9)">Moscow</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(59.91, 10.74, 9)">Oslo</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(45.86, 25.78, 12)">Sfântu-Gheorghe</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-content>
      <v-container fluid >
        <v-layout justify-left align-left>
          <v-flex text-xs-center>
            <div id="mapid"></div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="light-blue darken-2" app>
      <span class="white--text">&copy; Warren & Aasen 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FhYXNlbiIsImEiOiJjanRwZ2tmY2YwMDJnNGRxZGplMHZtdDJ3In0.TzTQ3C8LMcW8A1LIgyNYBg',
    map: null,
    tileLayer: null,
    lat: 52.25,
    long: 21.00,
    zoom: 4.2
  }),
  props: {
    source: String
  },
  methods: {
      getMap: function() {
        this.map = L.map('mapid').setView([this.lat,this.long], this.zoom);

        this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 18,
          id: 'mapbox.light',
          accessToken: 'pk.eyJ1Ijoia2FhYXNlbiIsImEiOiJjanRwZ2tmY2YwMDJnNGRxZGplMHZtdDJ3In0.TzTQ3C8LMcW8A1LIgyNYBg'
        })
        this.tileLayer.addTo(this.map);

        var berlinMarker = L.marker([52.52, 13.40]).addTo(this.map);
        var londonMarker = L.marker([51.50, -0.11]).addTo(this.map);
        var moscowMarker = L.marker([55.75, 37.61]).addTo(this.map);
        var osloMarker = L.marker([59.91, 10.74]).addTo(this.map);
        var sfântugheorgheMarker = L.marker([45.86, 25.78]).addTo(this.map);
      },
      setCoords: function(lat, long, zoom) {
        this.map.setView([lat,long], zoom);

        this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 18,
          id: 'mapbox.light',
          accessToken: 'pk.eyJ1Ijoia2FhYXNlbiIsImEiOiJjanRwZ2tmY2YwMDJnNGRxZGplMHZtdDJ3In0.TzTQ3C8LMcW8A1LIgyNYBg'
        })
        this.tileLayer.addTo(this.map);
      }
    },
    mounted(){
      this.getMap();
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

#logo {
  height: 60px;
  width: 60px;
}

a {
  text-decoration: none;
  text-transform: uppercase;
  display: flex;
  justify-content: flex-end;
}

a:hover {
  color: #000000;
  cursor: pointer;
}
</style>
