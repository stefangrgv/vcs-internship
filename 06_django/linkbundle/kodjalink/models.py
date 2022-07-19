from operator import mod
from django.db import models
from django.contrib import admin
#import json

class User(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class KodjaLink(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    links = models.CharField(max_length=1000, blank=True)

    def __str__(self):
        return str(self.id)
    
admin.site.register(User)
admin.site.register(KodjaLink)