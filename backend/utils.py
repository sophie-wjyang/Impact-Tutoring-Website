import os
import uuid

from flask_mail import Message

def create_email_confirmation_code(cur, user_id, email):
    code = uuid.uuid4().hex

    cur.execute(
        """INSERT INTO confirmation_codes (user_id, email, code) VALUES (%s, %s, %s)""",
        (user_id, email, code),
    )

    return code


def create_confirmation_email(
    cur,
    user_id,
    email,
):
    code = create_email_confirmation_code(cur, user_id, email)

    return Message(
        subject="Impact Tutoring: Confirm your email",
        sender=("Impact Tutoring", "alexjy@yahoo.com"),
        recipients=[email],
        body=f"Please click the following link to confirm your email: {os.environ["CLIENT_URL"]}/confirm_email?code={code}",
    )
