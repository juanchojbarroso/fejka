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