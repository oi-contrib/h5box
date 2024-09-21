export default interface GeometryResultType {

    /**
     * 点数据（法向量如果有也包含其中）
     */
    points: number[]

    /**
     * 点个数
     */
    length: number

    /**
     * 画笔类型
     */
    method:  "LINES" | "LINE_STRIP" | "LINE_LOOP" | "TRIANGLES" | "TRIANGLE_STRIP" | "TRIANGLE_FAN"
}