<template>
  <el-row>
    <el-col :span=12>
      <div id="container" style="height: 400px;">
      </div>
    </el-col>
    <el-col :span="6">
      <span style="font-size: 15px; text-align: center; padding: 3px; padding-left: 100px;">候选列表</span>
      <el-button @click="removeAllOverlay">
        CLEAR
      </el-button>
      <el-table :data="meta_info" height="360" border style="width: 100%" @cell-dblclick="bindClickList">
        <el-table-column prop="id" label="id">
        </el-table-column>
        <el-table-column prop="name" label="Name">
        </el-table-column>
      </el-table>
      <!-- <el-button @click="bindLock">
        LOCK
      </el-button> -->
    </el-col>
    <el-col :span="6">
      <span style="font-size: 15px; text-align: center; padding: 3px;padding-left: 100px;">框选列表</span>
      <el-dropdown @command="bindLock">
        <el-button>
          LOCK<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="">全部</el-dropdown-item>
          <el-dropdown-item command="poi_info">仅POI</el-dropdown-item>
          <el-dropdown-item command="h3_info">仅H3</el-dropdown-item>
          <el-dropdown-item command="road_info">仅ROAD</el-dropdown-item>
          <el-dropdown-item command="trans_info">仅bus-line/station</el-dropdown-item>
          <el-dropdown-item command="subway_line">仅subway-line/station</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-table :data="encircled_geo_list" height="360" border>
        <el-table-column prop="id" label="id">
        </el-table-column>
        <el-table-column prop="name" label="Name">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import fs from 'fs'
