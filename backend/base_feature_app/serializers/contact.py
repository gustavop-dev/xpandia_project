from rest_framework import serializers


class ContactFormSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    role = serializers.CharField(max_length=255)
    company = serializers.CharField(max_length=255)
    message = serializers.CharField()
    service = serializers.CharField(max_length=50, required=False, allow_blank=True, default='')
    size = serializers.CharField(max_length=20, required=False, allow_blank=True, default='')
    variant = serializers.CharField(max_length=20, required=False, allow_blank=True, default='')
    urgency = serializers.CharField(max_length=20, required=False, allow_blank=True, default='')
