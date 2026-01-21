from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model
class Item(BaseModel):
    id: int
    name: str
    price: float

# Fake database
items: List[Item] = []

# CREATE
@app.post("/items", response_model=Item)
def create_item(item: Item):
    items.append(item)
    return item

# READ
@app.get("/items", response_model=List[Item])
def get_items():
    return items

# UPDATE
@app.put("/items/{item_id}")
def update_item(item_id: int, updated_item: Item):
    for i, item in enumerate(items):
        if item.id == item_id:
            items[i] = updated_item
            return updated_item
    return {"error": "Item not found"}

# DELETE
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    for i, item in enumerate(items):
        if item.id == item_id:
            items.pop(i)
            return {"message": "Item deleted"}
    return {"error": "Item not found"}
