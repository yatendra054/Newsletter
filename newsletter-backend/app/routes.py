from flask import Blueprint, request, jsonify
from .models import Subscriber, Campaign
from . import db
from .services.campaign_service import send_campaign_bulk
from .services.email_service import send_email
import flask

main = Blueprint("main", __name__)


@main.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Newsletter API is running!"})

@main.route("/subscribe", methods=["POST"])
def subscribe():
    data = request.json
    email = data.get("email")
    name = data.get("name", "Subscriber")
    action = data.get("action")

    if not email:
        return jsonify({"message": "Email required"}), 400

    subscriber = Subscriber.query.filter_by(email=email).first()

    if action == "subscribe":
        if not subscriber:
            subscriber = Subscriber(email=email, first_name=name)
            db.session.add(subscriber)
        else:
            subscriber.is_active = True
            subscriber.first_name = name

        db.session.commit()

        # Send welcome email
        site_url = flask.current_app.config["SITE_URL"]
        mail_user = flask.current_app.config["MAIL_USERNAME"]
        mail_pass = flask.current_app.config["MAIL_PASSWORD"]
        
        subject = "Welcome to our Newsletter!"
        html = f"<h1>Welcome {name}!</h1><p>You have successfully subscribed to our newsletter.</p>"
        text = f"Welcome {name}! You have successfully subscribed to our newsletter."
        
        send_email(email, subject, html, text, mail_user, mail_pass)

        return jsonify({"message": f"Welcome {name}!"})

    elif action == "unsubscribe":
        if subscriber:
            subscriber.is_active = False
            db.session.commit()
        return jsonify({"message": "Unsubscribed successfully"})

    return jsonify({"message": "Invalid action"}), 400



@main.route("/campaigns", methods=["GET"])
def get_campaigns():
    campaigns = Campaign.query.order_by(Campaign.id.desc()).all()

    return jsonify([
        {
            "id": c.id,
            "subject": c.subject,
            "preview_text": c.preview_text,
            "published_date": c.published_date,
        }
        for c in campaigns
    ])

@main.route("/campaigns", methods=["POST"])
def create_campaign():
    data = request.json
    subject = data.get("subject")
    preview_text = data.get("preview_text")
    article_url = data.get("article_url")
    html_content = data.get("html_content")
    plain_text_content = data.get("plain_text_content")
    published_date = data.get("published_date")

    if not subject or not html_content:
        return jsonify({"message": "Subject and HTML content are required"}), 400

    new_campaign = Campaign(
        subject=subject,
        preview_text=preview_text,
        article_url=article_url,
        html_content=html_content,
        plain_text_content=plain_text_content,
        published_date=published_date
    )

    db.session.add(new_campaign)
    db.session.commit()

    # Automate email sending to all active subscribers
    subscribers = Subscriber.query.filter_by(is_active=True).all()
    if subscribers:
        site_url = flask.current_app.config["SITE_URL"]
        mail_user = flask.current_app.config["MAIL_USERNAME"]
        mail_pass = flask.current_app.config["MAIL_PASSWORD"]
        send_campaign_bulk(new_campaign, subscribers, site_url, mail_user, mail_pass)

    return jsonify({"message": "Campaign created and emails sent!", "id": new_campaign.id}), 201



@main.route("/campaign/<int:id>", methods=["GET"])
def campaign_detail(id):
    c = Campaign.query.get_or_404(id)

    return jsonify({
        "id": c.id,
        "subject": c.subject,
        "preview_text": c.preview_text,
        "html_content": c.html_content,
        "article_url": c.article_url,
        "published_date": c.published_date,
    })


@main.route("/send-campaign/<int:id>", methods=["POST"])
def send_campaign(id):
    campaign = Campaign.query.get_or_404(id)
    subscribers = Subscriber.query.filter_by(is_active=True).all()

    if not subscribers:
        return jsonify({"message": "No active subscribers"})

    site_url = flask.current_app.config["SITE_URL"]
    mail_user = flask.current_app.config["MAIL_USERNAME"]
    mail_pass = flask.current_app.config["MAIL_PASSWORD"]
    send_campaign_bulk(campaign, subscribers, site_url, mail_user, mail_pass)

    return jsonify({"message": "Campaign sending started"})


@main.route("/campaign/<int:id>", methods=["DELETE"])
def delete_campaign(id):
    campaign = Campaign.query.get_or_404(id)
    db.session.delete(campaign)
    db.session.commit()
    return jsonify({"message": "Campaign deleted successfully"})