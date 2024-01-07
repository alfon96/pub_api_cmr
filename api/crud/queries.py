from bson import ObjectId
from datetime import datetime, date, timedelta
from utils.setup import Setup
from models import schemas
import re


def transform_data_types_for_mongodb(
    query: dict = {},
    isSearching: bool = True,
    strict_mode: bool = False,
) -> dict:
    mongo_db_query = {}

    for x, y in query.items():
        if isinstance(y, list) and isSearching and not strict_mode:
            mongo_db_query[x] = {"$in": [z for z in y]}

        elif isinstance(y, datetime) and isSearching:
            mongo_db_query[x] = {"$gte": y, "$lt": y + timedelta(days=1)}

        elif isinstance(y, date):
            birthday_datetime: datetime = datetime(y.year, y.month, y.day)
            if isSearching:
                mongo_db_query[x] = {
                    "$gte": birthday_datetime,
                    "$lt": birthday_datetime + timedelta(days=1),
                }
            else:
                mongo_db_query[x] = birthday_datetime

        elif x == f"{Setup.id}":
            mongo_db_query[Setup.lookup_convention] = ObjectId(y)

        elif f"_{Setup.id}" in x:
            # Converts the id or ids in objectId
            mongo_db_query[x] = convert_id_to_object_id(y)

        else:
            mongo_db_query[x] = y

    return mongo_db_query


def convert_id_to_object_id(value) -> ObjectId | list[ObjectId]:
    # If there are fields that end with _id,
    # it means these refer to other collection documents,
    # thus we need to use the objectId type for other queries.
    if isinstance(value, list):
        # if y is a list all its element must be converted to objectId
        return [ObjectId(id) for id in value]
    else:
        return ObjectId(value)


def check_creation_query(data: dict):
    transformed_data = {}
    for x, y in data.items():
        # Don't copy the id if its present
        if x == f"{Setup.id}":
            continue

        if f"_{Setup.id}" in x:
            transformed_data[x] = convert_id_to_object_id(y)
        else:
            transformed_data[x] = y

    return transformed_data


def get_create_query_for_mongo(document: dict | list[dict]) -> dict | list:
    if isinstance(document, list):
        document = [check_creation_query(x) for x in document]
    else:
        document = check_creation_query(document)

    return document


def generate_lookup_stages(key_to_schema_map: str, pattern: str):
    """
    Generates lookup stages for an aggregation pipeline.
    """
    base_class_fields = schemas.complete_schema_mapping[key_to_schema_map].__fields__
    return [
        {
            "$lookup": {
                "from": field[: -len(Setup.lookup_convention)],
                "localField": field,
                "foreignField": Setup.lookup_convention,
                "as": f"{field[:-len(Setup.lookup_convention)]}_details",
            }
        }
        for field in base_class_fields
        if re.match(pattern, field)
    ]


def generate_set_stages(key_to_schema_map: str, pattern: str):
    """
    Generates set stages to process lookup results in an aggregation pipeline.
    """
    base_class_fields = schemas.complete_schema_mapping[key_to_schema_map].__fields__
    sensitive_fields = set(schemas.User.__fields__.keys())
    base_fields = set(schemas.UserBase.__fields__.keys())
    fields_to_exclude = sensitive_fields - base_fields

    try:
        return [
            {
                "$set": {
                    f"{field[:-len(Setup.lookup_convention)]}_details": {
                        "$map": {
                            "input": {
                                "$sortArray": {  # Sort the array of looked up documents
                                    "input": f"${field[:-len(Setup.lookup_convention)]}_details",
                                    "sortBy": {
                                        "surname": 1
                                    },  # Sort by 'surname' in ascending order
                                }
                            },
                            "as": "item",
                            "in": {
                                "$mergeObjects": [
                                    {"id": {"$toString": "$$item._id"}},
                                    {
                                        k: {
                                            "$cond": {
                                                "if": {"$isArray": f"$$item.{k}"},
                                                "then": {
                                                    "$map": {
                                                        "input": f"$$item.{k}",
                                                        "as": "id",
                                                        "in": {"$toString": "$$id"},
                                                    }
                                                },
                                                "else": {"$toString": f"$$item.{k}"},
                                            }
                                        }
                                        if k.endswith(Setup.lookup_convention)
                                        else f"$$item.{k}"
                                        for k in schemas.complete_schema_mapping[
                                            field[: -len(Setup.lookup_convention)]
                                        ].__fields__
                                        if k not in fields_to_exclude
                                        and k != Setup.lookup_convention
                                    },
                                ]
                            },
                        }
                    }
                }
            }
            for field in base_class_fields
            if re.match(pattern, field)
        ]
    except Exception as e:
        raise e


def get_lookup_query(key_to_schema_map: str) -> list | None:
    """
    Generates a complete lookup query for an aggregation pipeline.
    """

    pattern = rf".*[^_]{Setup.lookup_convention}$"
    lookup_stages = generate_lookup_stages(key_to_schema_map, pattern)
    if len(lookup_stages) == 0:
        return None

    set_stages = generate_set_stages(key_to_schema_map, pattern)

    # Remove original id fields
    unset_stages = [
        {
            "$unset": [
                field
                for field in schemas.complete_schema_mapping[
                    key_to_schema_map
                ].__fields__
                if re.match(pattern, field)
            ]
        }
    ]

    return lookup_stages + unset_stages + set_stages


