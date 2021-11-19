<template>
    <div class="inputValue">
        <h2>没错,这是react</h2>
        <input type="text"  placeholder="请输入待办事项" v-model="text" >
        <button @click="add">添加</button>
    </div>
    <ul class="items">
        <template v-for="(value,index) in deps" :key="index">
        <li  v-if="value.show">
            <input type="checkbox" name="" value="" :checked="value.isFinish" disabled>
<!--            <span :class="value.isFinish ? 'completed' : ''"></span>-->
            {{value.text}}
            <button @click="finish(index)">已完成</button>
            <button @click="write(index)">取消完成</button>
            <button @click="delet(index)">删除</button>
        </li>
        </template>
    </ul>
    <div class="buttons">
        <input type="button" value="全部" @click="showAll" >
        <input type="button" value="显示未完成" @click="unFinish">
        <input type="button" value="显示已完成" @click="showFinish">
    </div>
</template>
<script>
    export default {
        name: "todoList",
        data:()=>{
            return{
                deps:[
                    { text:'吃饭', isFinish: false,show:true},
                    { text:"睡觉", isFinish: true,show:true},
                    { text:"喝酒", isFinish: false,show:true}
                    ]
            }
        },
        methods:{
            add(){
                if (this.deps.length > 4){
                    alert("请先完成其他的任务!");
                }else {
                    var obj={};
                    obj.text = this.text;
                    obj.show = true;
                    if(!obj.text){
                        alert("请输入内容");
                        return;
                    }
                    obj.isFinish = false;
                    this.deps.push(obj);
                    this.text="";
                }
            },
            finish(index){
                this.deps[index].isFinish = true;
                this.iFinish.push(this.deps[index].text);
            },
            write(index){
                this.deps[index].isFinish = false;
            },
            delet(index){
                this.deps.splice(index,1);
            },
            showFinish(){
                this.deps.forEach(function (obj) {
                    obj.show = obj.isFinish;
                })
            },
            unFinish(){
                this.deps.forEach(function (obj) {
                    obj.show = !obj.isFinish;
                })
            },
            showAll(){
                this.deps.forEach(function (obj) {
                    obj.show = true;
                })
            }
        }
    }
</script>

<style scoped lang="css">
.items{
    list-style: none;
}
</style>