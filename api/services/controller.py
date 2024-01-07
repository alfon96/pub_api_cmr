from crud import crud, queries
from models import schemas
from api_service import query
from fastapi import HTTPException
from db.db import get_db
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Generator, AsyncGenerator, Any
from utils.setup import Setup
from pydantic import BaseModel


def prepare_query(search_query: str | dict, key_to_schema_map: str):
    isEncoded: bool = isinstance(search_query, str)

    if isEncoded:
        search_query = query.decode_query(query=search_query)

    validation_model: BaseModel = schemas.complete_schema_mapping[key_to_schema_map]
    return queries.validate_query_over_schema(
        validation_model=schemas.complete_schema_mapping[key_to_schema_map],
        query=search_query,
    )


async def create_service(
    data: list | dict,
    key_to_schema_map: schemas.complete_schema_mapping,
    db: AsyncGenerator[AsyncIOMotorDatabase, None],
    transform_results: Any = None,
) -> str | list[str]:
    # Check if it is multi
    multi = isinstance(data, list)

    # Prepare the documents data
    document_data = [x.dict() for x in data] if multi else data.dict()

    # Transform query for mongodB
    document_data = queries.get_create_query_for_mongo(document=document_data)

    # Send Query to dB
    inserted_ids = await crud.create_n_documents(
        collection=key_to_schema_map,
        document_data=document_data,
        multi=multi,
        db=db,
    )

    # Handle Results Exceptions
    if not inserted_ids:
        raise HTTPException(status_code=500, detail="Creation was NOT successful")

    if multi:
        result = [str(id) for id in inserted_ids]
    else:
        result = str(inserted_ids)

    # You may want to format data differently in different endpoints
    if transform_results:
        result = transform_results(result)

    return result


async def read_service(
    search_query: str | dict,
    key_to_schema_map: schemas.complete_schema_mapping,
    db: AsyncGenerator[AsyncIOMotorDatabase, None],
    isSensitive: bool = False,
    is_user_query: bool = True,
    multi: bool = False,
    strict_mode: bool = False,
    collection_name: str | None = None,
):
    # Decode and validate input query against exact user class
    search_query = prepare_query(
        search_query=search_query,
        key_to_schema_map=key_to_schema_map,
    )

    # Creates a query suitable for the mongodb driver
    pipeline = queries.get_read_query_for_mongo(
        is_user_query=is_user_query,
        search_query=search_query,
        sensitive_data=isSensitive,
        strict_mode=strict_mode,
        key_to_schema_map=key_to_schema_map,
    )

    result = await crud.read_n_documents(
        collection=collection_name if collection_name else key_to_schema_map.value,
        pipeline=pipeline,
        db=db,
        multi=multi,
    )

    # Handle query results
    if not result:
        raise HTTPException(status_code=404, detail="Item NOT found.")

    # Return response
    return result
