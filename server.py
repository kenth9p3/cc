from flask import Flask, jsonify, request, url_for
from flask_cors import CORS
from api import classifier as CrimeClassifier
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

dataset_dir = "./classifier/data/train_test_val"
TEST_DATASET = pd.read_csv(dataset_dir + '/test.csv').reset_index(drop=True)

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


@app.route("/")
def get_links():
    links = []
    for rule in app.url_map.iter_rules():
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append((url, rule.endpoint))

    return {
        "links": links,
        "instruction": "Classify crimes using '/classify' [POST] endpoint"
    }

@app.route("/api/v1/crimes", methods=['GET'])
def guide():
    return {
        "labels": [
            "Murder",
            "Homicide",
            "Robbery",
            "Physical Injuries",
            "Rape",
            "Theft",
            "Carnapping",
            "Others"
        ],
        "models": ["bert", "xlnet", "fine-tuned bert", "fine-tuned xlnet"], 
        } 

@app.route("/api/v1/crimes/classify/example/<int:index>", methods=['GET'])
def predict_crimes_example(index):

    EXAMPLE_INPUT = TEST_DATASET['Text'][index]

    input_text = EXAMPLE_INPUT
    model = "xlnet"
    variant = "finetuned"

    model_variant = f"{model}-{variant}"
    

    predictions, duration = CrimeClassifier.get_predictions(EXAMPLE_INPUT, model, model_variant)

    data = {
        "input": input_text,
        "model": {
            "name": model,
            "variant": variant
            },
        "predictions": predictions,
        "processing_time": duration
    }

    return jsonify(data)

@app.route("/api/v1/crimes/classify", methods=['POST'])
def predict_crimes():

    input_text = request.json.get('input', '')
    model = request.json.get('model', '')
    variant = request.json.get('variant', '')

    model_variant = f"{model}-{variant}"
    
    predictions, duration = CrimeClassifier.get_predictions(input_text, model, model_variant)

    data = {
        "input": input_text,
        "model": {
            "name": model,
            "variant": variant
            },
        "predictions": predictions,
        "processing_time": duration
    }

    return jsonify(data)




if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8080, debug=True)
