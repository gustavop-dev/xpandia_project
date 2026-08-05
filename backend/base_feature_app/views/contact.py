import logging

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from base_feature_app.serializers.contact import ContactFormSerializer
from base_feature_app.services.email_service import EmailService

logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([AllowAny])
def contact_form(request):
    serializer = ContactFormSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data

    sent = EmailService.send_contact_notification(data)
    if not sent:
        logger.error('contact_form notification email failed for %s', data.get('email'))
        return Response(
            {'detail': 'Could not send message. Please email us directly at hello@xpandia.global'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    # The lead is already captured by the notification above, so a failed
    # auto-reply must not turn a successful submission into an error. Log it
    # and still return 201.
    if not EmailService.send_contact_confirmation(data):
        logger.warning('contact_form confirmation email failed for %s', data.get('email'))

    return Response({'detail': 'Request received.'}, status=status.HTTP_201_CREATED)
