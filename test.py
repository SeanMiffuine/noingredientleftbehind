from fastapi import FastAPI, Query
from typing import List

#co key : FQmQsySUHocwwiObN0a0WRKVa3HZlQbeTreJBNqi

app = FastAPI()


ingredients = []

@app.get("/")
def read_root():
    return "blub"

@app.post("/create_ingredients")
def add_ingredients(ingredient_name: List[int] = Query(None)):
    return ingredients