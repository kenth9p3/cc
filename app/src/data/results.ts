
export type Result = {
    input: string,
    model: ValidModel,
    created_at?: string,
    predictions: Prediction[]
}

type Prediction = {
    label: ValidLabel
    probability: number,
}

export type ValidLabel =
    "Murder" |
    "Homicide" |
    "Robbery" |
    "Physical Injuries" |
    "Rape" |
    "Theft" |
    "Carnapping" |
    "Others"

export type ValidModel = "bert" | "xlnet"
export type ValidVariant = "fine-tuned" | "pre-trained"

export const LABELS = [
    "Murder",
    "Homicide",
    "Robbery",
    "Physical Injuries",
    "Rape",
    "Theft",
    "Carnapping",
    "Others"
]