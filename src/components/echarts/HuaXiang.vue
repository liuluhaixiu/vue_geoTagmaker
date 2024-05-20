<template>
    <div>
        <div class="ribbon"  ref="charts" style="height:220px;border:2px solid gray;border-radius:5px;margin:10px;margin-right:20px;"> </div>

    </div>
  
</template>


<script>
import * as echarts from 'echarts';
//用户画像图表
export default {
    data(){
        return{
            mydata:[]
        }
    },
    created(){
        this.$nextTick(() => {
                this.initcharts();
            })
            
        this.$bus.$on('changehuaxiang',params=>{
            let mydata=[params.data[10],params.data[11],params.data[12],params.data[13]]
            this.mydata = mydata
            console.log(this.mydata)
            this.initCharts()
        })
    },
    methods:{
        initCharts(){
            const charts = echarts.init(this.$refs["charts"]);
            const option = {
            title: {
                text: ' 订单画像分析'
            },
            legend: {
                x:"300px",
                data: [ '画像趋近值']
            },
            radar: {
                // shape: 'circle',
                indicator: [
                { name: '普通用户', max: 1 },
                { name: '老用户', max: 1 },
                { name: '行业竞争对手', max: 1 },
                { name: '恶意刷单人员', max: 1 },
                
                ]
            },
            series: [
                {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                    value:this.mydata,
                    name: '画像趋近值'
                    }
                ]
                }
            ]
            };
            charts.setOption(option)
        }
    }
}
</script>

<style>

</style>