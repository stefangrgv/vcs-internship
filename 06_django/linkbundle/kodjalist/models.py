from django.db import models
from django.contrib import admin

# Create your models here.
class Link(models.Model):
    url = models.URLField(max_length=200)
    
    def __str__(self):
        return self.url

admin.site.register(Link)