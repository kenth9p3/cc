import { fetchApi, fetchResults } from "./scripts/api.js";
import examples from "./data/examples.js";
import { ValidModel } from "./data/results.js";
import { $, generateMockResult } from "./scripts/utils.js";
import { populateExamples, renderError, updateInputField, updatePredictionsField } from "./scripts/view.js";

const BASE_URL = `http://localhost:8080/api/v1/crimes/classify`

/* TODO

    - flask backend
    - 

*/


document.addEventListener("DOMContentLoaded", () => {

    /* Initialization
        - get all elements from the DOM/HTML
    
    */

    function INITIALIZE() {
        updatePredictionsField({ container: resultsContainer, results: generateMockResult({ init: true }) })
        populateExamples({ selectField: exampleSelector, examples });
    }

    const inputField = $("input-field") as HTMLTextAreaElement;
    const exampleSelector = $("example-selector") as HTMLSelectElement;
    const form = $("form") as HTMLFormElement;
    const classifyBtn = $("classify-btn") as HTMLButtonElement;
    const resultsContainer = $("labels") as HTMLDivElement;
    const radios = document.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    const predictionErrorContainer = $("prediction-error") as HTMLDivElement;

    INITIALIZE();

    /* Event listeners */

    form.addEventListener("submit", (e) => {
        e.preventDefault()
    })

    radios.forEach((radio) => {

        radio.checked = false;

        radio.addEventListener("change", () => {
            const variantSelector = $("variant-selector") as HTMLDivElement;

            if (radio.checked) variantSelector.style.display = "flex";
        })
    })

    classifyBtn.addEventListener("click", async () => {
        console.log("submit")

        /* Get form values */

        const model = document.querySelector('input[name="model"]:checked') as HTMLInputElement;
        const variant = document.querySelector('input[name="variant"]:checked') as HTMLInputElement;

        const formInput = {
            input: inputField.value,
            model: model.value as ValidModel,
            variant: variant.value as ValidModel,
        }

        /* Send input values to the server */

        try {

            /* TODO: validate input */

            const data = await fetchResults(BASE_URL, formInput)
            // const data = await fetchApi(BASE_URL)
            console.log("Data: ", data);

            updatePredictionsField({ container: resultsContainer, results: generateMockResult({ init: false }) })
        } catch (error: any) {
            console.log("Classification error:", error)
            renderError({ container: predictionErrorContainer, error: error.message })
        }


    })

    exampleSelector.addEventListener("input", (e) => {
        updateInputField({ field: inputField, value: exampleSelector.value })
    })






}); 