import axios from 'axios'
import AMapLoader from "@amap/amap-jsapi-loader";
import queryGeoItem from "@/api/queryGeoItem"
window._AMapSecurityConfig = {
  securityJsCode: '70b6c54145810f891ae73e88cdd0791a'
}
export default {
  name: "map-view",
  data() {
    return {
      AMap: null,
      map: null,
      geodata: null,
      meta_info: null,//所有候选核心点地理信息 在search后获取
      focus_meta_info: null,//选定的候选核心点地理信息
      encircled_polygon: null,//选框的polygon信息 每次锁定后改变encircled_geo_list内容 
      encircled_geo_list: [],//选框中的地理信息列表

      tempItem: null, //临时的一个元素,用于聚焦
      addedFeatures: [], // 用于存储添加到地图上的元素

      polygon: null,
      editor: null,
      mouseTool: null,
    }
  },

  created() {
    this.$bus.$on('searchGeoItem', data => {
    })
    this.geoJsonGetter();
    this.meta_info = this.geodata.meta_info;
  },

  mounted() {
    this.initAMap();
  },

  unmounted() {
    this.map.destroy();
  },

  methods: {
    initPlugin(AMap, map) {
      AMapUI.loadUI(["control/BasicControl"], function (BasicControl) {
        //缩放控件，显示 Zoom 值
        map.addControl(
          new BasicControl.Zoom({
            position: "lb", //left bottom, 左下角
            showZoomNum: true, //显示zoom值
          })
        );
        //图层切换控件
        map.addControl(
          new BasicControl.LayerSwitcher({
            position: "lt", //right top，右上角
            theme: "my-red", //主题样式 my-red 为 css 的 class 名
          })
        );
      });
      map.addControl(new AMap.Scale())
      this.map.plugin(['AMap.MouseTool'], () => {
        this.mouseTool = new AMap.MouseTool(this.map);
        this.mouseTool.polygon(); // 启动绘制多边形
        AMap.Event.addListener(this.mouseTool, 'draw', (e) => {
          // 如果已经存在一个多边形，先移除
          if (this.polygon) {
            this.map.remove(this.polygon);
            if (this.editor) {
              this.editor.close();
            }
          }
          this.polygon = e.obj;
          console.log(e.obj)
          //函数脱离vue生命周期，保存一下this指向：
          var that = this;
          map.plugin(["AMap.PolygonEditor"], function () {
            //实例化多边形编辑器，传入地图实例和要进行编辑的多边形实例
            that.editor = new AMap.PolygonEditor(that.map, that.polygon);
            //开启编辑模式
            that.editor.open();
            that.editor.on("add", function (data) {
            console.log(data);
            var polygon = data.target;
            that.editor.addAdsorbPolygons([that.polygon,polygon]);
            polygon.on("dblclick", () => {
              that.editor.setTarget(polygon);
              that.editor.open();
            });
          });
          });
        });
      });
    },

    initAMap() {
      AMapLoader.load({
        key: "11f2bc48fc39f5ba73133b7c1b87d400", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        AMapUI: {
          version: "1.1", // AMapUI 版本
        },
        plugins: ["AMap.Scale",
          "AMap.MouseTool",
          "AMap.PolygonEditor",
          'AMap.GeoJSON',
          "AMap.OverlayGroup"
        ], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
      })
        .then((AMap) => {
          this.AMap = AMap;
          this.map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 11, // 初始化地图级别
            center: [116.397428, 39.90923], // 初始化地图中心点位置
          });
          this.initPlugin(AMap, this.map)

        })
        .catch((e) => {
          console.log(e);
        });
    },

    bindSearchChange() {
      //对服务器进行request，请求待选兴趣点列表
    },

    bindClickList(row, column, cell, event) {
      //focus选中的兴趣点，地图显示核心地理信息，同时vuebus通知右侧显示核心点信息，地图上出现一个可操控polygon，与等视域一致
      var geoJsonData = `{
          "type":"FeatureCollection",
        "features":[{"type":"Feature",
        "geometry":
        {"type":"Polygon","coordinates":[[[116.403322, 39.920255],[116.410703, 39.897555],[116.402292, 39.892353],[116.389846, 39.891365]]]},"properties":{"name":"多边形"}}]}`;;

      let geoJsonObject = JSON.parse(geoJsonData);
      geoJsonObject.features[0].geometry = JSON.parse(row.geometry)
      //返回一个item对象
      if (this.addedFeatures.indexOf(row.id) == -1) {
        this.addedFeatures.push(row.id)
        this.geoJsonToObject(geoJsonObject);
      }
      console.log(row)
      this.map.setFitView()
    },

    bindLock(index) {
      //锁定polygon，list中显示框选到的poi列表
           
      // if(index == "poi_info"){
      //   //点的类型是marker,不需要遍历
        
      // }
     
      if(this.editor){
      if(index == "" || index == "poi_info"){
        this.editor.close();
        for(var i=0; i<this.geodata["poi_info"].length; i++) {
          var isPointInRing = AMap.GeometryUtil.isPointInPolygon(JSON.parse(this.geodata["poi_info"][i].geometry).coordinates
          ,this.polygon.getPath());
          console.log(isPointInRing)
          if(isPointInRing){
                  var geoJsonData = `{
                "type":"FeatureCollection",
              "features":[{"type":"Feature",
              "geometry":
              {"type":"Polygon","coordinates":[[[116.403322, 39.920255],[116.410703, 39.897555],[116.402292, 39.892353],[116.389846, 39.891365]]]},"properties":{"name":"多边形"}}]}`;;

            let geoJsonObject = JSON.parse(geoJsonData);
            geoJsonObject.features[0].geometry = JSON.parse(this.geodata["poi_info"][i].geometry)

            // this.geoJsonToObject(geoJsonObject)//显示
            if (this.addedFeatures.indexOf(this.geodata["poi_info"][i].id) == -1) {
              this.addedFeatures.push(this.geodata["poi_info"][i].id)
              this.geoJsonToObject(geoJsonObject);
              this.encircled_geo_list.push(this.geodata["poi_info"][i])
            }
          }
        } 
      }
      if(index == "" || index == "road_info"){
        //ROAD
        for(var i =0;i < this.geodata['road_info'].length;i++) {
          var isRoadInRing = true;
          for(var j=0;j< JSON.parse(this.geodata["road_info"][i].geometry).coordinates.length;j++){
            // console.log(JSON.parse(this.geodata["road_info"][i].geometry).coordinates[j])
            isRoadInRing = AMap.GeometryUtil.isPointInPolygon(JSON.parse(this.geodata["road_info"][i].geometry).coordinates[j],this.polygon.getPath())
            if(isRoadInRing == false){
              break;
            }
          }
          console.log(isRoadInRing)
          if(isRoadInRing){
                  var geoJsonData = `{
                "type":"FeatureCollection",
              "features":[{"type":"Feature",
              "geometry":
              {"type":"Polygon","coordinates":[[[116.403322, 39.920255],[116.410703, 39.897555],[116.402292, 39.892353],[116.389846, 39.891365]]]},"properties":{"name":"多边形"}}]}`;;

            let geoJsonObject = JSON.parse(geoJsonData);
            geoJsonObject.features[0].geometry = JSON.parse(this.geodata["road_info"][i].geometry)

            // this.geoJsonToObject(geoJsonObject)//显示
            if (this.addedFeatures.indexOf(this.geodata["road_info"][i].id) == -1) {
              this.addedFeatures.push(this.geodata["road_info"][i].id)
              this.geoJsonToObject(geoJsonObject);
              this.encircled_geo_list.push(this.geodata["road_info"][i])
            }
          }
        }
      }
      if(index == "" || index == "trans_info"){
        //ROAD
        for(var i =0;i < this.geodata['trans_info'].length;i++) {
          var isRoadInRing = true;
          for(var j=0;j< JSON.parse(this.geodata["trans_info"][i].geometry).coordinates.length;j++){
            // console.log(JSON.parse(this.geodata["road_info"][i].geometry).coordinates[j])
            isRoadInRing = AMap.GeometryUtil.isPointInPolygon(JSON.parse(this.geodata["trans_info"][i].geometry).coordinates[j],this.polygon.getPath())
            if(isRoadInRing == false){
              break;
            }
          }
          console.log(isRoadInRing)
          if(isRoadInRing){
                  var geoJsonData = `{
                "type":"FeatureCollection",
              "features":[{"type":"Feature",
              "geometry":
              {"type":"Polygon","coordinates":[[[116.403322, 39.920255],[116.410703, 39.897555],[116.402292, 39.892353],[116.389846, 39.891365]]]},"properties":{"name":"多边形"}}]}`;;

            let geoJsonObject = JSON.parse(geoJsonData);
            geoJsonObject.features[0].geometry = JSON.parse(this.geodata["trans_info"][i].geometry)

            // this.geoJsonToObject(geoJsonObject)//显示
            if (this.addedFeatures.indexOf(this.geodata["trans_info"][i].id) == -1) {
              this.addedFeatures.push(this.geodata["trans_info"][i].id)
              this.geoJsonToObject(geoJsonObject);
              this.encircled_geo_list.push(this.geodata["trans_info"][i])
            }
          }
        }
      }
      if(index == "" || index == "h3_info"){
        //ROAD
        for(var i =0;i < this.geodata['h3_info'].length;i++) {
          var isRoadInRing = true;
          for(var j=0;j< JSON.parse(this.geodata["h3_info"][i].geometry).coordinates.length;j++){
            for (var k=0;k<JSON.parse(this.geodata["h3_info"][i].geometry).coordinates[j].length;k++){
               // console.log(JSON.parse(this.geodata["road_info"][i].geometry).coordinates[j])
              isRoadInRing = AMap.GeometryUtil.isPointInPolygon(JSON.parse(this.geodata["h3_info"][i].geometry).coordinates[j][k],this.polygon.getPath())
              if(isRoadInRing == false){
              break;
            }
            }
          }
          console.log(isRoadInRing)
          if(isRoadInRing){
                  var geoJsonData = `{
                "type":"FeatureCollection",
              "features":[{"type":"Feature",
              "geometry":
              {"type":"Polygon","coordinates":[[[116.403322, 39.920255],[116.410703, 39.897555],[116.402292, 39.892353],[116.389846, 39.891365]]]},"properties":{"name":"多边形"}}]}`;;

            let geoJsonObject = JSON.parse(geoJsonData);
            geoJsonObject.features[0].geometry = JSON.parse(this.geodata["h3_info"][i].geometry)

            // this.geoJsonToObject(geoJsonObject)//显示
            if (this.addedFeatures.indexOf(this.geodata["h3_info"][i].id) == -1) {
              this.addedFeatures.push(this.geodata["h3_info"][i].id)
              this.geoJsonToObject(geoJsonObject);
              this.encircled_geo_list.push(this.geodata["h3_info"][i])
            }
          }
        }
      }

    }
    },

    geoJsonGetter() {
      //从服务器或本地获取geojson数据
      // axios.get('/egohood_res.json').then(res=>{
      //   this.geodata = res.data;
      // })
      //测试阶段，从src文件夹直接获取json文件
      const json = require('../egohood_res.json')
      this.geodata = json
    },

    geoJsonToObject(geoJsonObject) {
      // 使用AMap.GeoJSON插件将geojson对象绘制到地图上
      AMap.plugin(['AMap.GeoJSON'], () => {
        const geojson = new AMap.GeoJSON({
          geoJSON: geoJsonObject,
          // 在这里可以定义样式
          getPolygon: (geojson, lnglats) => {
            // 检查lnglats是否存在且为数组
            if (Array.isArray(lnglats)) {
              return new AMap.Polygon({
                path: lnglats,
              });
            }
            return null;
          },
          getPolyline: (geojson, lnglats) => {
            // 检查lnglats是否存在且为数组
            if (Array.isArray(lnglats)) {
              return new AMap.Polyline({
                path: lnglats,
              });
            }
            return null;
          },
          getMarker: (geojson, lnglat) => {
            // 检查lnglat是否存在且为数组
            if (Array.isArray(lnglat)) {
              return new AMap.Marker({
                position: lnglat
              });
            }
            return null;
          }
        });
        // this.toggleGeoJSON(geojson)
        this.map.add(geojson)
      });
    },

    removeAllOverlay() {
      this.map.clearMap();
      this.addedFeatures = [];
      this.editor.close();
    },

    focus_marker(lng, lat, title = "选中点") {
      //公共方法，传入经纬度，使地图在此位置标注一个mark并且focus到此位置
      let marker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat),
        title: title
      })
      if (this.tempItem != null) {
        this.map.remove(this.tempItem)
      }
      this.tempItem = marker
      this.map.add(this.tempItem)
      this.map.setCenter([lng, lat]); //设置地图中心点 
    },

    focus_polygon(path) {
      if (this.tempItem != null) {

        this.map.remove(this.tempItem)
      }
      //公共方法，在地图上绘制polygon并锁定
      var polygon = new AMap.Polygon({
        path: path, //路径
        fillColor: "#fff", //多边形填充颜色
        strokeWeight: 2, //线条宽度，默认为 2
        strokeColor: "red", //线条颜色
      });
      this.tempItem = polygon;
      this.map.add(this.tempItem)
      //多边形 Polygon对象添加到 Map
      //将覆盖物调整到合适视野
      this.map.setFitView([polygon])
    },

    display_meta() {
      this.map.setFitView([polygon])
    }
  },
};
</script>
<style scoped>
#container {
  width: 100%;
  height: 800px;
}
</style>
