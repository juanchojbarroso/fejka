from fastapi import APIRouter, Response
from service.datasources_db import getDatasources
from utils.transformations import transformJsonToObject

import pandas as pd

router = APIRouter()

@router.get("/datasources")
async def datasources():
    print(f"Get all datasource")
    datasouces = getDatasources()
    return datasouces

@router.get("/datasources/{datasource_id}")
def get_datasource(datasource_id):
    print(f"Get datasource with id {int(datasource_id)}")
    datasouces = getDatasources()
    return datasouces[int(datasource_id)]

@router.get("/datasources/{datasource_id}/dataset")
def get_dataset(datasource_id):
    print(f"Get dataset for datasource with id {int(datasource_id)}")
    datasouce = transformJsonToObject(getDatasources()[int(datasource_id)])
    print(datasouce)

    data = pd.read_csv(datasouce.url)
    return Response(data.to_json(orient="records"), media_type="application/json")
