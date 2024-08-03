import os
import uuid

from flask_mail import Message

from app import mail


def create_email_confirmation_code(cur, user_id, email):
    code = uuid.uuid4().hex

    cur.execute(
        """INSERT INTO confirmation_codes (user_id, email, code) VALUES (%s, %s, %s)""",
        (user_id, email, code),
    )

    return code


def send_confirmation_email(
    cur,
    user_id,
    email,
):
    code = create_email_confirmation_code(cur, user_id, email)

    mail.send(Message(
        subject="Impact Tutoring: Confirm your email",
        sender=("Impact Tutoring", "impacttutoringca@gmail.com"),
        recipients=[email],
        body=f"Please click the following link to confirm your email: {os.environ["CLIENT_URL"]}/confirm_email?code={code}",
    ))
