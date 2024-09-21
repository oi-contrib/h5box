<template>
    <div class="container" ref="elRef" @mousedown="doStart" @mousemove="doMove" @mouseup="doEnd"></div>
</template>
<script setup lang="ts">
import type CanvasType from "vislite/types/Canvas";

import { ref, onMounted } from "vue";
import { Canvas, ruler, throttle } from "vislite";
import PointIn from 'pointin';
import data from "./data";

let color = "#e94782";
let gradient = ['rgb(255, 158, 68)', 'rgb(255, 70, 131)'];

let boxWidth = 900, boxHeight = 500;

let grid = {
    left: 55,
    top: 20,
    right: 55,
    bottom: 30
};

let zoom = {
    x: 0,
    y: 0,
    height: 26,
    width: 0,
    bottom: 10,
    beginIndex: Math.round((data.length - 1) * 0.3),
    endIndex: Math.round((data.length - 1) * 0.7)
};

let min = data[0].value, max = data[0].value;
for (let item of data) {
    if (item.value > max) max = item.value;
    if (item.value < min) min = item.value;
}

let pointIn = new PointIn(), zoomPosition = 0, zoomHandler: "beginIndex" | "endIndex" | "" = "", handler1x = 0, handler2x = 0, zoomIndexOne = 0, zoomValueOne = 0, updateView: any = null;

let helpCache = { beginIndex: 0, endIndex: 0 };

let elRef = ref();

let doStart = function (event: MouseEvent) {
    if (!updateView) return;
    pointIn.setPoint(event.offsetX, event.offsetY);

    if (pointIn.rect(handler1x - 3, zoom.y, 6, zoom.height)) zoomHandler = "beginIndex";
    else if (pointIn.rect(handler2x - 3, zoom.y, 6, zoom.height)) zoomHandler = "endIndex";
    else if (pointIn.rect(handler1x, zoom.y - 7, handler2x - handler1x, 7)) {
        zoomPosition = event.offsetX;
        helpCache.beginIndex = zoom.beginIndex;
        helpCache.endIndex = zoom.endIndex;
    }
};

let doMove = function (event: MouseEvent) {
    // 修改边界
    if (zoomHandler) {
        let x;
        if (event.offsetX <= zoom.x) x = 0;
        else if (event.offsetX >= zoom.x + zoom.width) x = zoom.width;
        else x = event.offsetX - zoom.x;

        let index = Math.round(x / zoomIndexOne);

        if (zoom[zoomHandler] != index) {
            zoom[zoomHandler] = index

            if (zoom.beginIndex > zoom.endIndex) {
                let temp = zoom.beginIndex;
                zoom.beginIndex = zoom.endIndex;
                zoom.endIndex = temp;
                zoomHandler = zoomHandler == "beginIndex" ? "endIndex" : "beginIndex";
            }
            updateView(true);
        }
    }

    // 移动
    else if (zoomPosition) {
        let indexChange = Math.round((event.offsetX - zoomPosition) / zoomIndexOne);
        if (helpCache.beginIndex + indexChange < 0) indexChange = -helpCache.beginIndex;
        else if (helpCache.endIndex + indexChange >= data.length) indexChange = data.length - helpCache.endIndex - 1;

        zoom.beginIndex = helpCache.beginIndex + indexChange;
        zoom.endIndex = helpCache.endIndex + indexChange;
        updateView(true);
    }
};

let doEnd = function () {
    if (zoomHandler || zoomPosition) {
        zoomHandler = "";
        zoomPosition = 0;
        updateView(false);
    }
};

let zoomCache: HTMLImageElement;
let getZoomBackground = (painter: CanvasType) => {
    return new Promise(resolve => {
        if (zoomCache) resolve(zoomCache)
        else {

            // 轮廓
            painter.config({
                strokeStyle: "#e8ecf6"
            }).strokeRect(zoom.x, zoom.y, zoom.width, zoom.height);

            // 内容
            painter.config({
                fillStyle: "#ebeff8",
                lineWidth: 2,
                lineJoin: "round"
            }).beginPath();
            for (let index = 0; index < data.length; index++) {
                let item = data[index];
                painter.lineTo(zoom.x + index * zoomIndexOne, zoom.y + zoom.height - zoomValueOne * (item.value - min));
            }
            painter.stroke().lineTo(zoom.x + zoom.width, zoom.y + zoom.height).lineTo(zoom.x, zoom.y + zoom.height).fill();

            painter.toDataURL().then(base64 => {
                let imgInstance = new Image()
                imgInstance.onload = () => {
                    zoomCache = imgInstance;
                    resolve(zoomCache);
                }
                imgInstance.src = base64;
            });
        }
    });
};

