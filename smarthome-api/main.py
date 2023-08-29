from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Room(BaseModel):
    name: str
    count: int


room1: Room = {
        "name": "Front Yard",
        "count": 0
    }

rooms = [room1]

@app.get('/rooms')
def all_rooms() -> list[Room]:
    return rooms


@app.post('/rooms', status_code=201)
def add_room(input: Room):
    rooms.append(input)
    return input