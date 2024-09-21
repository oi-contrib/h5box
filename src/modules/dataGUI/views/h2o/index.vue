<template>
    <div class="container" ref="elRef"></div>
</template>
<script setup lang="ts">
import type GeometryResultType from "../../../../../types/GeometryResult";

import { ref, onMounted, onBeforeUnmount } from "vue"
import { getWebGLContext, Shader, Buffer, Matrix4 } from "vislite";
import Geometry from "../../../../tools/geometry/index";

import vshaderColor from "./vshader.c";
import fshaderColor from "./fshader.c";

let elRef = ref();
let isClose = false;

onMounted(() => {

    let geometry = new Geometry();

    let painter = getWebGLContext(elRef.value);
    let shader = new Shader(painter).compile(vshaderColor, fshaderColor).use();
    let buffer = new Buffer(painter).use();

    painter.enable(painter.DEPTH_TEST);

    // 氢原子
    let H1_Geometry = geometry.sphere(-0.7, 0, 0, 0.36);
    let H2_Geometry = geometry.sphere(0.7, 0, 0, 0.36);

    // 氧原子
    let O_Geometry = geometry.sphere(0, 0.7, 0, 0.5);

    // 化学键（左）
    let L_left_Geometry = geometry.cylinder(-0.7, 0, 0, 0.16, 0, 0.7, 0);

    // 化学键（右）
    let L_right_Geometry = geometry.cylinder(0.7, 0, 0, 0.16, 0, 0.7, 0);

    let globalMatrix4 = new Matrix4();

    let u_camera = painter.getUniformLocation(shader.program, "u_matrix");
    let a_position = painter.getAttribLocation(shader.program, "a_position");
    let u_color = painter.getUniformLocation(shader.program, "u_color");

    let drawGeometry = function (geometryData: Array<GeometryResultType>) {
        for (let index = 0; index < geometryData.length; index++) {
            buffer.write(new Float32Array(geometryData[index].points)).divide(a_position, 3, 3, 0);
            painter.drawArrays(painter[geometryData[index].method], 0, geometryData[index].length);
        }
    }

    function freshView() {

        // 首先，每次围绕x轴旋转一点点
        painter.uniformMatrix4fv(u_camera, false, globalMatrix4.rotate(0.05, -1, 0.2, 0, 1, 0.2, 0).value());

        // 设置为绘制氧原子颜色
        painter.uniform4f(u_color, 1, 0.2, 0.2, 1.0);

        // 绘制氧原子
        drawGeometry(O_Geometry);

        // 设置为绘制氢原子颜色
        painter.uniform4f(u_color, 0.6, 0.6, 0.6, 1.0);

        // 绘制氢原子（左）
        drawGeometry(H1_Geometry);

        // 绘制氢原子（右）
        drawGeometry(H2_Geometry);

        // 设置为绘制化学键颜色
        painter.uniform4f(u_color, 0.2, 0.3, 0.1, 0.4);

        // 绘制化学键（左）
        drawGeometry(L_left_Geometry);

        // 绘制化学键（右）
        drawGeometry(L_right_Geometry);

    }

    (function doit() {
        freshView();
        if (!isClose) requestAnimationFrame(doit);
    })();

});

onBeforeUnmount(() => {
    isClose = true;
});

</script>
<style lang="scss" scoped>
.container {
    width: 500px;
    height: 500px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
</style>