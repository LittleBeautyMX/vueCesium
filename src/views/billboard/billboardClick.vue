<template>
  <div class="billboard-wrapper">
    <div class="billboard-button">
      <el-button round @click="startBillboard()">开始</el-button>
      <el-button round @click="cleanBillboard()">清除</el-button>
    </div>
  </div>
</template>

<script>
import * as Cesium from "cesium";
import position from "../../assets/position.png";
export default {
  mounted() {
    this.viewer = window.viewer;
    let positionentity = this.addEntities(this.viewer);
    window.entity = positionentity;
    positionentity.position = Cesium.Cartesian3.fromDegrees(
      102.60636396735026,
      37.92393989982238,
      5.72637960426624
    );
    this.viewer.flyTo(positionentity, {
      offset: new Cesium.HeadingPitchRange(0, -90, 100),
    });
  },
  methods: {
    addEntities(viewer) {
      const entity = viewer.entities.add({
        id: "pickposition",
        name: "pickposition",
        billboard: {
          image: position,
          show: true,
          height: 48,
          width: 48,
          verticalOrigin: Cesium.VerticalOrigin.BASELINE,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        },
      });
      return entity;
    },

    startBillboard() {
      const _this = this;
      var setPosition = function () {
        if (_this.domData && _this.domData.length > 0) {
          for (let index = 0; index < _this.domData.length; index++) {
            const item = _this.domData[index];
            if (!item) continue;
            const popDom = item.dom;
            const pos = _this.viewer.scene.cartesianToCanvasCoordinates(
              item.position
            );
            if (pos) {
              const y = pos.y - 140;
              popDom.style.top = y + "px";
              popDom.style.left = pos.x + "px";
            }
          }
        }
      };
      this.viewer.scene.preRender.addEventListener(setPosition); // 添加监听
      this.domData = []; // 用于显示后续的数据及坐标集合

      this.handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.handler.setInputAction((movement) => {
        const pick = this.viewer.scene.pick(movement.position);
        if (pick && pick.id && pick.id._id === "pickposition") {
          const position = pick.id._position._value;
          const data = [{ name: "名字：", value: "属性" }]; // 这里我乱写的，根据你的需要更改
          this.addDom(position, data);
        }
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },

    // position 坐标   data  展示的数据
    addDom(position, data) {
      if (data && position) {
        let html = '<ul class="props-ul">';
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          html += "<li>";
          html += '<span class="props-key">' + element.name + "</span>";
          html += '<span class="props-value">' + element.value + "</span>";
          html += "</li>";
        }
        html += "</ul>";
        const dom = document.createElement("div");
        const container = document.getElementById("app");
        container.appendChild(dom);
        dom.innerHTML = html;
        dom.style.position = "absolute";
        dom.style.backgroundColor = "white";
        dom.className = "positioninfowidow";
        // 笛卡尔坐标转屏幕坐标
        const pos = this.viewer.scene.cartesianToCanvasCoordinates(position);
        if (pos) {
          const y = pos.y - 140;
          dom.style.top = y + "px";
          dom.style.left = pos.x + "px";
        }
        this.domData.push({ dom, position });
      }
    },

    cleanBillboard() {
      this.domData = [];
      // 这个移除监听的有点问题嘻嘻嘻
      this.viewer.scene.preRender.removeEventListener(this.setPosition);
    },
  },
};
</script>

<style lang="scss" scoped>
.billboard-wrapper {
  position: absolute;
  z-index: 690;
  left: 100px;
  top: 8%;
  width: 200px;
  // height: 200px;
  max-height: 70%;
  overflow-y: auto;
  color: #666;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 2px 2px 6px rgba(102, 102, 102, 0.41);
  transition: left 0.2s ease-in-out;
  font-size: 14px;

  .billboard-button {
    margin: 10px;
  }
}

// 不知道为什么这里的样式没有起效果,我估计动态的弹框的样式应该要写在全局里，美欣你试试吧~加油加油
.positioninfowidow {
  position: absolute;
  color: #666;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 2px 2px 6px rgba(102, 102, 102, 0.41);
}
</style>