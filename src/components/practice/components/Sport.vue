<template>
    <div class="echarts-box">
        <div id="myEcharts"></div>
        <p>大概还需要</p>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import { onMounted, onUnmounted } from 'vue';
import { getCurrentInstance } from "vue";
import { inject } from "vue";
export default {
    name: "Sport",
    components: {
    },
    setup() {
        const { ctx } = getCurrentInstance();
        let user = inject('user');
        let echart = echarts;
        onMounted(() => {
            ctx.num = setInterval(() => {
                initChart();
                let needsportKcal = (user.trueKcal - user.needKcal) > 0 ? (user.trueKcal - user.needKcal) + 200 : 200;
                if (needsportKcal <= user.addSport) {
                    clearInterval(ctx.num);
                }
            }, 2000);
        });
        onUnmounted(() => {
            clearInterval(ctx.num);
            // desHander();
        });
        function initChart() {
            // 把配置和数据放这里
            let chart = echart.init(document.getElementById("myEcharts"), {
                width: 'auto',
                height: 'auto'
            });
            let needsportKcal = (user.trueKcal - user.needKcal) > 0 ? (user.trueKcal - user.needKcal) + 200 : 200;
            chart.setOption({
                //隐藏提示框
                // tooltip: {
                //     trigger: 'item',
                // },
                title: {
                    show: true,
                    text: `${(needsportKcal - user.addSport) > 0 ? (needsportKcal - user.addSport) : 0}`,
                    textStyle: {
                        fontSize: 40
                    },
                    subtext: '                           kcal\n\n\n今日还需消耗热量',
                    subtextStyle: {
                        fontSize: 13
                    },
                    // textAlign:'left',
                    // textVerticalAlign:'center',
                    itemGap: -20,
                    left: 'center',
                    top: '40%'
                },
                // legend: {
                //     top: '5%',
                //     left: 'center'
                // },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        emptyCircleStyle: {
                            color: '#F5F5F5'
                        },
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false
                        },
                        emphasis: {
                            scaleSize: 1,
                            focus: 'none',
                            // blurScope:'series',
                            label: {
                                show: true,
                                position: 'insideTop',
                                fontSize: 12,
                                fontWeight: 'bold',
                                align: "left",
                                formatter: function (p) { //指示线对应文字,百分比
                                    return p.percent.toFixed(0) + "%";//设置百分比保留几位小数
                                }
                            }
                        },
                        data: [
                            { value: user.addSport, name: 'sport', itemStyle: { color: '#00BFFF' } },
                            { value: (needsportKcal - user.addSport) > 0 ? (needsportKcal - user.addSport) : 0, name: 'unSport', itemStyle: { color: '#F5F5F5' } },
                        ],
                    }
                ]
            });
            window.onresize = function () {
                chart.resize();
            };
            // chart.dispose();
        }
        function desHander() {
            let chart = echart.init(document.getElementById("myEcharts"));
            chart.dispose();
        }
        return { initChart, desHander };
    }
}
</script>

<style scoped>
.echarts-box {
    float: left;
    width: 380px;
    /*position: fixed;*/
    margin-left: 90px;
    position: relative;
}
#myEcharts {
    width: 300px;
    height: 300px;
}
p {
    position: absolute;
    right: 50%;
    bottom: 0;
    font-weight: bold;
    font-size: 20px;
}
</style>
