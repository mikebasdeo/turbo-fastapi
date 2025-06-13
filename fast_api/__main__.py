# fast_api/__main__.py

from fastapi import FastAPI
import uvicorn

from .main import app  # assuming your app is defined in main.py

if __name__ == "__main__":
    uvicorn.run("fast_api.main:app", host="127.0.0.1", port=8000, reload=True)