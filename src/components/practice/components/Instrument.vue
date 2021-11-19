<template>
    <div class="instrument">
        <div
            style="background:linear-gradient(to left , #efefef , #b6b6b6 , #efefef); height:1px;width: 90%;margin: 0 auto "
        ></div>
        <p>
            按器械分类
            <span @click="instrumentMore">更多+</span>
        </p>
        <div class="picture" v-for="(item,index) in instrName" :key="index">
            <img :src="item.web" alt />
            <span>{{ item.title }}</span>
        </div>
    </div>
    <instruMore :sendVal="this.sendVal" @changeVal="change"></instruMore>
    <div class="mark" v-show="this.sendVal"></div>
</template>

<script>
import initInstrJsonData from '../../../assets/store.json';
import instruMore from '../view/instruMore.vue'

export default {
    name: "Instrument",
    components: {
        instruMore
    },
    data() {
        return {
            sendVal: false
        }
    },
    methods: {
        instrumentMore() {
            this.sendVal = !this.sendVal;
        },
        change() {
            this.sendVal = false;
        },
    },
    computed: {
        instrName() {
            let obj = initInstrJsonData;
            return obj.instr
        }
    }
}
</script>

<style scoped>
.instrument {
    margin-left: 20px;
    /*margin-top: 30px;*/
    width: 450px;
    /*height: 600px;*/
    /*border: 1px solid #000;*/
    position: relative;
    float: left;
    /*left: 0px;*/
    /*top: 400px;*/
}
p {
    border-left: red 3px solid;
    width: 300px;
    margin-left: 90px;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 10px;
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
}
.picture > img {
    cursor: pointer;
}
.picture > span {
    display: inline-block;
    width: 50px;
    margin-bottom: 10px;
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
