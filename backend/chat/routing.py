from django.urls import path

from .consumers import ChatConsumer

websocket_urlpatterns = [
    path('chat/<slug:user_name>/', ChatConsumer),
]