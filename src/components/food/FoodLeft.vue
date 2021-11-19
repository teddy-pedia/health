<template>
    <div class="wrapper">
        <FoodSuggestion class="suggestion" />
        <Calorie class="chart" />
    </div>
</template>

<script>
import Calorie from './Calorie.vue'
import FoodSuggestion from './FoodSuggestion.vue'

export default {
    name: 'FoodLeft',
    setup() {

    },
    components: {
        Calorie,
        FoodSuggestion
    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
}
.chart {
    height: 30%;
}
.suggestion {
    height: 63%;
    margin-bottom: 3%;
}
</style>