def get_read_query_for_mongo(
    search_query: dict = {},
    sensitive_data: bool = False,
    is_user_query: bool = True,
    strict_mode: bool = False,
    key_to_schema_map: str = "",
):
    search_query = transform_data_types_for_mongodb(
        query=search_query,
        isSearching=True,
        strict_mode=strict_mode,
    )

    set_query = convert_id_to_str(key_to_schema_map=key_to_schema_map, just_id=True)
    lookup_query = get_lookup_query(key_to_schema_map)

    projections = {Setup.mongo_db_id: 0}
    if not sensitive_data and is_user_query:
        projections.update({"password": 0, "phone": 0})

    pipeline = [
        {"$match": search_query},
        {"$set": set_query},
        {"$project": projections},
    ]

    if lookup_query:
        pipeline.extend(lookup_query)

    return pipeline


def get_update_query_for_mongo(
    search_query: dict = {},
    update_data: dict = {},
) -> (dict, dict):
    search_query = transform_data_types_for_mongodb(search_query)
    update_query = {
        "$set": transform_data_types_for_mongodb(update_data, isSearching=False)
    }

    return search_query, update_query


def get_delete_query_for_mongo(
    search_query: dict = {},
):
    search_query = transform_data_types_for_mongodb(search_query)
    return search_query


def convert_id_to_str(
    key_to_schema_map: str,
    just_id: bool = False,
):
    if just_id:
        return {"id": {"$toString": "$_id"}}
    base_class_fields = schemas.complete_schema_mapping[key_to_schema_map].__fields__
    # Find all the fields that have_id in the name and setup the query for mongodb to convert in string.
    project_fields = {
        field: {
            "$map": {
                "input": f"${field}",
                "as": "temp_id",
                "in": {"$toString": "$$temp_id"},
            }
        }
        for field in base_class_fields
        if Setup.lookup_convention in field
    }
    # Additonally in mongo db every document will have an id that needs to be renamed and converted.
    project = {"id": {"$toString": "$_id"}, **project_fields}
    return project


def get_update_profile_pic_query(user_id: str, binary_image: bytes):
    search_query = {Setup.lookup_convention: ObjectId(user_id)}
    update_query = {"$set": {"profile_pic": binary_image}}
    return search_query, update_query


from pydantic import BaseModel, ValidationError, create_model
from fastapi import HTTPException
import json
import urllib


def decode_query(query: str) -> dict:
    """
    Decodes a query string into a dictionary. If the query string is a URL-encoded JSON string,
    it decodes it as JSON; otherwise, it treats it as a standard query string.
    """
    # Split the query string into separate parameters
    params = query.split("&")
    decoded_result = {}

    for param in params:
        # URL-decode each parameter
        decoded_param = urllib.parse.unquote(param)

        # Check if the parameter is in JSON format
        try:
            # If it's JSON, load it and update the dictionary
            json_part = json.loads(decoded_param)
            if isinstance(json_part, dict):
                decoded_result.update(json_part)
        except json.JSONDecodeError:
            # If it's not JSON, process as a standard key-value pair
            key_value = decoded_param.split("=", 1)
            if len(key_value) == 2:
                key, value = key_value
                decoded_result[key] = value

    return decoded_result


def decode_and_validate_query(query: str, validation_model: BaseModel) -> dict:
    try:
        return validate_query_over_schema(
            validation_model=validation_model,
            query=decode_query(query),
        )

    except Exception as e:
        raise e


def validate_query_over_schema(
    validation_model: BaseModel,
    query: dict,
    output_dict: bool = True,
) -> dict | BaseModel:
    """Check if every field of the input query is contained in the validation_model.
    It will throw an HTTPException with status_code 422, with the details of the issue if incorrect.
    Otherwise it will return the validated query as a dictionary where the types match with the schema.
    """

    # Extract keys from both query and model
    base_fields = set(validation_model.__fields__)
    query_keys = set(query.keys())
    unique_fields = query_keys - base_fields

    # If the query has different keys -> status_code 422
    if unique_fields:
        raise HTTPException(
            status_code=422,
            detail=f"KeyError:'{unique_fields}'. You can only use this keys {base_fields}",
        )

    query_mathing_fields = {
        field_name: (field.annotation, field.default)
        for field_name, field in validation_model.__fields__.items()
        if field_name in query_keys
    }

    model = create_model("QuerySubModel", **query_mathing_fields)

    # Try parsing the query in the newly created model to get full query validation

    try:
        validated_query = model(**query)
        return validated_query.dict() if output_dict else validated_query
    except ValidationError as e:
        raise HTTPException(
            status_code=422,
            detail=f"The type of your query don't match the schema. Details: {str(e)}",
        )


class Policy:
    strict = 0
    loose = 1


def parse_dict_to_model(
    target_model: BaseModel,
    input_dict: dict,
    policy: Policy = Policy.strict,
) -> BaseModel:
    """Check if every field of the input query is contained in the validation_model.
    It will throw an HTTPException with status_code 422, with the details of the issue if incorrect.
    Otherwise it will return the validated query as a dictionary where the types match with the schema.
    """

    try:
        # Extract keys from both query and model
        base_fields = set(target_model.__fields__)
        query_keys = set(input_dict.keys())
        unique_fields = base_fields - query_keys

        # If the query has different keys -> status_code 422
        if unique_fields and policy == "Strict":
            raise HTTPException(
                status_code=422,
                detail=f"Insufficient Keys - The model you want to build requires the following additional keys: '{unique_fields}'",
            )

        query_mathing_fields = {
            field_name: (field.annotation, field.default)
            for field_name, field in target_model.__fields__.items()
            if field_name in query_keys
        }

        model = create_model("TargetModel", **query_mathing_fields)

        # Try parsing the query in the newly created model to get full query validation

        return model
    except ValidationError as e:
        raise HTTPException(
            status_code=422,
            detail=f"The type of your query don't match the schema. Details: {str(e)}",
        )
