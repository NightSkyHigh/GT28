<template>
  <v-app id="inspire">
    <!-- Our toolbar is the top bar. It also has the dropdown menu-button and our "logo" as well -->
    <v-toolbar color="light-blue darken-2" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <img id="logo" src="../images/logo.png"></img>
      <v-toolbar-title>Our Weather Service</v-toolbar-title>
    </v-toolbar>
    <!-- The navigation-drawer is the flexible menu on the left hand side (on large screens) and the contents of the dropdown-menu on smaller screens
    There's alot of v-list tags, which came with the template -->
    <v-navigation-drawer
    v-model="drawer" fixed app width="250">
    <v-list dense>
      <!-- The first element/link/button of the menu is the one that takes us back to the view we started out with. It calls a method
      called setCoords with latitude, longtitude and zoom-level.
      As you can see, we've also added @click.stop="drawer = !drawer" which makes the menu hide when you change press the link.
      The reason behind this desicion is that it looks better on the mobile, although it does not look better on larger screens -->
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(52.21, 21.00, 3.9)" @click.stop="drawer = !drawer">Home</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(52.52, 13.40, 9)" @click="changeCity('Berlin')" >Berlin, Germany</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(51.50, -0.11, 9)" @click="changeCity('London')">London, England</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(55.75, 37.61, 9)" @click="changeCity('Moscow')">Moscow, Russia</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(59.91, 10.74, 9)" @click="changeCity('Oslo')">Oslo, Norway</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(-33.96, 25.58, 12)" @click="changeCity('Port Elizabeth')">Port Elizabeth, South Africa</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(45.86, 25.78, 12)" @click="changeCity('Sfântu-Gheorghe')">Sfântu-Gheorghe, Romania</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <!-- v-content is where "everything else" is displayed. Map, temperatures, day, weather-icons all gets displayed withing v-content. -->
  <v-content>
      <v-container fluid >
        <v-layout justify-left align-left>
          <v-flex text-xs-center>
            <!-- Multiple levels of div's, which adds multiple layers of customization-->
            <div id="infoAndMapContainer">
              <div id="infoContainer">
                <div id="leftInfo">
                  <div id="day">
                    <p>Today</p>
                  </div>
                  <div id="daytemp">
                    <p class="temperatureColor">{{valueList[0]}}C</p>
                  </div>
                  <div id="dayicon">
                    <p><img :src="forecastList[0]" height="50px" width="50px"/></p>
                  </div>
                </div>
                <div id="middleInfo">
                  <div id="day">
                    <p>{{ getNameOfDay(1) }}</p>
                  </div>
                  <div id="daytemp">
                    <p class="temperatureColor">{{valueList[1]}}C</p>
                  </div>
                  <div id="dayicon">
                    <p><img :src="forecastList[1]" height="50px" width="50px"/></p>
                  </div>
                </div>
                <div id="rightInfo">
                  <div id="day">
                    <p>{{ getNameOfDay(2) }}</p>
                  </div>
                  <div id="daytemp">
                    <p class="temperatureColor">{{valueList[2]}}C</p>
                  </div>
                  <div id="dayicon">
                    <p><img :src="forecastList[2]" height="50px" width="50px"/></p>
                  </div>
                </div>
              </div>
              <div id="mapid"></div>
            </div>
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
    id: null,
    accessToken: 'pk.eyJ1Ijoia2FhYXNlbiIsImEiOiJjanRwZ2tmY2YwMDJnNGRxZGplMHZtdDJ3In0.TzTQ3C8LMcW8A1LIgyNYBg',
    map: null,
    tileLayer: null,
    lat: 52.25,
    long: 21.00,
    zoom: 3.9,

    events: null,
    url: 'http://api.apixu.com/v1/forecast.json?key=08a3949c85ea4120ac195310192703&q=Oslo&days=3',
    valueList: [],
    forecastList: [],
    dayList: []
  }),
  props: {
    source: String
  },
  methods: {
    /** getMap gets run when you first load the page. It get's the default paramters set in data().
    *   This is basically just copy-pasted from Mapbox.
    */
      getMap: function() {
        this.map = L.map('mapid').setView([this.lat,this.long], this.zoom);

        this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1Ijoia2FhYXNlbiIsImEiOiJjanRwZ2tmY2YwMDJnNGRxZGplMHZtdDJ3In0.TzTQ3C8LMcW8A1LIgyNYBg'
        })
        this.tileLayer.addTo(this.map);

        var berlinMarker = L.marker([52.52, 13.40]).addTo(this.map);
        var londonMarker = L.marker([51.50, -0.11]).addTo(this.map);
        var moscowMarker = L.marker([55.75, 37.61]).addTo(this.map);
        var osloMarker = L.marker([59.91, 10.74]).addTo(this.map);
        var portelizabethMarker = L.marker([-33.96, 25.58]).addTo(this.map);
        var sfântugheorgheMarker = L.marker([45.86, 25.78]).addTo(this.map);
      },
      /** setCoords gets called from the buttons in the navigation-drawer with the given parameters.
      *   Only difference from getMap is that we work on the existing map, and not a new one.
      */
      setCoords: function(lat, long, zoom) {
        this.map.flyTo([lat,long], zoom);

        this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1Ijoia2FhYXNlbiIsImEiOiJjanRwZ2tmY2YwMDJnNGRxZGplMHZtdDJ3In0.TzTQ3C8LMcW8A1LIgyNYBg'
        })
        this.tileLayer.addTo(this.map);
      },
      /** getData gets the data (temperatures and icons) from api.apixu.com */
      getData: function() {
        axios
          .get(this.url)
          .then(response => {
            this.events = response.data.forecast.forecastday;
            for(let i = 0; i < 3; i++){
              this.valueList.push(response.data.forecast.forecastday[i].day.maxtemp_c);
              this.forecastList.push(response.data.forecast.forecastday[i].day.condition.icon)
            }

        }).catch(error => console.log(error))
      },
      /** getNameOfDay creates an array of days and returns the weekday the user asks for  */
      getNameOfDay : function (offSet) {
          let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          let dt = new Date();
          return weekday[dt.getDay()+offSet];
      },
      changeCity: function(cityName){
        this.valueList = [];
        this.forecastList = [];
        this.url = 'http://api.apixu.com/v1/forecast.json?key=08a3949c85ea4120ac195310192703&q='+cityName+'&days=3';
        this.drawer = !this.drawer;
        this.getData();
      }
    },
    created(){
      this.getData();
      this.getNameOfDay();
    },
    mounted(){
      this.getMap();
    }
  }
</script>

<style>
#infoAndMapContainer {
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}
#infoContainer {
  height: 85px;
  width: 800px;
  margin-bottom: 2px;
  flex: 1 100%;
  opacity: 0.8;
  display: flex;
}
#leftInfo, #middleInfo, #rightInfo {
  border: 2px solid #0288D1;
  border-radius: 12px;
  width: 33.33%;
  margin: 2px;
}
#day {
  width: 33.33%;
}
#daytemp {
  width: 33.33%;
}
#dayicon {
  width: 33.33%;
  position: absolute;
  top: 45px;
}
#mapid {
  height: 500px;
  width: 800px;
  z-index: 1;
  border: 2px solid #0288D1;
  border-radius: 12px;
  flex: 1 100%;
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
h3 {
  font-size: 20px;
}
p {
  font-weight: bold;
}
.temperatureColor {
  color: red;
  font-weight: bolder;
}
</style>
