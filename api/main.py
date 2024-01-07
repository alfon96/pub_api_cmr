from fastapi import FastAPI
from routers.menu import menu
from routers.users import users
from fastapi.middleware.cors import CORSMiddleware

import debugpy


def create_app():
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(menu)
    app.include_router(users)
    
    @app.get("/")
    def read_root():
        return {"Hello": "World"}

    return app


# debugpy.listen(("0.0.0.0", 5678))
# print("⏳ VS Code debugger can now attach, press F5 in VS Code ⏳", flush=True)
# debugpy.wait_for_client()
app = create_app()

if __name__ == "__main__":
    # debugpy.listen(("0.0.0.0", 5678))
    # print("⏳ VS Code debugger can now attach, press F5 in VS Code ⏳", flush=True)
    # debugpy.wait_for_client()
    app = create_app()
