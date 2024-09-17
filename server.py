from flask import Flask, jsonify, request, url_for
from flask_cors import CORS
# import classifier as CrimeClassifier

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


@app.route("/")
def get_links():
    links = []
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append((url, rule.endpoint))
    # links is now a list of url, endpoint tuples
    return {
        "links": links,
        "instruction": "Classify crimes using '/classify' [POST] endpoint"
    }

@app.route("/api/v1/crimes", methods=['GET'])
def classify_crimes():
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

@app.route("/api/v1/crimes/classify", methods=['POST'])
def predict_crimes():

    input_text = request.json.get('input', '')
    model = request.json.get('model', '')

    # predictions = CrimeClassifier.get_predictions(input_text, model)

    data = {
        "input": input_text,
        "model": model,
        "predictions": "predictions"
    }

    return jsonify(data)


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8080, debug=True)
