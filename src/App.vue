<template>

  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <Content/>
      <MenuBar/>
      <Footer/>
    </v-content>
  </v-app>
</template>
<script>
import MenuBar from './components/MenuBar'
import Footer from './components/Footer'
import Content from './components/Content'

export default {
  name: 'App',
  components: {
    Content,
    MenuBar,
    Footer
  },
  data () {
    return {
      events: null,
      url: 'https://api.met.no/weatherapi/locationforecast/1.9/?lat=60.10&lon=9.58',
      valueList: null
    }
  },
  methods: {
getData: function(){
      var parseString = require('xml2js').parseString;
      var that = this;
      axios.get(this.url)
        .then(response => {
          parseString(response.data, function (err, result) {
            that.events = result.weatherdata.product[0].time// nothing happens
            //for(let i = 0; i < 6; i++){
              //valueList.push()
           // }
          });        
        })
      }
    },
    created(){
      this.getData();
    }
  }
</script>
