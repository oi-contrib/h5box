<template>
    <div class='container' :style='{
        height: "calc(100vh - 60px)",
        width: "100vw",
        backgroundColor: "#ebebeb",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: "60px",
    }'>

        <div class='itemsview' :style='{
        width: "calc(100vw - 40px)",
        height: "calc(100vh - 100px)",
        backgroundColor: "white",
        outline: "1px solid #9E9E9E",
        borderRadius: "10px",
        columnCount: "auto",
        columnWidth: "220px",
        columnGap: "10px",
        padding: "10px",
        overflow: "auto"
    }'>

            <div class='item' @click="router.push('/manual-unlocking')">
                <span class="powerby">主要基于：VISLite</span>
                <div class="icon" :style='{
        height: "310px",
        backgroundImage: "url(../snipping/manual-unlocking.jpeg)",
    }'></div>
                <h4 class='label'>手式解锁</h4>
            </div>

            <div class='item' @click="router.push('/zoom-line')">
                <span class="powerby">主要基于：VISLite</span>
                <div class="icon" :style='{
        height: "120px",
        backgroundImage: "url(../snipping/zoom-line.jpeg)",
    }'></div>
                <h4 class='label'>可缩放折线图</h4>
            </div>

            <div class='item' @click="router.push('/bigview')">
                <span class="powerby">主要基于：VISLite</span>
                <div class="icon" :style='{
        height: "140px",
        backgroundImage: "url(../snipping/bigview.jpeg)",
    }'></div>
                <h4 class='label'>可视化大屏</h4>
            </div>

            <div class='item' @click="router.push('/tree-orient-top-bottom')">
                <span class="powerby">主要基于：VISLite</span>
                <div class="icon" :style='{
        height: "160px",
        backgroundImage: "url(../snipping/tree-orient-top-bottom.jpeg)",
    }'></div>
                <h4 class='label'>从上到下树状图</h4>
            </div>

            <div class='item' @click="router.push('/ring3d')">
                <span class="powerby">主要基于：VISLite</span>
                <div class="icon" :style='{
        height: "200px",
        backgroundImage: "url(../snipping/ring3d.jpeg)",
    }'></div>
                <h4 class='label'>3D环图</h4>
            </div>

            <div class='item' @click="router.push('/sankey')">
                <span class="powerby">主要基于：VISLite</span>
                <div class="icon" :style='{
        height: "180px",
        backgroundImage: "url(../snipping/sankey.jpeg)",
    }'></div>
                <h4 class='label'>桑基图</h4>
            </div>

            <div class='item' @click="router.push('/h2o')">
                <span class="powerby">主要基于：VISLite</span>
                <div class="icon" :style='{
        height: "160px",
        backgroundImage: "url(../snipping/h2o.png)",
    }'></div>
                <h4 class='label'>水分子式 H2O</h4>
            </div>

            <div class='item' @click="router.push('/tree-radial')">
                <span class="powerby">主要基于：VISLite</span>
                <div class="icon" :style='{
        height: "240px",
        backgroundImage: "url(../snipping/tree-radial.jpeg)",
    }'></div>
                <h4 class='label'>径向树状图</h4>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
let router = useRouter();

import "oipage/stylecss/skeleton.css";
</script>
<style lang="scss" scoped>
.container {
    overflow: hidden;

    .bigview {
        box-shadow: 0 0 14px 5px #767676;
        cursor: pointer;

        &:hover {
            box-shadow: rgb(71 70 70) 0px 0px 17px 8px;
        }
    }

    .itemsview {
        &>.item {
            break-inside: avoid;
            width: 220px;
            display: inline-block;
            margin-bottom: 10px;
            text-align: center;
            margin-left: 5px;
            cursor: pointer;
            position: relative;

            &>.powerby {
                position: absolute;
                font-size: 12px;
                background-color: #000000;
                padding: 2px 5px;
                color: #ffffff;
                border-radius: 10px;
                white-space: nowrap;
                transform-origin: right top;
                transform: scale(0.7);
                font-weight: 800;
                right: 0;
                top: 0;
            }

            &:hover {
                text-decoration: underline;

                &>.icon {
                    background-size: 105% auto;
                }
            }

            &>.icon {
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center center;
                transition-property: background-size;
                transition-duration: 200ms;
            }

            &>.label {
                line-height: 26px;
                font-size: 14px;
                color: black;
            }
        }
    }
}
</style>