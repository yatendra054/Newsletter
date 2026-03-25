from ..utils.thread_pool import executor
from .email_service import send_email


def send_campaign_to_subscriber(to_email, campaign_data, site_url, mail_user, mail_pass):
    unsubscribe_url = f"{site_url}/unsubscribe/{to_email}"

    html_content = f"""
        <h2>{campaign_data['subject']}</h2>
        <p><i>{campaign_data['preview_text']}</i></p>
        <div>{campaign_data['html_content']}</div>
        <p><a href="{campaign_data['article_url']}">Read Full Article</a></p>
        <br><br>
        <a href="{unsubscribe_url}">Unsubscribe</a>
    """

    plain_text = campaign_data.get('plain_text_content') or "Newsletter Update"

    send_email(to_email, campaign_data['subject'], html_content, plain_text, mail_user, mail_pass)


def send_campaign_bulk(campaign, subscribers, site_url, mail_user, mail_pass):
    # Extract data BEFORE submitting to threads to avoid DetachedInstanceError
    campaign_data = {
        'subject': campaign.subject,
        'preview_text': campaign.preview_text,
        'html_content': campaign.html_content,
        'article_url': campaign.article_url,
        'plain_text_content': campaign.plain_text_content
    }
    
    for sub in subscribers:
        to_email = sub.email
        executor.submit(send_campaign_to_subscriber, to_email, campaign_data, site_url, mail_user, mail_pass)