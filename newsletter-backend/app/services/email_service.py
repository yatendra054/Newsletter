import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_email(to_email, subject, html_content, plain_text, mail_user, mail_pass):
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = mail_user
        msg["To"] = to_email

        part1 = MIMEText(plain_text, "plain")
        part2 = MIMEText(html_content, "html")

        msg.attach(part1)
        msg.attach(part2)

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(mail_user, mail_pass)

        server.sendmail(mail_user, to_email, msg.as_string())

        server.quit()
        return True

    except Exception as e:
        print(f"Email failed: {e}")
        return False