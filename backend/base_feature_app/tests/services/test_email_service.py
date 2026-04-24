from unittest.mock import patch

from base_feature_app.services.email_service import EmailService


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
