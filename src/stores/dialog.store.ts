import { defineStore } from "pinia"

interface callbackInterface {
    (data?: any): void
}

interface dialogInterface {
    id: string,
    data?: any,
    callback?: callbackInterface
}
export const useDialogStore = defineStore("DIALOG", {
    state() {
        return {
            dialogs: <Array<dialogInterface>>[]
        }
    },
    getters: {
        fetchList(): Array<any> {
            return this.dialogs
        }
    },
    actions: {

        // 打开弹框
        openDialog(dialog: dialogInterface) {
            this.dialogs.push(dialog)
        },

        // 关闭弹框
        closeDialog(data: any) {

            // 从数组中删除即可关闭
            let dialog = this.dialogs.pop()

            // 如果有回调，回调
            if (dialog && typeof dialog.callback === "function") {
                dialog.callback(data)
            }

        }
    }
})