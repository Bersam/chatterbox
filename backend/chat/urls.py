from django.urls import path

from .views import MessagesList

urlpatterns = [
    path('', MessagesList.as_view(), name='message-list'),
]