from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('kodjalink/<int:pk>/', include('links.urls'), name='links'),
    path('', include('frontend.urls'), name='frontend'),
]
