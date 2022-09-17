import pandas as pd
from typing import Union
from service.datasources_db import getDatasources
from utils.transformations import transformJsonToObject
from fastapi import FastAPI, UploadFile, Response, Path, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import json


from typing import List
from pydantic import BaseModel


app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/datasources")
async def datasources():
    print(f"Get all datasource")
    datasouces = getDatasources()
    return datasouces


@app.get("/datasources/{datasource_id}")
def get_datasource(datasource_id):
    print(f"Get datasource with id {int(datasource_id)}")
    datasouces = getDatasources()
    return datasouces[int(datasource_id)]


@app.get("/datasources/{datasource_id}/dataset/labels")
def get_dataset_labels(datasource_id):
    print(f"Get labels in dataset for datasource with id {int(datasource_id)}")
    datasouce = transformJsonToObject(getDatasources()[int(datasource_id)])
    print(datasouce)

    data = pd.read_csv(datasouce.url)
    return tuple(data)


@app.post("/datasources/file/labels")
async def create_upload_file(file: UploadFile):
    df = pd.read_csv(file.file)
    file.file.close()
    return tuple(df)


class Item(BaseModel):
    columns: List[str]
    target: str
    feature: str


@app.post("/datasources/{datasource_id}/dataset")
async def create_item(
    datasource_id: int,
    item: Union[Item, None] = None,
):
    print(f"Get dataset for datasource with id {datasource_id}")
    datasouce = transformJsonToObject(getDatasources()[datasource_id])
    print("***************************")
    print({datasouce})
    df = pd.read_csv(datasouce.url)

    df.shape
    pd.set_option("display.max.columns", None)
    pd.set_option("display.precision", 2)
    df.tail()

    print(df.keys())
    if item.columns:
        data = df[item.columns]
    else:
        data = df
    return Response(data.to_json(orient="split"), media_type="application/json")


@app.post("/datasources/{datasource_id}/dataset/count")
async def create_item(
    datasource_id: int,
    item: Union[Item, None] = None
):
    print(f"Get describe dataset for datasource with id {datasource_id}")
    datasouce = transformJsonToObject(getDatasources()[datasource_id])
    print("***************************")
    print({datasouce})
    df = pd.read_csv(datasouce.url)

    df.shape
    pd.set_option("display.max.columns", None)
    pd.set_option("display.precision", 2)
    df.tail()

    if item.columns:
        data = df[item.columns]
    else:
        data = df

    data = data[item.target].value_counts()

    return Response(data.to_json(orient="split"), media_type="application/json")


@app.post("/datasources/{datasource_id}/dataset/countBy")
async def create_item(
    datasource_id: int,
    item: Union[Item, None] = None
):
    print(f"Get describe dataset for datasource with id {datasource_id}")
    datasouce = transformJsonToObject(getDatasources()[datasource_id])
    print("***************************")
    print({datasouce})
    df = pd.read_csv(datasouce.url)

    df.shape
    pd.set_option("display.max.columns", None)
    pd.set_option("display.precision", 2)
    df.tail()
    
    data = df.groupby(item.target)[item.feature].value_counts().unstack().fillna(0)
    return Response(data.to_json(orient="table"), media_type="application/json")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
