from rest_framework import serializers


class ContactFormSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    role = serializers.CharField(max_length=255)
    company = serializers.CharField(max_length=255)
    website = serializers.CharField(max_length=255, required=False, allow_blank=True, default='')
    phone = serializers.CharField(max_length=40, required=False, allow_blank=True, default='')
    message = serializers.CharField()
    language = serializers.CharField(max_length=5, required=False, allow_blank=True, default='')
    intent = serializers.CharField(max_length=50, required=False, allow_blank=True, default='')
    service = serializers.CharField(max_length=50, required=False, allow_blank=True, default='')
    size = serializers.CharField(max_length=30, required=False, allow_blank=True, default='')
    variant = serializers.CharField(max_length=30, required=False, allow_blank=True, default='')
    urgency = serializers.CharField(max_length=30, required=False, allow_blank=True, default='')
