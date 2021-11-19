<template>
    <div class="food-right-wrapper">
        <!--卡路里统计区-->
        <div class="info-center">
            <h2>今日摄入量</h2>
            <div class="calorie-input">
                <div class="calorie-input-chart">
                    <n-progress type="circle" color="#00a039" :percentage="heat_percentage">
                        <span style="text-align: center;">{{ heat_percentage > 60 ? '超标' : '正常' }}</span>
                    </n-progress>
                </div>
                <div class="calorie-count">
                    <h3>卡路里摄入</h3>
                    <div>
                        <span>{{ heat }}</span>千卡
                    </div>
                </div>
            </div>
            <div class="other-input">
                <div class="other-info">
                    <div>碳水化合物</div>
                    <div>{{ carbohydrate }}g</div>
                </div>
                <div class="other-info">
                    <div>脂肪</div>
                    <div>{{ fat }}g</div>
                </div>
                <div class="other-info">
                    <div>蛋白质</div>
                    <div>{{ protein }}g</div>
                </div>
            </div>
            <div class="btn">
                <n-button type="info" size="large" @click="record">记录饮食</n-button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, inject, ref } from 'vue'

export default {
    setup() {
        const today_food = inject('today_food')
        let heat = ref(0), carbohydrate = ref(0), protein = ref(0), fat = ref(0)
        heat.value = parseFloat(today_food['breakfast']['heat']) + parseFloat(today_food['lunch']['heat']) + parseFloat(today_food['dinner']['heat'])
        carbohydrate.value = parseFloat(today_food['breakfast']['carbohydrate']) + parseFloat(today_food['lunch']['carbohydrate']) + parseFloat(today_food['dinner']['carbohydrate'])
        protein.value = parseFloat(today_food['breakfast']['protein']) + parseFloat(today_food['lunch']['protein']) + parseFloat(today_food['dinner']['protein'])
        fat.value = parseFloat(today_food['breakfast']['fat']) + parseFloat(today_food['lunch']['fat']) + parseFloat(today_food['dinner']['fat'])

        // 计算属性
        let heat_percentage = computed(() => {
            return Math.floor(heat.value / 2000 * 100)
        })

        // 记录当日的各项指标
        function record() {

        }

        return {
            heat,
            carbohydrate,
            protein,
            fat,
            heat_percentage,
            record
        }
    }

}
</script>

<style scoped>
.food-right-wrapper {
    display: flex;
    justify-content: center;
}

.info-center {
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 450px;
    padding: 16px;
    margin-top: 15px;
    background-color: #fff;
}

.info-center > h2 {
    margin-top: 5%;
    text-align: center;
    font-weight: 400;
}

.calorie-input {
    display: flex;
}

.calorie-input .calorie-count {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.calorie-input .calorie-count h3 {
    margin: 0;
}

.calorie-input .calorie-count span {
    font-size: 2em;
    color: #00a039;
}
.other-input {
    display: flex;
    margin-top: 30px;
    justify-content: space-around;
    flex-wrap: wrap;
}
.other-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 119px;
    height: 70px;
    margin-bottom: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    background-color: #00a0391f;
}
.btn {
    margin: 0 auto;
}
</style>
