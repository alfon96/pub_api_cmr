from datetime import datetime, timedelta


class Setup:
    role = "role"
    expiration = "exp"
    id = "id"
    querySchemaKey = "schema"
    lookup_convention = "__id"
    mongo_db_id = "_id"

    def compute_expiration() -> datetime:
        expiration_days_jwt = 3
        return datetime.utcnow() + timedelta(days=expiration_days_jwt)
