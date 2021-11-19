import { createRouter, createWebHashHistory } from "vue-router";
import Food from '../components/food/Food.vue'
import Practice from '../components/practice/Practice.vue'
import BreakfastList from '../components/food/BreakfastList.vue'
import LunchList from '../components/food/LunchList.vue'
import DinnerList from '../components/food/DinnerList.vue'
import Menu from '../components/food/Menu.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Food
        },
        {
            path: '/food',
            component: Food,
            children: [
                {
                    path: '/food/breakfast',
                    component: BreakfastList,
                    children: [
                        {
                            path: '/food/breakfast/breakfast_menu',
                            name: 'breakfast_menu',
                            component: Menu
                        }
                    ]
                },
                {
                    path: '/food/lunch',
                    component: LunchList,
                    children: [
                        {
                            path: '/food/lunch/lunch_menu',
                            name: 'lunch_menu',
                            component: Menu
                        }
                    ]
                },
                {
                    path: '/food/dinner',
                    component: DinnerList,
                    children: [
                        {
                            path: '/food/dinner/dinner_menu',
                            name: 'dinner_menu',
                            component: Menu
                        }
                    ]
                }
            ]
        },
        {
            path: '/practice',
            component: Practice
        }
    ]
});
