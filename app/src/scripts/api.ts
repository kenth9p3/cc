import { ValidModel } from "../data/results.js";

type FormRequest = {
    model: ValidModel,
    input: string,
}

export async function fetchResults(url: string, data: FormRequest) {

    console.log(data);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const output = await response.json();
        return output;

    } catch (error: any) {
        throw new Error(error)
    }

}

export async function fetchApi(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
