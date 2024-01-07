from fastapi import APIRouter, HTTPException, Depends, Body, Query
from services.controller import read_service
from pymongo.database import Database
from models import schemas
from db.db import get_pub_db, get_db
from services.decorators import handle_mongodb_exceptions

menu = APIRouter(prefix="/menu", tags=["menu"])


@menu.get("/{admin_id}/{pub_id}")
@handle_mongodb_exceptions
async def get_menu(pub_id: str, db: Database = Depends(get_pub_db)) -> schemas.Menu:
    read = await read_service(
        search_query={},
        key_to_schema_map=schemas.Data.MENU,
        db=db,
        multi=True,
        is_user_query=False,
        collection_name=f"{pub_id}_{schemas.Data.MENU.value}",
    )

    food_list = [schemas.MenuItem(**x) for x in read]
    response = schemas.Menu(items=food_list)
    return response
