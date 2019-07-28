from channels.generic.websocket import AsyncWebsocketConsumer

import json


class ChatConsumer(AsyncWebsocketConsumer):

    GROUP_NAME='chat_main'

    async def connect(self):
        self.user_name = self.scope['url_route']['kwargs']['user_name']
        print("'{0}' joined to the channel".format(self.user_name))

        # Join room group
        await self.channel_layer.group_add(
            self.GROUP_NAME,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.GROUP_NAME,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        
        message = data['message']
        username = data['username']
        email = data['email']
        timestamp = data['timestamp']

        print("'{0}' sent a message to the channel".format(username))

        # Send message to room group
        await self.channel_layer.group_send(
            self.GROUP_NAME,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
                'email': email,
                'timestamp': timestamp
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))