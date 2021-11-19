<template>
    <div class="oxygen">
        <ul class="oxygenTabbar">
            <li
                :title="item.name"
                v-for="(item,index) in data.mySport"
                :key="index"
                class="oxygenTabbaitem"
                @click="beginOxygen(index); changeSport(index)"
                :class="index === data.flag ? 'hover' : ''"
            >{{ data.mySport[index].name }}</li>
        </ul>
        <div class="router">
            <OxygenRun
                :sportName="data.sportName"
                :sportProgress="data.progress"
                :shouldDone="data.shouldDone"
            ></OxygenRun>
        </div>
    </div>
</template>

<script>
import OxygenRun from '../view/OxygenRun.vue';
import { inject, reactive, onMounted, onUnmounted } from "vue";
import { getCurrentInstance } from "vue";
export default {
    name: "Oxygen",
    components: {
        OxygenRun
    },
    setup() {
        const { ctx } = getCurrentInstance();
        let user = inject('user');
        let needsportKcal = user.trueKcal - user.needKcal > 0 ? user.trueKcal - user.needKcal + 200 : 200;
        const data = reactive({
            mySport: [
                { name: '跑步', src: '../../person/run.png', progress: 0, Efficiency: 0.067, efc: 10 },
                { name: '骑车', src: '../../person/cycle.png', progress: 0, Efficiency: 0.023, efc: 6 },
                { name: '游泳', src: '../../person/swim.png', progress: 0, Efficiency: 0.133, efc: 13 }
            ],
            flag: 0,
            sportName: '../../person/run.png',
            cst: 'cst',
            progress: 0,
            shouldDone: Math.floor(needsportKcal / 0.067),
        });
        onMounted(() => {
            ctx.num = setInterval(() => {
                needsportKcal = user.trueKcal - user.needKcal > 0 ? user.trueKcal - user.needKcal + 200 : 200;
                changeSport(data.flag);
                if (needsportKcal <= user.addSport) {
                    clearInterval(ctx.num);
                }
            }, 2000);
        });
        onUnmounted(() => {
            clearInterval(ctx.num);
        });
        const beginOxygen = (index) => {
            let num = prompt("请输入" + data.mySport[index].name + "的时间。(单位:min)");
            let re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
            if (!re.test(num)) {
                num = 0;
            } else if (parseInt(num) > 60 || parseInt(num) < 1) {
                alert("你看看你是不是搞错了，单位是分钟喔。");
                num = 0;
            }
            user.addSport += parseInt(num) * data.mySport[index].efc;
            // console.log(user.addSport);
            // console.log(addKcal);
            // this.$EventBus.emit('newData',addKcal);

        };
        const changeSport = (index) => {
            data.flag = index;
            data.progress = Math.floor(user.addSport / data.mySport[index].Efficiency);
            data.sportName = data.mySport[index].src;
            data.shouldDone = Math.floor(needsportKcal / data.mySport[index].Efficiency);
        };
        return {
            data,
            changeSport,
            beginOxygen
        }
    }
}

</script>

<style scoped>
.oxygen {
    width: 430px;
    float: left;
}
.oxygenTabbar {
    margin-left: 80px;
    width: 300px;
    height: 50px;
    border-radius: 10px;
    background-color: #87cefa;
    cursor: pointer;
    display: flex;
    justify-content: center;
}
.oxygenTabbaitem {
    width: 100px;
    height: 50px;
    border-radius: 10px;
    line-height: 50px;
    color: white;
    font-size: 20px;
}
.oxygenTabbar .hover {
    background-color: #4169e1;
}
</style>

/*
* h身高 cm   w体重 Kg
* 理想体重：    d = (h - 105) * 0.9  下限  /  d = (h - 105) * 1.1  上限
* BMI          r = w / (h^2)   // h的单位是米
* 每天需要热量  d * 30  (kcal)
*/
