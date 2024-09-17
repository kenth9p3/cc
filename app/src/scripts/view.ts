import { Result } from "../data/results.js";

export function populateExamples({ selectField, examples }: { selectField: HTMLSelectElement, examples: string[] }) {
    examples.forEach((example, i) => {
        selectField.options.add(new Option(`Example ${i + 1}`, example))
    })
}

/* TODO 

    REQUIRED
    - change values of labels 

    OPTIONAL
    - on load animation 
    - change numbers 
    - animate bars 
    - animate percentage 

  */
export function updatePredictionsField({ container, results }: { container: HTMLDivElement, results: Result }): void {

    /* 
        Reset container content 
        Might need to change logic if decided to animate
    */
    container.innerHTML = "";

    let temp: string = "";

    results.predictions.forEach((prediction) => {

        const label = prediction.label;
        const probability = prediction.probability * 100; /* Format to percentage with two decimal places */

        temp += `
                    <span class="label" id="${label.toLowerCase()}" key="${label.toLowerCase()}">
                        <div class="text">
                            <p>${label}</p>
                            <p>${probability}%</p>
                        </div>
                        <div class="bar-container">
                            <div class="bar" style="--initial-width: 0%; --final-width: ${probability}%; width: ${probability}%"></div>
                        </div>
                    </span> 
    
    `

    })

    container.innerHTML = temp;


}

export function updateInputField({ field, value }: { field: HTMLTextAreaElement, value: string }): void {
    field.value = value;
}

export function toggleButtonDisable({ }): void {
    // radio buttons
    const disabled: boolean = false;
}

export function renderError({ container, error }: { container: HTMLDivElement, error: string }): void {

    console.log("rendering error message")
    const template = `
        <div class="error-alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-info"> 
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                        <p>${error}</p>
                    </div>
    `

    container.innerHTML = template;
}

