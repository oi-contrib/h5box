<template>
    <h1 class="app-header-view" :style="{
        backgroundImage: 'url(' + logo + ')'
    }">
        {{ title }}
        <div class="tips">{{ tips }}</div>
        <div class="goback">
            <span @click="emit('goback')">回到首页</span>
            ｜
            <a target="_blank" href="../index.html">h5box</a>
        </div>
    </h1>
</template>
<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: ""
    },
    tips: {
        type: String,
        default: ""
    },
    logo: {
        type: String,
        default: ""
    }
})

let emit = defineEmits(["goback"])
</script>
<style lang="scss" scoped>
.app-header-view {
    line-height: 60px;
    border-bottom: 1px solid rgb(232, 232, 232);
    background-repeat: no-repeat;
    background-size: auto 90%;
    background-position: 20px center;
    padding-left: 90px;
    white-space: nowrap;

    &>.tips {
        display: inline-block;
        font-size: 14px;
        vertical-align: bottom;
        font-weight: 400;
        color: gray;
    }

    &>.goback {
        white-space: nowrap;
        position: fixed;
        right: 0;
        top: 10px;
        line-height: 30px;
        background-color: #d5d9db;
        padding: 5px 10px;
        font-size: 14px;
        border-radius: 5px 0 0 5px;
        cursor: pointer;

        &>span {
            background-color: rgb(0, 0, 0);
            padding: 5px 10px;
            color: white;
            border-radius: 5px;
        }

        &>a {
            padding-right: 10px;
            color: black;
            text-decoration: underline;
        }
    }
}
</style>