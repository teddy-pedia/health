<template>
    <div class="wrapper">
        <Header class="header" />
    </div>
</template>

<script>
import Header from './components/food/Header.vue'
import breakfast from './assets/breakfast.json'
import lunch from './assets/lunch.json'
import { provide, reactive, onMounted } from 'vue'

export default {
    name: 'App',
    components: {
        Header,
    },
    setup() {
        onMounted(() => {
            initMenu()
        })
        // 初始化一周的菜单
        function initMenu() {
            let menu = reactive([
                { day: '周一' },
                { day: '周二' },
                { day: '周三' },
                { day: '周四' },
                { day: '周五' },
                { day: '周六' },
                { day: '周日' },
            ])
            let _breakfast = breakfast
            let _lunch = lunch

            // 初始化七天的菜谱
            for (let today_menu of menu) {
                // 早餐
                let today_breakfast = _breakfast.shift()
                _breakfast.push(today_breakfast)
                today_menu['breakfast'] = today_breakfast

                // 午餐
                let today_lunch = _lunch.shift()
                _lunch.push(today_lunch)
                today_menu['lunch'] = today_lunch

                // 晚餐
                let today_dinner = _lunch.shift()
                _lunch.push(today_dinner)
                today_menu['dinner'] = today_dinner
            }

            console.log(menu)

            // 今日的食物信息
            let today_index = new Date().getDay() - 1
            let today_food = reactive(menu[today_index])

            provide('today_food', today_food)

            provide('menu', menu)
        }
    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
}

.header {
    height: 100px;
}
</style>
