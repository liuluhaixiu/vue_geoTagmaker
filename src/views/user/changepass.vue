<template>
 <div id="app">
      <el-form class='bigbox child' @submit.prevent="changepass" ref="form" :model="form" label-width="100px">
        <span class='title'>密码重置</span>     
        <el-form-item label='新密码'>
            <el-tooltip class="item" effect="dark" content="推荐使用复杂密码以保护帐号安全性" placement="right">
                <el-input v-model="form.newpassword" placeholder="请输入新密码" ></el-input>
            </el-tooltip>
        </el-form-item>
         <el-form-item label='重复密码'>
            <el-tooltip class="item" effect="dark" content="一定要与新密码一致" placement="right">
                <el-input v-model="form.repassword" placeholder="请重复输入" ></el-input>
            </el-tooltip>
        </el-form-item>
        <el-row>
            <el-button type="primary" round style="width:130px;height:50px;font-size:20px;" 
            @click="changepass">重置密码</el-button>
        </el-row>
      </el-form>
 </div>
</template>
<script>
import changepass_API from '@/api/changepass';
export default {
    name:'changepass',
    data(){
        return {
            form:{   
                newpassword:'',
                repassword:''
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
        check(){
            if(this.form.newpassword == this.form.repassword){
                return true;
            }else{
                return false;
            }
        },
        changepass(){
            if(this.check()){
                let data={
                "username":JSON.parse(sessionStorage.getItem('user')).username,
                "password":this.form.newpassword
                }
                changepass_API(data).then(res=>{
                    if(res.data.status==0){
                        alert('修改成功');
                        this.$router.push({name:'login'})
                    }else if(res.data.status==1){
                        alert('密码过于简单')
                    }else{
                        alert(res.data.message)
                    }
                })


            }else{
                alert('两次输入密码不同！');
            }
            
            
            
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