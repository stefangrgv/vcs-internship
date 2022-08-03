from sqlite3 import Timestamp
from django.db import models


class Link(models.Model):
    url = models.URLField(max_length=100, blank=False)
    title = models.CharField(max_length=100, null=True, blank=True)
    thumbnail = models.URLField(max_length=100, null=True, blank=True, default="")
    description = models.TextField(max_length=400, null=True, blank=True)


class LinkList(models.Model):
    owner = models.ForeignKey(
        "auth.User", related_name="linklists", on_delete=models.CASCADE
    )
    links = models.ManyToManyField(Link, through='LinkListItem')
    title = models.CharField(max_length=200, blank=False)
    private = models.BooleanField(default=False)


class LinkListItem(models.Model):
    linklist = models.ForeignKey(LinkList, on_delete=models.CASCADE)
    link = models.ForeignKey(Link, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']