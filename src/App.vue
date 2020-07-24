<template>
  <div id="app">
    <the-map></the-map>
    <tool-bar  @selectFunc="selectFunc"></tool-bar>
    <component
      :cesiumInstance="cesiumInstance"
      :is="selectType"
      class="tool-Container"
    ></component>
  </div>
</template>

<script>
import TheMap from './components/TheMap'
import ToolBar from './components/ToolBar'
import billboardClick from './views/billboard/billboardClick'
export default {
  name: 'App',
  components: {
    TheMap,
    ToolBar,
    billboardClick
  },
  data() {
    return {
      selectType: '',
      cesiumInstance: null
    }
  },
  methods: {
    selectFunc(type) {
      if (this.selectType === type) {
        this.selectType = ''
      } else {
        this.selectType = type
      }
    },
  },
  mounted() {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: fixed;
}
html, body {
  padding: 0;
  margin: 0;
}
.cesium-viewer-bottom {
  display: none;
}
</style>
