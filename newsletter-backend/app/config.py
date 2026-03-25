import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///newsletter.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAIL_USERNAME = os.getenv("EMAIL_HOST_USER")
    MAIL_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
    SITE_URL = "http://127.0.0.1:5173" 