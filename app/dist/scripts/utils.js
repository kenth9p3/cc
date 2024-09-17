import { LABELS } from "../data/results.js";
export function getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function $(id) {
    return document.getElementById(id);
}
export function formatPercentage(percent) {
    return Number(percent.toFixed(2)) * 100;
}
export function generateMockResult({ init }) {
    const predictions = LABELS.map((label) => {
        return {
            label: label,
            probability: init ? 0 : getRandomNumber(1, 1000) / 1000
        };
    }).sort((a, b) => b.probability - a.probability);
    return {
        input: "sample input",
        model: "bert",
        predictions
    };
}
//# sourceMappingURL=utils.js.map