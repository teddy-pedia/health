<template>
    <div class="lunch-list-wrapper">
        <div
            class="food-item"
            v-for="(item, index) in lunch"
            :key="index"
            @click="changeRouter(index)"
        >
            <div class="day">{{ item['day'] }}</div>
            <div class="food-names">
                <div class="food-name">{{ item['food']['dish_name'] }}</div>
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>

<script>
import { inject, provide, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {

        const router = useRouter()

        const menu = inject('menu')

        // 获取七天的午餐
        const lunch = reactive([])
        for (let today_menu of menu) {
            // console.log(today_menu['breakfast'])
            lunch.push({
                day: today_menu['day'],
                food: today_menu['lunch']
            })
        }

        provide('lunch', lunch)

        onMounted(() => {
            router.push({
                name: 'lunch_menu',
                params: { index: 0, type: 'lunch' }
            })
        })

        function changeRouter(index) {
            router.push({
                name: 'lunch_menu',
                params: { index: index, type: 'lunch' }
            })
        }

        return {
            lunch,
            changeRouter
        }
    }
}
</script>

<style scoped>
.lunch-list-wrapper {
    display: flex;
}

.food-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
    margin-left: 15px;
    height: 100px;
    background-color: #ececec;
    border-radius: 10px;
    color: #fff;
}

.lunch-list-wrapper .food-item .day {
    flex: 1;
    line-height: 30px;
    font-size: 14px;
    background-color: #00a039;
    color: #fff;
}

.lunch-list-wrapper .food-item .food-names {
    display: flex;
    flex: 3;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    color: #000;
}

.lunch-list-wrapper .food-item .food-names .food-name {
    width: 5em;
}

.lunch-list-wrapper .food-item:hover {
    background-color: #c4c4c4;
    border-radius: 10px;
}
</style>
