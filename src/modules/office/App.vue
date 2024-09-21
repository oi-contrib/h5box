<template>
    <div class="main-view">
        <AppHeader title="h5office" tips="提供H5版本的自动化办公常用处理方法
        " logo="../office.jpeg" @goback="router.push('/')"></AppHeader>
        <div class="content">
            <router-view></router-view>
        </div>
        <footer class="foot">
            本项目由
            <a class="heart" href="https://zxl20070701.github.io/notebook/home.html" target="_blank">
                z Z ...
            </a>
            维护

            <div class="right">
                <a href="https://github.com/zxl20070701/h5box" target="_blank">查看源码</a>
                <a href="https://github.com/zxl20070701/h5box/issues" target="_blank">联系我们</a>
                <span>
                    邮箱：<a :href="emailUrl" target="_blank">1904314465@qq.com</a>
                </span>
            </div>
        </footer>
    </div>
    <div class="dialog-view">
        <!-- 统一遮罩 -->
        <div class="mask"></div>
        <ui-dialogs v-for="(dialog, index) in dialogStore.fetchList"
            :dialog="dialogs[dialog.id as keyof typeof dialogs]" :data="dialog.data" :key="index"></ui-dialogs>
    </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/app-header.vue'
import { useRouter } from "vue-router"

import { useDialogStore } from "@/common/stores/dialog"
import uiDialogs from "@/common/components/dialogs.vue"
import dialogs from "./dialogs/lazy-load"

let router = useRouter()

let dialogStore = useDialogStore()

let emailBody = `你好：

使用 h5office 过程中，我遇到了一些问题，希望获得帮助，具体如下：

1、问题描述
（描述一下你的问题）

2、截图
（对帮助你或者描述清楚问题有用的截图，可以多张）

3、期望
（你期望的结果或获得怎么样的帮助）

4、更多
（需要补充的，如果没有可以空着）

--------------------------------------------------------------------------------------------------------------

邮件创建时间：${new Date()}

`
let emailUrl: string = `mailto:1904314465@qq.com?subject=${encodeURIComponent(
    "h5office 期望获得帮助"
)}&body=${encodeURIComponent(emailBody)}`

</script>

<style lang="scss" scoped>
.dialog-view {
    &>.mask {
        background-color: rgba(230, 227, 227, 0.726);
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

.main-view {
    .content {
        min-height: calc(100vh - 112px);
    }

    .foot {
        background-color: rgb(244, 244, 244);
        padding: 0 20px;
        line-height: 50px;
        color: rgb(26, 26, 26);
        font-size: 14px;

        .right {
            float: right;
        }

        a {
            color: inherit;
            margin-right: 20px;
            text-decoration: underline;
            font-weight: 800;

            &.heart {
                background-image: url("./images/heart.svg");
                background-repeat: no-repeat;
                padding-left: 30px;
            }
        }
    }
}
</style>