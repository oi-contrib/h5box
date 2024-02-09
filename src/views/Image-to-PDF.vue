<template>
    <div class="container">
        <ui-select-file @change="doChange" title="图片转PDF" tips="选择一张或多张图片后，可以把这些图片拼接成一个PDF文件" type="image"></ui-select-file>
        <iframe ref="iframe"></iframe>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import uiSelectFile from "@/components/select-file.vue";

let iframe = ref(null)
let doChange = (files: FileList) => {
    let promises = [];

    let template = "";
    for (let index = 0; index < files.length; index++) {
        let file = files[index];

        promises.push(new Promise(function (resolve) {

            let reader = new FileReader();

            reader.onload = function () {

                template += '<div style="display: flex;justify-content: center;align-items: center;height: 100vh;width: 100vw;"><img src="' + reader.result + '" style="max-width: 100vw;max-height: 100vh;"></img></div>';
                resolve("");
            };
            reader.readAsDataURL(file);
        }));
    }

    Promise.all(promises).then(function () {
        if (iframe.value) {
            let iframeEl = iframe.value as HTMLIFrameElement;
            let iframeWindow = iframeEl.contentWindow as Window;
            let iframeDocument = iframeEl.contentWindow?.document as Document;

            iframeDocument.open();
            iframeDocument.write(`<style>body{margin:0px;}</style>` + template);
            iframeDocument.close();

            setTimeout(function () {
                iframeWindow.print();
            }, 500);
        }
    });
};
</script>
<style lang="scss" scoped>
.container {
    iframe {
        display: none;
    }
}
</style>