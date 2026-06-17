from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.generate import router
import google.generativeai as genai
import os
import uvicorn
from dotenv import load_dotenv

# Database and Router imports
from app.core.database import engine
from app.db_models import Base
from app.routes.auth import router as auth_router
from app.routes.projects import router as projects_router


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="DesignDoc API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173","https://design-doc-eta.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api",tags=["Generation"])
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(projects_router, prefix="/api/projects", tags=["Projects"])

@app.get("/")
def root():
    return {"message": "DesignDoc API is running"}