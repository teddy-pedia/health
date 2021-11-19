<template>
    <div class="breakfast-list-wrapper">
        <div
            class="food-item"
            v-for="(item, index) in breakfast"
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
        const breakfast = reactive([])
        for (let today_menu of menu) {
            breakfast.push({
                day: today_menu['day'],
                food: today_menu['breakfast']
            })
        }

        provide('breakfast', breakfast)

        onMounted(() => {
            router.push({
                name: 'breakfast_menu',
                params: { index: 0, type: 'breakfast' }
            })
        })

        function changeRouter(index) {
            router.push({
                name: 'breakfast_menu',
                params: { index: index, type: 'breakfast' }
            })
        }

        return {
            breakfast,
            changeRouter
        }
    }
}
</script>

<style scoped>
.breakfast-list-wrapper {
    display: flex;
}

.food-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
    margin-left: 10px;
    height: 100px;
    background-color: #ececec;
    border-radius: 10px;
    color: #fff;
}

.breakfast-list-wrapper .food-item .day {
    flex: 1;
    line-height: 30px;
    font-size: 14px;
    background-color: #00a039;
    color: #fff;
}

.breakfast-list-wrapper .food-item .food-names {
    display: flex;
    flex: 2;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    color: #000;
}

.breakfast-list-wrapper .food-item .food-names .food-name {
    width: 5em;
}

.breakfast-list-wrapper .food-item:hover {
    background-color: #c4c4c4;
    border-radius: 10px;
}
</style>
