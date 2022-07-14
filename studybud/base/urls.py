from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('rooms/<str:name>/', views.room, name='room'),
    path('create_room/', views.create_room, name='create_room')
]
    