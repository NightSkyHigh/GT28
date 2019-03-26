<template>
  <v-app id="inspire">
    <v-navigation-drawer
    v-model="drawer"
    fixed
    app
    >
    <v-list dense>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><a href="#" @click="setCoords(59.91, 10.74)">Oslo</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><a href="#" @click="setCoords(51.50, -0.11)">London</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><a href="#" @click="setCoords(55.75, 37.61)">Moscow</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><a href="#" @click="setCoords(52.52, 13.40)">Berlin</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>Our Weather Service</v-toolbar-title>
  </v-toolbar>
  </v-app>
</template>

<script>
  import Content from './Content'
  export default {
    data: () => ({
      drawer: null,
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoia2FhYXNlbiIsImEiOiJjanRwZ2tmY2YwMDJnNGRxZGplMHZtdDJ3In0.TzTQ3C8LMcW8A1LIgyNYBg'
    }),
    props: {
      source: String
    },
    methods: {
      setCoords: function(lat, long) {
        this.lat = lat,
        this.long = long
        getMap();
      }
    }
  }
</script>
