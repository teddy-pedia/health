<template>
    <div class="motion">
        <div
            style="background:linear-gradient(to left , #efefef , #b6b6b6 , #efefef); height:1px;width: 90%;margin: 0 auto "
        ></div>
        <motionMore :sendVal="data.sendVal" @changeVal="change"></motionMore>
        <MotionItem :sendVal2="data.sendVal2" :title="data.title" @changeVal="changeTwo"></MotionItem>
        <p>
            锻炼部位
            <span @click="motionMore">更多+</span>
        </p>
        <div class="picture" v-for="(item,index) in motionName" :key="index">
            <img :src="item.web" alt @click="motionItem(item.title)" />
            <!--            <span>{{item.title}}</span>-->
        </div>
        <div
            style="background:linear-gradient(to left , #efefef , #b6b6b6 , #efefef); height:1px;width: 80%;margin: 0 auto "
        ></div>
        <p class="subP">专项课程</p>
        <div class="qiutu">
            <img src="motion/111.png" alt @click="action()" />
            <img src="motion/222.png" alt @click="action()" />
            <img src="motion/333.png" alt @click="action()" />
        </div>
    </div>
    <div class="mark" v-show="data.sendVal"></div>
    <div class="mark" v-show="data.sendVal2"></div>
</template>

<script>
import { inject } from "vue";
// import { getCurrentInstance } from "vue";
import { reactive, computed } from 'vue'
import MotionItem from '../view/MotionItem.vue'
import motionMore from '../view/motionMore.vue'
import initInstrJsonData from '../../../assets/store.json';

export default {
    name: "Motion",
    setup() {
        // const { ctx } = getCurrentInstance();
        let user = inject('user');
        const data = reactive({
            sendVal: false,
            sendVal2: false,
            title: ""
        });
        const motionMore = () => {
            data.sendVal = !data.sendVal;
        };
        const motionItem = (title) => {
            data.sendVal2 = !data.sendVal2;
            data.title = title;
            console.log(data.title);
        };
        const change = () => {
            data.sendVal = false;
        };
        const changeTwo = () => {
            data.sendVal2 = false;
        };
        const action = () => {
            if (confirm("该专项特训为期四周，今日预计消耗" + "250" + "大卡!")) {
                user.addSport += 250;
            } else {
                alert("重新选择运动吧！");
            }
        };
        const motionName = computed(() => {
            let obj = initInstrJsonData;
            return obj.motion
        });
        return {
            data,
            motionMore,
            change,
            motionName,
            action,
            changeTwo,
            motionItem
        };
    },
    components: {
        motionMore,
        MotionItem
    }
}
</script>

<style scoped>
.motion {
    /*margin-top: -30px;*/
    margin-left: 20px;
    /*margin-top: 30px;*/
    width: 500px;
    height: 390px;
    /*border: 1px solid #000;*/
    position: relative;
    float: left;
    /*left: 0px;*/
    /*top: 400px;*/
    overflow: auto;
}
p {
    border-left: red 3px solid;
    width: 300px;
    margin: 10px 0px 10px 90px;
    font-size: 22px;
    font-weight: bold;
}
p > span {
    cursor: pointer;
    margin-left: 100px;
    font-weight: normal;
    font-size: 15px;
}
.picture {
    width: 150px;
    display: inline-block;
    margin-bottom: 5px;
}
.picture > img {
    width: 130px;
    cursor: pointer;
}
.picture > span {
    display: inline-block;
    width: 50px;
    margin-bottom: 10px;
}
.qiutu > img {
    cursor: pointer;
    width: 450px;
}
.subP {
    width: 100px;
    border-left: red 3px solid;
    margin: 10px 0px 10px 175px;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
}
.mark {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 848px;
    background: rgba(0, 0, 0, 0.6);
    z-index: 998;
}
</style>
