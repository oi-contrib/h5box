<template>
    <div class="main-view">
        <div class="quick-link left">
            <a class="office" href="./office/index.html" target="_blank">
                办公应用
            </a>
        </div>
        <div class="quick-link right">
            <a class="notebook" href="https://zxl20070701.github.io/notebook" target="_blank">
                文档笔记
            </a>
            <a class="toolbox" href="https://zxl20070701.github.io/toolbox" target="_blank">
                实用工具
            </a>
        </div>
        <div class="taskline">
            <ul>
                <li class="pdf" title="PDF阅读器" @click="openApplication('pdf-reader')"></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li class="split"></li>
                <li class="what" @click="openApplication('what')"></li>
            </ul>
        </div>
    </div>
    <div class="dialog-view">
        <!-- 统一遮罩 -->
        <div class="mask"></div>
        <ui-dialogs v-for="(dialog, index) in dialogStore.fetchList"
            :dialog="dialogs[dialog.id as keyof typeof dialogs]" :data="dialog.data" :key="index"></ui-dialogs>
    </div>
</template>
<script setup lang="ts">

import { useDialogStore } from "@/common/stores/dialog"
import uiDialogs from "@/common/components/dialogs.vue"
import dialogs from "./dialogs/lazy-load"

let dialogStore = useDialogStore()

// 打开应用方法
let openApplication = (appName: string) => {
    window.location.href = "#/" + appName
    dialogStore.openDialog({
        id: appName,
        callback() {
            window.location.href = "#/"
        }
    })
}

// 是否需要默认打开
let appName = window.location.hash.replace(/^#\/?/, '')
if (appName && dialogs[appName as keyof typeof dialogs]) {
    openApplication(appName)
}

</script>
<style lang="scss" scoped>
.main-view {
    width: 100vw;
    height: 100vh;
    background-image: url("./images/pc-desktop.jpeg");
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    &>.taskline {
        position: fixed;
        width: 100vw;
        left: 0;
        bottom: 5px;
        text-align: center;

        &>ul {
            display: inline-block;
            background-color: rgba(199, 197, 197, 0.317);
            border-radius: 10px;
            padding: 5px;

            &>li {
                display: inline-block;
                width: 35px;
                height: 35px;
                margin: 2px 5px;
                background-repeat: no-repeat;
                background-size: 95% auto;
                background-position: center;
                font-size: 0;
                vertical-align: top;
                cursor: pointer;

                &:hover {
                    background-size: 100% auto;
                }

                &.split {
                    background-color: #333535;
                    width: 1px;
                }

                &.pdf {
                    background-image: url("./images/pdf.png");
                }

                &.what{
                    background-image: url("./images/what.png");
                }
            }
        }
    }

    &>.quick-link {
        position: fixed;
        top: 120px;
        background-color: white;
        box-shadow: 0 0 6px 0px #d6cdcd;
        padding: 5px;
        width: 60px;

        &.left {
            border-radius: 0 10px 10px 0;
            left: 0;
        }

        &.right {
            border-radius: 10px 0 0 10px;
            right: 0;
        }

        &>a {
            display: block;
            font-size: 12px;
            height: 80px;
            width: 50px;
            background-size: 80% auto;
            background-position: center 10px;
            background-repeat: no-repeat;
            padding-top: 50px;
            line-height: 30px;
            text-align: center;
            color: black;
            font-weight: 800;

            &:hover {
                text-decoration: underline;
            }

            &.office {
                background-image: url("./office.jpeg");
                background-size: 100% auto;
            }

            &.notebook {
                background-image: url("./images/notebook.png");
            }

            &.toolbox {
                background-image: url("./images/toolbox.png");
            }
        }
    }
}

.dialog-view {
    &>.mask {
        background-color: rgb(0 0 0 / 30%);
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: none;

        &:not(:last-child) {
            display: block;
        }
    }
}
</style>