onMounted(() => {
    zoom.x = grid.left;
    zoom.y = boxHeight - zoom.height - zoom.bottom;
    zoom.width = boxWidth - grid.left - grid.right;

    zoomIndexOne = zoom.width / (data.length - 1);
    zoomValueOne = zoom.height / (max - min);

    let painter = new Canvas(elRef.value, {
        region: false
    });
    updateView = throttle((isMoving: boolean) => {
        painter.config({
            fillStyle: "white"
        }).fillRect(0, 0, boxWidth, boxHeight).reset();

        getZoomBackground(painter).then(zoomBackground => {

            /**
             * 绘制zoom
             */
            handler1x = zoom.x + zoom.beginIndex * zoomIndexOne;
            handler2x = zoom.x + zoom.endIndex * zoomIndexOne;

            painter.drawImage(zoomBackground as string, 0, 0, boxWidth, boxHeight)
                .then(() => {

                    // 选中区域
                    painter.config({
                        fillStyle: "rgba(33,150,240,0.2)"
                    }).fillRect(handler1x, zoom.y, handler2x - handler1x, zoom.height);

                    // 控制移动区域
                    let hdist = handler2x - handler1x;
                    if (hdist > 20) {
                        painter.config({
                            fillStyle: "#dfe5f3"
                        }).fillRect(handler1x, zoom.y, hdist, -7)
                            .config({
                                fillStyle: "white"
                            }).fillRect(handler1x + hdist * 0.5 - 5, zoom.y - 2, 10, -3);
                    }

                    // 2个把柄
                    painter.config({
                        strokeStyle: "#bbc8e3",
                        fillStyle: "white"
                    })
                        .beginPath().moveTo(handler1x, zoom.y).lineTo(handler1x, zoom.y + zoom.height).stroke()
                        .beginPath().moveTo(handler2x, zoom.y).lineTo(handler2x, zoom.y + zoom.height).stroke()
                        .fullRect(handler1x - 3, zoom.y + 5, 6, zoom.height - 10)
                        .fullRect(handler2x - 3, zoom.y + 5, 6, zoom.height - 10);

                    // 边界文字
                    if (isMoving) {
                        painter.config({
                            fillStyle: "#aaa",
                            textAlign: "right",
                            fontSize: 10
                        })
                            .fillText(data[zoom.beginIndex].name, handler1x - 5, zoom.y + zoom.height * 0.5)
                            .config({
                                textAlign: "left"
                            })
                            .fillText(data[zoom.endIndex].name, handler2x + 5, zoom.y + zoom.height * 0.5);
                    }

                    /**
                     * 绘制折线图
                     */

                    let _min = data[zoom.beginIndex].value, _max = data[zoom.beginIndex].value;
                    for (let index = zoom.beginIndex + 1; index <= zoom.endIndex; index++) {
                        let item = data[index];
                        if (item.value > _max) _max = item.value;
                        if (item.value < _min) _min = item.value;
                    }

                    if (gradient) {
                        if (_min > 0) _min = 0;
                        if (_max < 0) _max = 0;
                    }

                    let rulerData = ruler(_max, _min, 5);
                    _min = rulerData[0];
                    _max = rulerData[rulerData.length - 1];

                    let bootomPosition = boxHeight - grid.bottom - zoom.bottom - zoom.height;

                    let getYByValue = (value: number) => {
                        return bootomPosition - (value - _min) / (_max - _min) * (bootomPosition - grid.top);
                    };

                    let getXByIndex = (index: number) => {
                        return grid.left + (boxWidth - grid.left - grid.right) * (index - zoom.beginIndex) / (zoom.endIndex - zoom.beginIndex);
                    };

                    // 绘制Y刻度尺
                    painter.config({
                        fillStyle: "#75777f",
                        strokeStyle: "#e0e6f1",
                        textAlign: "right",
                        textBaseline: "middle",
                        fontSize: 10,
                        lineWidth: 0.5
                    });
                    for (let rulerValue of rulerData) {
                        let y = getYByValue(rulerValue);
                        painter.fillText(rulerValue, grid.left - 2, y)
                            .beginPath().moveTo(grid.left, y).lineTo(boxWidth - grid.right, y).stroke();
                    }

                    // 绘制X刻度尺
                    painter.config({
                        textBaseline: "top"
                    }).fillText(data[zoom.endIndex].name, boxWidth - grid.right, bootomPosition + 5)
                        .config({
                            textAlign: "left"
                        }).fillText(data[zoom.beginIndex].name, grid.left, bootomPosition + 5);

                    if (gradient) {

                        // 绘制填充区域
                        let zeroY = getYByValue(0);
                        let deep = (zeroY - grid.top) / (bootomPosition - grid.top);
                        painter.beginPath();
                        for (let index = zoom.beginIndex; index <= zoom.endIndex; index++) {
                            painter.lineTo(getXByIndex(index), getYByValue(data[index].value));
                        }
                        painter.config({
                            fillStyle: painter.createLinearGradient(0, grid.top, 0, bootomPosition)
                                .setColor(0, gradient[0])
                                .setColor(deep, gradient[1])
                                .setColor(1, gradient[0])
                                .value()
                        }).lineTo(boxWidth - grid.right, zeroY)
                            .lineTo(grid.left, zeroY).fill();
                    }

                    // 绘制线条
                    painter.config({
                        lineWidth: 2,
                        strokeStyle: color
                    }).beginPath();
                    for (let index = zoom.beginIndex; index <= zoom.endIndex; index++) {
                        painter.lineTo(getXByIndex(index), getYByValue(data[index].value));
                    }
                    painter.stroke();
                });
        });
    }, {
        time: 50
    });

    updateView();
});
</script>
<style lang="scss" scoped>
.container {
    width: 900px;
    height: 500px;
    margin: 50px auto;
}
</style>