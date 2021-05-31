<!--
 * @Descripttion: 点聚合组件
 * @Author: meixinqiu
 * @Date: 2021-05-31 10:13:41
 * @LastEditTime: 2021-05-31 14:51:16
-->
<template>
    <div></div>
</template>

<script>
import * as Cesium from "cesium";
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.initData();
    },
    destroyed() {
        this.removeListenerFunc();
    },
    methods: {
        initData() {
            const viewer = this.viewer = window.viewer;
            const options = {
                camera: viewer.scene.camera,
                canvas: viewer.scene.canvas,
            };
            // 加载许多点
            const dataSourcePromise = viewer.dataSources.add(
                Cesium.KmlDataSource.load(
                    "data/kml/facilities/facilities.kml",
                    options
                )
            );
            dataSourcePromise.then((dataSource) => {
                const pixelRange = 48;
                const minimumClusterSize = 3;
                const enabled = true;

                dataSource.clustering.enabled = enabled;
                dataSource.clustering.pixelRange = pixelRange;
                dataSource.clustering.minimumClusterSize = minimumClusterSize;

                this.dataSource = dataSource;

                this.customStyle();

            });
        },
        removeListenerFunc() {
            if (Cesium.defined(this.removeListener)) {
                this.dataSource.clustering.enabled = false;
                this.viewer.dataSources.remove(this.dataSource);
                this.dataSource = undefined;
                this.removeListener();
                this.removeListener = undefined;
            }
        },
        customStyle() {
            if (Cesium.defined(this.removeListener)) {
                this.removeListenerFunc();
                this.removeListener = undefined;
            } else {
                this.pinImg = this.createLightCircle();
                this.removeListener = this.dataSource.clustering.clusterEvent.addEventListener(
                    (clusteredEntities, cluster) => {
                        cluster.billboard.show = true;
                        cluster.billboard.id = cluster.label.id;
                        cluster.billboard.image = this.pinImg;
                        cluster.billboard.horizontalOrigin = Cesium.VerticalOrigin.CENTER;
                        cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.CENTER;

                        cluster.label.horizontalOrigin = Cesium.VerticalOrigin.CENTER;
                        cluster.label.verticalOrigin = Cesium.VerticalOrigin.CENTER;
                        cluster.label.font = 'bold 16px sans-serif';
                        cluster.label.eyeOffset = new Cesium.Cartesian3(0, 0, -100); // 为了label不被遮挡


                        if (clusteredEntities.length >= 50) {
                            cluster.billboard.color = Cesium.Color.RED;
                        } else if (clusteredEntities.length >= 40) {
                            cluster.billboard.color = Cesium.Color.ORANGE;
                        } else if (clusteredEntities.length >= 30) {
                            cluster.billboard.color = Cesium.Color.YELLOW;
                        } else if (clusteredEntities.length >= 20) {
                            cluster.billboard.color = Cesium.Color.BLUE;
                        } else if (clusteredEntities.length >= 10) {
                            cluster.billboard.color = Cesium.Color.GREEN;
                        } else {
                            cluster.billboard.color = Cesium.Color.DARKGRAY;
                        }
                    }
                );
            }
            // force a re-cluster with the new styling
            // const pixelRange = this.dataSource.clustering.pixelRange;
            // this.dataSource.clustering.pixelRange = 0;
            // this.dataSource.clustering.pixelRange = pixelRange;
        },
        createLightCircle() {
            let canvas = document.createElement("canvas");
            canvas.width = 48;
            canvas.height = 48;
            let context = canvas.getContext("2d");
            context.beginPath(); 
            context.fillStyle = '#FFFFFF'
            context.arc(24, 24, 18, 0, Math.PI * 2, false); 
            context.closePath(); 
            context.shadowColor = "#cccccc"; 
            context.shadowOffsetX = 0; 
            context.shadowOffsetY = 0; 
            context.shadowBlur = 10;
            context.fill();
            return canvas.toDataURL();
        }
    }
}
</script>
