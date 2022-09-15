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
    groupby: str


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
    df_groupby = df.groupby([item.columns])[item.groupby].count()
    print(df_groupby.keys())
    if item.columns:
        data = df_groupby[item.columns]
    else:
        data = df
    return Response(data.to_json(orient="split"), media_type="application/json")


def parse_csv(df):
    res = df.to_json(orient="records")
    parsed = json.loads(res)
    return parsed


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
