<template>
  <div id="chart"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name : 'testchart',
    data(){
      return{
        option :{
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        }
      }
       // 指定图表的配置项和数据
       

    },
    methods:{
      mountchart(){
        var mychart = echarts.init(document.getElementById('chart'),null, {
          width: 600,
          height: 400
        });
        window.onresize = function() {
          myChart.resize();
        };
        myChart.setOption(this.option);
      }
    },
    created(){
      this.mountchart()
    }
}
</script>

<style>

</style>