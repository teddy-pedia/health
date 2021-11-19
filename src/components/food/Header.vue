<template>
    <div>
        <div class="top">
            <div class="title">健康食谱</div>
            <div class="user-info">欢迎用户 {{ user.name }}</div>
        </div>
        <n-tabs type="segment" @update:value="changeRoute">
            <n-tab-pane name="food" tab="饮食"></n-tab-pane>
            <n-tab-pane name="practice" tab="健身"></n-tab-pane>
        </n-tabs>
    </div>
    <router-view></router-view>
</template>

<script>
import { reactive } from 'vue'
import router from '../../route'

export default {
    name: 'Header',
    setup() {
        const user = reactive({
            name: '小明'
        })

        function changeRoute(tabName) {
            router.push({ path: `/${tabName}` })
        }

        return {
            user,
            changeRoute
        }
    }
}
</script>

<style scoped>
.top {
    position: relative;
}

.top .title {
    font-size: 25px;
    text-align: center;
    background-color: #fff;
}

.top .user-info {
    position: absolute;
    top: 10px;
    right: 30px;
}
</style>
