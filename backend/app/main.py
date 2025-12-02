from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import engine, Base
from app.routers import auth, courses, institutions, tasks

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Edulytics Backend")

# CORS for your React dev server
origins = [
    "http://localhost:8082",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # <-- use explicit origins, not ["*"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(institutions.router)
app.include_router(tasks.router)


@app.get("/")
def read_root():
    return {"message": "Edulytics backend is running 🚀"}
