from . import db

class Subscriber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    is_active = db.Column(db.Boolean, default=True)

class Campaign(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(255))
    preview_text = db.Column(db.String(255))
    article_url = db.Column(db.String(255))
    html_content = db.Column(db.Text)
    plain_text_content = db.Column(db.Text)
    published_date = db.Column(db.String(50))