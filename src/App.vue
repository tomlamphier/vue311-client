<template>
  <div id="app" class="container">
    <div id="hdr">
      <h1>Neighborhood NYC</h1>
    </div>
      <b-tabs content-class="mt-3" v-model="tabIndex">
        <b-tab title="Home" active>
          <home/>
        </b-tab>
        <b-tab title="Data">
          <complaint-list ref="selcomplaints"/>
        </b-tab>
        <b-tab title="Neighborhoods">
          <neighborhood-list ref="selneighborhoods"/>
        </b-tab>
        <b-tab title="Map">
          <display-map :curIndex="tabIndex" :selnh="selnh" :selcompl="selcompl"/>
        </b-tab>
      </b-tabs>    
  </div>
</template>

<script>
import Home from './components/Home'
import DisplayMap from './components/DisplayMap'
import ComplaintList from './components/ComplaintList'
import NeighborhoodList from './components/NeighborhoodList'


export default {
  name: 'App',
  components: {
    Home,
    ComplaintList,
    NeighborhoodList,
    DisplayMap
  },
  data () {
    return {
      tabIndex: 0,
      selnh: [],
      selcompl: []
    }
  },
  methods: {
  },
  watch: {
    tabIndex: function() {
      var nhs = this.$refs.selneighborhoods.selected_rows
      this.selnh = []
      let i
      for (i=0; i<nhs.length; i++) {
        this.selnh.push(nhs[i].neighborhood)
      }
      var cps = this.$refs.selcomplaints.selected_rows
      this.selcompl = []
      for (i=0; i<cps.length; i++) {
        this.selcompl.push(cps[i].type)
      }
    }
  },
  computed: {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
#hdr {
  background-color: yellow;
}
h1 {
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 10px;
}
.tab-content {
  outline: none;
}
:focus {
  outline: none;
}
</style>
