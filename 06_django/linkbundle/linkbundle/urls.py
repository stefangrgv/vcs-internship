from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('api/', include('kodjalink.urls')),
    path('admin/', admin.site.urls, name='admin_panel'),
    path('accounts/', include('rest_framework.urls'), name='accounts'),
]
