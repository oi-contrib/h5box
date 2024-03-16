<template>
    <div class="app-frame-view">
        <div class="title">
            <h2 :style="{
                backgroundImage: 'url(' + icon + ')'
            }">
                {{ title }}
            </h2>
            <div class="close" title="关闭" @click="dialogStore.closeDialog()"></div>
        </div>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { useDialogStore } from "@/common/stores/dialog"
let dialogStore = useDialogStore()

let { icon, title } = defineProps({
    icon: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        default: ""
    }
})
</script>
<style lang="scss" scoped>
.app-frame-view {
    position: fixed;
    left: 80px;
    top: 10px;
    width: calc(100vw - 160px);
    height: calc(100vh - 70px);
    background-color: white;

    &>.title {
        &>h2 {
            background-size: auto 70%;
            background-position: 5px center;
            background-repeat: no-repeat;
            line-height: 30px;
            font-size: 16px;
            padding-left: 35px;
            background-color: aliceblue;
        }

        &>.close {
            width: 59px;
            height: 24px;
            background-image: url("../images/close-btn.png");
            font-size: 0;
            position: absolute;
            right: 10px;
            top: 0;
            cursor: pointer;
        }
    }
}
</style>