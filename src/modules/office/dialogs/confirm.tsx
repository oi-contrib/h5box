import { defineComponent } from 'vue';
import { useDialogStore } from "@/common/stores/dialog";

let dialogStore = useDialogStore();

export default defineComponent({
    props: {
        data: {
            type: Array<string>
        }
    },
    setup(props) {
        return () => {
            return (<div style={{
                position: "fixed",
                width: "300px",
                left: "calc(50vw - 150px)",
                top: "200px",
                backgroundColor: "#ffffff",
                boxShadow: "0 0 1px 0 #607d8b",
                userSelect: "none"
            }}>
                <h2 style={{
                    backgroundColor: "#607D8B",
                    color: "white",
                    fontSize: "16px",
                    padding: "10px"
                }}>
                    {props.data && props.data[0]}
                </h2>
                <p style={{
                    lineHeight: "1.6em",
                    fontSize: "14px",
                    textAlign: "center",
                    padding: "30px"
                }
                }>
                    {props.data && props.data[1]}
                </p >
                <div style={{
                    textAlign: "center",
                    paddingBottom: "10px"
                }}>
                    <button onClick={() => dialogStore.closeDialog.call(null, true)} style={{
                        backgroundColor: "rgb(66 74 80)",
                        cursor: "pointer",
                        padding: "7px 16px",
                        borderRadius: "30px",
                        border: "none",
                        fontSize: "14px",
                        width: "80px",
                        color: "white"
                    }}>
                        确定
                    </button>
                    <button onClick={() => dialogStore.closeDialog.call(null, false)} style={{
                        marginLeft: "20px",
                        cursor: "pointer",
                        padding: "7px 16px",
                        borderRadius: "30px",
                        border: "none",
                        fontSize: "14px",
                        width: "80px",
                        display: (props.data && props.data[2]) ? "none" : ""
                    }}>
                        取消
                    </button>
                </div >
            </div >)
        }
    }
})