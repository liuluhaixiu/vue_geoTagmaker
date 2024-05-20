<template>
    <div>   
        <el-row class="row">
            <i class="el-icon-location-information" style="margin-left:10px"></i>
            <el-select v-model="value" placeholder="类型"
                style="width:200px;"
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
            <el-select v-model="value" placeholder="数据源"
                style="width:200px;"
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
            <el-input v-model="input" style="width:200px"  placeholder="SearchText"></el-input>
            <el-button @click="clickSearchButton" style="width:150px" type="alert"> 上一条 </el-button>
            <el-button @click="clickSearchButton" style="width:250px" type="alert"> 下一条 </el-button>

        </el-row>
                <el-row style="margin-top: 10px;">
                       
                                <gd-map></gd-map>
                    
                        
            </el-row>
            
       
        
    </div>
</template>

<script>
import * as echarts from 'echarts';
import '@/assets/css/index.css';
import '@/assets/svg/china.json' 
import queryallitem from '@/api/queryallitem'
import querydangeritem from '@/api/querydangeritem'
import GdMap from "@/components/GaodeMap.vue";
export default {
    components:{GdMap},

    data(){
        return{
            ShowType:true,
            tableid:"",
            input:'',
            works:'',
            value:"",
            form:{
                jingdu:"",
                weidu:"",
                location:"",
                id:"",
                phone:"",
                fengxian:"",
                price:"",
                history:"",
                time:"",
                shangpinname:"",
                huaxiang1:"",
                huaxiang2:"",
                huaxiang3:"",
                huaxiang4:""
            },
            tabledata:[],
            dangerousdata:[]
        }
    },
    computed: {
            scrollerHeight: function () {
                return (document.documentElement.clientHeight - 250) + 'px'; //自定义高度
            },
            scrollerWeight: function () {
                return (document.documentElement.clientWeight - 1000)/2 + 'px'; //自定义宽度
            }
        },
    created(){
        this.$nextTick(() => {
            })
       
    },
    
    methods: {
        clickSearchButton(){
            this.$bus.$emit('searchGeoItem',{
                // 搜索位置
                'search_type':'poi',
                'data_source':'gd',
                'search_text':'ppsuc'
            })

        },
        bindchangework(){}
        }
}
</script>

<style>
.txt{
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    color:rgb(56, 48, 48);
    margin-left:10px;
    margin-right:10px;
}
.row{
    margin-top:10px;
}
</style>