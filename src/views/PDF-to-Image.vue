<template>
  <div class="container">
    <ui-select-file @change="doChange" title="PDF转图片" tips="选择一份或多份PDF文件后，可以把这些文件转成图片" type="pdf"></ui-select-file>

    <div class="process" v-if="isWork">
      <div class="text">正在生成图片，请耐心等待</div>
      <div class="line" :style="{ borderLeftWidth: +(process * 3 + 1) + 'px' }">
        <span> 进度：{{ process }}% </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import uiSelectFile from "@/components/select-file.vue";
import * as pdfjsLib from "pdfjs-dist";
import { useDialogStore } from "../stores/index";

let dialogStore = useDialogStore();

let pdfjsLibPath =
  import.meta.env.MODE == "development"
    ? "http://localhost:20000/node_modules/pdfjs-dist"
    : "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  pdfjsLibPath + "/build/pdf.worker.min.js";

let isWork = ref(false);
let process = ref(0);

let doChange = (files: FileList) => {
  let doPdfFile = function (index: number) {
    let file = files[index];

    let reader = new FileReader();
    reader.onload = function () {
      pdfjsLib
        .getDocument({
          url: reader.result as string,

          // 解决部分文字未正确显示问题
          cMapPacked: true,
          cMapUrl: pdfjsLibPath + "/cmaps/",
        })
        .promise.then((pdf: any) => {
          let doPdfPage = function (pagenum: number) {
            pdf.getPage(pagenum + 1).then(function (page: any) {
              let viewport = page.getViewport({ scale: 1 });

              let canvas = document.createElement("canvas");
              let context = canvas.getContext("2d", {
                willReadFrequently: true,
              });

              let CSS_UNITS = (3 * 96) / 72;

              canvas.width = Math.floor(viewport.width * CSS_UNITS);
              canvas.height = Math.floor(viewport.height * CSS_UNITS);

              let pageRendering = page.render({
                canvasContext: context as CanvasRenderingContext2D,
                transform: [CSS_UNITS, 0, 0, CSS_UNITS, 0, 0],
                viewport,
              });

              // 等render渲染完毕后，触发下载
              pageRendering.promise.then(function () {
                let url = canvas.toDataURL("image/jpeg");

                let a = document.createElement("a");
                a.href = url;
                a.download =
                  file.name.replace(".pdf", "") +
                  (pdf.numPages > 1 ? "_" + (pagenum + 1) : "") +
                  ".jpg";

                a.click();

                let _process = +(
                  ((index + pagenum / pdf.numPages) / files.length) *
                  100
                ).toFixed(2);
                process.value = _process > 99.99 ? 99.99 : _process;

                if (pagenum + 1 >= pdf.numPages) {
                  if (index + 1 >= files.length) {
                    process.value = 100;

                    dialogStore.openDialog({
                      id: "confirm",
                      data: ["温馨提示", "所有PDF文件已全部转换成图片，请去浏览器默认下载地方查看！", true],
                      callback() {
                        isWork.value = false;
                        process.value = 0;
                      },
                    });
                  } else {
                    doPdfFile(index + 1);
                  }
                } else {
                  doPdfPage(pagenum + 1);
                }
              });
            });
          };

          // 启动页列表
          doPdfPage(0);
        })
        .catch((e: any) => {
          console.error(e);
        });
    };

    reader.readAsDataURL(file);
  };

  // 启动文件列表
  doPdfFile(0);
  isWork.value = true;
};
</script>
<style lang="scss" scoped>
.container {
  .process {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(255, 255, 255);
    text-align: center;
    padding-top: 50px;
    font-size: 14px;

    .text {
      font-weight: 800;
    }

    .line {
      border: 1px solid red;
      width: 300px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      display: inline-block;
      margin-top: 10px;
      text-align: left;
      position: relative;

      &>span {
        position: absolute;
        right: 0;
        padding-left: 10px;
        width: 300px;
        color: #585656;
      }
    }
  }
}
</style>