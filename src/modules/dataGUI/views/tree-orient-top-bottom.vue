<template>
    <div class="container" ref="elRef"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Canvas, TreeLayout } from "vislite";
import data from "@/data/flare.json";

let elRef = ref();

onMounted(() => {
    let mycontent = elRef.value;
    let painter = new Canvas(mycontent).config({
        fontSize: 9
    });


    var width = mycontent.clientWidth;
    var height = mycontent.clientHeight;

    let pid, dist;

    var treeLayout = new TreeLayout({
        "id": function (treedata) {
            return treedata.name
        }
    }).setOption({
        type: "rect",
        direction: "TB",
        x: width * 0.5,
        y: 50,
        width: width - 140,
        height: height - 120
    }).bind(data, function (tree) {
        painter.clearRect(0, 0, width, height);

        // 绘制连线
        painter.setRegion("").config({
            strokeStyle: '#cccccc'
        });
        for (var key in tree.node) {
            if (tree.node[key].show && key != tree.root) {
                pid = tree.node[key].pid

                dist = (tree.node[key].top - tree.node[pid].top) * 0.5;

                painter
                    .beginPath()
                    .moveTo(tree.node[key].left, tree.node[key].top)
                    .bezierCurveTo(
                        tree.node[key].left, tree.node[key].top - dist,
                        tree.node[pid].left, tree.node[pid].top + dist,
                        tree.node[pid].left, tree.node[pid].top
                    ).stroke();
            }
        }

        // 绘制节点和文字
        painter.config({
            strokeStyle: '#b0c4de'
        });
        for (var key in tree.node) {
            if (tree.node[key].show) {
                if (!tree.node[key].isOpen && tree.node[key].children.length > 0) {
                    painter.config({
                        fillStyle: "#b0c4de"
                    });
                } else {
                    painter.config({
                        fillStyle: "#ffffff"
                    });
                }
                painter.setRegion(key).fullCircle(tree.node[key].left, tree.node[key].top, 4);

                painter.setRegion("").config({
                    fillStyle: "black"
                }).fillText("  " + key.replace(/\-\d+$/, ''), tree.node[key].left, tree.node[key].top, Math.PI * 0.5);
            }
        }

    }, {
        analytics: true,
        animate: true,
        physics: true,
        scale: true,
        util: true,
        vis: true
    });

    mycontent.addEventListener('click', function (event:MouseEvent) {
        painter.getRegion(event.offsetX, event.offsetY).then(function (regionName) {
            if (regionName) {
                treeLayout.toggleNode(regionName);
            }
        });

    });

});
</script>
<style lang="scss" scoped>
.container {
    width: 900px;
    height: 600px;
    margin: auto;
}
</style>