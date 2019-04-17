<template>
  <div id="mymap">
<l-map
      :bounds="bounds"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      ref="map"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-geo-json
        :geojson="geodata"
        :options="goptions"
        :options-style="styleFunction"
      />
      <l-reference-chart v-if="chorodata" title="Complaints / Square Mile, 2016-2018" :colorScale="colorScale" :min="minval" :max="maxval" position="topright"/>
    </l-map>  
  </div>
</template>
<script>
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'
import { ReferenceChart } from 'vue-choropleth'
import chroma from 'chroma-js'
export default {
  name: 'DisplayMap',
  data () {
    return {
      center: L.latLng(40.7146, -74.0071),
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      currentZoom: 11.5,
      mapOptions: {
        zoomSnap: 0.5
      },
      geodata: null,
      geodata2: null,
      dgeodata: {},
      fillColor: '#e4ce7f',
      bounds: null,
      bounds2: L.latLngBounds([[40.8572, -73.8710], [40.8732, -73.8458]]),
      zoom: 10,
      chorodata: null,
      chorodata2: null,
      minval: 0,
      maxval: 0,
      colorScale: ["e7d990", "e9ae7b", "de7062"],
      geoloaded: false,
      choroloaded: false
    }
  },
  components: {
      LMap,
      LTileLayer,
      LGeoJson,
      'l-reference-chart': ReferenceChart
  },
  methods: {
    getColor: function(newVal) {
      if (this.minval == this.maxval) {
        return '#ffffff'
      }
      let normalized = (newVal - this.minval) / (this.maxval - this.minval)
      return chroma.scale(this.colorScale)
        .mode("lch")(normalized)
        .hex()
    },
    getParam: function(neighborhood) {
      let cnt = this.minval
      let rnk = "?"
      let sel = this.chorodata.filter(elem => elem.neighborhood == neighborhood)
      if (sel.length > 0) {
        cnt = sel[0].count
        rnk = sel[0].rank
      }
      let res = {count: cnt, rank: rnk}
      return res
    }
  },
  props: ['curIndex', 'selnh', 'selcompl'],
  watch: {
    curIndex: function(val) {
      if (this.curIndex == 3) { 
          this.map = this.$refs.map.mapObject
          this.map.invalidateSize()
          this.geoloaded = false
          this.choroloaded = false

          let dat = {
            neighborhoods: this.selnh
          }
          this.axios.post('http://localhost:8080/nhoodgeo', dat)
          .then(response => {
             let minlat = response.data.minlat
             let maxlat = response.data.maxlat
             let minlng = response.data.minlng
             let maxlng = response.data.maxlng
             this.bounds = L.latLngBounds([[minlat, minlng], [maxlat, maxlng]])
             this.geodata2 = JSON.parse(response.data.geodata)
             this.geoloaded = true
          })
          .catch(error => console.log(error))

          dat = {
            neighborhoods: this.selnh,
            complaints: this.selcompl
          }

          this.axios.post('http://localhost:8080/choropleth', dat)
          .then(response => {
             this.chorodata2 = response.data.counts
             if (this.chorodata2.length > 0) {
               this.minval = this.chorodata2[0].count
               this.maxval = this.chorodata2[0].count
               let i = 0
               for (i=1; i< this.chorodata2.length; i++) {
                 if (this.chorodata2[i].count < this.minval) {
                   this.minval = this.chorodata2[i].count
                 }
                 if (this.chorodata2[i].count > this.maxval) {
                   this.maxval = this.chorodata2[i].count
                 }
               }
             }
             this.choroloaded = true

          })
          .catch(error => console.log(error))
      }
    },
    geoloaded: function() {
      if (this.geoloaded && this.choroloaded) {
        this.chorodata = this.chorodata2
        this.geodata = this.geodata2
      }
    },
    choroloaded: function() {
      if (this.geoloaded && this.choroloaded) {
        this.chorodata = this.chorodata2
        this.geodata = this.geodata2
      }
    }
  },
  created() {
      
  },
  computed: {
    goptions () {
      return {
        onEachFeature: this.onEachFeatureFunction
      }
    },
    styleFunction () {
      const fillColor = this.fillColor; 
      return () => {
        return {
          weight: 1,
          color: 'red',
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 0.15
        }
      }
    },
    onEachFeatureFunction () {
      return (feature, layer) => {
        let nh = feature.properties.neighborhood
        let ct = this.getParam(nh)
        let col = this.getColor(ct.count)
        console.log(col)
        console.log(layer)
        layer.bindTooltip('<div>' + feature.properties.neighborhood 
          + '</br/>Rank: ' + ct.rank + ' (low to high)'  + '</div>')
        layer.options.fillColor = col
        //layer.on('mouseover', function(e) {
        //  e.target.setStyle({
        //    fillColor: '#ff0033',
        //  })
        //})
        //layer.on('mouseout', function(e) {
        //  e.target.setStyle({
        //    fillColor: '#ff00ff',
        //  })
        //})
        
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mymap {
  position: absolute;
  overflow-x: auto;
  top: 185px;
  right: 150px;
  left: 150px;
  bottom: 0;
  height: 550px;
}
h1 {
    margin-top: 15px;
    margin-left: 10px;
}
</style>
