<template>
    <div class="train">
        <div
            style="background:linear-gradient(to left , #efefef , #b6b6b6 , #efefef); height:1px;width: 80%;margin: 0 auto "
        ></div>
        <p style="cursor: pointer">
            想换个花样？
            <span>为你科学编排训练</span>
            <span @click="trainMore" class="trainAll">全部课程</span>
        </p>
        <div class="trainItem">
            <div class="course">
                <img :src="courseName[0].web" @click="action(courseName[0].kcal)" />
            </div>
            <div class="course">
                <img :src="courseName[1].web" @click="action(courseName[1].kcal)" />
            </div>
            <div class="course">
                <img :src="courseName[2].web" @click="action(courseName[2].kcal)" />
            </div>
        </div>
        <AllCoures :sendVal="data.sendVal" @changeVal="change"></AllCoures>
    </div>
    <div class="mark" v-show="data.sendVal"></div>
</template>

<script>
import AllCoures from '../view/AllCoures.vue'
import initInstrJsonData from '../../../assets/store.json';
import { inject } from "vue";
import { reactive, computed } from 'vue'
// import { getCurrentInstance } from "vue";
export default {
    name: "Train",
    data() {
        return {
            arr: []
        }
    },
    setup() {
        // const ctx = getCurrentInstance();
        let user = inject('user');
        const data = reactive({
            sendVal: false,
        });
        const trainMore = () => {
            data.sendVal = !data.sendVal;
        };
        const change = () => {
            data.sendVal = false;
        };
        const action = (addKcal) => {
            if (confirm("是否开始本次课程，开始将计入训练，预计消耗" + addKcal + "大卡!")) {
                user.addSport += parseInt(addKcal);
            } else {
                alert("重新选择运动吧！");
            }
        };
        const courseName = computed(() => {
            let obj = initInstrJsonData.course;
            let num;
            let b = 0;
            let arr;
            let needsportKcal = (user.trueKcal - user.needKcal) > 0 ? (user.trueKcal - user.needKcal) + 200 : 200;
            // && (b - this.sportKcal)<40
            do {
                b = 0;
                // console.log(b);
                arr = [];
                while (arr.length < 3) {
                    num = Math.floor(Math.random() * 75);
                    // parseInt取正，小数点后面的数字全部抹掉
                    // Math.random() 0-1的随机数
                    if (arr.indexOf(num) === -1) {
                        // this.arr.indexOf(num)若等于-1则证明arr这个数组里没有num这个随机数，因此可以放进这个数组里
                        // console.log(arr);
                        arr.push(obj[num]);
                    }
                }
                arr.forEach(function (e) {
                    let a = parseInt(e.kcal) || 0;
                    b += a;
                    // console.log(b);
                });
            } while (b < needsportKcal || b > needsportKcal + 50);
            // console.log(arr);
            return arr;
        });
        // const  refData = toRefs(data);
        // 在data中都有个return ，这里当然也必须要有的，但是这里是所有方法计算属性都要通过这个返回
        // 有人疑惑，那我可以直接在这个return上定义变量吗，答案是可以，但是定义的变量不是响应式的，不可变化
        return {
            // ...refData, // 你也可以直接在这里用...toRefs(data) 这样会简单点
            data,
            trainMore,
            change,
            action,
            courseName
            // rules: [] //如果你有什么不会变化的数据，如规则啊，配置啊，可以直接在这定义而不需要通过ref和reactive
        };
    },
    components: {
        AllCoures
    }
}
</script>

<style scoped>
.train {
    margin-top: 15px;
    margin-left: -30px;
    width: 960px;
    height: 300px;
    /*border: 1px solid #000;*/
    position: relative;
    float: left;
    /*left: 0px;*/
    /*top: 400px;*/
    /*background-color: black;*/
}
p {
    margin: 35px 0px 10px 190px;
    border-left: red 3px solid;
    width: 500px;
    /*margin-left: 190px;*/
    font-size: 25px;
    font-weight: bold;
}
p > span {
    margin-left: 20px;
    font-weight: normal;
    font-size: 15px;
}
p > .trainAll {
    cursor: pointer;
    margin-left: 70px;
}
.trainItem {
    /*width: 100%;*/
    /*height: 200px;*/
    /*overflow: auto;*/
    /*background-color: red;*/
    position: relative;
}
.trainItem > .course {
    width: 320px;
    /*height: 250px;*/
    float: left;
}
.trainItem > .course > img {
    width: 310px;
    cursor: pointer;
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
