<template>
    <div v-show="sendVal" class="course">
        <button @click="closeItem">关闭</button>
        <div class="courseTitle">
            <p>全部课程</p>
            <h3>不限部位</h3>
            <h3 class="ziti">不限难度</h3>
        </div>
        <div class="allCourse" v-for="(item,index) in courseName" :key="index">
            <img :src="item.web" alt @click="action(item.kcal)" />
        </div>
        <div class="bottom">
            <p>商务合作 QQ:8888888888 hao123 |肌肉网 |我爱健身网 |全民健身 |网络购彩 |51健身 |足球盘口 |倩碧 |酷客健身 |网址导航 |亲子百科</p>
        </div>
    </div>
</template>

<script>
import initInstrJsonData from '../../../assets/store.json';
import { inject, computed } from "vue";
import { getCurrentInstance } from "vue";
export default {
    name: "instruMore",
    props: {
        sendVal: {
            type: Boolean,
            required: true
        }
    },
    setup() {
        const { ctx } = getCurrentInstance();
        let user = inject('user');
        const action = (addKcal) => {
            if (confirm("是否开始本次课程，开始将计入训练，预计消耗" + addKcal + "大卡!")) {
                user.addSport += parseInt(addKcal);
                console.log(user.addSport);
                // console.log(addKcal);
                // this.$EventBus.emit('newData',addKcal);
            } else {
                alert("重新选择运动吧！");
            }
        };
        const closeItem = () => {
            ctx.$emit('changeVal');
        };
        const courseName = computed(() => {
            let obj = initInstrJsonData;
            return obj.course
        });
        return {
            action,
            courseName,
            closeItem
        };
    }
}
</script>
<style scoped>
div.course {
    position: fixed;
    width: 1200px;
    height: 700px;
    border: 1px solid #000;
    background-color: #e1ffff;
    z-index: 999;
    margin-top: 0px;
    margin-left: 110px;
    overflow: auto;
}
.courseTitle {
    width: 100%;
    height: 100px;
}
.courseTitle > p {
    line-height: 80px;
    font-size: 30px;
    color: black;
    font-weight: bold;
}
.courseTitle > h3 {
    position: absolute;
    top: 70px;
    left: 90px;
    float: left;
    display: inline-block;
    height: 50px;
    font-size: 15px;
    color: black;
}
.ziti {
    position: absolute;
    left: 160px !important;
}
.allCourse {
    display: inline;
    /*margin-top: 5px;*/
    width: 360px;
    height: 160px;
    margin-left: 5px;
    margin-bottom: 5px;
}
.allCourse > img {
    width: 350px;
    cursor: pointer;
}
.course > button {
    background-color: #e1ffff;
    border: none;
    position: fixed;
    right: 150px;
    top: 88px;
    font-size: 0px;
    display: block;
    height: 20px;
    width: 40px;
    cursor: pointer;
    /*border: 1px solid #000;*/
}
button::before,
button::after {
    margin-left: 13px;
    content: "";
    width: 15px;
    height: 2px;
    background: black;
    display: block;
}
button::before {
    transform: rotate(45deg);
}
button::after {
    transform: translateY(-2px) rotate(-45deg);
}
.bottom {
    margin-top: 50px;
    width: 100%;
    height: 80px;
    position: relative;
    background-color: #2f4f4f;
}
.bottom > p {
    position: absolute;
    bottom: 20px;
    right: 16%;
    color: #cccccc;
    user-select: none;
}
</style>
