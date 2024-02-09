<template>
  <div class="main-view">
    <h1>
      h5office
      <div class="tips">提供H5版本的自动化办公常用处理方法</div>
      <div class="goback" @click="router.push('/')">返回首页 &gt;&gt;</div>
    </h1>
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
        <a href="https://github.com/fragement-contrib/h5office" target="_blank">查看源码</a>
        <a href="https://github.com/fragement-contrib/h5office/issues" target="_blank">联系我们</a>
        <span>
          邮箱：<a :href="emailUrl" target="_blank">1904314465@qq.com</a>
        </span>
      </div>
    </footer>
  </div>
  <div class="dialog-view">
    <!-- 统一遮罩 -->
    <div class="mask"></div>
    <ui-dialogs v-for="(dialog, index) in dialogStore.fetchList" :id="dialog.id" :data="dialog.data"
      :key="index"></ui-dialogs>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

import { useDialogStore } from "./stores/index";
import uiDialogs from "./components/dialogs.vue";

let router = useRouter();

let dialogStore = useDialogStore();

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

`;
let emailUrl: string = `mailto:1904314465@qq.com?subject=${encodeURIComponent(
  "h5office 期望获得帮助"
)}&body=${encodeURIComponent(emailBody)}`;

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
  &>h1 {
    line-height: 60px;
    border-bottom: 1px solid rgb(232, 232, 232);
    background-image: url("./images/logo.jpeg");
    background-repeat: no-repeat;
    background-size: auto 90%;
    background-position: 20px center;
    padding-left: 90px;

    &>.tips {
      display: inline-block;
      font-size: 14px;
      vertical-align: bottom;
      font-weight: 400;
      color: gray;
    }

    &>.goback {
      white-space:nowrap;
      position: fixed;
      right: 0;
      top: 10px;
      width: 100px;
      line-height: 30px;
      background-color: #F44336;
      color: white;
      padding: 5px 10px;
      font-size: 14px;
      border-radius: 5px 0 0 5px;
      cursor: pointer;
    }
  }

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