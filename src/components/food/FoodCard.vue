<template>
    <n-card :title="today_food_detail['dish_name']">
        <template #cover>
            <img :src="today_food_detail['url']" />
        </template>
        <!-- 卡片菜品的介绍 -->
        <div class="content">
            <div class="description">
                <h2>简介</h2>
                <div class="intro-detail">{{ today_food_detail['introduction'] }}</div>
            </div>
            <div class="nutrition">
                <h2>营养比例</h2>
                <div id="nutrition-detail" class="nutrition-detail"></div>
            </div>
            <div class="gradient">
                <h2>配方</h2>
                <div class="gradient-detail">{{ today_food_detail['material'] }}</div>
            </div>
        </div>
    </n-card>
</template>

<script>
import * as echarts from 'echarts'
import { inject, reactive, onMounted } from 'vue'

export default {
    name: 'Card',
    setup() {

        let today_food_detail = reactive(inject('today_food_detail'))

        // 加载后显示图表
        onMounted(() => {
            let chartDom = document.getElementById('nutrition-detail')
            let myChart = echarts.init(chartDom)
            let option

            let data = [
                { value: today_food_detail['fat'], name: '脂肪' },
                { value: today_food_detail['protein'], name: '蛋白质' },
                { value: today_food_detail['carbohydrate'], name: '碳水化合物' }
            ]

            option = {
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    top: '5%',
                    left: 'center',
                },
                series: [
                    {
                        name: 'Food',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 5,
                            borderColor: '#fff',
                            borderWidth: 2,
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left'
                        },
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontWeight: 'bold',
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: data,
                    },
                ],
            }

            option && myChart.setOption(option)
        })
        return {
            today_food_detail
        }
    },
}
</script>
<style scoped>
.n-card {
    max-width: 300px;
}

.content {
    display: flex;
    flex-direction: column;
}

.content > div {
    margin: 10px 0 0 0;
}

#nutrition-detail {
    height: 150px;
}
</style>
