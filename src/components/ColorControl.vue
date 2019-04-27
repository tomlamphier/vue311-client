<template>
  <div id="colorctl" class="container">
      <div class="row">
        <div id="opacitylbl" class="col-sm-2">
          Opacity {{opacity}}%
        </div> 
        <div class="col-sm-5">
          <b-form-input 
            v-model="opacity"
            type="range" min="0" max="100"> 
          </b-form-input>
        </div>
      </div>
      <div class="row">
        <div id="palettetitle" class="col-sm-2">
          Color Ranges
        </div>
        <div class="col-sm-8">
          <canvas id="can1" ref="clr1" @click="can1click()"
            :class="{fatborder: iscan1act}"
          />
          <canvas id="can2" ref="clr2" @click="can2click()"
            :class="{fatborder: iscan2act}"
          />
          <canvas id="can3" ref="clr3" @click="can3click()"
            :class="{fatborder: iscan3act}"          
          />
        </div>
      </div>
  </div>
</template>
<script>
import chroma from 'chroma-js'
export default {
  name: 'ColorControl',
  data () {
    return {
      opacity: "0",
      iscan1act: true,
      iscan2act: false,
      iscan3act: false,
      colorscale: chroma.brewer.OrRd
    }
  },
  props: ['opc'],
  created() {
    this.opacity = this.opc
  },
  watch: {
    opacity: function(newVal) {
      this.$emit('update:opacity', newVal)
    },
    colorscale: function(newColors) {
      this.$emit('update:colorscale', newColors)
    }
  },
  methods: {
    can1click: function() {
      this.iscan1act = true
      this.iscan2act = false
      this.iscan3act = false
      this.colorscale = chroma.brewer.OrRd
    },
    can2click: function() {
      this.iscan2act = true
      this.iscan1act = false
      this.iscan3act = false
      this.colorscale = chroma.brewer.BuGn
    },
    can3click: function() {
      this.iscan3act = true
      this.iscan1act = false
      this.iscan2act = false
      this.colorscale = chroma.brewer.PuBuGn
    }
  },
  mounted() {
    let can = this.$refs.clr1
    let ctx = can.getContext("2d")
    for(let i=0; i < chroma.brewer.OrRd.length; i++) {
      ctx.fillStyle = chroma.brewer.OrRd[i]
      let x1 = (can.width / chroma.brewer.OrRd.length) * i
      let x2 = (can.width / chroma.brewer.OrRd.length) * (i + 1)
      ctx.fillRect(x1, 0, x2, can.height/2)
    }
    ctx.font="40px Avenir Helvetica"
    ctx.fillStyle = "#000000"
    ctx.fillText("Orange to Red", 5, 125)

    can = this.$refs.clr2
    ctx = can.getContext("2d")
    for(let i=0; i < chroma.brewer.BuGn.length; i++) {
      ctx.fillStyle = chroma.brewer.BuGn[i]
      let x1 = (can.width / chroma.brewer.BuGn.length) * i
      let x2 = (can.width / chroma.brewer.BuGn.length) * (i + 1)
      ctx.fillRect(x1, 0, x2, can.height/2)
    }
    ctx.font="40px Avenir Helvetica"
    ctx.fillStyle = "#000000"
    ctx.fillText("Blue to Green", 5, 125)

    can = this.$refs.clr3
    ctx = can.getContext("2d")
    for(let i=0; i < chroma.brewer.PuBuGn.length; i++) {
      ctx.fillStyle = chroma.brewer.PuBuGn[i]
      let x1 = (can.width / chroma.brewer.PuBuGn.length) * i
      let x2 = (can.width / chroma.brewer.PuBuGn.length) * (i + 1)
      ctx.fillRect(x1, 0, x2, can.height/2)
    }
    ctx.font="40px Avenir Helvetica"
    ctx.fillStyle = "#000000"
    ctx.fillText("Purple to Green", 5, 125)
  }
}
</script>
<style scoped>
  #colorctl {
      border: 1px solid blue;
  }
  #opacitylbl, #palettetitle {
      font-weight: bold;
  }
  #can1, #can2, #can3 {
    width: 135px;
    height: 40px;
    margin-right: 5px;
  }
  .fatborder {
    border: 2px solid lightgray;
  }
</style>
