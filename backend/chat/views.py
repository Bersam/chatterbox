from django.shortcuts import render
from rest_framework.generics import ListAPIView

from .models import Message
from .serializers import MessageSerializer

# Create your views here.

class MessagesList(ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer