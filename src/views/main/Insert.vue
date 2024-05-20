<template>
  <div id="app">
       <el-form class='bigbox child' @submit.prevent="regist" ref="form" :model="form" label-width="100px">
         <span class='title'>新建任务</span>     
         <el-form-item label='任务名称' label-width="100px">
             <el-tooltip class="item"  effect="dark" content="可以使用学号、邮箱等好记的用户名！~" placement="right">
                  <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
             </el-tooltip>
         </el-form-item>
         <el-form-item label='竞品分析(需要使用爬虫)' label-width="180px">
            <el-switch
                v-model="ifjingpin"
                active-color="#3bdf80"
                inactive-color="#e75e42">
            </el-switch>
         </el-form-item>
         <el-form-item label='地理编码(需要使用爬虫)' label-width="180px" >
            <el-switch
                v-model="ifbianma"
                active-color="#3bdf80"
                inactive-color="#e75e42">
            </el-switch>
         </el-form-item>
         <el-form-item label='上传文件(不超过50M)' label-width="175px">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">仅支持xlsx格式文件</div>
          </el-upload>
         </el-form-item>
         <el-row>
             <el-button type="primary" round style="width:130px;height:50px;font-size:20px;" 
             @click="regist">创建</el-button>
             
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
            ifjingpin:true,
            ifbianma:true,
             form:{
                 username:'',
                 password:'12345678',
                 repassword:'12345678',
                 nickname:'管理员',
                 umail:''
             }
         }
     },
     created() {
       
     
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