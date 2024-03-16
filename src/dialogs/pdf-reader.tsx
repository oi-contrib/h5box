import { defineComponent, ref } from 'vue'
import AppFrame from '@/components/app-frame.vue'

let icon = new URL('../images/pdf.png', import.meta.url).href
let addFile = new URL('../images/addFile.svg', import.meta.url).href

import * as pdfjsLib from "pdfjs-dist"
import { pdfjsLibPath, pdfjsWorkerSrc } from "@/common/utils/pdfjs"

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc

export default defineComponent({
    setup() {

        let viewRef = ref()

        let doChange = (event: any) => {
            let file = event.target.files[0]

            let reader = new FileReader()
            reader.onload = function () {

                pdfjsLib
                    .getDocument({
                        url: reader.result as string,

                        // 解决部分文字未正确显示问题
                        cMapPacked: true,
                        cMapUrl: pdfjsLibPath + "/cmaps/",
                    })
                    .promise.then((pdf: any) => {

                        viewRef.value.innerHTML = ""
                        viewRef.value.style.backgroundColor = "#d0d0d0"

                        for (let index = 0; index < pdf.numPages; index++) {

                            let canvas = document.createElement("canvas")

                            viewRef.value.appendChild(canvas)

                            pdf.getPage(index + 1).then(async function (page: any) {
                                let viewport = page.getViewport({ scale: 1 })
                                let context = canvas.getContext("2d")

                                let CSS_UNITS = 2 // (3 * 96) / 72

                                canvas.width = Math.floor(viewport.width * CSS_UNITS)
                                canvas.height = Math.floor(viewport.height * CSS_UNITS)

                                canvas.style.width = "70%"
                                canvas.style.marginBottom = "30px"

                                page.render({
                                    canvasContext: context as CanvasRenderingContext2D,
                                    transform: [CSS_UNITS, 0, 0, CSS_UNITS, 0, 0],
                                    viewport,
                                })

                            })

                        }
                    })

            }

            reader.readAsDataURL(file)
        }

        return () => {
            return (<AppFrame icon={icon} title="PDF阅读器">

                <div style={{
                    height: "calc(100% - 30px)"
                }}>
                    <div ref={viewRef} style={{
                        overflow: "auto",
                        textAlign: "center",
                        height: "100%",
                        paddingTop: "30px"
                    }}>
                        <div style={{
                            paddingTop: "100px",
                            fontSize: "30px",
                            fontStyle: "italic",
                            fontWeight: "200",
                            color: "#8aa0aa"
                        }}>
                            你可以点击“右下方”按钮选择PDF文件
                        </div>
                    </div>
                    <input style={{
                        display: "none"
                    }} type="file" id="input" onChange={(event) => doChange.call(this, event)} accept="application/pdf" />
                    <label style={{
                        position: "absolute",
                        right: "10px",
                        bottom: "10px",
                        lineHeight: "50px",
                        display: "inline-block",
                        border: "1px solid gray",
                        backgroundImage: "url('" + addFile + "')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "5px center",
                        backgroundSize: "auto 70%",
                        paddingLeft: "40px",
                        paddingRight: "10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        backgroundColor: "#f6f2f4"
                    }} htmlFor="input"> 打开PDF文件 </label>
                </div>

            </AppFrame>)
        }
    }
})