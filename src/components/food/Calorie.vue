<template>
    <div class="food-left-wrapper">
        <!-- 左侧是近日卡路里摄入表 -->
        <div id="calorie_chart" class="calorie-bar-chart"></div>
        <!--右侧可能是其他的表-->
        <div id="other_chart" class="other-chart"></div>
    </div>
</template>

<script>

import { onMounted } from 'vue'
import * as echarts from 'echarts'
export default {
    name: 'Calorie',
    setup() {

        // 加载卡路里摄入量图
        onMounted(() => {
            createCalorieChart()
            createOtherChart()
        })

        function createOtherChart() {
            let chartDom = document.getElementById('other_chart')
            let myChart = echarts.init(chartDom)
            let option

            option = {
                title: {
                    text: '其他营养摄入',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '脂肪' },
                            { value: 735, name: '碳水化合物' },
                            { value: 580, name: '蛋白质' },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            option && myChart.setOption(option)
        }

        function createCalorieChart() {
            let chartDom = document.getElementById('calorie_chart');
            let myChart = echarts.init(chartDom);
            let option;

            option = {
                title: {
                    text: '近日卡路里摄入表',
                    textStyle: {
                        fontSize: 20
                    },
                    left: 'center',
                    top: '5px'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            };

            option && myChart.setOption(option);
        }
    }
}
</script>

<style scoped>
.food-left-wrapper {
    display: flex;
    justify-content: space-evenly;
}
.calorie-bar-chart {
    width: 40%;
    height: 100%;
    background-color: #fff;
}
.other-chart {
    width: 40%;
    height: 100%;
    background-color: #fff;
}
</style>
