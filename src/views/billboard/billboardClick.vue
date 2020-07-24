<template>
  <div class="billboard-wrapper">

  </div>
</template>

<script>
import * as Cesium from 'cesium'
import position from '../../assets/position.png'
export default {
  mounted() {
    let viewer = window.viewer
    let positionentity = this.addEntities(viewer)
    window.entity = positionentity
    positionentity.position = Cesium.Cartesian3.fromDegrees(102.60636396735026, 37.92393989982238, 5.72637960426624)
      viewer.flyTo(positionentity, {
        offset: new Cesium.HeadingPitchRange(0, -90, 100)
      })
  },
  methods: {
    addEntities(viewer) {
      const entity = viewer.entities.add({
        id: 'pickposition',
        name: 'pickposition',
        billboard: {
          image: position,
          show: true,
          height: 48,
          width: 48,
          verticalOrigin: Cesium.VerticalOrigin.BASELINE,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER
        }
      })
      return entity
    },
  }
}
</script>

<style lang="scss" scoped>
.billboard-wrapper {
  position: absolute;
  z-index: 690;
  left: 100px;
  top: 8%;
  width: 200px;
  height: 200px;
  max-height: 70%;
  overflow-y: auto;
  color: #666;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 2px 2px 6px rgba(102, 102, 102, 0.41);
  transition: left 0.2s ease-in-out;
  font-size: 14px;
}
</style>