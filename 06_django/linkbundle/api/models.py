from django.db import models
from urllib.parse import quote


class Link(models.Model):
    url = models.URLField(max_length=100, blank=False)#, unique=True)
    thumbnail = models.URLField(max_length=100, null=True, blank=True, default="", editable=False)
    description = models.TextField(max_length=200, null=True, blank=True, editable=False)

class LinkList(models.Model):
    owner = models.ForeignKey(
        "auth.User", related_name="linklists", on_delete=models.CASCADE
    )
    links = models.ManyToManyField(Link)
    title = models.CharField(max_length=200, blank=False)
    private = models.BooleanField(default=False)
