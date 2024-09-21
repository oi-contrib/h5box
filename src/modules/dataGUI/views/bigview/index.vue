<template>
    <div class="container" ref="elRef">

        <!-- 大标题  -->
        <div class="title-view">
            <div class="title" :style="{
                fontSize: titleSize + 'px'
            }">
                可视化大屏
            </div>
        </div>

        <!-- 左上 -->
        <div class="view-item" style="left: 1%;top: 6%">
            <div class='sub-title'>全国部门数据信息</div>

        </div>

        <!-- 左中 -->
        <div class="view-item" style="left: 1%;top: 37.5%">
            <div class='sub-title'>金融业务</div>

        </div>

        <!-- 左下 -->
        <div class="view-item" style="left: 1%;top: 69%">
            <div class='sub-title'>股票变化情况</div>

        </div>

        <!-- 右上 -->
        <div class="view-item" style="right: 1%;top: 6%">
            <div class='sub-title'>三大产业占比</div>

        </div>

        <!-- 右中 -->
        <div class="view-item" style="right: 1%;top: 37.5%">
            <div class='sub-title'>掘进效率</div>

        </div>

        <!-- 右下 -->
        <div class="view-item" style="right: 1%;top: 69%">
            <div class='sub-title'>万吨掘进率</div>

        </div>

        <!-- 中下左 -->
        <div class="view-item" style="left: 24%;top: 69%;width: 25.5%;">
            <div class='sub-title'>一周数据变化</div>

        </div>

        <!-- 中下右 -->
        <div class="view-item" style="right: 24%;top: 69%;width: 25.5%;">
            <div class='sub-title'>一周数据明细</div>

        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

let elRef = ref();

let titleSize = ref(30);
let updateSize = () => {
    let width = 1920;
    let height = 1920 * (window.innerHeight - 60) / window.innerWidth;
    let scaleVal = window.innerWidth / 1920;

    elRef.value.style.transform = 'scale(' + scaleVal + ',' + scaleVal + ' )';
    elRef.value.style.width = width + "px";
    elRef.value.style.height = height + 'px';

    titleSize.value = height * 0.03;
};

onMounted(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateSize);
});

</script>
<style lang="scss" scoped>
.container {
    background: linear-gradient(90deg, rgb(183, 194, 198) 0%, rgb(6, 24, 85) 0%, rgb(2, 71, 148) 55%, rgb(8, 21, 73) 100%, rgb(17, 61, 75) 100%);
    position: absolute;
    transform-origin: left top;
    left: 0;
    top: 60px;

    &>.title-view {
        position: absolute;
        left: 0%;
        top: 0%;
        width: 100%;
        height: 9%;
        background-image: url("@/images/head_bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center top;

        &>.title {
            color: #d7d7d7;
            text-align: center;
            line-height: 40px;
            position: relative;
            top: calc(50% - 20px);
            font-weight: 800;
        }
    }

    &>.view-item {
        position: absolute;
        width: 22%;
        height: 30%;
        background-color: rgb(146 199 225 / 9%);

        &>.sub-title {
            position: absolute;
            background-color: #607d8b38;
            width: 100%;
            line-height: 30px;
            padding-left: 10px;
            color: white;
            font-size: 20px;
        }
    }
}
</style>