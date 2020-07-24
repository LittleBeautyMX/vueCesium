const path = require("path")
const webpack = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    amd: {
      // cesium 2
      toUrlUndefined: true
    },
    module: {
      // cesium 3 不加这个配置会报 require 引入警告
      unknownContextCritical: false
    },
    // cesium 4
    plugins: [new CopyWebpackPlugin([{
      from: 'node_modules/cesium/Build/Cesium/Workers',
      to: 'cesium/Workers'
    }]), new CopyWebpackPlugin([{
      from: 'node_modules/cesium/Build/Cesium/ThirdParty',
      to: 'cesium/ThirdParty'
    }]), new CopyWebpackPlugin([{
      from: 'node_modules/cesium/Build/Cesium/Assets',
      to: 'cesium/Assets'
    }]), new CopyWebpackPlugin([{
      from: 'node_modules/cesium/Build/Cesium/Widgets',
      to: 'cesium/Widgets'
    }]), new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify('./cesium'),
      SMART3D_BASE_URL: JSON.stringify('smart3d/')
    })]
  }
}