import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.graphql import GraphQLApp

from db.simple.database import SessionLocalS as session
from db.simple.schemas import schema

# from db.database import init, session
# from serve.schema.schemas import schema


# class Query(ObjectType):
#     hello = String(name=String(default_value="stranger"))
#     goodbye = String()

#     def resolve_hello(self, info, name):
#         return "Hello " + name

#     def resolve_goodbye(root, info):
#         return "See ya!"


# schema = Schema(query=Query)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {"msg": "hello"}


app.add_route("/gql", GraphQLApp(schema=schema))


@app.on_event("shutdown")
def shutdown_event():
    session.remove()


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, log_level="debug", reload=True)

# from flask import Flask
# from flask_cors import CORS
# from flask_migrate import Migrate
# from flask_socketio import SocketIO, emit

# from config import Config
# from serve.database import db
# from serve.views.v_acceptance import acceptance_router, get_acc_datas
# from serve.views.v_patient import patient_router

# app = Flask(__name__)

# CORS(app)

# app.config.from_object(Config)

# db.init_app(app)
# Migrate(app, db)


# app.register_blueprint(acceptance_router, url_prefix="/api")
# app.register_blueprint(patient_router, url_prefix="/api")


# socketio = SocketIO(app, cors_allowed_origins="*")

# thread = None


# def background_thread():
#     count = 0
#     while True:
#         socketio.sleep(10)
#         count += 1
#         data = {"status": "push", "data": get_acc_datas()}
#         socketio.emit(
#             "accres",
#             data,
#             namespace="/accsocket",
#         )


# @socketio.on("connect", namespace="/accsocket")
# def connect():
#     global thread
#     if thread is None:
#         thread = socketio.start_background_task(target=background_thread)
#     emit("accres", {"status": "Connected", "data": []})


# # @socketio.on("acc_new", namespace="/accsocket")
# # def acc_new(data, methods=["GET", "POST"]):
# #     print(data)
# #     emit("accres", {"data": "data"})


# if __name__ == "__main__":
#     socketio.run(app, host="0.0.0.0", port=5000)
