<template>
  <header>
      <div class = "l-content">
          <el-button v-if="(!isCollapse) && (!isHidden)" plain icon="el-icon-arrow-right" size="mini" @click="changeCollapse" ></el-button>
          <el-button v-if="(isCollapse) && (!isHidden)" plain icon="el-icon-arrow-left" size="mini" @click="changeCollapse" ></el-button>
          <h3 style="color:#fff">
            <i class="el-icon-user"></i>
            {{username}}</h3>
          <el-input v-model="input" style="margin-left:100px;width:200px"  placeholder="TEXT"></el-input>
          <el-select v-model="value" placeholder="省"
          style="width:100px;margin-left:100px"
          @change="bindchangework">
            <el-option
              v-for="item in works"
              :key="item.label"
              :label="item.label"
              :value="item.label">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="市"
          style="width:100px;margin-left:20px"
          @change="bindchangework">
            <el-option
              v-for="item in works"
              :key="item.label"
              :label="item.label"
              :value="item.label">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="县"
          style="width:100px;margin-left:20px"
          @change="bindchangework">
            <el-option
              v-for="item in works"
              :key="item.label"
              :label="item.label"
              :value="item.label">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="派出所"
          style="width:150px;margin-left:20px"
          @change="bindchangework">
            <el-option
              v-for="item in works"
              :key="item.label"
              :label="item.label"
              :value="item.label">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>


      </div>
      <el-dialog
        title="警告"
        :visible.sync="isSuggsetionVisable"
        width="30%"
        >
        <span>您确定要退出登录吗</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delogin">确 定</el-button>
        </span>
      </el-dialog>
      <div class = "r-content">
          <el-dropdown @command="LoginCommand" trigger="click" size="mini">
            <span>
              <img class="user" :src="icon">
            </span>
             <el-dropdown-menu split-button @click="LoginCommand" slot="dropdown">
               <el-dropdown-item command='delogin' style="height:30px; width:100px;font-size:20px;text-align: center;"> 退出登录 </el-dropdown-item>
               <el-dropdown-item command='resetpass' style="height:30px; width:100px;font-size:20px">修改密码</el-dropdown-item>
      
             </el-dropdown-menu>
          </el-dropdown>
         
      </div>
  </header>
</template>

<script>
export default {
  name:'CommonHeader',
  data(){
    return {
      input:"",
      icon:require('@/assets/images/ICON.png'),
      userImage:require('../assets/logo.png'),
      isCollapse:false,
      isSuggsetionVisable:false,
      username: JSON.parse(this.$store.getters.user),
      isHidden: false,
      works: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value: ''
      
    }
  },
 
  created(){
      var uid = sessionStorage.getItem('uid','')
    
    },
  methods:{
    bindchangework(){
      //触发bus事件
      this.$bus.$emit('changework',this.value)
    },
    changeCollapse(){
      this.isCollapse= !this.isCollapse;
      this.$bus.$emit('changeCollapse',true);
    },
    delogin(){
      sessionStorage.setItem("token","");
      sessionStorage.setItem("user",null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name:'login'
      })

    },
    LoginCommand(command){ 
      if(command=='delogin'){
        this.isSuggsetionVisable=true;
      }else{
         this.$router.push({
        name:'changepass'
      })
      }
      
    }
  }
}
</script>

<style lang='less' scoped>
.l-content{
  display:flex;
  align-items: center;
  .el-button{
    margin-right:20px;
  }
 
}
.r-content{
  .user{
    width:40px;
    height:40px;
    border-radius: 50%
  }
}
header{
  display:flex;
  height:100%;
  justify-content:space-between;
  align-items: center;
}

</style>