import getStyles from "./getStyles";

export default (color: string): [number, number, number, number] => {

    const colorNode = document.getElementsByTagName('head')[0];
    colorNode.style['color'] = color;

    const oralFormat = getStyles(colorNode, "color").replace(/rgba?\(/, '').replace(")", "").split(',');
    for (let index = 0; index < oralFormat.length; index++) {
        oralFormat[index] = +oralFormat[index];
    }
    oralFormat.push(1);

    return [
        oralFormat[0] / 255,
        oralFormat[1] / 255,
        oralFormat[2] / 255,
        oralFormat[3]
    ];
};