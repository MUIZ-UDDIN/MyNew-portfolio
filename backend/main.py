from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Muiz Ud Din Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://muizuddin.dev"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.post("/api/contact")
async def contact(msg: ContactMessage):
    logger.info(
        f"Contact form submission - Name: {msg.name}, Email: {msg.email}, "
        f"Subject: {msg.subject}, Message: {msg.message[:100]}..."
    )
    return {
        "status": "ok",
        "message": "Thank you for your message! I'll get back to you soon.",
    }
