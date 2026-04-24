import logging

from django.conf import settings
from django.core.mail import EmailMessage
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from base_feature_app.serializers.contact import ContactFormSerializer

logger = logging.getLogger(__name__)

CONTACT_EMAIL = 'hello@xpandia.co'

SERVICE_LABELS = {
    'qa': 'AI Spanish QA Sprint',
    'audit': 'Launch Readiness Audit',
    'fractional': 'Fractional Lead',
    'unsure': 'Not sure yet',
}
URGENCY_LABELS = {
    'pre-launch': 'Pre-launch',
    'quarter': 'This quarter',
    'half': 'This half',
    'exploring': 'Exploring',
}


def _build_email_body(data: dict) -> str:
    service = SERVICE_LABELS.get(data.get('service', ''), data.get('service', '—'))
    urgency = URGENCY_LABELS.get(data.get('urgency', ''), data.get('urgency', '—'))
    size = data.get('size') or '—'
    variant = data.get('variant') or '—'

    return f"""New diagnostic call request from the Xpandia website.

--- CONTACT ---
Name:    {data['name']}
Role:    {data['role']}
Email:   {data['email']}
Company: {data['company']}

--- QUALIFIER ---
Service:        {service}
Company size:   {size}
Spanish variant: {variant}
Urgency:        {urgency}

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
            {'detail': 'Could not send message. Please email us directly at hello@xpandia.co'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    return Response({'detail': 'Request received.'}, status=status.HTTP_201_CREATED)
