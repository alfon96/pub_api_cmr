from fastapi import APIRouter, HTTPException, Depends, Body
from typing import Optional, Union, Annotated
from models import schemas
from fastapi.security import OAuth2PasswordBearer
from services.decorators import handle_mongodb_exceptions
from db.db import get_db
from pymongo import errors as pymongo_errors
from pymongo.database import Database
from services import controller
from utils.setup import Setup
from api_service import encryption, query
from datetime import datetime, timedelta

users = APIRouter(prefix="/users", tags=["Users"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/signin")


@users.post("/signup")
@handle_mongodb_exceptions
async def signup(
    user_data: schemas.Signup, db: Database = Depends(get_db)
) -> schemas.Token:
    """Register a new user. Encrypts the password and adds user-specific data based on their role."""

    # Hash Password and update user_data
    user_data.password = encryption.encrypt_password(user_data.password)

    # Create User and get user_id
    user_id = await controller.create_service(
        data=user_data,
        key_to_schema_map=schemas.UserRole.GENERIC,
        db=db,
    )

    # Create a JWT Token
    token_payload = {
        "id": user_id,
        "expire": Setup.compute_expiration().isoformat(),
    }
    token = encryption.create_jwt_token(token_payload)

    # Return Token response
    return schemas.Token(id=user_id, token=token, expire=token_payload["expire"])


@users.post("/signin")
@handle_mongodb_exceptions
async def signin(credentials: schemas.Signin, db: Database = Depends(get_db)):
    # Find User
    user_data = await controller.read_service(
        search_query=credentials.get_email_query(),
        key_to_schema_map=schemas.UserRole.GENERIC,
        db=db,
        isSensitive=True,
    )

    # Verify password
    if not encryption.check_password(credentials.password, user_data["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")

    # Create a JWT
    token_payload = {
        "id": user_data["id"],
        "expire": Setup.compute_expiration().isoformat(),
    }
    token = encryption.create_jwt_token(token_payload)

    # Create output Response
    # Note: Ensure the 'id' field from user_data does not conflict with TokenPayload
    user_data.pop("id", None)  # Remove 'id' to prevent conflict
    user_base = schemas.UserBase(**user_data)

    output_response = schemas.SigninResponse(
        **user_base.model_dump(), token=token, **token_payload
    )

    # Return the response
    return output_response
