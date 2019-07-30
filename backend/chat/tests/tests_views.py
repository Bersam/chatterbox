from django.test import TestCase
from django.urls import reverse

import datetime

from ..models import Message, User


class ChatViewTests(TestCase):
    """ Test module for Movie Views """

    def setUp(self):
        alice = User.objects.create(name="Alice", email="alice@test.com")
        bob = User.objects.create(name="Bob", email="bob@test.com")

        Message.objects.create(user=alice, message="Hey Bob!")
        Message.objects.create(user=bob, message="Hi Alice!")

    def test_get_list_view(self):
        response = self.client.get(reverse('message-list'))
        data = response.json()
        element = data[0]

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Hey Bob!')
        self.assertContains(response, 'Hi Alice!')

        self.assertEqual(len(data), 2)

        self.assertEqual('message' in element, True)
        self.assertEqual('username' in element, True)
        self.assertEqual('timestamp' in element, True)
        self.assertEqual('email' in element, True)