<template>
    <div class="foot-card-wrapper">
        <div class="food-card" @click="showCard">
            <div
                class="food-img"
                :style="{ background: `url(${url}) no-repeat`, backgroundSize: '100% 100%' }"
            ></div>
            <div class="food-description">
                <h3>{{ dish_name }}</h3>
                <span class="food-calorie">{{ heat }}</span>&nbsp;千卡
            </div>
        </div>
        <teleport to="body">
            <div v-if="isShow" class="mask">
                <div class="close" @click="closeCard">×</div>
                <FoodCard class="card" />
            </div>
        </teleport>
    </div>
</template>

<script>
import FoodCard from './FoodCard.vue'
import { inject, onUpdated, provide, reactive, ref, toRef } from 'vue'
import { useRoute } from 'vue-router'

export default {
    components: {
        FoodCard
    },
    setup() {
        const route = useRoute()

        let index = route.params['index'] || 0
        let food_type = route.params['type'] || 'breakfast'
        const food = inject(`${food_type}`)

        let today_food = reactive({})
        today_food['dish_name'] = food[index]['food']['dish_name'] || '油条'
        today_food['heat'] = food[index]['food']['heat'] || 388
        today_food['url'] = food[index]['food']['url'] || '/images/油条.jpeg'

        let today_food_detail = reactive({})
        for (let key in food[index]['food']) {
            today_food_detail[key] = food[index]['food'][key]
        }

        provide('today_food_detail', today_food_detail)

        let isShow = ref(false)

        onUpdated(() => {
            index = route.params['index']
            today_food['dish_name'] = food[index]['food']['dish_name']
            today_food['heat'] = food[index]['food']['heat']
            today_food['url'] = food[index]['food']['url']

            // 更新菜品的详细信息
            for (let key in food[index]['food']) {
                today_food_detail[key] = food[index]['food'][key]
            }
        })

        // 展示食物卡片
        function showCard() {
            isShow.value = true
        }
        // 关闭食物卡片
        function closeCard() {
            isShow.value = false
        }

        return {
            isShow,
            today_food_detail,
            dish_name: toRef(today_food, 'dish_name'),
            url: toRef(today_food, 'url'),
            heat: toRef(today_food, 'heat'),
            showCard,
            closeCard
        }
    }
}
</script>

<style scoped>
.mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
}
.card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.close {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid black;
    border-radius: 50%;
}
.close:hover {
    cursor: pointer;
}
.foot-card-wrapper {
    display: flex;
    flex-wrap: wrap;
}
.food-card {
    display: flex;
    justify-content: space-evenly;
    width: 200px;
    height: 60px;
    margin: 10px 0 0 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
}
.food-card .food-img {
    width: 50px;
    height: 50px;
    margin: 5px;
}
.food-description {
    flex: 1;
    text-align: center;
}
.food-calorie {
    text-align: center;
    font-size: 20px;
    color: #54b0a7;
}
</style>
