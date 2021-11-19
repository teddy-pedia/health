<template>
    <div class="oxygenRun">
        <div class="bgBike"></div>
        <img :src="sportName" alt class="run" :style="{left: personLeft+'px'}" />
        <div class="road">
            <div class="run-road" :style="{width: personLeft-10+'px'}"></div>
        </div>
        <span class="progress">已完成{{completed}}%</span>
        <p>
            {{runMeter}}
            <span>m</span>
        </p>
    </div>
</template>

<script>
    import {computed, getCurrentInstance, onBeforeUpdate, onMounted, reactive} from 'vue';

    export default {
        name: "OxygenRun",
        props: {
            sportProgress: {
                type: Number,
                required: true,
            },
            sportName: {
                type: String,
                required: true
            },
            shouldDone: {
                type: Number,
            }
        },
        setup() {
            const { ctx } = getCurrentInstance();
            onMounted(() => {handlers()});
            onBeforeUpdate(() => {handlers()});
            const data = reactive({
                sportRoad: 350,
                progress:0
            });
            const handlers = () =>{
                data.progress = ctx.sportProgress;
            };
            const personLeft = computed(()=>{
                return (data.progress / ctx.shouldDone  * data.sportRoad)>360?360: (data.progress / ctx.shouldDone  * data.sportRoad);
            });
            const runMeter = computed(()=>{
                return (ctx.shouldDone- ctx.sportProgress)>0?(ctx.shouldDone- ctx.sportProgress):0;
            });
            const completed = computed(()=>{
                return Math.round((ctx.sportProgress / ctx.shouldDone) * 100) > 100 ? 100 : Math.round((ctx.sportProgress / ctx.shouldDone) * 100);
            });
            return {
                data,
                handlers,
                runMeter,
                completed,
                personLeft
            }
        }
    }
</script>

<style scoped>
    .oxygenRun {
        margin-top: 40px;
        position: relative;
        float: left;
        margin-left: 10px;
        width: 400px;
        height: 300px;
        border-radius: 5px;
        padding: 0px 10px 0px 10px;
        border: 2px solid dodgerblue;
    }
    .bgBike {
        width: 100%;
        height: 100%;
        background-image: url("../../public/person/bg1.jpg");
        opacity: 0.4;
    }
    .run {
        width: 60px;
        height: 60px;
        position: absolute;
        /*left: 30px;*/
        bottom: 75px;
        transition: left 1.5s;
    }
    .run-road {
        width: 0;
        height: 18px;
        /*background-color: black;*/
        border-radius: 20px;
        position: absolute;
        transition: width 1.5s;
        background-color: rgb(230, 128, 128);
    }
    /*原始道路*/
    .road {
        bottom: 60px;
        width: 350px;
        margin-left: 25px;
        height: 18px;
        border: 2px solid #000;
        border-radius: 20px;
        position: absolute;
        transition: width 1.5s;
    }
    .progress {
        position: absolute;
        top: 216px;
        left: 38%;
        font-size: 18px;
        color: rgb(75, 70, 63);
    }
    p {
        position: absolute;
        right: 70px;
        top: 20px;
        font-size: 57px;
        color: black;
    }
    p > span {
        font-size: 20px;
        margin-left: -8px;
    }
</style>
