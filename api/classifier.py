import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModel
import pandas as pd
import time  

dataset_dir = "./classifier/data/train_test_val"

DATASET = {
    'train': pd.read_csv(dataset_dir + '/train.csv').reset_index(drop=True),  # """ encoding='cp1252' """ insert between train_data.csv and .reset index as parameter
    'test': pd.read_csv(dataset_dir + '/test.csv').reset_index(drop=True),  # """ encoding='cp1252' """ insert between train_data.csv and .reset index as parameter
    'val': pd.read_csv(dataset_dir + '/val.csv').reset_index(drop=True),  # """ encoding='cp1252' """ insert between train_data.csv and .reset index as parameter
}

EXAMPLE_INPUT = DATASET['test']['Text'][6]

MODEL_NAMES = {
    "bert": 'google-bert/bert-base-uncased',
    "xlnet": 'xlnet/xlnet-base-cased',
}

MODEL_VARIANTS = {
    "bert-pretrained": 'cc-bert-pretrained-model.pth',
    "xlnet-pretrained": 'cc-xlnet-pretrained-model.pth',
    "bert-finetuned": 'cc-bert-finetuned-model.pth',
    "xlnet-finetuned": 'cc-xlnet-finetuned-model.pth',
}

MODEL_DIR = "classifier/models" 

LABELS = [

    'Murder',
    'Homicide',
    'Robbery',
    'Physical Injuries',
    'Rape',
    'Theft',
    'Carnapping',
    'Others'
]

THRESHOLD = 0.5

class CrimeClassifier(nn.Module):
    def __init__(self, model_name, labels): 
        super(CrimeClassifier, self).__init__()
        self.model = AutoModel.from_pretrained(model_name)
        self.dropout = nn.Dropout(0.5)
        self.linear = nn.Linear(self.model.config.hidden_size, len(labels))

    def forward(self, ids, mask):
        bert_outputs = self.model(ids, attention_mask=mask)
        cls_hidden_state = bert_outputs.last_hidden_state[:, 0, :] 
        dropped_out = self.dropout(cls_hidden_state)
        logits = self.linear(dropped_out)
        return logits


def get_predictions(input_text, model_id, model_variant):

    # MODEL INITIALIZATION
    model_name = MODEL_NAMES[model_id]
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    crimeClassifier = CrimeClassifier(model_name, LABELS)
    crimeClassifier.eval()


    # load model depending on variant
    crimeClassifier.load_state_dict(torch.load(f'{MODEL_DIR}/{model_variant}/{MODEL_VARIANTS[model_variant]}'))
    crimeClassifier.load_state_dict(torch.load(f'{MODEL_DIR}/{model_variant}/{MODEL_VARIANTS[model_variant]}'))

    # CLASSIFICATION
    start_time = time.time()  # Start the timer

    # encode text
    encoded_input_text = tokenizer(input_text, padding="max_length", truncation=True, max_length=128, return_tensors='pt')

    # get raw results
    with torch.no_grad():
        logits = crimeClassifier(ids=encoded_input_text['input_ids'], mask=encoded_input_text['attention_mask'])

    # apply activation to get probabilities
    predictions = logits.flatten().sigmoid()

    label_probabilities = [{"label": label, "probability": float(round(prob.item() * 100, 2))} for label, prob in zip(LABELS, predictions)]

    # Sort label probabilities in descending order
    label_probabilities = sorted(label_probabilities, key=lambda item: -item["probability"])

    # Labels greater than 0.5 threshold
    predicted_labels = [(label, f"{pred*100:.2f}%") for label, pred in zip(LABELS, predictions) if pred >= THRESHOLD]
    
    end_time = time.time()  # End the timer

    # Display results
    print("\n\n")
    print("Input:", input_text)
    print("\n\n")
    for result in label_probabilities: 
        print(f"{result['label']}: {result['probability']}")

    print("\n\n")
    print("Predicted Labels:")
    for label, probability in predicted_labels:
        print(f"({label}, {probability})")

    duration = round(end_time - start_time, 4)  # Calculate the duration
    print(f"\nPrediction processing time: {duration:.4f} seconds")

    return label_probabilities, duration   # Return both the predictions and the processing time



get_predictions(EXAMPLE_INPUT, "xlnet", "xlnet-finetuned")