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
          <v-list-tile-title><a href="#" v-on:click="$emit('setCoords(59.91, 10.74)')">Oslo</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" @click="setCoords(51.50, -0.11)">London</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" @click="setCoords(55.75, 37.61)">Moscow</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" @click="setCoords(52.52, 13.40)">Berlin</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
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

<style>
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
