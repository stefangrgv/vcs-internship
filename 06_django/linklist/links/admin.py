from django.contrib import admin

# Register your models here.
from .models import Link, KodjaLink, User
admin.site.register(Link)
admin.site.register(KodjaLink)
admin.site.register(User)