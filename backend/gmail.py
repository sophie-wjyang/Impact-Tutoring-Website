import base64
from email.message import EmailMessage
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]


class Mailer:
    def __init__(self):
        self.creds = None

        if os.path.exists("token.json"):
            self.creds = Credentials.from_authorized_user_file("token.json", SCOPES)
        else:
            raise Exception("No token.json file found")

        if not self.creds or not self.creds.valid:
            if self.creds and self.creds.expired and self.creds.refresh_token:
                self.creds.refresh(Request())
            else:
                raise Exception("No refresh token found")

            with open("token.json", "w") as token:
                token.write(self.creds.to_json())

        self.service = build("gmail", "v1", credentials=self.creds)

    def send_email(self, body, subject, to):
        try:
            message = EmailMessage()

            message.set_content(body)

            message["To"] = to
            message["From"] = os.environ["EMAIL_USERNAME"]
            message["Subject"] = subject

            encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

            create_message = {"raw": encoded_message}

            send_message = (
                self.service.users()
                .messages()
                .send(userId="me", body=create_message)
                .execute()
            )
            print(f'Message Id: {send_message["id"]}')

        except HttpError as error:
            print(f"An error occurred: {error}")
            send_message = None

        return send_message
