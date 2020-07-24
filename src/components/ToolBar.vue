<template>
  <div class="toolbarContainer">
    <div class="smartBtn">
      <div
        v-for="(item, index) in toolBarArr"
        :key="index"
        :class="['map-toolbar', {'is-active': currentComponentName === item.name }]"
      >
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.name"
          placement="right"
        >
          <div
            class="widget-button"
            @click="createComponent(item)"
          >
            <i :class="['fontsmart', { [item.icon]: item.icon }]"></i>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentComponentName: '',
      toolBarArr: [
        {
          name: 'billboardClick',
          component: 'billboardClick',
          icon: 'fs-tucengkongzhi'
        }, {
          name: '属性识别',
          component: 'ElectricFenceComponent',
          icon: 'fs-shuxingchaxun'
        }, {
          name: '坐标拾取',
          component: 'PickpositionComponent',
          icon: 'fs-zuobiao'
        }, {
          name: '室内行走模式',
          component: 'ElectricFenceComponent',
          icon: 'fs-shineihangzoumoshi'
        }, {
          name: '三维轨迹',
          component: 'TrajectoryComponent',
          icon: 'fs-sanweiguiji'
        }, {
          name: '监控设备点增删',
          component: 'ElectricFenceComponent',
          icon: 'fs-weizhibianji'
        }, {
          name: '区域管理',
          component: 'RegionManagerComponent',
          icon: 'fs-shuxingbianji'
        },
      ]
    }
  },
  methods: {
    createComponent(type) {
      // 当点击组件为当前组件时，关闭该组件
      this.$emit('selectFunc', type.component)
      if (this.currentComponentName === type.name) {
        this.currentComponentName = ''
        return
      }
      this.currentComponentName = type.name
    }
  }
}
</script>

<style lang="scss" scoped>
.smartBtn {
  position: absolute;
  z-index: 8;
  left: 30px;
  top: 8%;
  max-height: 90%;
  width: 48px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 2px 2px 10px rgba($color: #666, $alpha: 0.75);
  overflow-y: auto;

  .map-toolbar {
    .widget-button {
      text-align: center;
      height: 48px;
      line-height: 48px;
      cursor: pointer;
      &:hover {
        background-color: #eaecfa;
      }
    }
    &.is-active {
      .widget-button {
        background-color: #e5e8fd;
        color: #fff;
      }
    }

    i.fontsmart {
      font-size: 24px;
      line-height: 48px;
      &.fs-zuobiao {
        color: rgb(239, 214, 123);
      }
      &.fs-tucengkongzhi {
        color: rgb(255, 130, 130);
      }
      &.fs-shineihangzoumoshi {
        color: rgb(119, 211, 232);
      }
      &.fs-weizhibianji {
        color: rgb(252, 187, 101);
      }
      &.fs-shuxingbianji {
        color: rgb(90, 154, 249);
      }
      &.fs-shuxingchaxun {
        color: rgb(90, 154, 249);
      }
      &.fs-sanweiguiji {
        color: rgb(83, 207, 125);
      }
    }
  }
}

.toolbarContainer {
  max-height: 90%;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 2px 2px 10px rgba(102, 102, 102, 0.75);
  overflow-y: auto;
}
</style>