from pydantic import (
    BaseModel,
    ValidationError,
    create_model,
    EmailStr,
)
from enum import Enum
from fastapi import HTTPException
from decouple import config
from datetime import datetime
from typing import Optional


class MenuItem(BaseModel):
    """Single Item in The Menu"""

    id: str
    name: str
    price: float
    description: str
    keywords: list[str]
    imgPreview: str
    images: list[str]
    food_beverage: bool  # if 0 food if 1 beverage


class Signin(BaseModel):
    email: EmailStr
    password: str

    def get_email_query(self):
        return {"email": self.email}


class Signup(BaseModel):
    name: str
    surname: str
    email: EmailStr
    phone: str
    password: str


class Menu(BaseModel):
    """Complete Menu"""

    items: list[MenuItem]


class Revenues(BaseModel):
    """Revenue basic info"""

    time: datetime
    revenue: float


class PubsData(BaseModel):
    """Pub Name, Adress and other info"""

    name: str
    address: str
    owner: str
    pub_id: list[str]


class UserBase(BaseModel):
    """Basic User Info"""

    name: str
    surname: str


class Admin(UserBase):
    total_pubs: int
    admin_id: str


class User(UserBase):
    """Adding Password"""

    phone: str
    password: str
    email: EmailStr


class TokenPayload(BaseModel):
    """Token's Payload Data."""

    id: str
    expire: datetime

    def to_dict(self):
        return {
            "id": self.id,
            "expire": self.expire.isoformat(),
        }


class Token(TokenPayload):
    token: str


class SigninResponse(UserBase, Token):
    """SignIn Response will merge both user and Token info."""

    pass


class Data(str, Enum):
    PUB = config("PUBS_DATA_COLLECTION")
    MENU = config("PUB_MENU_COLLECTION")
    REVENUES = config("PUB_REVENUES_COLLECTION")


class UserRole(str, Enum):
    GENERIC = config("USER_COLLECTION")


user_schema_map: dict[str, BaseModel] = {
    UserRole.GENERIC: User,
}

data_schema_map: dict[str, BaseModel] = {
    Data.PUB: PubsData,
    Data.MENU: Menu,
    Data.REVENUES: Revenues,
}

complete_schema_mapping = {**user_schema_map, **data_schema_map}


def validate_query_over_schema(base_model: BaseModel, query: dict) -> BaseModel:
    # Extract keys from both query and model
    base_fields = set(base_model.__fields__)
    query_keys = set(query.keys())
    unique_fields = query_keys - base_fields

    # If the query has different keys -> status_code 422
    if unique_fields:
        raise HTTPException(
            status_code=422, detail=f"You can only use this keys {base_fields}"
        )

    query_mathing_fields = {
        field_name: (field.annotation, field.default)
        for field_name, field in base_model.__fields__.items()
        if field_name in query_keys
    }

    model = create_model("QuerySubModel", **query_mathing_fields)

    # Try parsing the query in the newly created model to get full query validation

    try:
        validated_query = model(**query)
        return validated_query.dict()
    except ValidationError as e:
        raise HTTPException(
            status_code=422,
            detail=f"The type of your query don't match the schema. Details: {str(e)}",
        )


class PayloadSignIn:
    def __init__(self, id: str, admin: str, pub_ids: list[int], expiration: datetime):
        self.id: str = id
        self.admin_id: str = admin
        self.pub_ids: list[int] = pub_ids
        self.expiration: datetime = expiration

    def to_dict(self):
        return {
            "id": self.id,
            "admin_id": self.admin_id,
            "pub_ids": self.pub_ids,
            "expiration": self.expiration.isoformat(),  # convert datetime to string
        }
