from rest_framework import serializers

from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ('timestamp', 'message', 'username', 'email')

    def get_username(self, obj):
        return obj.user.name

    def get_email(self, obj):
        return obj.user.email