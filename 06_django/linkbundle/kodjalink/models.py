from django.db import models
from django.contrib import admin
from rest_framework import permissions

class Link(models.Model):
    url = models.URLField(max_length=100, blank=False)
    #thumbnail = models.ImageField(verbose_name='thumbnail')
    thumbnail = models.URLField(max_length=100, blank=True, default='')
    description = models.TextField(max_length=200)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LinkList(models.Model):
    owner = models.ForeignKey('auth.User', related_name='linklists', on_delete=models.CASCADE)
    links = models.ManyToManyField(Link)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def __str__(self):
        return str(self.id)
    
admin.site.register(LinkList)
admin.site.register(Link)