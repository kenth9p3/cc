import { LABELS, Result, ValidLabel } from "../data/results.js";

export function getRandomNumber(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function $(id: string) {
    return document.getElementById(id);
}

export function formatPercentage(percent: number): number {
    return Number(percent.toFixed(2)) * 100;
}

export function generateMockResult({ init }: { init?: boolean }): Result {

    const predictions = LABELS.map((label) => {
        return {
            label: label as ValidLabel,
            probability: init ? 0 : getRandomNumber(1, 1000) / 1000
        }
    }).sort((a, b) => b.probability - a.probability)

    return {
        input: "sample input",
        model: "bert",
        predictions
    }
}



