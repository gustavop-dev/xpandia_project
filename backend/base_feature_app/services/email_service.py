"""
Email service for handling all outbound email notifications.

Centralizes email logic following the service layer pattern.
Delegates to utility functions that wrap Django's send_mail.
"""
from django.conf import settings
from django.core.mail import EmailMessage

from base_feature_app.utils.auth_utils import (
    send_password_reset_code,
    send_verification_code,
)

CONTACT_EMAIL = 'nestor@xpandia.global'

_SERVICE_LABELS = {
    'language-assurance': 'Language Assurance',
    'ai-spanish-qa': 'AI Spanish QA',
    'launch-readiness': 'Spanish Launch Readiness',
    'experience-repair': 'Spanish Experience Repair',
    'applied-cultural-intelligence': 'Applied Cultural Intelligence',
    'messaging-review': 'Hispanic Audience & Messaging Review',
    'quality-advisory': 'Spanish Quality Advisory',
    'unsure': 'Not sure yet',
}
_AUDIENCE_LABELS = {
    'latam': 'LatAm',
    'us-hispanic': 'US Hispanic',
    'spain': 'Spain',
    'neutral': 'Neutral Spanish',
    'specific-region': 'Specific country or region',
    'unsure': 'Not sure yet',
}
_TIMELINE_LABELS = {
    'urgent': 'Urgent / this month',
    '1-2-months': '1–2 months',
    '3-plus-months': '3+ months',
    'exploring': 'Exploring options',
}
_SCOPE_LABELS = {
    'small-sample': 'Small sample or diagnostic',
    'ai-outputs': 'AI outputs or chatbot responses',
    'product-review': 'Product / website / content review',
    'repair-adaptation': 'Spanish repair or adaptation project',
    'workshop-advisory': 'Talk / workshop / advisory',
    'unsure': 'Not sure yet',
}


def _build_notification_body(data: dict) -> str:
    service = _SERVICE_LABELS.get(data.get('service', ''), data.get('service', '') or '—')
    audience = _AUDIENCE_LABELS.get(data.get('size', ''), data.get('size', '') or '—')
    timeline = _TIMELINE_LABELS.get(data.get('variant', ''), data.get('variant', '') or '—')
    scope = _SCOPE_LABELS.get(data.get('urgency', ''), data.get('urgency', '') or '—')
    website = data.get('website') or '—'

    return (
        f"New diagnostic call request from the Xpandia website.\n\n"
        f"--- CONTACT ---\n"
        f"Name:    {data['name']}\n"
        f"Role:    {data['role']}\n"
        f"Email:   {data['email']}\n"
        f"Company: {data['company']}\n"
        f"Website: {website}\n\n"
        f"--- QUALIFIER ---\n"
        f"Service:          {service}\n"
        f"Target audience:  {audience}\n"
        f"Timeline:         {timeline}\n"
        f"Estimated scope:  {scope}\n\n"
        f"--- SITUATION ---\n"
        f"{data['message']}\n"
    )


def _build_confirmation_body(data: dict) -> str:
    return (
        f"Hi {data['name']},\n\n"
        f"Thank you for reaching out to Xpandia. We've received your request "
        f"and will get back to you within 24 hours.\n\n"
        f"In the meantime, feel free to reply to this email if you have any "
        f"additional details to share.\n\n"
        f"Best,\n"
        f"Nestor Solano\n"
        f"Xpandia\n"
        f"hello@xpandia.global\n"
    )


class EmailService:
    """
    Service class for sending email notifications.

    Provides static methods for all transactional emails sent
    by the application, abstracting the underlying mail backend.
    """

    @staticmethod
    def send_password_reset_code(user, code: str) -> bool:
        """
        Send a password reset verification code to the user.

        Args:
            user: User instance with email and first_name attributes.
            code: 6-digit alphanumeric verification code.

        Returns:
            bool: True if the email was sent successfully, False otherwise.
        """
        return send_password_reset_code(user, code)

    @staticmethod
    def send_verification_code(email: str, code: str) -> bool:
        """
        Send an email verification code to a new user.

        Args:
            email: Recipient email address.
            code: 6-digit alphanumeric verification code.

        Returns:
            bool: True if the email was sent successfully, False otherwise.
        """
        return send_verification_code(email, code)

    @staticmethod
    def send_contact_notification(data: dict) -> bool:
        """
        Send an internal notification to the Xpandia inbox when a contact
        form is submitted.

        Args:
            data: Validated form data dict (keys: name, email, role, company,
                  website, message, service, size, variant, urgency).

        Returns:
            bool: True if sent successfully, False otherwise.
        """
        try:
            EmailMessage(
                subject=f"[Xpandia] Diagnostic call request — {data['company']}",
                body=_build_notification_body(data),
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[CONTACT_EMAIL],
                reply_to=[data['email']],
            ).send(fail_silently=False)
            return True
        except Exception:
            return False

    @staticmethod
    def send_contact_confirmation(data: dict) -> bool:
        """
        Send a confirmation auto-reply to the person who submitted the
        contact form.

        Args:
            data: Validated form data dict (keys: name, email).

        Returns:
            bool: True if sent successfully, False otherwise.
        """
        try:
            EmailMessage(
                subject="We received your request — Xpandia",
                body=_build_confirmation_body(data),
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[data['email']],
                reply_to=[CONTACT_EMAIL],
            ).send(fail_silently=False)
            return True
        except Exception:
            return False
