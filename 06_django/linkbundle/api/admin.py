from django.contrib import admin
from .models import Link, LinkList

# Register your models here.
admin.site.register(LinkList)
admin.site.register(Link)
