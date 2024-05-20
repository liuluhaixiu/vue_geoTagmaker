<template>
 <div id="app">
      <el-form class='bigbox child' @submit.prevent="login" ref="form" :model="form" label-width="100px">
        <span class='title'>订单数据分析平台</span>     
        <el-form-item label='用户名'>
           
                 <el-input v-model="form.username" autofocus placeholder="请输入用户名"></el-input>
            
        </el-form-item>
        <el-form-item label='密码'>
            <el-tooltip class="item" effect="dark" content="请在第一次登录后从页面右上角更改密码" placement="right">
                <el-input v-model="form.password"  autofocus placeholder="请输入密码"  passworld:true></el-input>
            </el-tooltip>
        </el-form-item>
        <el-row>
            <el-button type="primary" round style="width:100px;height:50px;font-size:20px;" 
            @click="login">登录</el-button>
            <!-- <el-input type="submit" value="登陆" style="width:100px;height:50px;font-size:20px;"/> -->
            <el-button type="primary" round style="width:100px;height:50px;font-size:20px;"
            @click="toregist">注册</el-button>
        </el-row>
      </el-form>
 </div>
</template>
<script>
import login_API from '@/api/login';
import axios from 'axios'
export default {
    name:'Login',
    data(){
        return {
            form:{
                username:'',
                password:''
            }
        }
    },
    created() {
        this.$nextTick(() => {
        let element = document.getElementById('app');
        let config = {
            color: '10,10,100',
            count: 150,
            zIndex: 1,
            opacity:'1'
        }
        this.Canvas = new CanvasNest(element, config);
    });
    },
    beforeDestroy() {
        this.Canvas.destroy();
    },
    methods:{   
        toregist(){
            this.$router.push({
                name:'regist'
            })
        }
        ,
        login(){
            let data={
                "username":this.form.username,
                "password":this.form.password
            }
            this.$router.push({
                 name:'search'
             })
        //     login_API(data).then(res=>{
        //         console.log(res.data)
        //     if(res.data.status==0){
        //      //将用户名放入sessionStorage中
        //      sessionStorage.setItem("userToken", res.data.token);
        //      sessionStorage.setItem("username",JSON.stringify(data.username));
        //      sessionStorage.setItem("uid",res.data.uid)
        //       //将用户名放入vuex中d
        //     this.$store.dispatch("setUser", JSON.stringify(data.username));
        //     this.$store.dispatch("setToken", res.data.token);
        //     //打印login状态
        //     this.$router.push({
        //          name:'search'
        //      })
        //     // if(res.data.data.user.roleName=='student'){
        //     //     this.$router.push({
        //     //      name:'search'
        //     //  })
        //     // }else{
               
        //     // }
        //     }else{
        //         console.log("LOGIN FAILED")
        //         console.log(res.data)
        //         alert(res.data.message);
        //     }
            
        //   }).catch(error=>{
        //       let stat = error.response.status;
        //       if(stat==504){
        //           alert('无法连接服务器');
        //       }
        //   });
        }
    }
}
import CanvasNest from 'canvas-nest.js'

</script>
<style lang="less" scoped>
.app{
    background-color:black;
    
}
.child{
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.bigbox{
    width:40%;
    text-align: center;
    line-height:100px;
    background-color:#fff;
    border-radius: 30px;
    padding:30px;
}
.title{
    font-size:30px;
    color:#556;
}
</style>