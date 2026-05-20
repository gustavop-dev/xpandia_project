import logging

from django.conf import settings
from django.core.mail import EmailMessage
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from base_feature_app.serializers.contact import ContactFormSerializer

logger = logging.getLogger(__name__)

CONTACT_EMAIL = 'hello@xpandia.global'

SERVICE_LABELS = {
    'language-assurance': 'Language Assurance',
    'ai-spanish-qa': 'AI Spanish QA',
    'launch-readiness': 'Spanish Launch Readiness',
    'experience-repair': 'Spanish Experience Repair',
    'applied-cultural-intelligence': 'Applied Cultural Intelligence',
    'messaging-review': 'Hispanic Audience & Messaging Review',
    'quality-advisory': 'Spanish Quality Advisory',
    'unsure': 'Not sure yet',
}
AUDIENCE_LABELS = {
    'latam': 'LatAm',
    'us-hispanic': 'US Hispanic',
    'spain': 'Spain',
    'neutral': 'Neutral Spanish',
    'specific-region': 'Specific country or region',
    'unsure': 'Not sure yet',
}
TIMELINE_LABELS = {
    'urgent': 'Urgent / this month',
    '1-2-months': '1–2 months',
    '3-plus-months': '3+ months',
    'exploring': 'Exploring options',
}
SCOPE_LABELS = {
    'small-sample': 'Small sample or diagnostic',
    'ai-outputs': 'AI outputs or chatbot responses',
    'product-review': 'Product / website / content review',
    'repair-adaptation': 'Spanish repair or adaptation project',
    'workshop-advisory': 'Talk / workshop / advisory',
    'unsure': 'Not sure yet',
}


def _build_email_body(data: dict) -> str:
    service = SERVICE_LABELS.get(data.get('service', ''), data.get('service', '') or '—')
    audience = AUDIENCE_LABELS.get(data.get('size', ''), data.get('size', '') or '—')
    timeline = TIMELINE_LABELS.get(data.get('variant', ''), data.get('variant', '') or '—')
    scope = SCOPE_LABELS.get(data.get('urgency', ''), data.get('urgency', '') or '—')
    website = data.get('website') or '—'

    return f"""New diagnostic call request from the Xpandia website.

--- CONTACT ---
Name:    {data['name']}
Role:    {data['role']}
Email:   {data['email']}
Company: {data['company']}
Website: {website}

--- QUALIFIER ---
Service:          {service}
Target audience:  {audience}
Timeline:         {timeline}
Estimated scope:  {scope}

--- SITUATION ---
{data['message']}
"""


@api_view(['POST'])
@permission_classes([AllowAny])
def contact_form(request):
    serializer = ContactFormSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    subject = f"[Xpandia] Diagnostic call request — {data['company']}"
    body = _build_email_body(data)

    try:
        EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[CONTACT_EMAIL],
            reply_to=[data['email']],
        ).send(fail_silently=False)
    except Exception as exc:
        logger.error('contact_form email failed: %s', exc)
        return Response(
            {'detail': 'Could not send message. Please email us directly at hello@xpandia.global'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    return Response({'detail': 'Request received.'}, status=status.HTTP_201_CREATED)
