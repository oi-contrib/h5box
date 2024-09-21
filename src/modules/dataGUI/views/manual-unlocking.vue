<template>
    <div class="container" ref="elRef">
        <div :style='{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            textAlign: "center",
            pointerEvents: "none"
        }'>
            <div :style='{
            backgroundImage: "url(../zxl20070701.jpg)",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            display: "inline-block",
            marginTop: "30px",
            fontSize: "0",
            backgroundSize: "100% auto"
        }'>头像</div>
            <div :style='{
            fontSize: "14px",
            fontFamily: "cursive",
            fontStyle: "italic",
            lineHeight: "50px",
            color: "#6e7476"
        }'>
                请绘制手势密码
            </div>
            <div :style='{
            fontSize: "16px",
            color: "black"
        }'>
                z Z ...
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type CanvasType from 'vislite/types/Canvas';

import { ref, onMounted } from "vue";
import { Canvas } from "vislite";
// import isMobile from "../../../tools/isMobile";
import offsetValue from "../../../tools/offsetValue";

let elRef = ref();

let updateView = (painter: CanvasType, circles: Array<[number, number]>, endPoint?: [number, number]) => {
    let info = painter.getInfo();

    painter.clearRect(0, 0, info.width, info.height);
    let width = info.width * 0.85;

    let gapSize = (info.width - width) * 0.5;
    let itemSize = width / 3;
    let itemRadius = itemSize * 0.75 * 0.5;

    // 绘制圆球
    painter.config({
        strokeStyle: "#555",
        lineWidth: 1
    });
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            painter.setRegion(i + "-" + j);

            let cx = gapSize + (i + 0.5) * itemSize;
            let cy = info.height - (2.5 - j) * itemSize - gapSize;

            painter

                // 进入区域模式，记录区域
                .onlyRegion(true).fillCircle(cx, cy, itemRadius)

                // 退出区域模式，绘制图形
                .onlyRegion(false).strokeCircle(cx, cy, itemRadius);
        }
    }

    // 进入视图模式，绘制选中轨迹
    painter.setRegion("").onlyView(true);

    for (let index = 0; index < circles.length; index++) {
        let i = circles[index][0];
        let j = circles[index][1];

        let cx = gapSize + (i + 0.5) * itemSize;
        let cy = info.height - (2.5 - j) * itemSize - gapSize;

        painter.config({
            fillStyle: "#abd5e3"
        }).fillCircle(cx, cy, itemRadius).config({
            fillStyle: "#3b9ee1"
        }).fillCircle(cx, cy, itemRadius * 0.3);
    }

    painter.config({
        strokeStyle: "#3b9ee1",
        lineWidth: itemRadius * 0.1
    }).beginPath();

    for (let index = 0; index < circles.length; index++) {
        let i = circles[index][0];
        let j = circles[index][1];

        let cx = gapSize + (i + 0.5) * itemSize;
        let cy = info.height - (2.5 - j) * itemSize - gapSize;

        painter.lineTo(cx, cy);
    }

    if (endPoint) painter.lineTo(endPoint[0], endPoint[1]);
    painter.stroke()

        // 退出视图模式
        .onlyView(false);

};

onMounted(() => {
    let painter = new Canvas(elRef.value);

    let isDown = false;
    let circles: Array<[number, number]> = [];

    updateView(painter, circles);

    let doMousedown = (x: number, y: number) => {

        painter.getRegion(x, y).then(regionName => {
            if (regionName) {
                circles = [];
                isDown = true;
            }
        });
    };

    let preRegionName = "";
    let doMousemove = (x: number, y: number) => {
        if (isDown) {
            painter.getRegion(x, y).then(regionName => {

                if (regionName && regionName != preRegionName) {
                    preRegionName = regionName;

                    let regionArray = regionName.split("-");
                    circles.push([+regionArray[0], +regionArray[1]]);
                }

                updateView(painter, circles, [x, y]);
            });
        }
    };

    let doMouseup = () => {
        isDown = false;
        updateView(painter, circles);

        let values: Array<number> = [];
        for (let index = 0; index < circles.length; index++) {
            values.push(circles[index][1] * 3 + circles[index][0] + 1);
        }

        if (values.length > 0)
            setTimeout(() => {
                alert("解锁密码：" + values.join("-"));

                updateView(painter, []);
            }, 50);
    };

    // if (isMobile) {

    elRef.value.addEventListener("touchstart", (event: MouseEvent) => {
        doMousedown(...offsetValue(elRef.value, event));
    }, false);


    elRef.value.addEventListener("touchmove", (event: MouseEvent) => {
        doMousemove(...offsetValue(elRef.value, event));
    }, false);

    elRef.value.addEventListener("touchend", doMouseup, false);

    // } else {
    elRef.value.addEventListener("mousedown", (event: MouseEvent) => {
        doMousedown(...offsetValue(elRef.value, event));
    }, false);

    elRef.value.addEventListener("mousemove", (event: MouseEvent) => {
        doMousemove(...offsetValue(elRef.value, event));
    }, false);

    elRef.value.addEventListener("mouseup", doMouseup, false);
    // }
});
</script>
<style lang="scss" scoped>
.container {
    background-color: #e7e7e7;
    width: 300px;
    height: 480px;
    position: fixed;
    left: 50vw;
    top: 50vh;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 10px;
    box-shadow: 0 0 14px 5px #767676;
}
</style>