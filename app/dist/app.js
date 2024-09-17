import { fetchResults } from "./scripts/api.js";
import examples from "./data/examples.js";
import { $, generateMockResult } from "./scripts/utils.js";
import { populateExamples, renderError, updateInputField, updatePredictionsField } from "./scripts/view.js";
const BASE_URL = `http://localhost:8080/api/v1/crimes/classify`;
/* TODO

    - flask backend
    -

*/
document.addEventListener("DOMContentLoaded", () => {
    /* Initialization
        - get all elements from the DOM/HTML
    
    */
    function INITIALIZE() {
        updatePredictionsField({ container: resultsContainer, results: generateMockResult({ init: true }) });
        populateExamples({ selectField: exampleSelector, examples });
    }
    const inputField = $("input-field");
    const exampleSelector = $("example-selector");
    const form = $("form");
    const classifyBtn = $("classify-btn");
    const resultsContainer = $("labels");
    const radios = document.querySelectorAll('input[type="radio"]');
    const predictionErrorContainer = $("prediction-error");
    INITIALIZE();
    /* Event listeners */
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    radios.forEach((radio) => {
        radio.checked = false;
        radio.addEventListener("change", () => {
            const variantSelector = $("variant-selector");
            if (radio.checked)
                variantSelector.style.display = "flex";
        });
    });
    classifyBtn.addEventListener("click", async () => {
        console.log("submit");
        /* Get form values */
        const model = document.querySelector('input[name="model"]:checked');
        const variant = document.querySelector('input[name="variant"]:checked');
        const formInput = {
            input: inputField.value,
            model: model.value,
            variant: variant.value,
        };
        /* Send input values to the server */
        try {
            /* TODO: validate input */
            const data = await fetchResults(BASE_URL, formInput);
            // const data = await fetchApi(BASE_URL)
            console.log("Data: ", data);
            updatePredictionsField({ container: resultsContainer, results: generateMockResult({ init: false }) });
        }
        catch (error) {
            console.log("Classification error:", error);
            renderError({ container: predictionErrorContainer, error: error.message });
        }
    });
    exampleSelector.addEventListener("input", (e) => {
        updateInputField({ field: inputField, value: exampleSelector.value });
    });
});
//# sourceMappingURL=app.js.map