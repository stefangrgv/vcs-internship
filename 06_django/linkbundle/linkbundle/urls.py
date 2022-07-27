from django.urls import path, include
from django.contrib import admin
from rest_framework.authtoken import views

urlpatterns = [
    path('api/', include('api.urls')),
    path('admin/', admin.site.urls, name='admin_panel'),
    path('auth/', views.obtain_auth_token)
    # path('accounts/', include('rest_framework.urls'), name='accounts'),
]
