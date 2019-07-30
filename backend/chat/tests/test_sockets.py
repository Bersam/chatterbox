from channels.testing import ChannelsLiveServerTestCase
from asgiref.sync import async_to_sync

from datetime import datetime
import websocket
import json
import time

class ChatTests(ChannelsLiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.alice_ws = websocket.WebSocket()
        cls.bob_ws = websocket.WebSocket()

    @classmethod
    def tearDownClass(cls):
        cls.alice_ws.close()
        cls.bob_ws.close()
        super().tearDownClass()

    def test_when_chat_message_posted_then_seen_by_everyone_in_same_room(self):
        self._connect(self.alice_ws)
        self._connect(self.bob_ws)

        url = self.live_server_url.replace("http", "ws")

        message = {"message": "Hello Bob!",
                "username": "Alice",
                "email": "alice@test.com",
                "timestamp": datetime.now().timestamp() * 1000}

        self._post_message(self.alice_ws, message)

        result = self._recieve_message(self.bob_ws)

        self.assertEqual(result['type'], "chat_message")
        del result['type']

        self.assertEqual(result, message)


    def _connect(self, ws):
        url = self.live_server_url.replace("http", "ws")
        ws.connect(url + "/chat/")

    def _post_message(self, ws, message):
        message_serialized = json.dumps(message)
        ws.send(message_serialized)
    
    def _recieve_message(self, ws):
        result = ws.recv()
        return json.loads(result)