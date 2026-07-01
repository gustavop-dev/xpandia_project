from unittest.mock import patch

from base_feature_app.services.email_service import (
    CONTACT_EMAIL,
    CONTACT_NOTIFICATION_EMAILS,
    EmailService,
)


def test_send_password_reset_code_delegates_to_util():
    user = object()
    with patch(
        'base_feature_app.services.email_service.send_password_reset_code',
        return_value=True,
    ) as mock_util:
        result = EmailService.send_password_reset_code(user, '123456')

    mock_util.assert_called_once_with(user, '123456')
    assert result is True


def test_send_password_reset_code_returns_false_when_util_fails():
    user = object()
    with patch(
        'base_feature_app.services.email_service.send_password_reset_code',
        return_value=False,
    ):
        result = EmailService.send_password_reset_code(user, '123456')

    assert result is False


def test_send_verification_code_delegates_to_util():
    with patch(
        'base_feature_app.services.email_service.send_verification_code',
        return_value=True,
    ) as mock_util:
        result = EmailService.send_verification_code('user@example.com', '654321')

    mock_util.assert_called_once_with('user@example.com', '654321')
    assert result is True


def test_send_verification_code_returns_false_when_util_fails():
    with patch(
        'base_feature_app.services.email_service.send_verification_code',
        return_value=False,
    ):
        result = EmailService.send_verification_code('user@example.com', '654321')

    assert result is False


# ---------------------------------------------------------------------------
# Contact notification
# ---------------------------------------------------------------------------

CONTACT_DATA = {
    'name': 'Ana García',
    'email': 'ana@example.com',
    'role': 'Product Manager',
    'company': 'Acme Corp',
    'website': 'https://acme.com',
    'message': 'We need Spanish QA for our product.',
    'service': 'language-assurance',
    'size': 'latam',
    'variant': 'urgent',
    'urgency': 'product-review',
}


def test_send_contact_notification_returns_true_on_success():
    with patch(
        'base_feature_app.services.email_service.EmailMessage',
    ) as MockEmail:
        MockEmail.return_value.send.return_value = None
        result = EmailService.send_contact_notification(CONTACT_DATA)

    assert result is True


def test_send_contact_notification_sends_to_xpandia_inbox():
    with patch(
        'base_feature_app.services.email_service.EmailMessage',
    ) as MockEmail:
        MockEmail.return_value.send.return_value = None
        EmailService.send_contact_notification(CONTACT_DATA)

    _, kwargs = MockEmail.call_args
    assert CONTACT_EMAIL in kwargs['to']


def test_send_contact_notification_also_sends_to_milena():
    with patch(
        'base_feature_app.services.email_service.EmailMessage',
    ) as MockEmail:
        MockEmail.return_value.send.return_value = None
        EmailService.send_contact_notification(CONTACT_DATA)

    _, kwargs = MockEmail.call_args
    assert 'milena@xpandia.global' in kwargs['to']


def test_send_contact_notification_sends_to_all_configured_recipients():
    with patch(
        'base_feature_app.services.email_service.EmailMessage',
    ) as MockEmail:
        MockEmail.return_value.send.return_value = None
        EmailService.send_contact_notification(CONTACT_DATA)

    _, kwargs = MockEmail.call_args
    assert kwargs['to'] == CONTACT_NOTIFICATION_EMAILS


def test_send_contact_notification_sets_reply_to_submitter():
    with patch(
        'base_feature_app.services.email_service.EmailMessage',
    ) as MockEmail:
        MockEmail.return_value.send.return_value = None
        EmailService.send_contact_notification(CONTACT_DATA)

    _, kwargs = MockEmail.call_args
    assert CONTACT_DATA['email'] in kwargs['reply_to']


def test_send_contact_notification_includes_company_in_subject():
    with patch(
        'base_feature_app.services.email_service.EmailMessage',
    ) as MockEmail:
        MockEmail.return_value.send.return_value = None
        EmailService.send_contact_notification(CONTACT_DATA)

    _, kwargs = MockEmail.call_args
    assert CONTACT_DATA['company'] in kwargs['subject']


def test_send_contact_notification_returns_false_on_smtp_error():
    with patch(
        'base_feature_app.services.email_service.EmailMessage',
    ) as MockEmail:
        MockEmail.return_value.send.side_effect = Exception('SMTP error')
        result = EmailService.send_contact_notification(CONTACT_DATA)

    assert result is False


# ---------------------------------------------------------------------------
# Contact confirmation
# ---------------------------------------------------------------------------


def test_send_contact_confirmation_returns_true_on_success():
    with patch(
        'base_feature_app.services.email_service.EmailMessage',
    ) as MockEmail:
        MockEmail.return_value.send.return_value = None
        result = EmailService.send_contact_confirmation(CONTACT_DATA)

    assert result is True


def test_send_contact_confirmation_sends_to_submitter():
    with patch(
        'base_feature_app.services.email_service.EmailMessage',
    ) as MockEmail:
        MockEmail.return_value.send.return_value = None
        EmailService.send_contact_confirmation(CONTACT_DATA)

    _, kwargs = MockEmail.call_args
    assert CONTACT_DATA['email'] in kwargs['to']


def test_send_contact_confirmation_sets_reply_to_xpandia():
    with patch(
        'base_feature_app.services.email_service.EmailMessage',
    ) as MockEmail:
        MockEmail.return_value.send.return_value = None
        EmailService.send_contact_confirmation(CONTACT_DATA)

    _, kwargs = MockEmail.call_args
    assert CONTACT_EMAIL in kwargs['reply_to']


def test_send_contact_confirmation_returns_false_on_smtp_error():
    with patch(
        'base_feature_app.services.email_service.EmailMessage',
    ) as MockEmail:
        MockEmail.return_value.send.side_effect = Exception('SMTP error')
        result = EmailService.send_contact_confirmation(CONTACT_DATA)

    assert result is False
