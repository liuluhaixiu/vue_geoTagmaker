<template>
    <el-container>

    
      <el-container>
        <el-header style=" border-bottom: 1px solid #ccc; ">
            <el-form style="margin:10px;  display: inline-block;  "  label-width="120px" label-position="center">
      <el-form-item label="信息检索" class="title"></el-form-item>
    </el-form>
        </el-header>
          <div style="margin: 5px 0">
            <!--需要增加导出表格的触发函数 -->
            <!-- <el-select v-model=classid multiple placeholder="请选择区队(未开发)">
              <el-option v-for="item in classes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select> -->
            <el-row>
              <el-select v-model=optionvalue multiple placeholder="请筛选内容" style="width:50%;">
              <el-option v-for="(item,index) in this.options" 
              :key="index" 
              :label="item.keyName" 
              :value="item.keyName"></el-option>
            </el-select>
            <el-button class="ml-5" type="primary" @click="export_table(optionvalue)" style="margin-right:10px;float:right">导出表格</el-button>
            <el-button class="ml-5" type="primary" @click="find(optionvalue)" style="margin-right:10px ;float:right">搜索</el-button>
           
           
            </el-row>
            
          </div>
          <!--未开发功能捏，字段修改需要对接 -->
          <!-- <div style="margin: 10px 0">
            <el-button type="primary" >新增学生(未开发)<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="danger" ">删除学生(未开发)<i class="el-icon-remove-outline"></i></el-button>
            <el-button type="primary">字段修改 <i class="el-icon"></i></el-button>
          </div> -->
          <el-table :data="tableData" stripe :border="true" max-height="700">
            <!-- <el-table-column fixed="left" label="操作"  width="120">
              <template slot-scope="scope">
                <el-button type="success" @clcik="edit_information">编辑 <i class="el-icon-edit"></i></el-button>
              </template>
            </el-table-column> -->
            <el-table-column   prop="student_number" label="学号" :key="Math.random()" :width="itemWidth" ></el-table-column>
            <el-table-column   prop="name" label="姓名" :key="Math.random()" :width="itemWidth"></el-table-column>
            <el-table-column   prop="class_number" label="区队" :key="Math.random()" :width="itemWidth"></el-table-column>
            <el-table-column  v-for="(item,index) in options" header-align="center" :prop="item.keyName" :width="itemWidth" :label="item.keyName" v-if="visible[index]" :key="index" >
            </el-table-column>
          </el-table>
      </el-container>
    </el-container>
  </template>
   
  <script>
    // import Get_Item from '@/api/query/GetItem';
    // import Get_All_Student_Message from '@/api/query/GetAllStudentMessage';
    // import Generate_Excel from '@/api/query/GenerateExcel';
import { isUndefined } from 'core-util-is';
  export default {
    name: 'Home',
    data() {
      
    //item为测试信息，可删
      
      return {
        itemWidth:document.body.clientWidth/7,
        options:[
         
      ],
        optionvalue:[   
          // 'name',
          // 'class_number',
          // 'student_number'
         ],
        sum:0,
        visible:[],
        allkey:[],
        selectedkey:[],
        //数据的调用，后台对接
        tableData: [],
      }
    },
    created(){
      Get_Item().then(res=>{
          this.options=[]
          if(res.data.status == 0){

            for(let item of res.data.keys){
              
              if(item['keyName']!='name'
                && item['keyName']!='class_number'
                && item['keyName']!='student_number'){
                this.options.unshift({
                  keyName:item.keyName,
                  modify:item.keyName
                })
              }
            }
                for(var i of this.options){
                  this.sum++
                  this.allkey.push(i.keyName)
                }
        }
      })
      Get_All_Student_Message().then(res=>{
        if(res.data.status == 0){
            this.tableData=res.data.data;
          }
          
      })
      
      for(var i=1;i<=this.sum;i++){
        this.visible.push(true)
      }
    },
    methods: {
      find(id){
        for(var i=0;i<this.sum;i++){
          this.visible[i]=false
        }
        for(var i of id){
          this.visible[this.allkey.indexOf(i)]=true
        }
        this.$forceUpdate()
      },
      edit_information(){
      },
      //导出表格函数
      export_table(id){
        id.unshift('name')
        id.unshift('student_number')
        id.unshift('class_number')
        this.$confirm('此操作将导出excel, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //目前只回调key，具体操作需要进一步写
          this.selectedkey.push(id)
          console.log(this.selectedkey)
       
          let data={
            'mess_lst':JSON.stringify(this.selectedkey).slice(1,-1),
            // 'mess_lst':"['name']",
            'excelname':Math.random().toString()
          }
          console.log(data)
          Generate_Excel(data).then(res=>{
            if(res.data.status==0){
              window.open('http://172.23.0.243' + res.data.path,'_self')
              //   this.$message({
              //   type: '导出成功!',
              //   message: '链接:     http://172.23.0.243' + res.data.path
              //   +'                请复制该链接到浏览器'
                
                
              // });
            }else{
              alert(res.data.message)
            }
          })
          
        })
        // .catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消导出'
        //   });          
        // });
        this.selectedkey=[]
      },
    }
  }
  </script>
   
  <style>
  .headerBg {
    background: #eee!important;
  }

.title .el-form-item__label{
  font-weight:bold;
  font-size:18px;
}

  </style>