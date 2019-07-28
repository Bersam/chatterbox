from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework import filters


from .models import Message
from .serializers import MessageSerializer

# Create your views here.

class MessagesList(ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['message', 'user__name', 'user__email']