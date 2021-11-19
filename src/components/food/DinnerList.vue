<template>
    <div class="dinner-list-wrapper">
        <div
            class="food-item"
            v-for="(item, index) in dinner"
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
import { reactive, inject, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {

        const router = useRouter()

        const menu = inject('menu')

        // 获取七天的早餐
        const dinner = reactive([])
        for (let today_menu of menu) {
            dinner.push({
                day: today_menu['day'],
                food: today_menu['dinner']
            })
        }

        provide('dinner', dinner)

        onMounted(() => {
            router.push({
                name: 'dinner_menu',
                params: { index: 0, type: 'dinner' }
            })
        })

        function changeRouter(index) {
            router.push({
                name: 'dinner_menu',
                params: { index: index, type: 'dinner' }
            })
        }

        return {
            dinner,
            changeRouter
        }
    }
}
</script>

<style scoped>
.dinner-list-wrapper {
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

.dinner-list-wrapper .food-item .day {
    flex: 1;
    line-height: 30px;
    font-size: 14px;
    background-color: #00a039;
    color: #fff;
}

.dinner-list-wrapper .food-item .food-names {
    display: flex;
    flex: 3;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    color: #000;
}

.dinner-list-wrapper .food-item .food-names .food-name {
    width: 5em;
}

.dinner-list-wrapper .food-item:hover {
    background-color: #c4c4c4;
    border-radius: 10px;
}
</style>
