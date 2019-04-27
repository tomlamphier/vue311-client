<template>
  <div>
  Welcome to <span style="color: green; font-weight: bold;">
  Neighborhood NYC</span>!  This app allows you to explore the types of 
  complaints made through New York City's 311 call service.  Once you have
  identified the types you are interested in, you can study how they are 
  distributed by neighborhood.  
  <br/><br/>
  Suppose, for example, you live in Astoria, and you would like to know 
  how it compares to other parts of Queens on the basis of noise level.
  First, you would go to the <span style="color: green; font-weight: bold;">Data
  </span> tab, and enter "noise" in the search box. You will see a list
  that includes different types of noise complaints, for instance
  "Noise / Helicopter".  You can click on all of the entries to select them 
  for your query, or you can click on some subset off the list.  
  <br/><br/>
  The next step is to go to the <span style="color: green; font-weight: bold;">Neighborhoods
  </span> tab.  Here you can select the area of interest, which can be all of NYC, one of the 
  boroughs, or just a few neighborhoods.  
  <br/><br/>
  Finally, go to the <span style="color: green; font-weight: bold;">Map
  </span> tab.  You will see a map of the area(s) you selected broken down 
  by neighborhood.  Each neighborhood will be colorized according to how 
  it ranks relative to the selected neighborhoods for the complaint types 
  in question. 
  <br/><br/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  
}
</script>

<style scoped>

</style>