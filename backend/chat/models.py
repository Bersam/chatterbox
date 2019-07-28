from django.db import models
from django.utils import timezone


class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class Message(models.Model):
    user = models.ForeignKey(User, related_name="messages", on_delete=models.PROTECT)
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)

    def __str__(self):
        return "{0}: {1}".format(self.user, self.message)