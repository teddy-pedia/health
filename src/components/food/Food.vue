<template>
    <div class="food-wrapper">
        <FoodLeft class="food-left" />
        <FoodRight class="food-right" />
    </div>
</template>

<script>
import FoodLeft from './FoodLeft.vue'
import FoodRight from './FoodRight.vue'

export default {
    name: 'Food',
    setup() {

    },
    components: {
        FoodLeft,
        FoodRight
    }
}
</script>

<style scoped>
.food-wrapper {
    display: flex;
    height: 100%;
}
.food-left {
    flex: 3;
}
.food-right {
    flex: 1;
}
</style>
