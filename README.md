# cc

## Directory Structure


### Server
 - *server.py* (A simple Flask-based API to get classifications from model and send results to an endpoint)


### Source
 - *main.ipynb*

### Models 

(cc means crime classifier)

- **bert-pretrained**
    - *cc-bert-pretrained-model.pth*
- **bert-finetuned**
    - *cc-bert-finetuned-model.pth*
- **xlnet-pretrained**
    - *cc-xlnet-model.pth*
- **xlnet-finetuned**
    - *cc-xlnet-finetuned-model.pth*

### Experiments

- **Experiment Paper 1**

    - **BERT**
        - *bert_pretrained_Murder.csv*
        - *bert_pretrained_Homicide.csv*
        - *bert_pretrained_Robbery.csv*
        - *bert_pretrained_Physical Injuries.csv*
        - *bert_pretrained_Rape.csv*
        - *bert_pretrained_Theft.csv*
        - *bert_pretrained_Carnapping.csv*
        - *bert_pretrained_Others.csv*

    - **BERT Fine-tuned**
        - *bert_finetuned_Murder.csv*
        - *bert_finetuned_Homicide.csv*
        - *bert_finetuned_Robbery.csv*
        - *bert_finetuned_Physical Injuries.csv*
        - *bert_finetuned_Rape.csv*
        - *bert_finetuned_Theft.csv*
        - *bert_finetuned_Carnapping.csv*
        - *bert_finetuned_Others.csv*

    - **XLNet**
        - *xlnet_pretrained_Murder.csv*
        - *xlnet_pretrained_Homicide.csv*
        - *xlnet_pretrained_Robbery.csv*
        - *xlnet_pretrained_Physical Injuries.csv*
        - *xlnet_pretrained_Rape.csv*
        - *xlnet_pretrained_Theft.csv*
        - *xlnet_pretrained_Carnapping.csv*
        - *xlnet_pretrained_Others.csv*

    - **XLNet Fine-tuned**
        - *xlnet_finetuned_Murder.csv*
        - *xlnet_finetuned_Homicide.csv*
        - *xlnet_finetuned_Robbery.csv*
        - *xlnet_finetuned_Physical Injuries.csv*
        - *xlnet_finetuned_Rape.csv*
        - *xlnet_finetuned_Theft.csv*
        - *xlnet_finetuned_Carnapping.csv*
        - *xlnet_finetuned_Others.csv*

- **Experiment Paper 2**
    - **BERT**
        - *bert-experiment-2.csv*
    - **BERT Fine-tuned**
        - *bert-fine-tuned-experiment-2.csv*

- **Experiment Paper 3**
    - **XLNet**
        - *xlnet-experiment-2.csv*
    - **XLNet Fine-tuned**
        - *xlnet-fine-tuned-experiment-2.csv*

- **Experiment Paper 5**
    - **BERT**
        - *bert-experiment-5.csv*
    - **BERT Fine-tuned**
        - *bert-fine-tuned-experiment-5.csv*
    - **XLNet**
        - *xlnet-experiment-5.csv*
    - **XLNet Fine-tuned**
        - *xlnet-fine-tuned-experiment-5.csv*