<template>
  <div  >
    <common-map></common-map>
  </div>
  
</template>

<script>
import CommonMap from "@/components/echarts/CommonMap.vue"
import HuaXiang from "@/components/echarts/HuaXiang.vue";
import GdMap from "@/components/GaodeMap.vue";
export default {
  components: {CommonMap,HuaXiang,GdMap},
    name:'home',
    data(){
        return{}
    }
}
</script>

<style lang="less" scoped>

>
.ap{
  position:relative;
  padding:4%
}
.box{
    padding:10px;
    background-color:antiquewhite;
    height:20px;
}
</style>