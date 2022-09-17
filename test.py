from fastapi import FastAPI, Query
from typing import List
import cohere 

#co key : FQmQsySUHocwwiObN0a0WRKVa3HZlQbeTreJBNqi

app = FastAPI()


ingredients = []

@app.get("/")
def read_root():
    return "blub"

@app.post("/create_ingredients")
def add_ingredients(ingredient_name: List[int] = Query(None)):
    return ingredients

def ingredient_parse():
    prompt = "ingredients: "
    for food in ingredients:
        prompt += food
        prompt += "\n "
    return prompt

co = cohere.Client('{FQmQsySUHocwwiObN0a0WRKVa3HZlQbeTreJBNqi}') 
response = co.generate( 
  model='5ac071ae-9dee-4d7e-932c-1a20d7df4483-ft', 
  prompt = ingredient_parse(ingredients), 
  max_tokens=200, 
  temperature=1, 
  k=0, 
  p=0.75, 
  frequency_penalty=0.1, 
  presence_penalty=0, 
  stop_sequences=["$SEP$"], 
  return_likelihoods='NONE') 
print('Prediction: {}'.format(response.generations[0].text)) 