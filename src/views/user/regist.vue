<template>
 <div id="app">
      <el-form class='bigbox child' @submit.prevent="regist" ref="form" :model="form" label-width="100px">
        <span class='title'>用户注册</span>     
        <el-form-item label='用户名'>
            <el-tooltip class="item" effect="dark" content="可以使用学号、邮箱等好记的用户名！~" placement="right">
                 <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-tooltip>
        </el-form-item>
        <el-form-item label='密码'>
            <el-tooltip class="item" effect="dark" content="推荐使用复杂密码以保护帐号安全性" placement="right">
                <el-input v-model="form.password" placeholder="请输入密码" ></el-input>
            </el-tooltip>
        </el-form-item>
        <el-form-item label='重复密码'>
            <el-tooltip class="item" effect="dark" content="请重复输入密码" placement="right">
                <el-input v-model="form.repassword" placeholder="请输入密码" ></el-input>
            </el-tooltip>
        </el-form-item>
        <el-form-item label='电话'>
            <el-tooltip class="item" effect="dark" content="请输入合法的中国大陆十一位手机号" placement="right">
                 <el-input v-model="form.nickname" placeholder="请输入电话号码"></el-input>
            </el-tooltip>
        </el-form-item>
        <el-form-item label='邮箱'>
            <el-tooltip class="item" effect="dark" content="请输入邮箱" placement="right">
                 <el-input v-model="form.umail" placeholder="请输入您的邮箱"></el-input>
            </el-tooltip>
        </el-form-item>
        <el-row>
            <el-button type="primary" round style="width:130px;height:50px;font-size:20px;" 
            @click="regist">确认注册</el-button>
            
        </el-row>
      </el-form>
 </div>
</template>
<script>
import regist_API from '@/api/regist';
export default {
    name:'regist',
    data(){
        return {
            form:{
                username:'admin',
                password:'12345678',
                repassword:'12345678',
                nickname:'管理员',
                umail:''
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
        regist(){
            let data={
                "username":this.form.username,
                "password":this.form.password,
                "uphone":this.form.nickname,
                "umail":this.form.umail
            }
            regist_API(data).then(res=>{
            JSON.stringify(res.data);
            if(res.data.message=="注册成功"){
                alert(res.data.message);
             this.$router.push({
                 name:'login'
             })
            }else{
                alert(res.data.message);
            }
            
          })
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