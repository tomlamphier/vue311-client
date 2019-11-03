<template>
  <div id="complaints">
    <div class="row">
        <h3 class="col-md-5 offset-md-4">311 Complaints</h3>
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
      <div class="col-md-2">
          <button class="bg-primary" @click="clearSelections()">
              Clear Selections 
          </button>
      </div>
      <div class="col-md-5 offset-md-1">
          <div v-if="isLoaded">
            <datatable :columns="tab_columns" :data="complaints"
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
  name: 'ComplaintList',
  data () {
    return {
      complaints: null,
      isLoaded: false,
      tab_columns: [
        {label: 'Type', field: 'type'},
        {label: 'Frequency', field: 'level'}
      ],
      page: 1,
      per_page: 10,
      filter: '',
      selected_rows: []
    }
  },
  created() {
      this.axios.get(this.$serverurl + '/complaints')
        .then(response => {
            this.complaints = response.data
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
    }
  }
  
}
</script>

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
</style>
