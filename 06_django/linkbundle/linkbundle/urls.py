from django.urls import path, include

urlpatterns = [
    path('', include('kodjalink.urls')),
    path('accounts/', include('rest_framework.urls')),
]
