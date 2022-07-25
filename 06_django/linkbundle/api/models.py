from django.db import models


class Link(models.Model):
    url = models.URLField(max_length=100, blank=False)
    thumbnail = models.URLField(max_length=100, null=True, blank=True, default="")
    description = models.TextField(max_length=200, null=True, blank=True)


class LinkList(models.Model):
    owner = models.ForeignKey(
        "auth.User", related_name="linklists", on_delete=models.CASCADE
    )
    links = models.ManyToManyField(Link, blank=True, null=True)
    title = models.CharField(max_length=200, blank=False)
    private = models.BooleanField(default=False)
