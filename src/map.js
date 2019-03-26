var mymap = L.map('mapid').setView([52.25, 21.00], 4.2);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoia2FhYXNlbiIsImEiOiJjanRwZ2tmY2YwMDJnNGRxZGplMHZtdDJ3In0.TzTQ3C8LMcW8A1LIgyNYBg'
}).addTo(mymap);

var osloMarker = L.marker([59.91, 10.74]).addTo(mymap);
var berlinMarker = L.marker([52.52, 13.40]).addTo(mymap);
var berlinMarker = L.marker([51.50, -0.11]).addTo(mymap);
var moscowMarker = L.marker([55.75, 37.61]).addTo(mymap);
