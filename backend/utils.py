import uuid


def is_session_valid(session):
    return (
        session.get("id") is not None
        and session.get("email") is not None
        and session.get("user_type") is not None
    )


def create_email_confirmation_code(cur, user_id, user_type, email):
    code = uuid.uuid4().hex

    cur.execute(
        """INSERT INTO confirmation_codes (user_id, user_type, email, code) VALUES (%s, %s, %s, %s)""",
        (user_id, user_type, email, code),
    )

    return code
