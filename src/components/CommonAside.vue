<template>
  <el-menu default-active="1-4-1" background-color="#545c64" text-color="#fff" active-text-color="#1c91eb" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :hidden="isHidden"
  style="text-align:center">
    <!-- <img :src="yuanhui" v-if="this.isCollapse==false" style="padding:20px;height:150px;width:150px"> -->
    <h3 v-if="this.isCollapse==false" class="title">犯罪地理打标平台</h3>

    <!-- <i class="el-icon-s-fold"></i> -->
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
  <el-submenu v-for="item in hasChildren" :index="item.path+''" :key="item.path">
    <template slot="title">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </template>
  </el-submenu>

  </el-menu>
</template>

<script>
  export default {
    name:'CommonAside',
    data() {
      return {
        isCollapse: true,
        role:null,
        isHidden:false,
        username:"",
        yuanhui:require('../assets/images/院徽.png'),
         menu:[
                  {
                      path:'/',
                      name:'home',
                      label:'历史任务',
                      icon:'search',
                      url:'Home/home'
                  },
                   {
                      path:'/insert',
                      name:'insert',
                      label:'新建任务',
                      icon:'edit',
                      url:'Insert/insert'
                  }
                
              ]
      }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
       
          this.$router.push({
          name:item.name
        })
        
        
      }
    },
    computed:{
        noChildren(){
          return this.menu.filter(item=>!item.children)
          
        },
        hasChildren(){
          return this.menu.filter(item=>item.children)
        },
        // isCollapse(){
        //   return this.$store.state.tab.isCollapse;
        // }
    },
    created() {
      this.$bus.$on('changeCollapse',data => {
        if(data){
          this.isCollapse = !this.isCollapse;
        }
      })
      let userdata = this.$store.getters.user
      if(JSON.parse(userdata).roleName == 'student'){
        this.isHidden=true;
      }else{
        this.isHidden=false;
      }
    },
    destroyed() {
      this.$bus.$off('collapse');
    }
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 600px;
  }
  .el-menu{
    height:100%;
    border:none;
    h3{
      color:#fff;
      text-align:center;
      line-height:48px;
    }
  }
</style>