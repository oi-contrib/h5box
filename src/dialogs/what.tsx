import { defineComponent } from 'vue';
import { useDialogStore } from "@/common/stores/dialog";

let dialogStore = useDialogStore();

export default defineComponent({
    setup() {

        return () => {
            return (<div style={{
                position: "fixed",
                left: "calc(50vw - 130px)",
                top: "calc(50vh - 200px)",
                backgroundColor: "transparent",
                userSelect: "none",
                borderRadius: "10px"
            }}>
                <div style={{
                    width: "260px",
                    height: "370px",
                    backgroundColor: "#dbdde0",
                    borderRadius: "10px",
                    textAlign: "center",
                    paddingTop: "20px"
                }}>
                    <div style={{
                        backgroundImage: "url('./logo.png')",
                        backgroundSize: "70% auto",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        width: "60px",
                        height: "60px",
                        margin: "auto",
                        backgroundColor: "white",
                        borderRadius: "10px"
                    }}></div>
                    <header style={{
                        fontWeight: "800",
                        paddingTop: "20px"
                    }}>
                        <span>H5碎片化笔记</span>
                        <div style={{
                            fontSize: "12px",
                            lineHeight: "2em",
                            fontWeight: "200"
                        }}>(基于第三方库或框架)</div>
                    </header>
                    <div style={{
                        position: "fixed",
                        zIndex: "-1",
                        width: "100vw",
                        bottom: "100px",
                        left: "0",
                        fontSize: "14px",
                        color: "white",
                        textAlign: "center",
                        fontFamily: "cursive"
                    }}>
                        由于时间问题，部分功能处于完善中，敬请理解
                    </div>
                    <div style={{
                        padding: "0 30px",
                        fontSize: "12px",
                        lineHeight: "1.4em"
                    }}>
                        <div style={{
                            marginTop: "20px",
                            textAlign: "left",
                            textIndent: "2em",
                            color: "rgb(56, 55, 55)"
                        }}>
                            <h2 style={{
                                display: "inline-block",
                                fontSize: "inherit",
                                textIndent: "0"
                            }}>介绍</h2>
                            ：本项目主要基于第三方库或框架开发，提供一些实用的功能或用例。
                        </div>
                        <div style={{
                            marginTop: "20px",
                            textAlign: "left",
                            textIndent: "2em",
                            color: "rgb(56, 55, 55)"
                        }}>
                            <h2 style={{
                                display: "inline-block",
                                fontSize: "inherit",
                                textIndent: "0"
                            }}>初衷</h2>
                            ：致力于尝试各种前端第三方库或框架的探索和积累。
                        </div>
                        <div style={{
                            marginTop: "20px",
                            textAlign: "left",
                            textIndent: "2em",
                            color: "rgb(56, 55, 55)"
                        }}>
                            欢迎任何人加入我们！
                        </div>
                    </div>
                    <div style={{
                        position: "absolute",
                        left: "0",
                        bottom: "15px",
                        width: "100%"
                    }}>
                        <span onClick={dialogStore.closeDialog} style={{
                            color: "#363737",
                            width: "110px",
                            lineHeight: "30px",
                            borderRadius: "5px",
                            display: "inline-block",
                            fontSize: "13px",
                            backgroundColor: "#c1c3c6",
                            cursor: "pointer"
                        }}>关闭</span>
                        <a href="https://github.com/zxl20070701/h5box" target='_blank' style={{
                            color: "#363737",
                            width: "110px",
                            lineHeight: "30px",
                            borderRadius: "5px",
                            display: "inline-block",
                            fontSize: "13px",
                            marginLeft: "10px",
                            backgroundColor: "#b5b7ba"
                        }}>访问源码</a>
                    </div>
                </div>
            </div>);
        }

    }

});