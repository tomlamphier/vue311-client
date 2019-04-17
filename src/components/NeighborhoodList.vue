<template>
  <div id="neighborhoods">
    <div class="row">
        <h3 class="col-md-5 offset-md-4">{{selarea}} Neighborhoods</h3>
    </div>
    <div class="row">
        <div class="col-md-2 offset-md-7">
            <div class="form-group">
              <label for="filter" class="sr-only">Filter</label>
              <input type="text" class="form-control" v-model="filter"
                placeholder="filter">
            </div>
        </div>
    </div>
    <div class="row">
      <div class="col-md-1">
        <p v-if="!isLoaded">Loading data ...</p>
      </div>
      <div class="col-md-3">
          <b-form-group label="Select Area" class="more-top-margin">
              <b-form-radio value="NYC" v-model="selarea">NYC</b-form-radio>
              <b-form-radio value="Brooklyn" v-model="selarea">Brooklyn</b-form-radio>
              <b-form-radio value="Bronx" v-model="selarea">Bronx</b-form-radio>
              <b-form-radio value="Manhattan" v-model="selarea">Manhattan</b-form-radio>
              <b-form-radio value="Queens" v-model="selarea">Queens</b-form-radio>
              <b-form-radio value="Staten Island" v-model="selarea">Staten Island</b-form-radio>

          </b-form-group>
          <button class="bg-primary" @click="selectAll()">
              Select All 
          </button>
          <button class="bg-primary" @click="clearSelections()">
              Clear Selections 
          </button>
      </div>
      <div class="col-md-5">
          <div v-if="isLoaded">
            <datatable :columns="tab_columns" :data="neighborhoodsFiltered"
              :filter-by="filter">
              <template slot-scope="{row, columns}">
                <tr :class="{info: selected_rows.indexOf(row) !== -1}"
                  @click="selectRow(row)">
                  <template>
                    <datatable-cell v-for="(column, j) in columns"
                      :key="j" :column="column" :row="row">
                    </datatable-cell>
                  </template>
                </tr>
              </template>  
            </datatable>
            <datatable-pager v-model="page" :per-page="per_page" type="abbreviated" />
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NeighborhoodList',
  data () {
    return {
      neighborhoods: null,
      neighborhoodsFiltered: null,
      isLoaded: false,
      tab_columns: [
        {label: 'Name', field: 'neighborhood'},
        {label: 'Borough', field: 'borough'}
      ],
      page: 1,
      per_page: 10,
      filter: '',
      selected_rows: [],
      selarea: 'NYC'
    }
  },
  created() {
      this.axios.get('http://localhost:8080/neighborhoods')
        //.then(response => (this.complaints = response.data))
        .then(response => {
            this.neighborhoods = response.data
            this.neighborhoodsFiltered = this.neighborhoods.slice(0)
            this.isLoaded = true
        })
        .catch(error => console.log(error))
  },
  methods: {
      selectRow(row) {
      if (this.selected_rows.indexOf(row) !== -1) {
        let index = this.selected_rows.indexOf(row);
        this.selected_rows.splice(index,1)
        return
      }
      this.selected_rows.push(row)
    },

    clearSelections() {
      this.selected_rows.splice(0, this.selected_rows.length)
    },

    selectAll() {
      this.selected_rows = this.neighborhoodsFiltered.slice(0)
    }
  },
  watch: {
    selarea: function(val) {
        this.neighborhoodsFiltered = this.neighborhoods.filter(nh => nh.borough === val || val === 'NYC')
        //this.selected_rows = this.selected_rows.splice(0, this.selected_rows.length)
        this.clearSelections()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  table {
      font-size: 12px;
      line-height: 0.2;
  }
  h3 {
      text-align: center;
  }
  .info {
    background-color: lightblue !important;
  }
  button {
      font-size: 12px;
      outline: none;
  }
  .more-top-margin {
      margin-top: 20px;
      font-size: 12px;
  }
</style>
