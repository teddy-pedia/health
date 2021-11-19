<template>
    <div class="food-suggestion-wrapper">
        <n-card title="饮食推荐" style="margin-bottom: 16px;">
            <n-tabs type="line" @update:value="changeRouter">
                <n-tab-pane name="breakfast" tab="早餐">
                    <router-view></router-view>
                </n-tab-pane>
                <n-tab-pane name="lunch" tab="午餐">
                    <router-view></router-view>
                </n-tab-pane>
                <n-tab-pane name="dinner" tab="晚餐">
                    <router-view></router-view>
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    name: 'FoodSuggestion',
    components: {

    },
    setup() {

        const router = useRouter()

        function changeRouter(tabName) {
            setTimeout(() => {
                router.push({
                    path: `/food/${tabName}`
                })
            }, 100)
            return true
        }

        return {
            changeRouter,
        }
    }
}
</script>

<style scoped>
.food-suggestion-wrapper {
    margin-top: 15px;
    margin-left: 20px;
}
</style>
