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
    width="250"
    >
    <v-list dense>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(52.21, 21.00, 3.9)" @click.stop="drawer = !drawer">Home</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(52.52, 13.40, 9)" @click.stop="drawer = !drawer">Berlin, Germany</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(51.50, -0.11, 9)" @click.stop="drawer = !drawer">London, England</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(55.75, 37.61, 9)" @click.stop="drawer = !drawer">Moscow, Russia</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(59.91, 10.74, 9)" @click.stop="drawer = !drawer">Oslo, Norway</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(-33.96, 25.58, 12)" @click.stop="drawer = !drawer">Port Elizabeth, South Africa</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-content>
          <v-list-tile-title><a href="#" v-on:click="setCoords(45.86, 25.78, 12)" @click.stop="drawer = !drawer">Sfântu-Gheorghe, Romania</a></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-content>
      <v-container fluid >
        <v-layout justify-left align-left>
          <v-flex text-xs-center>
            <div id="infoAndMapContainer">
              <div id="infoContainer">
                <div id="leftInfo">
                  <div id="day">
                    <p>Tday</p>
                  </div>
                  <div id="daytemp">
                    <p class="temperatureColor">{{valueList[0]}}</p>
                  </div>
                  <div id="dayicon">
                    <p><img :src="forecastList[0]" height="50px" width="50px"/></p>
                  </div>
                </div>
                <div id="middleInfo">
                  <div id="day">
                    <p>Tmrw:</p>
                  </div>
                  <div id="daytemp">
                    <p class="temperatureColor">{{valueList[1]}}</p>
                  </div>
                  <div id="dayicon">
                    <p><img :src="forecastList[1]" height="50px" width="50px"/></p>
                  </div>
                </div>
                <div id="rightInfo">
                  <div id="day">
                    <p>Datmrw</p>
                  </div>
                  <div id="daytemp">
                    <p class="temperatureColor">{{valueList[2]}}</p>
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
      setCoords: function(lat, long, zoom) {
        this.map.flyTo([lat,long], zoom);

        this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1Ijoia2FhYXNlbiIsImEiOiJjanRwZ2tmY2YwMDJnNGRxZGplMHZtdDJ3In0.TzTQ3C8LMcW8A1LIgyNYBg'
        })
        this.tileLayer.addTo(this.map);
      },

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
      getNameOfDay : function (offSet) {
          let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          let dt = new Date();
          return weekday[dt.getDay()+offSet];
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
  height: 100px;
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
