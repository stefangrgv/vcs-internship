from django.urls import path, include
from django.contrib import admin


urlpatterns = [
    path('api/', include('api.urls')),
    path('admin/', admin.site.urls, name='admin_panel'),
    path('auth/', include('dj_rest_auth.urls')),
]
